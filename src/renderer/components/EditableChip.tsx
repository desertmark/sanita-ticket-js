import { FC, FocusEvent, KeyboardEvent, useState } from 'react';
import { Box, IconButton, Input, Stack, Tooltip, Typography } from '@mui/joy';
import { Cancel, Check } from '@mui/icons-material';
import { useToggle } from '../hooks/useToggle';
import { RoundButton } from './ui/RoundButton';

export const EditableChip: FC<{
  value: number;
  onChange?: (value: number) => void;
}> = ({ value, onChange }) => {
  const [isEditingQuantity, toggleEditingQuantity, setValue] = useToggle(false);
  const [newQuantity, setQuantity] = useState<number>(value);

  const changeQuantity = (quantity: number) => {
    toggleEditingQuantity();
    onChange?.(quantity);
  };
  const onBlur = (e: FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setValue(false);
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
        <Stack direction="row" gap={1.5} alignItems="center">
          <RoundButton
            size="xs"
            sx={{ borderRadius: 99 }}
            color="neutral"
            onClick={() => {
              onChange?.(value - 1);
            }}
          >
            -
          </RoundButton>
          <Tooltip
            variant="soft"
            title="Click para editar manualmente."
            color="primary"
            placement="top"
            enterDelay={500}
            onClick={toggleEditingQuantity}
          >
            <Typography level="body-md">{value}</Typography>
          </Tooltip>
          <RoundButton size="xs" sx={{ borderRadius: 99 }} color="neutral" onClick={() => onChange?.(value + 1)}>
            +
          </RoundButton>
        </Stack>
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
