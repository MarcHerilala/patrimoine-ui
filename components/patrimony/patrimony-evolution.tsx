import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { url } from "@/lib/api-url";
import { Loading } from "@/components/loading";
const PatrimonyEvolution = () => {
  const [dateInterval, setDateInterval] = useState({
    begin: new Date().toISOString().split("T")[0],
    end: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0],
  });
  const { data: session } = useSession();
  //const [image, setImage] = useState<string>("");


  const onBeginDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateInterval((prevState) => ({
      ...prevState,
      begin: e.target.value,
    }));

  };

  const onEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateInterval((prevState) => ({
      ...prevState,
      end: e.target.value,
    }));

  };


  const fetcher=(url:string)=>fetch(url).then((res)=>res.blob())

  const {data:imageBlob, error,isLoading}=useSWR(
    session?.user?.email?`${url}/patrimoines/patrimoine/graphe?email=${session?.user?.email}&debut=${dateInterval.begin}&fin=${dateInterval.end}`:
    null,
    fetcher)

    const image=imageBlob?URL.createObjectURL(imageBlob):null


    if(error){
      return <div>error while fetching data</div>
    }


  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-semibold mb-4 text-[#0E0F2F]">Évolution du Patrimoine</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-300 rounded-lg p-4">
          <label className="text-gray-600 mb-2 block">Date de début</label>
          <input
            type="date"
            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={dateInterval.begin}
            onChange={onBeginDateChange}
          />
        </div>
        <div className="border border-gray-300 rounded-lg p-4">
          <label className="text-gray-600 mb-2 block">Date de fin</label>
          <input
            type="date"
            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={dateInterval.end}
            onChange={onEndDateChange}
          />
        </div>
      </div>

      <div className="mt-6">
        {isLoading && (
         
          <div className="h-[300px] md:h-[700px]">
            <div className="mt-28"><Loading /></div>
          </div>
        )}

        {!isLoading && image && (
          <Image
            src={image}
            className="w-full h-[300px] md:h-[700px] rounded-md shadow-lg"
            width={800}
            height={100}
            alt="Patrimony graph"
          />
        )}
      </div>
    </div>
  );
};

export default PatrimonyEvolution;
