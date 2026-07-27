"use client";

import dynamic from "next/dynamic";
import type { MapDisplayInnerProps } from "./MapDisplayInner";

const MapComponent = dynamic<MapDisplayInnerProps>(
  () => import("./MapDisplayInner"),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 w-full bg-stone-100 rounded-2xl animate-pulse flex items-center justify-center text-xs text-stone-400 font-semibold">
        Loading property location...
      </div>
    ),
  }
);

export default function DynamicMapDisplay({ lat, lng }: MapDisplayInnerProps) {
  return <MapComponent lat={lat} lng={lng} />;
}