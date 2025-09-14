import { Metadata } from 'next';
import NotesList from "@/components/NotesList";
import { fetchNotes } from "@/lib/api";

type Props = {
  params: { slug?: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = params.slug?.[0];

  if (tag) {
    return {
      title: `Нотатки по тегу: ${tag}`,
    };
  }

  return {
    title: 'Всі нотатки',
  };
}

export default async function NotesPage({ params }: Props) {
  const tag = params.slug?.[0];
  const data = await fetchNotes(tag);

  return (
    <>
      <NotesList initialData={data} tag={tag} />
    </>
  );
}
