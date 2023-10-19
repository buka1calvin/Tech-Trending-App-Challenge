"use client";
import ReusableModal from "@/components/ui/Model";
import { Button } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [openModel, setOpenModel] = useState(false);
  const handleOpenModel = () => setOpenModel(true);
  const handleCloseModel = () => setOpenModel(false);
  return (
    <main className="bg-[#EFEFEF] w-screen h-screen flex justify-center items-center">
      <Button
        onClick={handleOpenModel}
        variant="contained"
        className="bg-[#8D57FA] rounded-lg text-white text-base font-medium md:w-[300px] md:h-[44px]"
      >
        Let's Get Started
      </Button>
      <ReusableModal
        open={openModel}
        handleClose={handleCloseModel}
        username="Jane Doe"
      />
    </main>
  );
}
