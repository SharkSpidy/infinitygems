'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isOpen: boolean;
  itemId: string;
  itemTitle: string;
  openModal: (itemId: string, itemTitle: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemId, setItemId] = useState('');
  const [itemTitle, setItemTitle] = useState('');

  const openModal = (id: string, title: string) => {
    setItemId(id);
    setItemTitle(title);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <ModalContext.Provider value={{ isOpen, itemId, itemTitle, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}
