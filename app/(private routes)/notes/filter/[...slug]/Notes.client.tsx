"use client";

import css from "./NotesPage.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import { useState } from "react";
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebounce } from "use-debounce";
import { NoteTag } from "@/types/note";
import Link from 'next/link';
import { PiNotePencil } from 'react-icons/pi';


type NotesClientProps = {
  tag?: NoteTag;
};

export default function NotesClient({tag}: NotesClientProps) {
  const perPage = 12;

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 1000);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () => fetchNotes(page, debouncedSearch, perPage, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {<SearchBox value={search} onChange={handleSearchChange} />}
          
          {isSuccess && data?.totalPages > 1 && <Pagination totalPages={data.totalPages} currentPage={page} onPageChange={setPage} />}
          
          { }
          <Link href="/notes/action/create" className={css.button} aria-label="Create Note">
            <PiNotePencil />
          </Link>
        </header>

        {data && data?.notes.length > 0 && <NoteList notes={data.notes} />}
      </div>
    </>
  );
}
