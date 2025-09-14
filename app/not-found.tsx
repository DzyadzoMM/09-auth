import css from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
  description: "Not Found",
  openGraph: {
      title: "Not Found",
      description: "Not Found",
      url: "https://08-zustand-virid.vercel.app/",
      siteName: 'NoteHub',
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

export default function NotFound(){
  return(
    <>
      <h1 className={css.title}>404 - Page not found</h1>
    <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </>
    )
}