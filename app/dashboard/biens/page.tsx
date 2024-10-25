"use client";
import { url } from "@/lib/api-url";
import React, { ChangeEvent, useEffect, useState } from "react";
import { DialogBoilerplate } from "@/components/dialog";
import { useSession } from "next-auth/react";
import { PossessionFormContainer } from "@/components/possessions/Create-container";
import { Trash2 } from "lucide-react";
import CreateMaterialForm from "@/components/possessions/material/create-form";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle ,DialogClose} from "@/components/ui/dialog"
import useSWR from "swr";
import { Loading } from "@/components/loading";
interface Devise{
    "nom": string,
    "valeurEnAriary": number,
    "t": string,
    "tauxDappréciationAnnuel": number
}

interface Possession {
    nom: string;
    t:string;
    valeurComptable: number;
    devise:Devise;
  
}

const Page: React.FC = () => {
 
    
    const {data:session}=useSession()




   
    const fetcher=(url:string)=>fetch(url).then((res)=>res.json())

    const {data:possessions, error,isLoading}=useSWR<Possession[]>(
        session?.user?.email?`${url}/patrimoines/patrimoine/possessions?email=${session?.user?.email}`:
        null,
        fetcher,
        
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
                <div className="font-bold text-[#0E0F2F] text-2xl mt-6">Liste des biens matériels</div>
                <DialogBoilerplate title="" key={"1"} description=""  triggerText="+ ajouter">
                    <CreateMaterialForm/>
                </DialogBoilerplate >
            </div>
            <div className="w-full space-y-4 mt-10">
            {isLoading ? ( // Vérifie si les données sont en cours de chargement
                        <Loading/>
                    ) : possessions?.length === 0 ? (
                        <div className="text-center text-gray-500 mt-6">Aucun bien matériel n a encore été ajouté.</div>
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

const PossessionItem: React.FC<{ possession: Possession }> = ({ possession }) => {
    const {data:session}=useSession()

    const deletePossession = async () => {
        try {
            const response = await fetch(`${url}/patrimoines/possessions/${possession.nom}?email=${session?.user?.email}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Failed to delete possession");
            }
            window.location.href="/dashboard/biens"
           
        } catch (error) {
            console.error("Error deleting possession:", error);
        }
    }
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
                <div className="">
                <Dialog>
                    <DialogTrigger asChild>
                        
                        <Button variant="outline" className="text-red-500 border-none"><Trash2/></Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] flex flex-col gap-2 h-auto overflow-auto">
                        <DialogHeader>
                        <DialogTitle className="text-center"></DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-6 mt-6 justify-center">
                            <div className="text-center">
                                etes-vous sure de supprimer cette possession?
                            </div>
                            <div className="flex flex-row space-x-32 text-center justify-center">
                                <DialogClose>non</DialogClose>
                                <p className="cursor-pointer" onClick={deletePossession}>oui</p>

                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
                    
                </div>
        </div>
    )
}

export default Page;
