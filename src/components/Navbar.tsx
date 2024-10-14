import Logo from "./Logo";
import LinksMenu from "@/components/LinksMenu";

export default async function Navbar() {
  return (
    <div
      className={`flex justify-between items-center w-full h-[55px] bg-white px-[16px]`}
    >
      <Logo w={25} horizontal />
      <LinksMenu />
    </div>
  );
}
