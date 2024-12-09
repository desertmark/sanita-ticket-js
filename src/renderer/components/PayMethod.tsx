import { Radio, RadioGroup } from '@mui/joy';
import { CreditCard, AttachMoney, CurrencyExchange } from '@mui/icons-material';
import { FC } from 'react';
import { PayMethod as PayMethodEnum } from '../../types';

export const PayMethod: FC<{
  value: string;
  onChange: (value: PayMethodEnum) => void;
}> = ({ onChange, value }) => {
  return (
    <RadioGroup
      defaultValue={PayMethodEnum.CASH}
      name="radio-buttons-group"
      orientation="horizontal"
      onChange={(e) => onChange(e.target.value as PayMethodEnum)}
    >
      <Radio
        color="success"
        value={PayMethodEnum.CASH}
        label={PayMethodEnum.CASH}
        variant="solid"
        checked={value === PayMethodEnum.CASH}
        checkedIcon={<AttachMoney style={{ fontSize: 18 }} />}
        size="lg"
      />
      <Radio
        color="success"
        value={PayMethodEnum.TRANSFER}
        label={PayMethodEnum.TRANSFER}
        variant="solid"
        checked={value === PayMethodEnum.TRANSFER}
        checkedIcon={<CurrencyExchange style={{ fontSize: 18 }} />}
        size="lg"
      />
      <Radio
        color="primary"
        value={PayMethodEnum.DEBIT}
        label={PayMethodEnum.DEBIT}
        variant="solid"
        checked={value === PayMethodEnum.DEBIT}
        checkedIcon={<CreditCard style={{ fontSize: 18 }} />}
        size="lg"
      />
      <Radio
        color="warning"
        value={PayMethodEnum.CREDIT}
        label={PayMethodEnum.CREDIT}
        variant="solid"
        checked={value === PayMethodEnum.CREDIT}
        checkedIcon={<CreditCard style={{ fontSize: 18 }} />}
        size="lg"
      />
    </RadioGroup>
  );
};
