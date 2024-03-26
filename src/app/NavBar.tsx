"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

export default function NavBar() {
  const pathname = usePathname();
  const navLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <div className="flex h-14 md:px-6 px-3  gap-3 items-center justify-start">
      <div>
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
    </div>
  );
}
