import { FC } from 'react';
import { Stack } from '@mui/joy';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { RoundButton, RoundIconButton } from './RoundButton';

export interface PaginationProps {
  currentPage: number;
  onPageChange?: (page: number) => void;
  totalPages: number;
}

export const Pagination: FC<PaginationProps> = ({ currentPage, onPageChange, totalPages }) => {
  const isLastPage = currentPage >= totalPages;
  const handleChangePage = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    onPageChange?.(page);
  };
  return (
    <Stack direction="row" justifyContent="center" width="100%" gap={3}>
      <RoundIconButton disabled={currentPage <= 1} onClick={() => handleChangePage(currentPage - 1)}>
        <ChevronLeft />
      </RoundIconButton>
      {currentPage > 1 && (
        <RoundButton color="neutral" variant="plain" onClick={() => handleChangePage(currentPage - 1)}>
          {currentPage - 1}
        </RoundButton>
      )}
      <RoundButton color="neutral">{currentPage}</RoundButton>
      {!isLastPage && (
        <RoundButton color="neutral" variant="plain" onClick={() => handleChangePage(currentPage + 1)}>
          {currentPage + 1}
        </RoundButton>
      )}
      {currentPage <= 1 && totalPages > 2 && (
        <RoundButton color="neutral" variant="plain" onClick={() => handleChangePage(currentPage + 2)}>
          {currentPage + 2}
        </RoundButton>
      )}
      <RoundIconButton disabled={currentPage >= totalPages} onClick={() => handleChangePage(currentPage + 1)}>
        <ChevronRight />
      </RoundIconButton>
    </Stack>
  );
};
