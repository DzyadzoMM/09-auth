'use client';

import React, { useState, useEffect } from 'react';
import { PiFloppyDiskFill } from 'react-icons/pi';
import { useNoteStore } from '@/lib/store/noteStore';
import css from './NoteForm.module.css';
import { useRouter } from 'next/navigation';
import { createNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import type { NoteTag } from "../../types/note";

interface NoteFormProps {
  onCancel?: () => void;
}

interface FormData {
  title: string;
  content: string;
  tag: NoteTag;
}

const initialFormState: FormData = {
  title: '',
  content: '',
  tag: 'Todo',
};

export default function NoteForm({ onCancel }: NoteFormProps) {
  const router = useRouter();
  const draft = useNoteStore(state => state.draft);
  const saveDraft = useNoteStore(state => state.saveDraft);
  const clearDraft = useNoteStore(state => state.clearDraft);

  const queryClient = useQueryClient();
  const mutation = useMutation<Note, Error, FormData>({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.back();
    },
  });
  useEffect(() => {
    if (draft) {
    }
  }, [draft]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    saveDraft({ ...draft, [name]: value as string | NoteTag });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(draft);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Title
        <input
          className={css.input}
          type="text"
          name="title"
          placeholder="Title"
          required
          value={draft.title}
          onChange={handleInputChange}
        />
      </label>
      <label className={css.label}>
        Content
        <textarea
          className={css.textarea}
          name="content"
          placeholder="Your note..."
          rows={10}
          required
          value={draft.content}
          onChange={handleInputChange}
        ></textarea>
      </label>
      <label className={css.label}>
        Tag
        <select
          className={css.select}
          name="tag"
          value={draft.tag}
          onChange={handleInputChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>

      {mutation.isError && (
          <div className={css.error}>{(mutation.error as Error).message}</div>
      )}

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button 
          type="submit" 
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
