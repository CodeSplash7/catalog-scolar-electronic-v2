import Link from "next/link";
import Logo from "./Logo";
import { useState } from "react";

export default function NavLinks({ closeModal }: { closeModal: () => void }) {
  const links = [
    { href: "/", label: "ACASĂ" },
    { href: "/catalogul-meu", label: "CATALOGUL MEU" },
    { href: "", label: "ORAR" },
    { href: "", label: "TEME" },
    { href: "", label: "MESAGERIE", isLast: true }
  ];

  const currentPath = window.location.pathname;
  const [newPath, setNewPath] = useState<string>();
  const correctPath = newPath || currentPath;
  return (
    <>
      <div>
        <Logo w={25} horizontal />
        <br />
        <br />
      </div>
      <div className={`flex flex-col`}>
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            onClick={() => {
              setNewPath(link.href);
              closeModal();
            }}
            className={`active:text-[#e94e4c] transition duration-150 [font-family:open-sans,sans-serif] text-[#181921] text-[13px] border-t py-[12px] ${
              link.isLast ? "border-y" : ""
            } ${correctPath === link.href ? "text-[#e94e4c]" : ""}`} // Change text color if current page
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
