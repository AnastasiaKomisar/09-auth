'use client';

export default function NoteDetailError({ error }: { error: Error }) {
  return <p>Could not fetch note details. {error.message}</p>;
}
