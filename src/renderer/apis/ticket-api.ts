/* eslint-disable class-methods-use-this */
import { SupabaseClient } from '@supabase/supabase-js';
import PostgrestFilterBuilder from '@supabase/postgrest-js/src/PostgrestFilterBuilder';
import { IReturnTicketLine, ITicket, ITicketFilters, TicketState } from '../../types/tickets';
import { fromItems, MAX_DATE, MIN_DATE, toHistoryItem, toItems, toTicket } from '../../utils';
import { IHistoryItem } from '../../types/history';

const DEFAULT_TICKET_FILTERS: ITicketFilters = {
  page: 1,
  size: 10,
  dateFrom: MIN_DATE,
  dateTo: MAX_DATE,
  ticketFrom: 0,
  ticketTo: Number.MAX_SAFE_INTEGER,
  code: '',
};

export class TicketsAPI {
  constructor(private supabase: SupabaseClient) {
    this.findLastTicketNumber = this.findLastTicketNumber.bind(this);
    this.createTicket = this.createTicket.bind(this);
    this.findTickets = this.findTickets.bind(this);
    this.countTickets = this.countTickets.bind(this);
    this.findTicketById = this.findTicketById.bind(this);
    this.findReturnLinesByReturnTicketId = this.findReturnLinesByReturnTicketId.bind(this);
    this.deleteTicket = this.deleteTicket.bind(this);
    this.updateState = this.updateState.bind(this);
    this.commonTicketQuery = this.commonTicketQuery.bind(this);
  }

  async findTicketById(ticketId: number): Promise<ITicket | undefined> {
    const { data, error } = await this.supabase
      .from('tickets')
      .select<string, ITicket>('*')
      .eq('id', ticketId)
      .limit(1)
      .single();
    if (error) {
      throw error;
    }
    return data || undefined;
  }

  async findReturnLinesByReturnTicketId(returnTicketId: string): Promise<IReturnTicketLine[]> {
    const { data, error } = await this.supabase
      .from('tickets')
      .select<string, ITicket>('*')
      .eq('return_ticket_id', returnTicketId);
    if (error) {
      throw error;
    }
    // Get all the lines that were returned from the ticketId
    const returnLines = data?.reduce((acc, ticket) => {
      const lines: IReturnTicketLine[] =
        ticket.return_products?.map((rp) => ({
          ...rp.line,
          return_ticket_id: ticket.id,
        })) || [];
      return acc.concat(lines);
    }, [] as IReturnTicketLine[]);

    return returnLines;
  }

  async findTickets(_filters: ITicketFilters = DEFAULT_TICKET_FILTERS): Promise<IHistoryItem[]> {
    const filters = { ...DEFAULT_TICKET_FILTERS, ..._filters };
    const from = fromItems(filters.page, filters.size!);
    const to = toItems(from, filters.size!);
    const queryBuilder = this.commonTicketQuery(
      this.supabase.from('tickets').select<'*', ITicket>('*') as any,
      filters,
    ).range(from, to);

    const { data, error } = await queryBuilder;
    if (error) {
      throw error;
    }
    return data.map(toHistoryItem);
  }

  async countTickets(_filters: ITicketFilters = DEFAULT_TICKET_FILTERS): Promise<number> {
    const filters = { ...DEFAULT_TICKET_FILTERS, ..._filters };
    const queryBuilder = this.commonTicketQuery(
      this.supabase.from('tickets').select<'*', number>('*', { count: 'exact', head: true }) as any,
      filters,
    );

    const { error, count } = await queryBuilder;
    if (error) {
      throw error;
    }
    return count || 0;
  }

  async findLastTicketNumber(): Promise<number> {
    const { data, error } = await this.supabase
      .from('tickets')
      .select<string, Pick<ITicket, 'ticket_number'>>('ticket_number')
      .order('ticket_number', { ascending: false })
      .limit(1)
      .single();
    if (error) {
      throw error;
    }
    return data.ticket_number;
  }

  async createTicket(historyItem: IHistoryItem): Promise<void> {
    const { error } = await this.supabase.from('tickets').insert<ITicket>(toTicket(historyItem));
    if (error) {
      throw error;
    }
  }

  async deleteTicket(ticketId: number) {
    const { error } = await this.supabase.from('tickets').delete().eq('id', ticketId);
    if (error) {
      throw error;
    }
  }

  async updateState(ticketId: string, state: TicketState): Promise<void> {
    const { error } = await this.supabase.from('tickets').update({ state }).eq('id', ticketId);
    if (error) {
      throw error;
    }
  }

  private commonTicketQuery(
    queryBuilder: PostgrestFilterBuilder<any, any, ITicket[], 'tickets', unknown>,
    filters: ITicketFilters,
  ) {
    if (filters.code) {
      queryBuilder.or(
        `lines.cs.${JSON.stringify([{ product: { codigo: filters.code } }])}, return_products.cs.${JSON.stringify([
          { line: { product: { codigo: filters.code } } },
        ])}`,
      );
    }
    return queryBuilder
      .gte('ticket_number', filters.ticketFrom)
      .lte('ticket_number', filters.ticketTo)
      .gte('created_at', filters.dateFrom?.toISOString())
      .lte('created_at', filters.dateTo?.toISOString())
      .order('ticket_number', { ascending: false });
  }
}
