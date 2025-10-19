import type { NotificationItem } from '@/types/header';

export async function getNotifications(): Promise<{ items: NotificationItem[]; unread: number }> {
  const items: NotificationItem[] = [
    { id: 'n1', title: 'Nueva entrega',          desc: 'María R. subió su tarea 02', time: 'hace 2m', unread: true, href: '/tasks/02' },
    { id: 'n2', title: 'Calificación publicada', desc: 'Tarea 01 (Sección A)',       time: 'hace 40m', href: '/grades' },
    { id: 'n3', title: 'Evento hoy',             desc: 'Sesión síncrona 7:00 pm',    time: 'hace 3h',  href: '/calendar' },
  ];
  return { items, unread: items.filter(i => i.unread).length };
}
