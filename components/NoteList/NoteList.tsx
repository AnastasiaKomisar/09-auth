import { Note } from '@/types/note';
import { deleteNote } from '@/lib/api/clientApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteList.module.css';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`} className={css.link} scroll={false}>
              View details
            </Link>
            <button
              className={css.button}
              onClick={() => mutation.mutate(note.id.toString())}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
