"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const handleLogout = async () => {
  try {
    const response = await fetch(
      "https://serene-heliotrope-3138a4.netlify.app/api/auth/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (response.ok) {
      router.push("/login");
    }
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

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

       <button onClick={handleLogout}>
  Log out
</button>

      </div>

    </aside>
  );
}
