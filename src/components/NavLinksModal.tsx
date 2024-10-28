"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import NavLinks from "./NavLinks";

export default function NavLinksModal({
  isOpen,
  closeModal
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <div
          onClick={closeModal}
          className="absolute w-[35%] h-screen top-0 left-0 z-[99999999999]"
        ></div>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-opacity-50 bg-black backdrop-blur-md"></div>
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-x-full"
                enterTo="opacity-100 translate-x-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-full"
              >
                <Dialog.Panel className="flex flex-col fixed inset-y-0 right-0 w-[65%] h-screen transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <NavLinks closeModal={closeModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
