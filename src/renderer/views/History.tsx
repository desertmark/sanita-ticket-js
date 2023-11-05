import { Box, Typography, Button, Input, Tooltip } from '@mui/joy';
import { FC, useRef } from 'react';
import { FileOpen, Print, Cancel, ReceiptLong } from '@mui/icons-material';
import { ProductsDataGrid } from '../components/ProductsDataGrid/ProductsDataGrid';
import { ProductsSelectionDataGrid } from '../components/ProductsDataGrid/ProductSelectionDataGrid';
import { Ticket } from '../components/Ticket';
import Search from '@mui/icons-material/Search';
import './print.scss';
import { createPortal } from 'react-dom';
import { useHomeState } from '../hooks/useHomeState';
import { EditableChip } from '../components/EditableChip';
import { PayMethod } from '../components/PayMethod';
import { minMaxFormatter } from '../../utils';

export const HistoryView: FC = () => {
  return <Box className="history-view">History view</Box>;
};
