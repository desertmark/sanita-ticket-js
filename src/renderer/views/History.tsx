import { Box, Typography } from '@mui/joy';
import { FC } from 'react';
import './print.scss';
import { HistoryDataGrid } from '../components/HistoryDataGrid';
import { useHistoryState } from '../hooks/useHistoryState';

export const HistoryView: FC = () => {
  const state = useHistoryState();
  return (
    <Box className="history-view">
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography level="h2">Historico</Typography>
      </Box>
      <HistoryDataGrid rows={state.rows} />
    </Box>
  );
};
