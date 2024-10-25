"use client";
import { url } from "@/lib/api-url";
import React, { ChangeEvent, useEffect, useState } from "react";
import { DialogBoilerplate } from "@/components/dialog";
import { useSession } from "next-auth/react";

import CreateMoneyForm from "@/components/possessions/argent/create-form";
import { jsonFetcher } from "@/lib/fetch-utls";
import useSWR from "swr";
interface Devise{
    "nom": string,
    "valeurEnAriary": number,
    "t": string,
    "tauxDappréciationAnnuel": number
}
import { Loading } from "@/components/loading";

interface Argent {
    nom: string;
    t:string;
    valeurComptable: number;
    dateOuverture: string;
    devise:Devise;
  
}

const Page: React.FC = () => {
  
    
    const {data:session}=useSession()




   const {data:possessions, error,isLoading}=useSWR<Argent[]>(
         session?.user?.email?`${url}/patrimoines/argents?email=${session?.user?.email}`:
         null,
         jsonFetcher,
         
              {
                onError: (error) => {
                  return (<div>error while fetching data</div>)
                }
                 }
         
    )   
      
    

    return (
<div className="bg-gray-50 h-full">
      
        <div className="mx-4">
            <div className="flex justify-between items-center">
                <div className="font-bold text-[#0E0F2F] text-2xl mt-6">Liste des trésoreries</div>
                <DialogBoilerplate title="" key={"1"} description=""  triggerText="+ ajouter">
                    <CreateMoneyForm/>
                </DialogBoilerplate >
            </div>
            <div className="w-full space-y-4 mt-10">
            {isLoading ? ( // Affiche le message de chargement
                        <Loading />
                    ) : possessions?.length === 0 ? ( // Affiche le message si pas de données
                        <div className="text-center">Pas de trésoreries disponibles.</div>
                    ) : (
                        possessions?.map((possession, index) => (
                            <PossessionItem possession={possession} key={index} />
                        ))
                    )}
            </div>

           
        </div>
    </div>
    );
};

const PossessionItem: React.FC<{ possession: Argent }> = ({ possession }) => {
    const {data:session}=useSession()


    return(
        <div key={possession.nom} className="w-full bg-white shadow-lg rounded-lg overflow-hidden p-6 flex flex-row items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{possession.nom}</h2>
                    <p className="text-gray-700 mt-2">
                        <span className="font-semibold">Valeur Comptable:</span> {possession.valeurComptable.toLocaleString()} 
                    </p>
                    <p className="text-gray-700 mt-2">
                        <span className="font-semibold">Devise:</span> {possession.devise.nom}
                    </p>
                    
                    <p className="text-gray-700 mt-2">
                        <span className="font-semibold">Date dAcquisition:</span> {possession.t}
                    </p>
                        
                    
                </div>
            
        </div>
    )
}

export default Page;
