"use client";
import { url } from "@/lib/api-url";
import React, { ChangeEvent, useEffect, useState } from "react";
import { DialogBoilerplate } from "@/components/dialog";
import { useSession } from "next-auth/react";

import CreateMoneyForm from "@/components/possessions/argent/create-form";
import { set } from "zod";
interface Devise{
    "nom": string,
    "valeurEnAriary": number,
    "t": string,
    "tauxDappréciationAnnuel": number
}

interface Argent {
    nom: string;
    t:string;
    valeurComptable: number;
    dateOuverture: string;
    devise:Devise;
  
}

const Page: React.FC = () => {
    const [possessions, setPossessions] = useState<Argent[]>([
      
    ]);
    const [loading, setLoading] = useState<boolean>(true); 
    
    const {data:session}=useSession()




   
    
    

    useEffect(()=>{
        const getPossessions=async ()=>{
            setLoading(true)
            try{
                const response=await fetch(`${url}/patrimoines/argents?email=${session?.user?.email}`)
                if(!response.ok){
                    throw new Error("error while fetching data")
                }
                const data=await response.json()
                setPossessions(data)
                setLoading(false)
            }catch(e){
                console.log(e);
                
            }
        }
        if(!session){
            return
        }
        getPossessions()
    },[session])
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
            {loading ? ( // Affiche le message de chargement
                        <div className="flex justify-center items-center">
                        <svg
                            className="animate-spin h-20 w-20 text-blue-600" // Tailwind pour le spinner
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            role="status"
                        >
                            <path
                                d="M4 12a8 8 0 1 1 8 8v-2a6 6 0 1 0-6-6H4z"
                                className="text-gray-200"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                            <path
                                d="M12 4V2M12 22v-2M22 12h-2M4 12H2"
                                className="text-gray-600"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                        </svg>
                    </div>
                    ) : possessions.length === 0 ? ( // Affiche le message si pas de données
                        <div className="text-center">Pas de trésoreries disponibles.</div>
                    ) : (
                        possessions.map((possession, index) => (
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

    /*const deletePossession = async () => {
        try {
            const response = await fetch(`${url}/patrimoines/possessions/${possession.nom}?email=${session?.user?.email}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Failed to delete possession");
            }
           
        } catch (error) {
            console.error("Error deleting possession:", error);
        }
    }*/
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
                {
                    /*
                    <div className="">
                    <button onClick={deletePossession} className="text-red-500"><Trash2/></button>
                </div>
                    */
                }
        </div>
    )
}

export default Page;
