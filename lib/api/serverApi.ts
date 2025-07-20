import nextServer from './api';
import { NotesParams, NotesResponse } from "./clientApi";
import { Note } from "@/types/note";
import { cookies } from 'next/headers';
import type { User } from '@/types/user';

export async function fetchNotesServer(
  search: string,
  page: number,
  tag: string | undefined 
): Promise<NotesResponse | undefined> {
  try {
    const cookieStore = await cookies();
    const perPage = 12;
    const params: NotesParams = {
      tag,
      page,
      perPage,
    };

    if (search?.trim()) {
      params.search = search;
    }
    if (tag?.trim()) {
      params.tag = tag;
    }

    const res = await nextServer.get<NotesResponse>("/notes", {
      params,
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchNoteByIdServer(noteId: string): Promise<Note | undefined> {
  try {
    const cookieStore = await cookies();
    const res = await nextServer.get<Note>(`notes/${noteId}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getSession() {
    try {
    const cookieStore = await cookies();
    const res = await nextServer.get("/auth/session", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export async function getMeServer(): Promise<User> {
    try {
    const cookieStore = await cookies();
    const res = await nextServer.get("/users/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
