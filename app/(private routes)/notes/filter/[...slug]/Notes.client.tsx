'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import { NotesResponse } from '@/lib/api/clientApi';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import css from './NotesPage.module.css';
import Link from "next/link";

interface NotesClientProps {
  initialQuery: string;
  initialPage: number;
  initialData: NotesResponse | undefined;
  tag?: string;
}

export default function NotesClient({ initialQuery, initialPage, initialData, tag }: NotesClientProps) {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialQuery);
  const [debouncedSearch] = useDebounce(search, 300);

  const trimmedSearch = debouncedSearch.trim();
  const isFirstLoad = page === 1 && trimmedSearch === '' && !tag;
  
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['notes', page, trimmedSearch, tag],
    queryFn: () => fetchNotes(trimmedSearch, page, tag),
    placeholderData: keepPreviousData,
     ...(isFirstLoad ? { initialData } : {}),
    staleTime: 60 * 1000,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox 
          value = {search} 
          onChange={(value: string) => {
            setSearch(value); 
            setPage(1);
            }} 
        />

        {!!data?.totalPages && data.totalPages > 1 && (
          <Pagination
            page={page}
            pageCount={data.totalPages}
            onPageChange={setPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error loading notes.</p>}
      
      {Array.isArray(data?.notes) && data.notes.length > 0 && (
        <NoteList notes={data.notes} />)
      }
    </div>
  );
}
