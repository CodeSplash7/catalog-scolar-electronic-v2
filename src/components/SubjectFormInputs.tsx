"use client";

// fonts
import { open_sans_400 } from "@/fonts";
// types
import { Activity } from "@/types/curriculum-types";
import { FC } from "react";
// hooks
import { useRouter } from "next/navigation";
// components
import NumberInput from "./NumberInput";
import { DeleteAllButton } from "./ModalListInput";

export const FormSubmitDelete: React.FC<{
  submitForm: () => void;
  deleteSubject?: () => void;
}> = ({ submitForm, deleteSubject }) => {
  const router = useRouter();

  return (
    <div className={`w-full flex flex-col items-start gap-[24px]`}>
      <div className={`w-full flex flex-row gap-[8px]`}>
        <button
          onClick={(e) => {
            e.preventDefault();
            submitForm();
          }}
          type="submit"
          className="bg-green-500 flex justify-center items-center text-white rounded-lg px-6 py-3 mt-4 text-lg font-semibold hover:bg-green-600 focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out w-full"
        >
          <SaveIcon />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            router.push("/catalogul-meu");
          }}
          type="submit"
          className="bg-red-500 flex justify-center items-center text-white rounded-lg px-6 py-3 mt-4 text-lg font-semibold hover:bg-red-600 focus:ring-4 focus:ring-red-300 transition-all duration-300 ease-in-out w-full"
        >
          <CancelIcon />
        </button>
      </div>
      {deleteSubject && <DeleteAllButton handleDeleteAll={deleteSubject} />}
    </div>
  );
};

export const SubjectNameInput: FC<{
  subjectName: string;
  setSubjectName: (name: string) => void;
}> = ({ subjectName, setSubjectName }) => (
  <div className="flex flex-col items-start gap-0 w-full">
    <label className={`text-lg ${open_sans_400.className} leading-5`}>
      Denumirea materiei:
    </label>
    <input
      type="text"
      className={`bg-slate-200 p-2 text-lg w-full`}
      value={subjectName}
      placeholder="Denumirea..."
      onChange={(e) => setSubjectName(e.target.value)}
    />
  </div>
);

export const ActivityInput: FC<{
  activity: Activity;
  setActivity: (activity: Activity) => void;
}> = ({ activity, setActivity }) => (
  <div className={`w-full h-fit flex flex-col gap-[8px]`}>
    <label className="text-lg">Activitatea:</label>
    <div className={`w-full grid grid-cols-[64px_128px] grid-rows-2 h-[96px]`}>
      <LikeIcon />
      <NumberInput
        number={activity.good}
        setNumber={(n) => setActivity({ ...activity, good: n })}
      />
      <DislikeIcon />
      <NumberInput
        number={activity.bad}
        setNumber={(n) => setActivity({ ...activity, bad: n })}
      />
    </div>
  </div>
);

export const ConduitInput: React.FC<{
  conduit: number;
  setConduit: (conduit: number) => void;
}> = ({ conduit, setConduit }) => (
  <div className={`w-full flex flex-col items-start gap-[16px]`}>
    <label className="text-lg">Conduită</label>
    <NumberInput max={10} number={conduit} setNumber={setConduit} />
  </div>
);

const LikeIcon = () => (
  <div className="flex items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#2e6b62"
    >
      <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" />
    </svg>
  </div>
);

const DislikeIcon = () => (
  <div className="flex items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#ac2400"
    >
      <path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z" />
    </svg>
  </div>
);

const SaveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="32px"
    viewBox="0 -960 960 960"
    width="32px"
    fill="white"
  >
    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
  </svg>
);

const CancelIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="32px"
    viewBox="0 -960 960 960"
    width="32px"
    fill="white"
  >
    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
  </svg>
);
