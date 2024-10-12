import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import { url } from "@/lib/api-url";

/*export type PatrimonyType={
    nom:string,
    t:string,
    valeurComptable:number
}*/
const PatrimonyDetails=()=>{

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
    return (
    <div>
        <div className="flex flex-col gap-1 w-40 bg-white border rounded-sm p-2 mb-10">
          <input type="date"  className="bg-transparent" onChange={handleDateChange}/>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">Détails du Patrimoine</h1>
          <div className="border border-gray-300 rounded-md overflow-hidden">
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
                  <td className="border px-4 py-2 text-gray-800 bg-transparent font-medium">{patrimony.nom}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-gray-800 bg-transparent">Date:</td>
                  <td className="border px-4 py-2 text-gray-800 bg-transparent font-medium">{patrimony.t}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-gray-800 bg-transparent">Valeur Comptable:</td>
                  <td className="border px-4 py-2 text-gray-800 bg-transparent font-medium">{patrimony.valeurComptable}</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>
    )
}
export default PatrimonyDetails;