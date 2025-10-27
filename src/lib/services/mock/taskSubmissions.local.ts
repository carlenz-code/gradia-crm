// src/lib/services/mock/taskSubmissions.local.ts
'use client';

import { getStudentsForCourse, type User } from './userDirectory.local';

/* =========================
   Tipos y utilidades
   ========================= */
export type Attach = {
  id: string;
  title: string;
  type: 'pdf' | 'document' | 'slide' | 'video' | 'link';
  url: string;
};

export type Submission = {
  id: string;
  studentId: string;
  studentName: string;
  avatarUrl?: string;
  status: 'submitted' | 'missing';
  submittedAt?: string;
  attachments?: Attach[];
  grade?: number;
  feedback?: string;
};

type Store = Record<string, Submission[]>;
const KEY = 'gradia:taskSubmissions';

function read(): Store {
  try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : {}; }
  catch { return {}; }
}
function write(store: Store) { localStorage.setItem(KEY, JSON.stringify(store)); }

const between = (a:number,b:number)=>Math.floor(Math.random()*(b-a+1))+a;
const pick = <T,>(arr:T[]) => arr[between(0,arr.length-1)];
const maybe = <T,>(v:T, p=0.5) => (Math.random()<p?v:undefined);

function randomAttachment(): Attach {
  const types: Attach['type'][] = ['pdf','document','slide','video','link'];
  const t = pick(types);
  const title = { pdf:'informe.pdf', document:'borrador.docx', slide:'presentacion.pptx', video:'video.mp4', link:'https://example.com' }[t];
  return { id: crypto.randomUUID(), title, type: t, url:'#' };
}

function makeSubmission(user: User): Submission {
  const submitted = Math.random() < 0.85; // 85% envío
  const grade = submitted ? maybe(between(11,20), 0.7) : undefined; // 70% de los enviados con nota
  return {
    id: crypto.randomUUID(),
    studentId: user.id,
    studentName: user.name,
    avatarUrl: user.avatarUrl,
    status: submitted ? 'submitted' : 'missing',
    submittedAt: submitted ? new Date(Date.now()-between(1,7)*86400000).toISOString() : undefined,
    attachments: submitted ? Array.from({length: between(1,2)}, randomAttachment) : [],
    grade,
    feedback: grade != null ? maybe('Buen trabajo; revisar cohesión y fuentes.', 0.4) : undefined,
  };
}

/* =========================
   API del mock
   ========================= */

// crea/rehace la cohorte desde el directorio del curso
export function seedCohort(taskId: string, courseId: string) {
  const store = read();
  const students = getStudentsForCourse(courseId);
  const list = students.map(makeSubmission);
  store[taskId] = list;
  write(store);
  return list;
}

export function resetSubmissions(taskId: string) {
  const store = read(); store[taskId] = []; write(store);
}

export function getSubmissions(taskId: string): Submission[] {
  const store = read(); return store[taskId] ?? [];
}
export function setSubmissions(taskId: string, items: Submission[]) {
  const store = read(); store[taskId] = items; write(store);
}

// para el “auto-seed” del profe: si no hay cohorte, la crea
export function listForTeacher(taskId: string, courseId: string): Submission[] {
  const list = getSubmissions(taskId);
  if (list.length) return list;
  return seedCohort(taskId, courseId); // ← crea cohort automática
}

// estudiante envía su entrega
export async function submitTask(
  taskId: string,
  user: { id: string; name: string },
  files: File[]
): Promise<Submission> {
  await new Promise(r => setTimeout(r, 350)); // latencia
  const items = getSubmissions(taskId);
  const meIndex = items.findIndex(i => i.studentId === user.id);

  const sub: Submission = {
    id: crypto.randomUUID(),
    studentId: user.id,
    studentName: user.name,
    status: 'submitted',
    submittedAt: new Date().toISOString(),
    attachments: files.map(f => ({ id: crypto.randomUUID(), title: f.name, type: 'document', url: '#' })),
  };

  if (meIndex >= 0) items[meIndex] = { ...items[meIndex], ...sub };
  else items.push(sub);

  setSubmissions(taskId, items);
  return sub;
}

// docente califica
export function upsertGrade(taskId: string, submissionId: string, grade?: number, feedback?: string) {
  const list = getSubmissions(taskId);
  const i = list.findIndex(s => s.id === submissionId);
  if (i < 0) return;
  const updated = { ...list[i], grade, feedback };
  list[i] = updated;
  setSubmissions(taskId, list);
  return updated;
}

export type { Store };
