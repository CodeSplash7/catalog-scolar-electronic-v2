"use server";
import HomeDashboard from "@/components/HomeDashboard";
import Separator from "@/components/Separator";

export default async function HomePage() {
  return (
    <div className="h-fit w-full flex flex-col relative">
      <Separator h={104} />
      <HomeDashboard />
    </div>
  );
}
