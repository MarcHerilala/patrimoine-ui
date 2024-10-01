// app/dashboard/page.tsx

import Image from "next/image";
import * as React from "react";

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
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">Détails du Patrimoine</h1>
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-transparent text-left">
                  <th className="px-4 py-2 text-gray-800">Propriété</th>
                  <th className="px-4 py-2 text-gray-800">Détails</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 text-gray-800 bg-transparent">Nom:</td>
                  <td className="border px-4 py-2 text-gray-800 bg-transparent font-medium">{patrimony.nom}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-gray-800 bg-transparent">Date:</td>
                  <td className="border px-4 py-2 text-gray-800 bg-transparent font-medium">{patrimony.t}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-gray-800 bg-transparent">Valeur Comptable:</td>
                  <td className="border px-4 py-2 text-gray-800 bg-transparent font-medium">{patrimony.valeurComptable}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section for Patrimony Evolution */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">Évolution du Patrimoine</h1>
          <div className="grid grid-cols-2 gap-6">
            <div className="border border-gray-300 rounded-lg p-4">
              <label className="text-gray-600 mb-2 block">Date de début</label>
              <input type="date" className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="border border-gray-300 rounded-lg p-4">
              <label className="text-gray-600 mb-2 block">Date de fin</label>
              <input type="date" className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>
          <div className="mt-6">
            <Image 
            src=" https://hcwq374pyj.execute-api.eu-west-3.amazonaws.com/Prod/patrimoines/test/graphe?email=marc@gmail.com&debut=2024-08-19&fin=2024-10-30"
             className="w-full h-auto rounded-md shadow-lg"
             width={800}
             height={400}
             alt="Patrimony graph" />
             
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching patrimony:", error);
    return <div>Failed to load data.</div>;
  }
};

export default DashboardPage;
