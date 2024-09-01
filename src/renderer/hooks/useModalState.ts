import { useState } from 'react';

export interface IModalState {
  isOpen: boolean;
  close: () => void;
  open: () => void;
}

export const useModalState = (): IModalState => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return {
    isOpen,
    close: () => setIsOpen(false),
    open: () => setIsOpen(true),
  };
};
