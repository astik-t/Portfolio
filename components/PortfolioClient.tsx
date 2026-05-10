"use client";

import dynamic from "next/dynamic";

const PortfolioApp = dynamic(() => import("@/components/PortfolioApp").then((mod) => mod.PortfolioApp), {
  ssr: false
});

export default function PortfolioClient() {
  return <PortfolioApp />;
}
