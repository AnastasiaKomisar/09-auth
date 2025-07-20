'use client';

import nextServer from './api';
import { User, RegisterUserData } from '@/types/user';
import { Note, NewNote } from '@/types/note';
import { toast } from "react-hot-toast";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

interface UpdateUserData {
  username: string;
}

export async function fetchNotes(
  search: string,
  page: number,
  tag: string | undefined
): Promise<NotesResponse | undefined> {
  try {
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
    });
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

export async function createNote({
  title,
  content,
  tag,
}: NewNote): Promise<Note | undefined> {
  try {
    const params: NewNote = {
      title,
      content,
      tag,
    };

    const res = await nextServer.post<Note>("/notes", params);
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

export async function deleteNote(id: string): Promise<Note | undefined> {
  try {
    const res = await nextServer.delete<Note>(`/notes/${id}`);
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
  }
}

export async function fetchNoteById(id: string): Promise<Note | undefined> {
  try {
    const res = await nextServer.get<Note>(`/notes/${id}`);
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

export async function checkSession(): Promise<boolean> {
  try {
    await nextServer.get("/auth/session");
    return true;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

export const getMe = async (): Promise<User> => {
 try {
    const res = await nextServer.get<User>("/users/me");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (data: RegisterUserData): Promise<User> => {
  try {
    const res = await nextServer.post<User>('/auth/register', data);
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
};

export const loginUser = async(data: RegisterUserData): Promise<User> => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logoutUser = async (): Promise<void> => {
    await nextServer.post("/auth/logout");
};

export const editUser = async ({username}: UpdateUserData): Promise<User> => {
 try {
    const res = await nextServer.patch<User>("/users/me", { username });
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
};
