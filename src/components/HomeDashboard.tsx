import Image from "next/image";
import NoticeBoard from "./NoticeBoard";
import MessagesBoard from "./MessagesBoard";

export default async function HomeDashboard() {
  return (
    <div className="flex flex-col items-center px-[16px] w-full h-fit pt-[4px]">
      <NoticeBoard />

      <Image
        className={`w-[250px]`}
        src="/back-to-school.png"
        alt="Description of the image"
        width={500}
        height={300}
      />

      <MessagesBoard />

      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
