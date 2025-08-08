"use client";

import { X } from 'lucide-react';
import React from 'react';

type ModalSize = 'md' | 'lg' | 'xl' | 'full';

export default function Modal({
  open,
  onClose,
  title,
  children,
  size = 'md',
  hideHeader = false,
  closeOnBackdrop = true,
  contentClassName,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: ModalSize;
  hideHeader?: boolean;
  closeOnBackdrop?: boolean;
  contentClassName?: string;
}) {
  if (!open) return null;

  const sizeMaxClass: Record<ModalSize, string> = {
    md: 'max-w-2xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
    full: 'max-w-7xl',
  };

  const baseContentClass = contentClassName
    ? `glass-card ${contentClassName}`
    : `glass-card w-full ${sizeMaxClass[size]} max-h-[90vh] rounded-xl p-6 overflow-y-auto`;

  function onOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!closeOnBackdrop) return;
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center px-4"
      onClick={onOverlayClick}
    >
      <div className={baseContentClass} role="dialog" aria-modal="true">
        {!hideHeader && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close modal">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
