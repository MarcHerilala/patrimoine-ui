"use client"
import { Calendar, DollarSign, Clock, FileText, TrendingDown } from 'lucide-react';
import { DialogBoilerplate } from "@/components/dialog";

import CreateFuxForm from '@/components/possessions/flux-argent/create-form';
import { useEffect, useState } from 'react';
import { url } from '@/lib/api-url';
import { useSession } from 'next-auth/react';
import { set } from 'zod';

export default function FluxList() {

  const [fluxData, setFluxData] = useState<Flux[]>([]);
  const {data:session}=useSession()
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
const getFLuxList=async()=>{
  setLoading(true)
  try{
    const response=await fetch(`${url}/patrimoines/fluxArgents?email=${session?.user?.email}`)
    if(!response.ok){
      throw new Error("error while fetching data")
    }
    const data=await response.json()
    setFluxData(data)
    console.log(data);
    setLoading(false)
    
  }catch(e){
    console.log(e)
    ;}

}
if(!session){
  return
}
getFLuxList()
  },[session])

  return (
   <div className='bg-gray-50 h-full p-2'>
        <div className='flex justify-end'>
            <DialogBoilerplate title="créer un flux" key={"1"} description=""  triggerText="+ créer flux">
                <CreateFuxForm />
            </DialogBoilerplate>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
        {
        loading ? 
        (
                        <div className="  col-span-1 md:col-span-3 flex justify-center items-center h-full">
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
        ) : fluxData.length === 0 ? ( // Utilisez "===" pour comparer
            <div>Pas de flux</div>
        ) : (
            fluxData.map((flux, index) => (
                <FluxCard key={index} flux={flux} />
            ))
        )
    }
            
        </div>
   </div>
  );
}
// types.ts
export interface Devise {
    nom: string;
    valeurEnAriary: number;
    tauxDappréciationAnnuel: number;
  }
  
  export interface Flux {
    nom: string;
    debut: string;
    fin: string;
    fluxMensuel: number;
    dateOperation: number;
    devise: Devise;
    valeurComptable: number;
  }
  

function FluxCard({ flux }: { flux: Flux }) {
  return (
    <div className="px-3 py-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      {/* Nom */}
      <div className="flex items-center space-x-2">
        <FileText className="text-[#0E0F2F] " />
        <h2 className="text-xl text-[#0E0F2F]">{flux.nom}</h2>
      </div>

      {/* Dates de début et de fin */}
      <div className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="text-[#0E0F2F]" />
          <span className="text-[#0E0F2F]">Début : {flux.debut}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="text-[#0E0F2F]" />
          <span className="text-[#0E0F2F]">Fin : {flux.fin}</span>
        </div>
      </div>

      {/* Flux Mensuel */}
      <div className="flex items-center space-x-2">
        <DollarSign className={`text-[#0E0F2F] ${flux.fluxMensuel < 0 ? 'text-red-500' : 'text-green-500'}`} />
        <span className={`text-lg ${flux.fluxMensuel < 0 ? 'text-red-500' : 'text-green-500'}`}>
          {flux.fluxMensuel.toLocaleString()} 
        </span>
      </div>
       {/* Devise */}
       <div className="flex items-center space-x-2">
        <DollarSign className="text-[#0E0F2F]" />
        <span className="text-[#0E0F2F]">Devise : {flux.devise.nom} </span>
      </div>

      {/* Date de l'opération */}
      <div className="flex items-center space-x-2">
        <Clock className="text-[#0E0F2F]" />
        <span className="text-[#0E0F2F]">Jour d opération : {flux.dateOperation}</span>
      </div>

     

     
    </div>
  );
}
