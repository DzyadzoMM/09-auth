"use client";
import css from "./NoteDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'next/navigation';
import { fetchNoteById } from "@/lib/api/clientApi";

export default function NoteDetailsClient() {
    const { id } = useParams<{ id: string }>();

    
  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p style={{display: "flex",  justifyContent: "center"}}>Loading, please wait...</p>;

  if (error || !note) return <p style={{display: "flex",  justifyContent: "center"}}>Something went wrong.</p>;

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
)
}