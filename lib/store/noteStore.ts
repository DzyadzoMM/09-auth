import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

interface DraftState {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteStore {
  draft: DraftState;
  saveDraft: (note: DraftState) => void;
  clearDraft: () => void;
}

const initialDraft = {
  title: '',
  content: '',
  tag: 'Todo' as NoteTag,
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      saveDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft-storage',
      version: 1,
    }
  )
);
