'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}
