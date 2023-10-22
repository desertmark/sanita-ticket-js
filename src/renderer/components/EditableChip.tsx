import { FC, FocusEvent, KeyboardEvent, useState } from 'react';
import { useToggle } from '../hooks/useToggle';
import { Box, Chip, IconButton, Input, Tooltip } from '@mui/joy';
import { Cancel, Check } from '@mui/icons-material';

export const EditableChip: FC<{
  value: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
}> = ({ value, onChange, size }) => {
  const [isEditingQuantity, toggleEditingQuantity] = useToggle(false);
  const [newQuantity, setQuantity] = useState<number>(value);

  const changeQuantity = (quantity: number) => {
    toggleEditingQuantity();
    onChange?.(quantity);
  };
  const onBlur = (e: FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      toggleEditingQuantity();
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isEditingQuantity) {
      toggleEditingQuantity();
    }
  };

  return (
    <Box onBlur={onBlur} onKeyDown={onKeyDown}>
      {!isEditingQuantity && (
        <Tooltip
          title="Click para editar manualmente."
          color="primary"
          placement="top"
          enterDelay={500}
          onClick={toggleEditingQuantity}
        >
          <Chip color="primary" variant="solid" size={size}>
            {value}
          </Chip>
        </Tooltip>
      )}
      {isEditingQuantity && (
        <Input
          autoFocus
          type="number"
          defaultValue={value}
          sx={{ width: 140 }}
          onChange={(e) => setQuantity(Number(e.target.value))}
          slotProps={{ input: { min: 1 } }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              changeQuantity(newQuantity);
            }
          }}
          endDecorator={
            <>
              <IconButton onClick={() => changeQuantity(newQuantity)}>
                <Check />
              </IconButton>
              <IconButton onClick={toggleEditingQuantity}>
                <Cancel />
              </IconButton>
            </>
          }
        />
      )}
    </Box>
  );
};
