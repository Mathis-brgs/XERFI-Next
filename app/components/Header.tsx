"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
  { name: "Abonnes", href: "/abonnes" },
  { name: "Panier", href: "/panier" },
];

const Header = () => {
  const pathName = usePathname();
  console.log("Current path:", pathName);

  return (
    <ul>
      {navLinks.map((link) => {
        const isActive =
          link.href === "/" ? pathName === "/" : pathName.startsWith(link.href);

        return (
          <li key={link.name} className="inline-block mr-4">
            <Link
              href={link.href}
              className={`text-lg font-semibold ${
                isActive ? "text-blue-200" : "text-gray-800"
              }`}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Header;
