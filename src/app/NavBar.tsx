"use client";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";

export default function NavBar() {
  const pathname = usePathname();
  const navLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <div className="flex h-14 md:px-6 px-3 border-b md:mb-5 items-center justify-between">
      <div className="hidden md:block">
        <AiFillBug />
      </div>
      <nav>
        <ul className="flex space-x-6">
          {navLinks.map((link) => {
            return (
              <li key={link.href}>
                <Link
                  className={classNames({
                    "text-zinc-900": pathname === link.href,
                    "text-zinc-500": pathname !== link.href,
                    "hover:text-zinc-800 transition-colors": true,
                  })}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="hidden md:block">user info</div>
    </div>
  );
}
