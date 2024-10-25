import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import { url } from "@/lib/api-url";
import useSWR from "swr";
import { jsonFetcher } from "@/lib/fetch-utls";

export type PatrimonyType={
    nom:string,
    t:string,
    valeurComptable:number
}
const PatrimonyDetails=()=>{

  const { data: session, status } = useSession();


  const [date,setDate]=useState(new Date().toISOString().split('T')[0]);

  
  const [error, setError] = useState("");

  const handleDateChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setDate(e.target.value)
  }



  const { data:patrimony, isLoading } = useSWR<PatrimonyType>(
    session?.user?.email ? `${url}/patrimoines/patrimoine?email=${session.user.email}&date=${date}` : null,
    jsonFetcher,
    {
      onError: (error) => {
        console.error("Error fetching patrimony:", error);
        setError("Failed to load data.");
      }
    }
  );

  const renderSkeleton = () => (
   <table className="table-auto w-full h-full">
       <tbody className="">
      {[...Array(3)].map((_, index) => (
        <tr key={index}>
          <td className="border px-4 py-2 bg-gray-200 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </td>
          <td className="border px-4 py-2 bg-gray-200 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
          </td>
        </tr>
      ))}
    </tbody>
   </table>
  );

  if (error) {
    return <div>{error}</div>;
  }


  
    return (
    <div>
        <div className="flex flex-col gap-1 w-40 bg-white border rounded-sm p-2 mb-10">
          <input type="date"  className="bg-transparent" onChange={handleDateChange} value={date}/>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-4 text-[#161747]">Détails du Patrimoine</h1>
          <div className="border border-gray-300 rounded-md overflow-hidden h-[200px]">
            {
              isLoading &&(
                renderSkeleton()
              )
            }
            {
              !isLoading &&(
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
                  <td className="border px-4 py-2 text-gray-800 bg-transparent font-medium">{patrimony?.nom}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-gray-800 bg-transparent">Date:</td>
                  <td className="border px-4 py-2 text-gray-800 bg-transparent font-medium">{patrimony?.t}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-gray-800 bg-transparent">Valeur Comptable:</td>
                  <td className="border px-4 py-2 text-gray-800 bg-transparent font-medium">{patrimony?.valeurComptable}</td>
                </tr>
              </tbody>
            </table>
              )
            }
          </div>
      </div>
    </div>
    )
}
export default PatrimonyDetails;