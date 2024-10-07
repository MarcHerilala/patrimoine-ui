// app/dashboard/page.tsx

import Image from "next/image";
import * as React from "react";
import PatrimonyDetails from "@/components/patrimony/patrimony-details";
import PatrimonyEvolutoin from "@/components/patrimony/patrimony-evolution";

// Fetching data directly in the component (since this is a server-side component)
const DashboardPage = async () => {
  const url = process.env.API_URL;

  try {
    const response = await fetch(`${url}/patrimoines/test?email=marc@gmail.com`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const patrimony = await response.json();

    return (
      <div className="p-6 space-y-6 bg-gray-50">
        {/* Section for Patrimony Details */}
          <PatrimonyDetails nom={patrimony.nom} t={patrimony.t} valeurComptable={patrimony.valeurComptable}/>

        {/* Section for Patrimony Evolution */}
          <PatrimonyEvolutoin name="test" debut="2020-01-01" fin="2023-04-12"/>
       
      </div>
    );
  } catch (error) {
    console.error("Error fetching patrimony:", error);
    return <div>Failed to load data.</div>;
  }
};

export default DashboardPage;
