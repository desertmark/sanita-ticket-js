import { Box, Typography, FormControl, Input } from '@mui/joy';
import { ChangeEvent, FC, FormEventHandler, useState } from 'react';
import { styled } from '@mui/material/styles';
import { FilterAlt, ReceiptLongRounded } from '@mui/icons-material';
import { ITicketFilters } from '../hooks/useSupabase';
import { debounce } from '../../utils';

const Form = styled('form')(({ theme }) => {
  return {
    gap: theme.spacing(1),
    display: 'flex',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down(1120)]: {
      flexDirection: 'column',
      width: '100%',
    },
  };
});
const STRING_TO_TYPE_PARSER = {
  number: Number,
  date: (v: string) => new Date(v),
};
export const HistoryFilters: FC<{
  onChange: (filters: Omit<ITicketFilters, 'page' | 'size'>) => void;
}> = ({ onChange }) => {
  const [state, setState] = useState({});
  const handleChange: FormEventHandler = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const parser = STRING_TO_TYPE_PARSER[e.target.type as 'number' | 'date'];
    const v = e.target.value;
    const newState = {
      ...state,
      [e.target.name]: v === '' || v === null ? undefined : parser(v),
    };
    setState(newState);
    onChange(newState);
  }, 1000);
  return (
    <Form onChange={handleChange}>
      <Box display="flex" alignItems="center">
        <FilterAlt />
        <Typography>Filtros: </Typography>
      </Box>
      <FormControl>
        <Input
          id="ticketFrom"
          name="ticketFrom"
          type="number"
          placeholder="Ticket desde"
          endDecorator={<ReceiptLongRounded />}
        />
      </FormControl>
      <FormControl>
        <Input
          id="ticketTo"
          name="ticketTo"
          type="number"
          placeholder="Ticket hasta"
          endDecorator={<ReceiptLongRounded />}
        />
      </FormControl>
      <FormControl>
        <Input id="dateFrom" name="dateFrom" type="date" placeholder="Fecha desde" />
      </FormControl>
      <FormControl>
        <Input id="dateTo" name="dateTo" type="date" placeholder="Fecha hasta" />
      </FormControl>
    </Form>
  );
};
