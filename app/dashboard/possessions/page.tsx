"use client";
import { url } from "@/lib/api-url";
import React, { ChangeEvent, useEffect, useState } from "react";
import { DialogBoilerplate } from "@/components/dialog";
import CreateMoneyForm from "@/components/possessions/argent/create-form";
import CreateMaterialForm from "@/components/possessions/material/create-form";


interface Possession {
    nom: string;
    t:string;
    valeurComptable: number;
    devise:string;
  
}

const Page: React.FC = () => {
    const [possessions, setPossessions] = useState<Possession[]>([
      
    ]);
    const [possessionType,setPossessionType]=useState("argent")




    const getPossessions=async ()=>{
        try{
            const response=await fetch(`${url}/patrimoines/patrimoine/possessions?email=john@gmail.com`)
            if(!response.ok){
                throw new Error("error while fetching data")
            }
            const data=await response.json()
            setPossessions(data)
        }catch(e){
            console.log(e);
            
        }
    }
    console.log("io ny type de possession",possessionType);
    const handleOnTypeChange=(e:ChangeEvent<HTMLSelectElement>)=>{
        setPossessionType(e.target.value)
    }
    

    useEffect(()=>{
        getPossessions()
    },[])
    return (
<div className="bg-gray-100">
        {/* 
        <button
        onClick={addPossession}
        className="bg-blue-500 text-white mt-4 px-4 py-2 rounded-md hover:bg-blue-600"
        >
        Ajouter Possession
        </button>
        */}
        <DialogBoilerplate title="create new posession" key={"1"} description=""  triggerText="+ create possession">
            <div className="flex flex-col gap-2 ml-8 w-[314px]">
                <label htmlFor="">type</label>
                <select  className="bg-transparent border outline-none rounded-sm h-10"
                onChange={handleOnTypeChange}
                >
                    <option value="argent">argent</option>
                    <option value="materiel">materiel</option>
                </select>
            </div>
            {
                    possessionType === "argent" ? (
                        <CreateMoneyForm />
                    ) : possessionType === "materiel" ? (
                        <CreateMaterialForm />
                    ) : null
}
        </DialogBoilerplate>
        <div className="mt-6 mx-4 h-full">
           
            <div className="w-full space-y-4">
                {possessions.map((possession, index) => (
                    <div key={index} className="w-full bg-white shadow-lg rounded-lg overflow-hidden p-6">
                        <h2 className="text-xl font-bold text-gray-800">{possession.nom}</h2>
                        <p className="text-gray-700 mt-2">
                            <span className="font-semibold">Valeur Comptable:</span> {possession.valeurComptable.toLocaleString()} 
                        </p>
                        <p className="text-gray-700 mt-2">
                            <span className="font-semibold">Date dAcquisition:</span> {possession.t}
                        </p>
                        <p className="text-gray-700 mt-2">
                            <span className="font-semibold">devise:</span> {possession.devise}
                        </p>
                        {
                            /*
                            <div className="mt-4">
                            <label className="block text-gray-700">Sélectionnez une date future:</label>
                            <input
                                type="date"
                                value={selectedDates[index]}
                                onChange={(e) => {
                                    const newDates = [...selectedDates];
                                    newDates[index] = e.target.value;
                                    setSelectedDates(newDates);
                                }}
                                className="border border-gray-300 rounded-md p-2 mt-2"
                            />
                        </div>
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
