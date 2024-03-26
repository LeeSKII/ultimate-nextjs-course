import React from "react";
import NavBar from "@/app/NavBar";
import SignButton from "@/app/SignButton";

export default function Header() {
  return (
    <div className="border-b flex justify-between items-center">
      <NavBar />
      <SignButton />
    </div>
  );
}
