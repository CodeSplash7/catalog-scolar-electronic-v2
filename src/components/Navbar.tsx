import Logo from "./Logo";

export default async function Navbar() {
  return (
    <div
      className={`flex justify-between items-center w-full h-[55px] bg-[#f4f4f4] px-[16px]`}
    >
      <Logo w={25} horizontal />
    </div>
  );
}
