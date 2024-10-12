"use client";
import Image from "next/image";
import * as React from "react";
import PatrimonyDetails from "@/components/patrimony/patrimony-details";
import PatrimonyEvolutoin from "@/components/patrimony/patrimony-evolution";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { url } from "@/lib/api-url";
const DashboardPage = () => {
  const { data: session, status } = useSession();
  const [patrimony, setPatrimony] = useState({
    nom: "",
    t: "",
    valeurComptable:0
  });
  const [date,setDate]=useState(new Date().toISOString().split('T')[0]);

  
  const [error, setError] = useState("");

  const handleDateChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setDate(e.target.value)
  }

  useEffect(() => {
    // Fonction pour récupérer les données
    const fetchData = async () => {
      if (!session?.user?.email) return; 
     

      try {
        const response = await fetch(`${url}/patrimoines/patrimoine?email=${session?.user?.email}&date=${date}`, { cache: 'no-store' });
        console.log("you can se below the session user",session?.user?.email) ;
        
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPatrimony(data); // Stocke les données dans l'état local
      } catch (error) {
        console.error("Error fetching patrimony:", error);
        setError("Failed to load data.");
      }
    };

    fetchData();
  }, [session,date]); // Dépend de session et de url

  // Affiche un message de chargement ou d'erreur
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Assurez-vous que patrimony n'est pas nul avant de tenter d'accéder à ses propriétés
  if (!patrimony) {
    return <div>No patrimony data available.</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <div className="flex flex-col gap-1 w-40 bg-white border rounded-sm p-2">
        <input type="date"  className="bg-transparent" onChange={handleDateChange}/>
      </div>
      {/* Section for Patrimony Details */}
      <PatrimonyDetails 
        nom={patrimony.nom} 
        t={patrimony.t} 
        valeurComptable={patrimony.valeurComptable} 
      />

      {/* Section for Patrimony Evolution */}
      <PatrimonyEvolutoin 
        name="test" 
        debut="2020-01-01" 
        fin="2023-04-12" 
      />
    </div>
  );
};

export default DashboardPage;
