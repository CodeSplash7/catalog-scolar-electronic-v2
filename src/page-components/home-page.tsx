import HomeDashboard from "@/components/HomeDashboard";
import Navbar from "@/components/Navbar";
import Separator from "@/components/Separator";

export default function HomePage() {
  return (
    <div className="h-fit w-full flex flex-col relative">
      <Navbar />
      <Separator h={104} />
      <HomeDashboard />
    </div>
  );
}
