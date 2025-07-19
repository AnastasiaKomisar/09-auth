"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useNoteStore } from '@/lib/store/noteStore';
import css from './NoteForm.module.css';
import { NewNote, NoteTag } from "@/types/note";
import toast from "react-hot-toast";

export default function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const mutation= useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes']});
      router.back();
      toast.success("Success! Your note has been saved.");
    },
    onError: () => {
      toast.error("Oops! The note couldn't be saved.");
    },
  });

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  }

   const handleSubmit = async (formData: FormData) => {
    const note: NewNote = {
      title: formData.get('title') as string,
      content: (formData.get('content') as string) || "",
      tag: formData.get('tag') as NoteTag,
    };
    mutation.mutate(note);
    clearDraft();
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title" className={css.label}>Title</label>
        <input
          id="title"
          name="title" 
          type="text"
          className={css.input}
          defaultValue={draft.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content" className={css.label}>Content</label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
          rows={8}
          defaultValue={draft.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag" className={css.label}>Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft.tag}
          onChange={handleChange}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
        <button type="button" className={css.cancelButton} onClick={() => { router.back(); }}>
          Cancel
        </button>
      </div>
    </form>
  );
};


