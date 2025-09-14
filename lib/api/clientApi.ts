import { RegisterRequest, User, LoginRequest } from '@/types/user';
import type { Note } from '@/types/note';
import { nextServer } from './api';



interface FetchResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(page: number = 1, search: string = "", perPage: number = 12, tag?: string): Promise<FetchResponse> {
  const response = await nextServer.get<FetchResponse>('/notes',
    { params: { page, search, perPage, tag }, })
  return response.data;
}

export async function createNote(note: { title: string; content: string; tag: string }): Promise<Note> {
  const response = await nextServer.post<Note>('/notes', note);
  return response.data;
}


export async function deleteNote(id: string): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
}

export const fetchNoteById = async (id: string) => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};


export type UpdateUserRequest = {
    username?: string;
  };
  
  export const updateMe = async (payload: UpdateUserRequest) => {
    const res = await nextServer.patch<User>('/users/me', payload);
    return res.data;
  };
  

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};