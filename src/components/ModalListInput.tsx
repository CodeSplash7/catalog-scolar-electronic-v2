"use client";

import { magra_700 } from "@/fonts";
import { Absence, Grade } from "@/types/curriculum-types";
import { Dialog, Transition } from "@headlessui/react";
import { forwardRef, Fragment, useRef, useState } from "react";

interface ModalListInputProps<T> {
  addItem: () => Promise<void>;
  label: string;
  triggerLabel: string;
  children: React.ReactNode;
}

export default function ModalListInput<T extends Grade | Absence>({
  addItem,
  label,
  triggerLabel,
  children
}: ModalListInputProps<T>) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const handleAddItem = async () => {
    await addItem();
    await delay(10);

    scrollToBottom();
  };
  return (
    <div className="flex flex-col items-start w-full ">
      <label className="text-lg">{label}:</label>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        type="button"
        className={`text-blue-500 underline`}
      >
        {triggerLabel}
      </button>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
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

          <div className="fixed inset-0 overflow-y-auto p-[32px]">
            <div className="flex h-full items-center justify-center p-4 text-center w-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="flex flex-col inset-y-0 right-0 w-full h-full transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                  <ModalTopBar
                    label={label}
                    closeModal={() => setIsModalOpen(false)}
                  />
                  <div
                    ref={scrollRef}
                    className={`w-full h-full flex flex-col overflow-y-scroll scroll-smooth px-[16px] py-[32px] gap-[32px]`}
                  >
                    {children}
                  </div>
                  <AddItemButton handleAddItem={handleAddItem} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

const ModalTopBar: React.FC<{ label: string; closeModal: () => void }> = ({
  label,
  closeModal
}) => (
  <div
    onClick={closeModal}
    className={`w-full h-[48px] flex justify-between items-center px-[12px] border-b border-slate-500`}
  >
    <div className={`${magra_700.className} `}>{label}</div>
    <div
      className={`w-9 h-10 cursor-pointer flex flex-col items-end justify-center`}
    >
      <div
        className={`w-[50%] rotate-[-45deg] h-[2px] bg-black rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem]`}
      ></div>

      <div
        className={`w-[50%] rotate-[45deg] h-[2px] bg-black rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem]`}
      ></div>
    </div>
  </div>
);

const AddItemButton = forwardRef(
  ({ handleAddItem }: { handleAddItem: () => void }) => {
    return (
      <div
        className={`w-full h-[96px] flex justify-end items-center px-[12px] border-t border-slate-500`}
      >
        <button
          type="button"
          className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 mt-2 text-[30px] flex items-center justify-center"
          onClick={async () => {
            await handleAddItem();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="30px"
            fill="white"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        </button>
      </div>
    );
  }
);

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
