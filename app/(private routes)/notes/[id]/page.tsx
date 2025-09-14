import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export const metadata: Metadata = {
  title: "Нотатка",
};

export default function NoteDetails({ params }: Props) {
  return <NoteDetailsClient id={params.id} />;
}
