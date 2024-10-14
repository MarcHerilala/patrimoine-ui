"use client";
import Image from "next/image";
import * as React from "react";
import PatrimonyDetails from "@/components/patrimony/patrimony-details";
import PatrimonyEvolution from "@/components/patrimony/patrimony-evolution";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { url } from "@/lib/api-url";
const DashboardPage = () => {
 

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Section for Patrimony Details */}
      <PatrimonyDetails/>

      {/* Section for Patrimony Evolution */}
      <PatrimonyEvolution />
    </div>
  );
};

export default DashboardPage;
