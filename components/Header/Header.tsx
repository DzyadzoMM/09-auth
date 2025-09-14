import Link from "next/link"
import TagsMenu from "@/components/TagsMenu/TagsMenu"
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation"
import css from "./Header.module.css"


export default function Header() {
    return (<header className={css.header}>
  <Link href="/" aria-label="Home">NoteHub</Link>
  <nav aria-label="Main Navigation">
    <ul className={css.navigation}>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <AuthNavigation />
      </li>
      <li>
        <TagsMenu />
      </li>
    </ul>
  </nav>
</header>
)
}