import { Box, Typography, FormControl, Input } from '@mui/joy';
import { ChangeEvent, FC, FormEventHandler, useState } from 'react';
import { styled } from '@mui/material/styles';
import { FilterAlt, ReceiptLongRounded, Key } from '@mui/icons-material';
import { Grid } from '@mui/material';
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
  text: (v: string) => v,
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
    <Form onChange={handleChange} style={{ display: 'flex', gap: '1rem', flexDirection: 'column', flexWrap: 'wrap' }}>
      <Box display="flex" alignItems="center">
        <FilterAlt />
        <Typography>Filtros: </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <FormControl>
            <Input id="code" name="code" type="text" placeholder="Codigo" endDecorator={<Key />} />
          </FormControl>
        </Grid>
        <Grid item xs={6} md={4}>
          <FormControl>
            <Input
              id="ticketFrom"
              name="ticketFrom"
              type="number"
              placeholder="Ticket desde"
              endDecorator={<ReceiptLongRounded />}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} md={4}>
          <FormControl>
            <Input
              id="ticketTo"
              name="ticketTo"
              type="number"
              placeholder="Ticket hasta"
              endDecorator={<ReceiptLongRounded />}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <Input id="dateFrom" name="dateFrom" type="date" placeholder="Fecha desde" />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <Input id="dateTo" name="dateTo" type="date" placeholder="Fecha hasta" />
          </FormControl>
        </Grid>
      </Grid>
    </Form>
  );
};
