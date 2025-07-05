import { FC } from 'react';
import { Stack } from '@mui/joy';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { RoundButton, RoundIconButton } from './RoundButton';

export interface PaginationProps {
  currentPageBase0: number;
  onPageChange?: (page: number) => void;
  totalPages: number;
}

export const Pagination: FC<PaginationProps> = ({ currentPageBase0, onPageChange, totalPages }) => {
  const currentPage = currentPageBase0 + 1;
  const isLastPage = currentPageBase0 >= totalPages - 1;
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
      {!isLastPage && (
        <RoundButton color="neutral" variant="plain" onClick={() => onPageChange?.(currentPageBase0 + 1)}>
          {currentPage + 1}
        </RoundButton>
      )}
      {currentPage <= 1 && totalPages > 2 && (
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
