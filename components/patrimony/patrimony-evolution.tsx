import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const PatrimonyEvolution = () => {
  const [dateInterval, setDateInterval] = useState({
    begin: new Date().toISOString().split("T")[0],
    end: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(true); // État de chargement
  const { data: session } = useSession();
  const [image, setImage] = useState<string>("");

  const onBeginDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateInterval((prevState) => ({
      ...prevState,
      begin: e.target.value,
    }));
    setLoading(true); // Remettre à true pour déclencher le chargement
  };

  const onEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateInterval((prevState) => ({
      ...prevState,
      end: e.target.value,
    }));
    setLoading(true); // Remettre à true pour déclencher le chargement
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if(!session?.user?.email) return;
        const response = await fetch(
          `https://hcwq374pyj.execute-api.eu-west-3.amazonaws.com/Prod/patrimoines/patrimoine/graphe?email=${session?.user?.email}&debut=${dateInterval.begin}&fin=${dateInterval.end}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }

        // Convertir la réponse en blob (image binaire)
        const blob = await response.blob();

        // Créer une URL locale pour l'image à partir du blob
        const imageUrl = URL.createObjectURL(blob);
        setImage(imageUrl);

        setLoading(false); // Désactiver l'état de chargement
      } catch (error) {
        console.error("Error fetching patrimony image:", error);
      }
    };

    fetchImage();
  }, [dateInterval.begin, dateInterval.end, session]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-semibold mb-4 text-[#0E0F2F]">Évolution du Patrimoine</h1>
      <div className="grid grid-cols-2 gap-6">
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
        {loading && (
          <div className="flex justify-center w-full h-[700px] border">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#161747] mt-20"></div>
          </div>
        )}

        {!loading && image && (
          <Image
            src={image}
            className="w-full h-[700px] rounded-md shadow-lg"
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
