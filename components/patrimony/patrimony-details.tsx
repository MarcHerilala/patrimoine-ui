export type PatrimonyType={
    nom:string,
    t:string,
    valeurComptable:number
}
const PatrimonyDetails=({nom,t,valeurComptable}:PatrimonyType)=>{
    return (
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
                <td className="border px-4 py-2 text-gray-800 bg-transparent font-medium">{nom}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 text-gray-800 bg-transparent">Date:</td>
                <td className="border px-4 py-2 text-gray-800 bg-transparent font-medium">{t}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 text-gray-800 bg-transparent">Valeur Comptable:</td>
                <td className="border px-4 py-2 text-gray-800 bg-transparent font-medium">{valeurComptable}</td>
              </tr>
            </tbody>
          </table>
        </div>
     </div>
    )
}
export default PatrimonyDetails;