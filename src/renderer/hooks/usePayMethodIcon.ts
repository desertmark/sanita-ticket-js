import { AttachMoney, CreditCard, CurrencyExchange, SvgIconComponent, QrCode } from '@mui/icons-material';
import { PayMethod } from '../../types';

const iconMap = {
  [PayMethod.CASH]: AttachMoney,
  [PayMethod.CREDIT]: CreditCard,
  [PayMethod.DEBIT]: CreditCard,
  [PayMethod.TRANSFER]: CurrencyExchange,
  [PayMethod.QR]: QrCode,
};
export const usePayMethodIcon = (payMethod: PayMethod): SvgIconComponent => {
  return iconMap[payMethod] || iconMap[PayMethod.CASH];
};
