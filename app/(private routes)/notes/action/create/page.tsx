import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css"; 
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create note | NoteHub",
  description: "Create a new note in NoteHub",
  openGraph: {
    title: "Create note | NoteHub",
    description: "Create a new note in NoteHub",
    url: "https://08-zustand-xi.vercel.app/notes/action/create",
    images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub styling card',
        },
      ],
  },
};



export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm/>
      </div>
    </main>
  );
}