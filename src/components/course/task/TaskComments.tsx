'use client';

import { useMemo, useRef, useState } from 'react';
import type { Role, TaskComment } from '@/lib/types/task.types';
import { useTaskComments } from '@/lib/hooks/useTaskComments';
import { Send2, Like1, Message, ArrowDown2, ArrowUp2, More } from 'iconsax-react';

/* ===== helpers ===== */
function timeAgo(iso: string) {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'ahora';
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} h`;
  const d = Math.floor(h / 24);
  return `${d} d`;
}

function Avatar({ name }: { name: string }) {
  const initials = useMemo(
    () => name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase(),
    [name]
  );
  return (
    <div className="grid place-items-center h-9 w-9 rounded-full bg-[var(--section)] border border-[var(--border)] text-[12px] font-semibold text-[var(--fg)]">
      {initials}
    </div>
  );
}

/* ===== Árbol de comentarios ===== */
type TreeNode = { data: TaskComment; children: TreeNode[] };
function buildTree(list: TaskComment[]): TreeNode[] {
  const byId: Record<string, TreeNode> = {};
  list.forEach(c => (byId[c.id] = { data: c, children: [] }));
  const roots: TreeNode[] = [];
  list.forEach(c => {
    if (c.parentId) {
      const p = byId[c.parentId];
      if (p) p.children.push(byId[c.id]);
      else roots.push(byId[c.id]);
    } else roots.push(byId[c.id]);
  });
  return roots;
}

/* ===== Item con respuestas ===== */
function CommentItem({
  node,
  depth = 0,
  onReply,
  onLike,
}: {
  node: TreeNode;
  depth?: number;
  onReply: (parentId: string, text: string) => Promise<void>;
  onLike: (id: string) => void;
}) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [value, setValue] = useState('');
  const [liked, setLiked] = useState(false);
  const indent = Math.min(depth, 3) * 16;

  return (
    <li className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
      <div className="flex items-start gap-3">
        <Avatar name={node.data.authorName} />
        <div className="min-w-0 flex-1" style={{ marginLeft: indent ? `${indent}px` : 0 }}>
          <div className="flex items-center justify-between gap-2">
            <div className="text-[14px] font-medium text-[var(--fg)]">
              {node.data.authorName}{' '}
              <span className="ml-1 text-[12px] font-normal text-[color:var(--muted)]">
                · {timeAgo(node.data.createdAt)}
              </span>
            </div>
            <button
              className="h-8 w-8 grid place-items-center rounded-md hover:bg-[var(--section)] text-[color:var(--muted)]"
              onClick={() => alert('Editar/Eliminar próximamente')}
              aria-label="Más acciones"
            >
              <More size={16} color="currentColor" />
            </button>
          </div>

          <p className="mt-1 text-[14px] leading-relaxed text-[var(--fg)] whitespace-pre-line">
            {node.data.body}
          </p>

          <div className="mt-2 flex items-center gap-4 text-[13px] text-[color:var(--muted)]">
            <button
              onClick={() => { setLiked(v => !v); onLike(node.data.id); }}
              className={`inline-flex items-center gap-1 hover:opacity-80 ${liked ? 'text-[var(--brand)]' : ''}`}
            >
              <Like1 size={16} color="currentColor" /> Me gusta
            </button>
            <button
              onClick={() => setReplyOpen(o => !o)}
              className="inline-flex items-center gap-1 hover:opacity-80"
            >
              <Message size={16} color="currentColor" /> Responder
            </button>
            {node.children.length > 0 && (
              <button
                onClick={(e) => {
                  const el = e.currentTarget.parentElement?.nextElementSibling;
                  if (el) el.classList.toggle('hidden');
                }}
                className="inline-flex items-center gap-1 hover:opacity-80"
              >
                <ArrowDown2 size={16} color="currentColor" /> {node.children.length} respuestas
              </button>
            )}
          </div>

          {replyOpen && (
            <div className="mt-3">
              <div className="flex items-center gap-2">
                <textarea
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Escribe una respuesta..."
                  className="flex-1 min-h-[60px] resize-none outline-none bg-[var(--section)] border border-[var(--border)] rounded-xl p-3 text-[14px]"
                />
                <button
                  onClick={async () => {
                    const t = value.trim();
                    if (!t) return;
                    setValue('');
                    await onReply(node.data.id, t);
                    setReplyOpen(false);
                  }}
                  className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[var(--brand)] text-white font-medium"
                >
                  <Send2 size={18} color="#fff" /> Enviar
                </button>
              </div>
            </div>
          )}

          {/* respuestas */}
          {node.children.length > 0 && (
            <ul className="mt-3 grid gap-2">
              {node.children.map((child) => (
                <CommentItem
                  key={child.data.id}
                  node={child}
                  depth={depth + 1}
                  onReply={onReply}
                  onLike={onLike}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
}

/* ===== componente principal ===== */
export default function TaskComments({ taskId, role }: { taskId: string; role: Role }) {
  const { items, loading, add } = useTaskComments(taskId, role);
  const [value, setValue] = useState('');
  const [sort, setSort] = useState<'new' | 'old'>('new');

  const sorted = useMemo(() => {
    const l = [...items];
    if (sort === 'new') l.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    if (sort === 'old') l.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
    return l;
  }, [items, sort]);

  const tree = useMemo(() => buildTree(sorted), [sorted]);

  const submitRoot = async () => {
    const v = value.trim();
    if (!v) return;
    setValue('');
    await add(v, null);
  };

  return (
    <div className="space-y-4">
      {/* composer raíz */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)]">
        <div className="p-4">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Escribe un comentario..."
            className="w-full resize-none outline-none bg-[var(--section)] border border-[var(--border)] rounded-xl p-3 text-[14px] min-h-[76px]"
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[12px] text-[color:var(--muted)]">
              Usa <kbd className="border border-[var(--border)] px-1 rounded">Shift+Enter</kbd> para salto de línea
            </div>
            <button
              onClick={submitRoot}
              disabled={!value.trim()}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[var(--brand)] text-white font-medium disabled:opacity-50"
            >
              <Send2 size={18} color="#fff" /> Enviar
            </button>
          </div>
        </div>

        {/* header lista */}
        <div className="border-t border-[var(--border)] px-4 py-3 flex items-center justify-between">
          <div className="text-[15px] font-semibold text-[var(--fg)]">
            Comentarios{' '}
            <span className="ml-1 text-[12px] px-2 py-0.5 rounded-full bg-[var(--section)] border border-[var(--border)]">
              {items.length}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <span className="text-[color:var(--muted)]">Ordenar:</span>
            <div className="inline-flex rounded-lg border border-[var(--border)] bg-[var(--card)] overflow-hidden">
              <button onClick={() => setSort('new')} className={`px-3 py-1.5 ${sort==='new'?'bg-[var(--section)] text-[var(--fg)]':'text-[color:var(--muted)]'}`}>Recientes</button>
              <button onClick={() => setSort('old')} className={`px-3 py-1.5 ${sort==='old'?'bg-[var(--section)] text-[var(--fg)]':'text-[color:var(--muted)]'}`}>Antiguos</button>
            </div>
          </div>
        </div>
      </div>

      {/* lista */}
      {loading ? (
        <div className="h-16 rounded-xl bg-[var(--section)] border border-[var(--border)]" />
      ) : tree.length === 0 ? (
        <div className="text-[13px] text-[color:var(--muted)]">Aún no hay comentarios.</div>
      ) : (
        <ul className="grid gap-3">
          {tree.map((node) => (
            <CommentItem
              key={node.data.id}
              node={node}
              onReply={async (parentId, text) => add(text, parentId)}
              onLike={() => {}}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
