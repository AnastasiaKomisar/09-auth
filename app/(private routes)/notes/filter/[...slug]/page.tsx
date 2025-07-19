import NotesClient from "./Notes.client";
import { fetchNotesServer } from "@/lib/api/serverApi";
import { Metadata } from 'next';

type FilteredNotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: FilteredNotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] ?? 'All';

  return {
    title: `Notes sorted by '${tag}' category`,
    description: `This page include all your notes in '${tag}' category`,
    openGraph: {
      title: `Notes sorted by '${tag}' category`,
      description: `This page includes all your notes in the '${tag}' category`,
      url: `https://08-zustand.vercel-xi.app/notes/filter/${tag}`,
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
}

export default async function FilteredNotesPage({params}: FilteredNotesPageProps) {
  const initialQuery = "";
  const initialPage = 1;
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];
  const initialData = await fetchNotesServer(initialQuery, initialPage, tag); 
  return <NotesClient initialQuery={initialQuery}  initialPage={initialPage} initialData={initialData} tag={tag} />;
}
