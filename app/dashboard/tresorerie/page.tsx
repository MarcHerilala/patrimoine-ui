"use client";
import { url } from "@/lib/api-url";
import React, { ChangeEvent, useEffect, useState } from "react";
import { DialogBoilerplate } from "@/components/dialog";
import { useSession } from "next-auth/react";
import CreateMoneyForm from "@/components/possessions/argent/create-form";
import { jsonFetcher } from "@/lib/fetch-utls";
import useSWR from "swr";
import { Loading } from "@/components/loading";
import { DollarSign, Calendar, Wallet, Plus } from "lucide-react";

interface Devise {
    "nom": string,
    "valeurEnAriary": number,
    "t": string,
    "tauxDappréciationAnnuel": number
}

interface Argent {
    nom: string;
    t: string;
    valeurComptable: number;
    dateOuverture: string;
    devise: Devise;
}

const Page: React.FC = () => {
    const { data: session } = useSession();

    const { data: possessions, error, isLoading } = useSWR<Argent[]>(
        session?.user?.email ? `${url}/patrimoines/argents?email=${session?.user?.email}` :
            null,
        jsonFetcher,
        {
            onError: (error) => {
                return (<div>error while fetching data</div>)
            }
        }
    );

    return (
        <div className="min-h-full bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 animate-fade-in-up">
                    <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-blue-600 shadow-lg">
                            <Wallet className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Trésoreries</h1>
                            <p className="text-muted-foreground">Gérez vos comptes et liquidités</p>
                        </div>
                    </div>
                    
                    <DialogBoilerplate title="" key={"1"} description="" triggerText="Ajouter une trésorerie">
                        <CreateMoneyForm />
                    </DialogBoilerplate>
                </div>

                {/* Content */}
                <div className="animate-slide-in-right">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <Loading />
                        </div>
                    ) : possessions?.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="flex justify-center mb-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                    <Wallet className="h-8 w-8 text-gray-400" />
                                </div>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune trésorerie</h3>
                            <p className="text-gray-500 mb-6">Commencez par ajouter votre première trésorerie</p>
                            <DialogBoilerplate title="" key={"empty"} description="" triggerText="Ajouter la première trésorerie">
                                <CreateMoneyForm />
                            </DialogBoilerplate>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {possessions?.map((possession, index) => (
                                <PossessionItem possession={possession} key={index} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const PossessionItem: React.FC<{ possession: Argent }> = ({ possession }) => {
    const { data: session } = useSession();

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4">
                <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                        <Wallet className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">{possession.nom}</h3>
                        <p className="text-green-100 text-sm">Compte actif</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
                    <div className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">Solde actuel</span>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-green-700">
                            {possession.valeurComptable.toLocaleString()}
                        </p>
                        <p className="text-xs text-green-600">{possession.devise.nom}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="flex items-center space-x-2 mb-2">
                            <Calendar className="h-4 w-4 text-blue-600" />
                            <span className="text-xs font-medium text-blue-700">Ouverture</span>
                        </div>
                        <p className="text-sm font-semibold text-blue-800">{possession.dateOuverture}</p>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                        <div className="flex items-center space-x-2 mb-2">
                            <Calendar className="h-4 w-4 text-purple-600" />
                            <span className="text-xs font-medium text-purple-700">Acquisition</span>
                        </div>
                        <p className="text-sm font-semibold text-purple-800">{possession.t}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;