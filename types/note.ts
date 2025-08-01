export type NoteTag = 'All' | 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';


export interface Note {
    id: number;
    title: string;
    content: string;
    tag: NoteTag;
    createdAt: string;
    updatedAt: string;
}

export interface NewNote {
  title: string;
  content?: string;
  tag: NoteTag;
}
