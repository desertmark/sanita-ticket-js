import {
  AttachMoney,
  CreditCard,
  CurrencyExchange,
  SvgIconComponent,
} from '@mui/icons-material';
import { PayMethod } from '../../types';

const iconMap = {
  [PayMethod.CASH]: AttachMoney,
  [PayMethod.CREDIT]: CreditCard,
  [PayMethod.DEBIT]: CreditCard,
  [PayMethod.TRANSFER]: CurrencyExchange,
};
export const usePayMethodIcon = (payMethod: PayMethod): SvgIconComponent => {
  return iconMap[payMethod];
};
