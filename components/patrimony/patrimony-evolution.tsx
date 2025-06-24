import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { url } from "@/lib/api-url";
import { Loading } from "@/components/loading";
import { blobFetcher } from "@/lib/fetch-utls";
import { BarChart3, Calendar, TrendingUp } from "lucide-react";

const PatrimonyEvolution = () => {
  const [dateInterval, setDateInterval] = useState({
    begin: new Date().toISOString().split("T")[0],
    end: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0],
  });
  const { data: session } = useSession();

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

  const { data: imageBlob, error, isLoading } = useSWR(
    session?.user?.email ? `${url}/patrimoines/patrimoine/graphe?email=${session?.user?.email}&debut=${dateInterval.begin}&fin=${dateInterval.end}` :
      null,
    blobFetcher,
  );

  const image = imageBlob ? URL.createObjectURL(imageBlob) : null;

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <p className="text-red-600 text-center">Erreur lors du chargement des données</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Évolution du Patrimoine</h2>
            <p className="text-purple-100 text-sm">Analyse graphique sur période</p>
          </div>
        </div>
      </div>

      {/* Date Controls */}
      <div className="p-6 border-b border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <label className="text-sm font-medium text-gray-700">Date de début</label>
            </div>
            <input
              type="date"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              value={dateInterval.begin}
              onChange={onBeginDateChange}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <label className="text-sm font-medium text-gray-700">Date de fin</label>
            </div>
            <input
              type="date"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              value={dateInterval.end}
              onChange={onEndDateChange}
            />
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600"></div>
            <p className="text-gray-500 text-sm">Génération du graphique...</p>
          </div>
        ) : image ? (
          <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white">
            <Image
              src={image}
              className="w-full h-auto max-h-96 object-contain"
              width={800}
              height={400}
              alt="Graphique d'évolution du patrimoine"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 space-y-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <TrendingUp className="h-12 w-12 text-gray-400" />
            <div className="text-center">
              <p className="text-gray-600 font-medium">Aucun graphique disponible</p>
              <p className="text-gray-500 text-sm">Sélectionnez une période pour voir l'évolution</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatrimonyEvolution;