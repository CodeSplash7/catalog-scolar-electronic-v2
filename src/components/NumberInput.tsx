"use client";
export default function NumberInput({
  number,
  setNumber,
  max = null,
  min = 0
}: {
  number: number;
  setNumber: (newNumber: number) => void;
  max?: number | null;
  min?: number;
}) {
  return (
    <div className={`w-full flex items-center`}>
      <button
        type="button"
        className="bg-slate-500 text-white rounded-full w-[32px] h-[32px] flex items-center justify-center"
        onClick={() => {
          if (number > min) setNumber(number - 1);
        }}
      >
        -
      </button>
      <div className="p-2 w-[3rem] text-center">{number}</div>
      <button
        type="button"
        className="bg-slate-500 text-white rounded-full w-[32px] h-[32px] flex items-center justify-center"
        onClick={() => {
          if (!max || number < max) setNumber(number + 1);
        }}
      >
        +
      </button>
    </div>
  );
}
