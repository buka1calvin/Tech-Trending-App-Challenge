import React, { ReactNode } from "react";

import NavBar from "@/components/NavBar";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="overflow-x-hidden">
      <NavBar />
      {children}
    </main>
  );
};

export default RootLayout;
