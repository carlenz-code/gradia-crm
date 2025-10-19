import type { MessageItem } from '@/types/header';

export async function getMessages(): Promise<{ items: MessageItem[]; unread: number }> {
  const items: MessageItem[] = [
    { id: '1', from: 'Jorge C.',       text: 'Subí la rúbrica al curso de Redes', time: 'hace 5m', unread: true },
    { id: '2', from: 'Karen S.',       text: '¿Confirmas la demo del lunes?',     time: 'hace 1h' },
    { id: '3', from: 'Equipo Grad.IA', text: 'Se publicó la nueva versión',       time: 'ayer' },
  ];
  return { items, unread: items.filter(i => i.unread).length };
}
