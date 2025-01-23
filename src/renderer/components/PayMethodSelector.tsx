import { ListItemDecorator, Option, Radio, RadioGroup, Select } from '@mui/joy';
import { CreditCard, AttachMoney, CurrencyExchange } from '@mui/icons-material';
import { FC, useRef, useState } from 'react';
import { PayMethodClass, PayMethod as PayMethodEnum } from '../../types';
import { PayMethod } from './PayMethod';

export const PayMethodSelector: FC<{
  value: string;
  onChange: (value: PayMethodEnum) => void;
}> = ({ onChange, value }) => {
  const [method, setMethod] = useState<PayMethodClass>(PayMethodClass.Efectivo);
  return (
    <Select
      defaultValue={PayMethodEnum.CASH}
      startDecorator={<method.Icon color={method.color} />}
      onChange={(e, value) => {
        onChange(value as PayMethodEnum);
        setMethod(PayMethodClass[value!]);
      }}
    >
      <Option value={PayMethodEnum.CASH} label={PayMethodEnum.CASH}>
        <ListItemDecorator>
          <AttachMoney color="success" />
        </ListItemDecorator>
        {PayMethodEnum.CASH}
      </Option>
      <Option value={PayMethodEnum.TRANSFER} label={PayMethodEnum.TRANSFER}>
        <ListItemDecorator>
          <CurrencyExchange color="success" />
        </ListItemDecorator>
        {PayMethodEnum.TRANSFER}
      </Option>
      <Option value={PayMethodEnum.DEBIT} label={PayMethodEnum.DEBIT}>
        <ListItemDecorator>
          <CreditCard color="primary" />
        </ListItemDecorator>
        {PayMethodEnum.DEBIT}
      </Option>
      <Option value={PayMethodEnum.CREDIT} label={PayMethodEnum.CREDIT}>
        <ListItemDecorator>
          <CreditCard color="warning" />
        </ListItemDecorator>
        {PayMethodEnum.CREDIT}
      </Option>
    </Select>
  );
};
