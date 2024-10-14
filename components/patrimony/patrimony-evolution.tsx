import Image from "next/image"
import React, { useState } from "react"

import { useSession } from "next-auth/react";

const PatrimonyEvolution=()=>{
  const [dateInterval, setDateInterval] = useState({
    begin: "", // Date de début vide au départ
    end: "",   // Date de fin vide au départ
  });

  const {data:session}=useSession()

      const onBeginDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateInterval((prevState) => ({
          ...prevState,
          begin: e.target.value, 
        }));
      }

        const onEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setDateInterval((prevState) => ({
            ...prevState,
            end: e.target.value, 
          }));
        };
        console.log("niova begin:",dateInterval.begin,"end:",dateInterval.end);
        
        
    return(
        <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-4 text-[#0E0F2F]">Évolution du Patrimoine</h1>
        <div className="grid grid-cols-2 gap-6">
          <div className="border border-gray-300 rounded-lg p-4">
            <label className="text-gray-600 mb-2 block">Date de début</label>
            <input type="date" className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" 
              onChange={onBeginDateChange}
            />
          </div>
          <div className="border border-gray-300 rounded-lg p-4">
            <label className="text-gray-600 mb-2 block">Date de fin</label>
            <input type="date" className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            onChange={onEndDateChange}
            />
          </div>
        </div>
        <div className="mt-6">
          <Image 
          src={`https://hcwq374pyj.execute-api.eu-west-3.amazonaws.com/Prod/patrimoines/patrimoine/graphe?email=${session?.user?.email}&debut=${dateInterval.begin}&fin=${dateInterval.end}`}
           className="w-full h-auto rounded-md shadow-lg"
           width={800}
           height={400}
           alt="Patrimony graph" />
           
        </div>
      </div>
    )

}

export default PatrimonyEvolution