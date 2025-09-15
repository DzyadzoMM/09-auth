import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";
import { Metadata } from "next";


type Props = {
    params: Promise<{ slug: string[] }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "All" ? "All notes" : (slug[0] as NoteTag);
  return {
    title: `${tag}`,
    description: `${tag} notes`,
    openGraph: {
      title: `${tag}`,
      description: `${tag} notes`,
      url: `https://08-zustand-ten-mu.vercel.app/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Note Hub Foto",
        },
      ],
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