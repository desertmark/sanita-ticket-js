import { Radio, RadioGroup } from '@mui/joy';
import { CreditCard, AttachMoney } from '@mui/icons-material';
import { FC } from 'react';

export const PayMethod: FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ onChange, value }) => {
  return (
    <RadioGroup
      defaultValue="Efectivo"
      name="radio-buttons-group"
      orientation="horizontal"
      onChange={(e) => onChange(e.target.value)}
    >
      <Radio
        color="success"
        value="Efectivo"
        label="Efectivo"
        variant="solid"
        checked={value === 'Efectivo'}
        checkedIcon={<AttachMoney style={{ fontSize: 18 }} />}
        size="lg"
      />

      <Radio
        color="primary"
        value="Debito"
        label="Debito"
        variant="solid"
        checked={value === 'Debito'}
        checkedIcon={<CreditCard style={{ fontSize: 18 }} />}
        size="lg"
      />
      <Radio
        color="warning"
        value="Credito"
        label="Credito"
        variant="solid"
        checked={value === 'Credito'}
        checkedIcon={<CreditCard style={{ fontSize: 18 }} />}
        size="lg"
      />
    </RadioGroup>
  );
};
