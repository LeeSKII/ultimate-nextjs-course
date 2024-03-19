import Link from "next/link";
import { AiFillBug } from "react-icons/ai";

export default function NavBar() {
  const navLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <div className="flex space-x-6 h-14 p-5 border-b mb-5 items-center">
      <div>
        <AiFillBug />
      </div>
      <nav>
        <ul className="flex space-x-6">
          {navLinks.map((link) => {
            return (
              <li key={link.href}>
                <Link
                  className={`text-zinc-500 hover:text-zinc-800 transition-colors`}
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
