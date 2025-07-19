import { NewNote } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialDraft: NewNote= {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteStore {
  draft: NewNote;
  setDraft: (note: NewNote) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note: NewNote) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft-storage', 
      partialize: (store) => ({ draft: store.draft }),
    }
  )
);