import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteByIdServer } from "@/lib/api/serverApi";
import NotePreviewClient from "./NotePreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetails ({ params }: Props) {
  const { id } = await params;
  const parseId = Number(id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", parseId],
    queryFn: () => fetchNoteByIdServer(parseId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient/>
    </HydrationBoundary>
  );
};
