"use server";
import options from "@/app/api/auth/[...nextauth]/options";
import HomeDashboard from "@/components/HomeDashboard";
import Separator from "@/components/Separator";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  console.log(await getServerSession(options));
  return (
    <div className="h-fit w-full flex flex-col relative">
      <Separator h={104} />
      <HomeDashboard />
    </div>
  );
}
