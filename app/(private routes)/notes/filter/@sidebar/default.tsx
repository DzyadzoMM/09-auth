import css from "./SidebarNotes.module.css";
import { NoteTag } from "@/types/note";
import Link from "next/link";

const tags: NoteTag[] = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

export default function NotesSidebar() {
  return (
    <div className={css.menuContainer}>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/All`} className={css.menuLink}>
            All Notes
          </Link>
        </li>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};