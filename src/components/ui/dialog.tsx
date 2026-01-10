import * as React from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

function Modal({ open, onOpenChange, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {children}
    </div>
  );
}

function ModalOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/80"
      onClick={onClose}
    />
  );
}

interface ModalContentProps {
  children: React.ReactNode;
  onClose: () => void;
}

function ModalContent({ children, onClose }: ModalContentProps) {
  return (
    <>
      <ModalOverlay onClose={onClose} />
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-6 shadow-lg">
        {children}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 opacity-70 hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}

function ModalHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 text-center sm:text-left">
      {children}
    </div>
  );
}

function ModalFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2">
      {children}
    </div>
  );
}

function ModalTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-semibold leading-none tracking-tight">
      {children}
    </h2>
  );
}

function ModalDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-muted-foreground mt-1">
      {children}
    </p>
  );
}

export {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
};
