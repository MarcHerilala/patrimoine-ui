import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import { url } from "@/lib/api-url";
import useSWR from "swr";
import { jsonFetcher } from "@/lib/fetch-utls";
import { Calendar, TrendingUp, DollarSign } from "lucide-react";

export type PatrimonyType = {
    nom: string,
    t: string,
    valeurComptable: number
}

const PatrimonyDetails = () => {
    const { data: session, status } = useSession();
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [error, setError] = useState("");

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    const { data: patrimony, isLoading } = useSWR<PatrimonyType>(
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
        <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl animate-pulse">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
            ))}
        </div>
    );

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <p className="text-red-600 text-center">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                        <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Détails du Patrimoine</h2>
                        <p className="text-blue-100 text-sm">Valeur à une date donnée</p>
                    </div>
                </div>
            </div>

            {/* Date Selector */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <label className="text-sm font-medium text-gray-700">
                        Date de consultation
                    </label>
                </div>
                <div className="mt-2">
                    <input
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {isLoading ? (
                    renderSkeleton()
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                                    <span className="text-blue-600 font-semibold text-sm">N</span>
                                </div>
                                <span className="font-medium text-gray-700">Nom</span>
                            </div>
                            <span className="font-semibold text-gray-900">{patrimony?.nom || '--'}</span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                                    <Calendar className="h-4 w-4 text-green-600" />
                                </div>
                                <span className="font-medium text-gray-700">Date</span>
                            </div>
                            <span className="font-semibold text-gray-900">{patrimony?.t || '--'}</span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                                    <DollarSign className="h-4 w-4 text-purple-600" />
                                </div>
                                <span className="font-medium text-gray-700">Valeur Comptable</span>
                            </div>
                            <div className="text-right">
                                <span className="font-bold text-xl text-gray-900">
                                    {patrimony?.valeurComptable?.toLocaleString() || '--'}
                                </span>
                                <p className="text-xs text-gray-500">Ariary</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatrimonyDetails;