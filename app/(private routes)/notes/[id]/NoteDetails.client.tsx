"use client";

import css from "./NoteDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { notFound } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { AxiosError } from 'axios';

export default function NoteDetailsClient({ id }: { id: string }) {
  const isAuth = useAuthStore((state) => state.isAuth);

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: isAuth,
  });

  if (!isAuth) {
    // Тут може бути логіка для неавторизованих користувачів
    // Наприклад, редірект на сторінку входу
  }

  if (isLoading) {
    return <p style={{ display: "flex", justifyContent: "center" }}>Loading, please wait...</p>;
  }
  
  if (error) {
    // Тут перевіряємо, чи є помилка з HTTP-статусом 404
    // Якщо так, викликаємо notFound(), щоб показати сторінку 404
    if (error as AxiosError.response?.status === 404) {
      notFound();
    }
    return <p style={{ display: "flex", justifyContent: "center" }}>Something went wrong.</p>;
  }

  if (!note) {
    // Якщо нотатка не знайдена, але без помилки 404, повертаємо null
    // щоб Next.js не показував порожній контент
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
