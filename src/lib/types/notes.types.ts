export type NoteTag = 'Today' | 'To-do' | 'Meeting' | 'Team';

export type NoteItem = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: 'todo' | 'done';
  tags: NoteTag[];
  dateLabel: string;        // “14-oct.”
  createdAt: string;        // ISO
  updatedAt: string;        // ISO
};
