import { FC } from 'react';
import { Button, IconButton, Stack, styled } from '@mui/joy';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export interface PaginationProps {
  currentPageBase0: number;
  onPageChange?: (page: number) => void;
}

const RoundButton = styled(Button)(({ theme }) => ({
  borderRadius: 99999,
  fontSize: theme.fontSize.xs,
  width: 40,
  height: 40,
  fontWeight: 'normal',
}));

const RoundIconButton = styled(IconButton)(() => ({
  borderRadius: 99999,
  width: 40,
  height: 40,
}));

export const Pagination: FC<PaginationProps> = ({ currentPageBase0, onPageChange }) => {
  const currentPage = currentPageBase0 + 1;
  return (
    <Stack direction="row" justifyContent="center" width="100%" gap={3}>
      <RoundIconButton disabled={currentPage <= 1} onClick={() => onPageChange?.(currentPageBase0 - 1)}>
        <ChevronLeft />
      </RoundIconButton>
      {currentPage > 1 && (
        <RoundButton color="neutral" variant="plain" onClick={() => onPageChange?.(currentPageBase0 - 1)}>
          {currentPage - 1}
        </RoundButton>
      )}
      <RoundButton color="neutral">{currentPage}</RoundButton>
      <RoundButton color="neutral" variant="plain" onClick={() => onPageChange?.(currentPageBase0 + 1)}>
        {currentPage + 1}
      </RoundButton>
      {currentPage <= 1 && (
        <RoundButton color="neutral" variant="plain" onClick={() => onPageChange?.(currentPageBase0 + 2)}>
          {currentPage + 2}
        </RoundButton>
      )}
      <RoundIconButton onClick={() => onPageChange?.(currentPageBase0 + 1)}>
        <ChevronRight />
      </RoundIconButton>
    </Stack>
  );
};
