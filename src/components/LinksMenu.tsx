"use client";

import { useState } from "react";
import NavLinksModal from "./NavLinksModal";

export default function LinksMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <MenuButton isOpen={isOpen} onClick={() => setIsOpen(true)} />
      <NavLinksModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </div>
  );
}

const MenuButton = ({
  onClick,
  isOpen
}: {
  onClick: () => void;
  isOpen: boolean;
}) => (
  <label
    className={`scale-150 top-[4px] right-[20px] absolute z-[99999999]`}
    onClick={onClick}
  >
    <div
      className={`w-9 h-10 cursor-pointer flex flex-col items-end justify-center`}
    >
      <div
        className={`${
          isOpen ? "w-[50%]" : "w-[45%]"
        } h-[2px] bg-black rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] ${
          !isOpen || "rotate-[-45deg]"
        }`}
      ></div>
      <div
        className={`${
          isOpen ? "w-[0%]" : "w-[50%]"
        } h-[2px] bg-black rounded-md transition-all duration-300 origin-center ${
          !isOpen || "hidden"
        }`}
      ></div>
      <div
        className={`${
          isOpen ? "w-[50%]" : "w-[40%]"
        } h-[2px] bg-black rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] ${
          !isOpen || "rotate-[45deg]"
        }`}
      ></div>
    </div>
  </label>
);
