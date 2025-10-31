/* eslint-disable no-restricted-globals */
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
  ChangeEvent,
  useMemo,
  useEffect,
} from 'react';
import MDBReader from 'mdb-reader';
import { PostgrestError } from '@supabase/supabase-js';
import { debounce, readFileAsBuffer } from '../../utils';
import { ITicketSummary, useTicketSummary } from '../hooks/useTicketSummary';
import { useProductsApi, useTicketsApi } from '../hooks/useSupabase';
import { useAppState } from './AppStateProvider';
import { useLoader } from '../hooks/useLoader';
import { IReturnTicket, useReturnTicket } from '../hooks/useReturnTicket';
import { useAsync } from '../hooks/useAsync';
import {
  IReturnTicketLine,
  ITicketLine,
  PayMethod,
  TicketState,
  IProduct,
  IHistoryItem,
  IMDBProduct,
  IProductsFilters,
} from '../../types';
import { IFindResult } from '../../types/common';

export interface IHomeStateContextType {
  products: IProduct[];
  productsCount: number;
  pageSize: number;
  page: number;
  filtered: IProduct[];
  filter?: string;
  lines: ITicketLine[];
  ticketNumber: number;
  payMethod: PayMethod;
  discount: number;
  openFile?: {
    path: string;
    openTime: string;
  };
  summary: ITicketSummary;
  returnTicket: IReturnTicket;
  alreadyReturnLines: IReturnTicketLine[];
  isLoadingReturnTicket: boolean;
  handleFileOpen: (e: ChangeEvent<HTMLInputElement>) => void;
  onProductSelected: (product: IProduct) => void;
  onProductDeleted: (line: ITicketLine) => void;
  onQuantityChanged: (line: ITicketLine) => void;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  clear: () => void;
  setPayMethod: (value: PayMethod) => void;
  setDiscount: (value: number) => void;
  printTicket: () => void;
  save: () => void;
  onReturnTicketChange: (value: number) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

const defaults: IHomeStateContextType = {
  pageSize: 10,
  page: 1,
  products: [],
  productsCount: 0,
  filtered: [],
  lines: [],
  ticketNumber: 0,
  payMethod: PayMethod.CASH,
  discount: 0,
  summary: {
    subTotal: 0,
    discountAmount: 0,
    total: 0,
  },
  returnTicket: {
    ticket: undefined,
    totalCredit: 0,
    returnProducts: [],
    ref: { current: null },
    setTicket: () => {},
    addReturnProduct: () => {},
    removeReturnProduct: () => {},
    clear: () => {},
  },
  alreadyReturnLines: [],
  isLoadingReturnTicket: false,
  handleFileOpen: () => {},
  onProductSelected: () => {},
  onProductDeleted: () => {},
  onQuantityChanged: () => {},
  onSearch: () => {},
  clear: () => {},
  setPayMethod: () => {},
  setDiscount: () => {},
  printTicket: () => {},
  save: () => {},
  onReturnTicketChange: () => {},
  setPage: () => {},
  setPageSize: () => {},
};

const HomeStateContext = createContext<IHomeStateContextType>(defaults);

export const useHomeState = (): IHomeStateContextType => useContext(HomeStateContext);

// PROVIDER
export const HomeStateProvider: FC<PropsWithChildren> = ({ children }) => {
  // States
  const [filtered, setFiltered] = useState<IProduct[]>(defaults.filtered);
  const [filter, setFilter] = useState<string>(defaults.filter || '');
  const [lines, setLines] = useState<ITicketLine[]>(defaults.lines);
  const [payMethod, setPayMethod] = useState<PayMethod>(defaults.payMethod);
  const [discount, setDiscount] = useState<number>(defaults.discount);
  const [alreadyReturnLines, setAlreadyReturnLines] = useState<IReturnTicketLine[]>(defaults.alreadyReturnLines);
  const [page, setPage] = useState<number>(defaults.page);
  const [pageSize, setPageSize] = useState<number>(defaults.pageSize);
  const returnTicket = useReturnTicket();
  // Loaders
  const { isLoading: isLoadingReturnTicket, waitFor: waitForReturnTicket } = useLoader();
  const {
    loader: { waitFor: waitForApp },
    setCurrentTicket,
  } = useAppState();
  // APIs
  const { createTicket, findLastTicketNumber, findTicketById, findReturnLinesByReturnTicketId } = useTicketsApi();
  const { importProducts, findProducts } = useProductsApi();
  // Asyncs
  const { data: lastTicket, refresh: refreshLastTicket } = useAsync(findLastTicketNumber, undefined, 0);
  const {
    data: { items: products, count: productsCount },
    refresh: refreshProducts,
  } = useAsync<IFindResult<IProduct>, IProductsFilters, IFindResult<IProduct>>(findProducts, { page, size: pageSize }, {
    items: [],
    count: 0,
  } as IFindResult<IProduct>);
  // Utils
  const summary = useTicketSummary(lines, discount, returnTicket.totalCredit, payMethod);
  // Constants
  const ticketNumber = (lastTicket || 0) + 1;
  const isClear = lines.length === 0;
  const { clear: clearReturnTicket, setTicket: setReturnTicket } = returnTicket;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const refreshProductsDebounced = useCallback(debounce(refreshProducts, 500), [refreshProducts]);
  // Effects
  useEffect(() => {
    refreshProductsDebounced({ page, size: pageSize, code: filter || '', description: filter || '' });
  }, [filter, page, pageSize, refreshProductsDebounced]);

  // Methods
  const handleFileOpen = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const buffer = await readFileAsBuffer(file!);
        const reader = new MDBReader(buffer);
        const table = await reader.getTable('lista');
        const mdbProducts = table.getData<IMDBProduct>();

        try {
          await importProducts(mdbProducts);
          alert('Productos importados correctamente');
        } catch (error) {
          const err = error as PostgrestError;
          alert(`
          Error importando productos:
            Codigo: ${err.code}
            Mensaje: ${err.message}
            Detalles: ${err.details}
            Sugerencia: ${err.hint || '-'}
          `);
        }
      }
      e.target.value = null as any;
    },
    [importProducts],
  );

  const onProductSelected = useCallback(
    (product: IProduct) => {
      const existent = lines.find((l) => l.product.id === product.id);
      if (existent) {
        existent.quantity++;
        setLines([...lines]);
      } else {
        setLines([...lines, { quantity: 1, product }]);
      }
    },
    [lines, setLines],
  );

  const onProductDeleted = useCallback(
    (line: ITicketLine) => {
      const newLines = lines.filter((l) => l.product.id !== line.product.id);
      setLines([...newLines]);
    },
    [lines, setLines],
  );

  const onQuantityChanged = useCallback(
    (line: ITicketLine) => {
      if (line.quantity <= 0) {
        onProductDeleted(line);
        return;
      }
      const newLines = lines.map((l) => {
        if (l.product.id === line.product.id) {
          l.quantity = line.quantity;
        }
        return l;
      });
      setLines([...newLines]);
    },
    [lines, setLines, onProductDeleted],
  );

  const onReturnTicketChange = useMemo(
    () =>
      debounce(async (value: number) => {
        try {
          const ticket = await waitForReturnTicket(findTicketById(value));
          const alreadyReturnLinesRes = await waitForReturnTicket(findReturnLinesByReturnTicketId(value?.toString()));
          setReturnTicket(ticket);
          setAlreadyReturnLines(alreadyReturnLinesRes);
        } catch {
          if (value) {
            alert(`No se encontro el Ticket Nro: ${value}`);
          }
          setReturnTicket(undefined);
        }
      }, 1000),
    [waitForReturnTicket, findTicketById, findReturnLinesByReturnTicketId, setReturnTicket],
  );

  const onSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setPage(1);
  }, []);

  const clear = useCallback(() => {
    setFilter('');
    setLines([]);
    setDiscount(0);
    setPayMethod(PayMethod.CASH);
    clearReturnTicket();
  }, [clearReturnTicket]);

  const printTicket = useCallback(() => {
    window.print();
  }, []);

  const save = useCallback(async () => {
    try {
      if (isClear) {
        throw new Error('No hay productos en la lista');
      }
      const lasTicketNumber = await waitForApp(findLastTicketNumber());
      const historyItem: IHistoryItem = {
        id: lasTicketNumber + 1,
        ticketLines: lines,
        date: new Date().getTime(),
        payMethod,
        discount,
        subTotal: summary.subTotal,
        total: summary.total,
        state: TicketState.confirmed,
        returnTicket,
      };
      await waitForApp(createTicket(historyItem));
      waitForApp(refreshLastTicket());
      setCurrentTicket(historyItem);
      clear();
    } catch (e: any) {
      alert(`No se pudo guardar el ticket: ${e.message}`);
    }
  }, [
    isClear,
    lines,
    payMethod,
    discount,
    summary.subTotal,
    summary.total,
    returnTicket,
    waitForApp,
    createTicket,
    refreshLastTicket,
    setCurrentTicket,
    clear,
    findLastTicketNumber,
  ]);

  const value = useMemo(
    () => ({
      products,
      pageSize,
      page,
      productsCount,
      filtered,
      filter,
      lines,
      ticketNumber,
      payMethod,
      discount,
      summary,
      returnTicket,
      alreadyReturnLines,
      isLoadingReturnTicket,
      handleFileOpen,
      onProductSelected,
      onProductDeleted,
      onQuantityChanged,
      onSearch,
      clear,
      setPayMethod,
      setDiscount,
      printTicket,
      save,
      onReturnTicketChange,
      setPage,
      setPageSize,
    }),
    [
      products,
      pageSize,
      page,
      productsCount,
      filtered,
      filter,
      lines,
      ticketNumber,
      payMethod,
      discount,
      summary,
      returnTicket,
      alreadyReturnLines,
      isLoadingReturnTicket,
      handleFileOpen,
      onProductSelected,
      onProductDeleted,
      onQuantityChanged,
      onSearch,
      clear,
      printTicket,
      save,
      onReturnTicketChange,
    ],
  );

  return <HomeStateContext.Provider value={value}>{children}</HomeStateContext.Provider>;
};
