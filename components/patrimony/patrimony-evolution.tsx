import Image from "next/image"
const PatrimonyEvolutoin=({name,debut,fin}:{name:string,debut:string,fin:string})=>{
    try{
      
    }catch(e){
        console.log(e);
        
    }

    return(
        <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Évolution du Patrimoine</h1>
        <div className="grid grid-cols-2 gap-6">
          <div className="border border-gray-300 rounded-lg p-4">
            <label className="text-gray-600 mb-2 block">Date de début</label>
            <input type="date" className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div className="border border-gray-300 rounded-lg p-4">
            <label className="text-gray-600 mb-2 block">Date de fin</label>
            <input type="date" className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>
        <div className="mt-6">
          <Image 
          src=" https://hcwq374pyj.execute-api.eu-west-3.amazonaws.com/Prod/patrimoines/test/graphe?email=marc@gmail.com&debut=2024-08-19&fin=2024-10-30"
           className="w-full h-auto rounded-md shadow-lg"
           width={800}
           height={400}
           alt="Patrimony graph" />
           
        </div>
      </div>
    )
}

export default PatrimonyEvolutoin