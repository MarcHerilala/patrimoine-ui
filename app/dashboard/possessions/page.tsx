"use client";
import { url } from "@/lib/api-url";
import React, { useEffect, useState } from "react";

interface Possession {
    nom: string;
    t:string;
    valeurComptable: number;
    devise:string;
  
}

const Page: React.FC = () => {
    const [possessions, setPossessions] = useState<Possession[]>([
      
    ]);

    const [selectedDates, setSelectedDates] = useState<string[]>(
        possessions.map(() => new Date().toISOString().split("T")[0])
    );

    const [newPossession, setNewPossession] = useState<Possession>({
        nom: "",
        t:"",
        valeurComptable: 0,
        devise:"",
    });



    const addPossession = () => {
        setPossessions([...possessions, newPossession]);
        setSelectedDates([...selectedDates, new Date().toISOString().split("T")[0]]);
        setNewPossession({
            nom: "",
            t:"",
            valeurComptable: 0,
            devise: "",
        });
    };


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

    useEffect(()=>{
        getPossessions()
    },[])
    return (
<div className="bg-gray-100">
        <button
        onClick={addPossession}
        className="bg-blue-500 text-white mt-4 px-4 py-2 rounded-md hover:bg-blue-600"
        >
        Ajouter Possession
        </button>
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
