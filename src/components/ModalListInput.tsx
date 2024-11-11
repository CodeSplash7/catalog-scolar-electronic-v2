"use client";

import { magra_700 } from "@/fonts";
import { Dialog, Transition } from "@headlessui/react";
import { forwardRef, Fragment, useRef, useState } from "react";

interface ModalListInputProps {
  revertChanges: (() => boolean) | false;
  addItem: (() => Promise<void>) | false;
  saveChanges: (() => boolean) | false;
  deleteAll: (() => void) | false;

  label: string;
  triggerLabel: string;
  children: React.ReactNode;
}

export default function ModalListInput({
  revertChanges,
  addItem,
  saveChanges,
  deleteAll,
  label,
  triggerLabel,
  children
}: ModalListInputProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationDisplayOpen, setIsConfirmationDisplayOpen] =
    useState(false);
  const [confirmationDisplayColor, setConfirmationDisplayColor] = useState("");
  const [confirmationDisplayMessage, setConfirmationDisplayMessage] =
    useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const showConfirmation = async (displayColor: string, message: string) => {
    setConfirmationDisplayColor(displayColor);
    setConfirmationDisplayMessage(message);

    setIsConfirmationDisplayOpen(true);
    await delay(300);
    setIsConfirmationDisplayOpen(false);
  };

  const handleAddItem = async () => {
    if (!addItem) return;
    await addItem();
    await delay(10);

    scrollToBottom();
  };
  const handleSaveChanges = async () => {
    if (!saveChanges) return;
    if (saveChanges()) showConfirmation("#007BFF", "Salvat");
  };

  const handleCancel = async () => {
    if (revertChanges && revertChanges()) showConfirmation("#007BFF", "Anulat");
    await delay(100);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-start w-full overflow-x-hidden">
      <label className="text-lg">{label}:</label>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        type="button"
        className={`text-white bg-[#007bff] px-[16px] py-[8px] rounded-md`}
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
            enter="ease-out duration-250"
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
                  <Transition
                    show={isConfirmationDisplayOpen}
                    as={Fragment}
                    enter="ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in "
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Panel
                      className={`bg-[${confirmationDisplayColor}] w-full h-full absolute z-[20] flex items-center justify-center text-white text-[30px]`}
                    >
                      {confirmationDisplayMessage}
                    </Dialog.Panel>
                  </Transition>

                  <ModalTopBar label={label} closeModal={handleCancel} />
                  <div
                    ref={scrollRef}
                    className={`w-full h-full flex flex-col overflow-y-scroll scroll-smooth px-[16px] py-[32px] gap-[32px]`}
                  >
                    {children}
                  </div>
                  <div
                    className={`w-full h-fit flex flex-wrap justify-between p-[16px] border-t border-slate-500 gap-[4px]`}
                  >
                    {addItem && <AddItemButton handleAddItem={handleAddItem} />}
                    {saveChanges && (
                      <SaveChangesButton
                        handleSaveChanges={handleSaveChanges}
                      />
                    )}
                    {revertChanges && (
                      <RevertChangesButton
                        handleRevertChanges={revertChanges}
                      />
                    )}

                    {addItem && deleteAll && (
                      <DeleteAllButton handleDeleteAll={deleteAll} />
                    )}
                  </div>
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

const AddItemButton = ({ handleAddItem }: { handleAddItem: () => void }) => {
  return (
    <button
      type="button"
      className="w-full bg-[#28A745] h-[48px] text-white rounded-lg px-4 py-2 text-[30px] flex items-center justify-center"
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
  );
};

const RevertChangesButton = ({
  handleRevertChanges
}: {
  handleRevertChanges: () => void;
}) => {
  return (
    <button
      type="button"
      className="w-fit bg-[#FF6B6B] h-[48px] text-white rounded-lg px-4 py-2 text-[30px] flex items-center justify-center"
      onClick={async () => {
        await handleRevertChanges();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="white"
      >
        <path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z" />
      </svg>
    </button>
  );
};

const SaveChangesButton = ({
  handleSaveChanges
}: {
  handleSaveChanges: () => void;
}) => {
  return (
    <button
      type="button"
      className="w-full bg-[#007BFF] h-[48px] text-white rounded-lg px-4 py-2 text-[30px] flex items-center justify-center"
      onClick={async () => {
        await handleSaveChanges();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="white"
      >
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
      </svg>
    </button>
  );
};

export const DeleteAllButton = ({
  handleDeleteAll
}: {
  handleDeleteAll: () => void;
}) => {
  return (
    <button
      type="button"
      className="w-fit  bg-[#B22222] h-[48px] text-white rounded-lg px-4 py-2 text-[30px] flex items-center justify-center"
      onClick={handleDeleteAll}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#e8eaed"
      >
        <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
      </svg>
    </button>
  );
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
