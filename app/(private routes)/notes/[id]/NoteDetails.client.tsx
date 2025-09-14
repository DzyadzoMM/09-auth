
"use client";
import css from "./NoteDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { notFound } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
export default function NoteDetailsClient({ id }: { id: string }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
  }

  if (isLoading) {
    return <p style={{ display: "flex", justifyContent: "center" }}>Loading, please wait...</p>;
  }
  if (error) {
    if (error.response?.status === 404) {
      notFound();
    }
    return <p style={{ display: "flex", justifyContent: "center" }}>Something went wrong.</p>;
  }
  
  if (!note) {
    return null;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}
