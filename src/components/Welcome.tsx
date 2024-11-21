import { magra_400, magra_700 } from "@/fonts";

export default async function Welcome({ username }: { username: string }) {
  return (
    <div className={`${magra_400.className} text-[30px] text-blue-600`}>
      BINE AI VENIT!{" "}
      <div className={`${magra_700.className} text-gray-900 w-fit`}>
        {username}
      </div>
    </div>
  );
}
