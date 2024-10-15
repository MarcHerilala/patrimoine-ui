"use client";
import { url } from "@/lib/api-url";
import React, { ChangeEvent, useEffect, useState } from "react";
import { DialogBoilerplate } from "@/components/dialog";
import CreateMoneyForm from "@/components/possessions/argent/create-form";
import CreateMaterialForm from "@/components/possessions/material/create-form";
import { useSession } from "next-auth/react";
import { PossessionFormContainer } from "@/components/possessions/Create-container";


interface Possession {
    nom: string;
    t:string;
    valeurComptable: number;
    devise:string;
  
}

const Page: React.FC = () => {
    const [possessions, setPossessions] = useState<Possession[]>([
      
    ]);
    
    const {data:session}=useSession()




   
    
    

    useEffect(()=>{
        const getPossessions=async ()=>{
            try{
                const response=await fetch(`${url}/patrimoines/patrimoine/possessions?email=${session?.user?.email}`)
                if(!response.ok){
                    throw new Error("error while fetching data")
                }
                const data=await response.json()
                setPossessions(data)
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
                <div className="font-bold text-[#0E0F2F] text-2xl mt-6">Liste des possessions</div>
                <DialogBoilerplate title="create new posession" key={"1"} description=""  triggerText="+ créer possession">
                    <PossessionFormContainer/>
                </DialogBoilerplate >
            </div>
            <div className="w-full space-y-4 mt-10">
                {possessions.map((possession, index) => (
                    <div key={index} className="w-full bg-white shadow-lg rounded-lg overflow-hidden p-6">
                        <h2 className="text-xl font-bold text-gray-800">{possession.nom}</h2>
                        <p className="text-gray-700 mt-2">
                            <span className="font-semibold">Valeur Comptable:</span> {possession.valeurComptable.toLocaleString()} 
                        </p>
                        <p className="text-gray-700 mt-2">
                            <span className="font-semibold">Date dAcquisition:</span> {possession.t}
                        </p>
                        {
                            /*
                            <p className="text-gray-700 mt-2">
                            <span className="font-semibold">devise:</span> {possession.devise}
                        </p>
                            */
                        }
                       
                    </div>
                ))}
            </div>

           
        </div>
    </div>
    );
};

export default Page;
