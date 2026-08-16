import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="sidebar">

      <Link href="/dashboard" className="sidebar-logo">
        <img
          src="https://api.iconify.design/carbon:id-management.svg"
          alt="CoTask"
        />
        <span>CoTask</span>
      </Link>

      <nav className="sidebar-nav">

        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/projects">
          Projects
        </Link>

        <Link href="/tasks">
          Tasks
        </Link>

        <Link href="/team">
          Team
        </Link>

      </nav>

      <div className="sidebar-bottom">

        <Link href="/settings">
          Settings
        </Link>

        <button>
          Log out
        </button>

      </div>

    </aside>
  );
}