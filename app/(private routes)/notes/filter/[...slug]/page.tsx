import type { Metadata } from 'next';
import { QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props):Promise<Metadata> {
  const { slug } = params;
  const tag = slug[0] === "All" ? undefined : (slug[0] as NoteTag);
  
  if (tag===undefined) {
    return {
      title: 'All Notes',
      description: 'All categories selected',
    };
  }
  return{
    title: `${tag}`,
    description: `The ${tag} note category is selected.`,
    openGraph: {
      title: `${tag}`,
      description:`The ${tag} note category is selected.`,
      url: "https://08-zustand-virid.vercel.app/",
      siteName: `${tag}`,
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
  }
}

export default async function Notes({ params }: Props) {
  const { slug } = await params;
  const queryClient = new QueryClient();
  const tag = slug[0] === "All" ? undefined : (slug[0] as NoteTag);

    await queryClient.prefetchQuery({
      queryKey:  ["notes", { page: 1, search: "", perPage: 12, tag }],
      queryFn: () => fetchNotes(1, "", 12, tag),
        
      });
    
      return (
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NotesClient tag = {tag} />
        </HydrationBoundary>
    );
    
    
}