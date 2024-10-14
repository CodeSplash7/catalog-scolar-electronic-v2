import { magra_700 } from "@/fonts";

export default async function MessagesBoard() {
  const readMessages = 0;
  const unreadMessages = 0;
  return (
    <div className={`w-full h-fit flex flex-col p-[20px]`}>
      <div
        className={`${magra_700.className} font-bold text-[20px] text-[#ED1818]`}
      >
        VERIFICĂ MESAJE
      </div>
      <div className={"flex flex-col w-full"}>
        <div
          className={`border flex items-center justify-between px-[16px] py-[8px]`}
        >
          <div className={`flex gap-[4px] items-center`}>
            <ReadMessagesIcon w={20} />
            <div className={`text-[15px] font-bold text-[#181921]`}>Citite</div>
          </div>
          <div
            className={`flex items-center justify-center font-bold text-[11.25px] px-[8px] h-[20px] text-white bg-[#e94e4c] rounded-full`}
          >
            {readMessages}
          </div>
        </div>
      </div>
      <div className={"flex flex-col w-full"}>
        <div
          className={`border flex items-center justify-between px-[16px] py-[8px]`}
        >
          <div className={`flex gap-[4px] items-center`}>
            <UnreadMessagesIcon w={20} />
            <div className={`text-[15px] font-bold text-[#181921]`}>
              Necitite
            </div>
          </div>
          <div
            className={`flex items-center justify-center font-bold text-[11.25px] px-[8px] h-[20px] text-white bg-[#e94e4c] rounded-full`}
          >
            {unreadMessages}
          </div>
        </div>
      </div>
    </div>
  );
}

const ReadMessagesIcon = ({ w }: { w: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width={`${w}px`}
    fill="#181921"
  >
    <path d="m480-920 362 216q18 11 28 30t10 40v434q0 33-23.5 56.5T800-120H160q-33 0-56.5-23.5T80-200v-434q0-21 10-40t28-30l362-216Zm0 466 312-186-312-186-312 186 312 186Zm0 94L160-552v352h640v-352L480-360Zm0 160h320-640 320Z" />
  </svg>
);

const UnreadMessagesIcon = ({ w }: { w: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width={`${w}px`}
    fill="#181921"
  >
    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
  </svg>
);
