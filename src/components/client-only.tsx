import dynamic from "next/dynamic";
import { ReactNode } from "react";

export const ClientOnly = dynamic(
  () => Promise.resolve(({ children }: { children: ReactNode }) => children),
  {
    ssr: false,
  }
);
