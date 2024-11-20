"use server";
import HomeDashboard from "@/components/HomeDashboard";
import Separator from "@/components/Separator";
import Refresh from "./Refresh";

export default async function HomePage({
  searchParams
}: {
  searchParams: { refresh: "true" };
}) {
  return (
    <div className="h-fit w-full flex flex-col relative">
      <Separator h={104} />
      <HomeDashboard />
      <Refresh refresh={!!searchParams.refresh} />
    </div>
  );
}
