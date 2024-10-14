import Link from "next/link";
import Logo from "./Logo";

export default function NavLinks() {
  const links = [
    { href: "", label: "ACASĂ" },
    { href: "", label: "CATALOGUL MEU" },
    { href: "", label: "ORAR" },
    { href: "", label: "TEME" },
    { href: "", label: "MESAGERIE", isLast: true }
  ];
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
            className={`active:text-[#e94e4c] transition duration-150 [font-family:open-sans,sans-serif] text-[#181921] text-[13px] border-t py-[12px] ${
              link.isLast ? "border-y" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
