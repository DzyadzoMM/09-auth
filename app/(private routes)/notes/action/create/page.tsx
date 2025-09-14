import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Create new note",
  description: "Create a new note and save a draft.",
  openGraph: {
      title: "Create new note",
      description: "Create a new note and save a draft.",
      url: "https://08-zustand-virid.vercel.app/notes/action/create",
      siteName: 'Create new note',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
      type: 'article',
    },
};

export default function CreateNote(){
  return (
    <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
    <NoteForm />
  </div>
</main>)
}