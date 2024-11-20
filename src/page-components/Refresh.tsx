"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Refresh({ refresh }: { refresh: boolean }) {
  const [refreshed, setRefreshed] = useState(!refresh);
  const router = useRouter();
  if (!refreshed) {
    router.refresh();
    setRefreshed(true);
  }
  return <></>;
}
