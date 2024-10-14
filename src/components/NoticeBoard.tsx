import { magra_700 } from "@/fonts";

export default async function NoticeBoard() {
  const notices = [
    {
      title: "An școlar 2024-2025",
      date: "10 Septembrie 2024",
      user: "Super User",
      message: "Mult success în noul an școlar!..."
    },
    {
      title: "Anunt",
      date: "20 Iulie 2023",
      user: "Super User",
      message: "Bine ați venit în noul an școlar!..."
    }
  ];

  return (
    <div className="w-full">
      <div
        className={`w-full text-start ${magra_700.className} text-[#182921] text-[40px] font-bold`}
      >
        Avizier
      </div>
      <br />
      {notices.map((notice, index) => (
        <div
          key={index}
          className={`w-full text-start flex flex-col gap-[8px]`}
        >
          <div className={` text-[20px] ${magra_700.className} font-bold`}>
            {notice.title}
          </div>
          <div
            className={`text-[#888888] text-[13px] font-semibold tracking-wide flex gap-[8px]`}
          >
            <span>{notice.date}</span>
            <span>{notice.user}</span>
          </div>
          <div className={`text-[#454545] text-[15px] font-medium`}>
            {notice.message}
          </div>
          <br />
        </div>
      ))}
    </div>
  );
}
