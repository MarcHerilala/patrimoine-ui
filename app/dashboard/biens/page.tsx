"use client";
import { url } from "@/lib/api-url";
import React, { ChangeEvent, useEffect, useState } from "react";
import { DialogBoilerplate } from "@/components/dialog";
import { useSession } from "next-auth/react";
import { PossessionFormContainer } from "@/components/possessions/Create-container";
import { Trash2, Package, Plus, Calendar, DollarSign } from "lucide-react";
import CreateMaterialForm from "@/components/possessions/material/create-form";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import useSWR from "swr";
import { Loading } from "@/components/loading";
import { jsonFetcher } from "@/lib/fetch-utls";

interface Devise {
    "nom": string,
    "valeurEnAriary": number,
    "t": string,
    "tauxDappréciationAnnuel": number
}

interface Possession {
    nom: string;
    t: string;
    valeurComptable: number;
    devise: Devise;
}

const Page: React.FC = () => {
    const { data: session } = useSession();

    const { data: possessions, error, isLoading } = useSWR<Possession[]>(
        session?.user?.email ? `${url}/patrimoines/patrimoine/possessions?email=${session?.user?.email}` :
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
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
                            <Package className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Biens matériels</h1>
                            <p className="text-muted-foreground">Gérez vos possessions physiques</p>
                        </div>
                    </div>
                    
                    <DialogBoilerplate title="" key={"1"} description="" triggerText="Ajouter un bien">
                        <CreateMaterialForm />
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
                                    <Package className="h-8 w-8 text-gray-400" />
                                </div>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun bien matériel</h3>
                            <p className="text-gray-500 mb-6">Commencez par ajouter votre premier bien matériel</p>
                            <DialogBoilerplate title="" key={"empty"} description="" triggerText="Ajouter le premier bien">
                                <CreateMaterialForm />
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

const PossessionItem: React.FC<{ possession: Possession }> = ({ possession }) => {
    const { data: session } = useSession();

    const deletePossession = async () => {
        try {
            const response = await fetch(`${url}/patrimoines/possessions/${possession.nom}?email=${session?.user?.email}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Failed to delete possession");
            }
            window.location.href = "/dashboard/biens";
        } catch (error) {
            console.error("Error deleting possession:", error);
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white truncate">{possession.nom}</h3>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-white hover:bg-white/20 h-8 w-8 p-0"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-center text-lg">Confirmer la suppression</DialogTitle>
                            </DialogHeader>
                            <div className="text-center py-4">
                                <div className="flex justify-center mb-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                        <Trash2 className="h-6 w-6 text-red-600" />
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-6">
                                    Êtes-vous sûr de vouloir supprimer <strong>{possession.nom}</strong> ?
                                    Cette action est irréversible.
                                </p>
                                <div className="flex space-x-3 justify-center">
                                    <DialogClose asChild>
                                        <Button variant="outline">Annuler</Button>
                                    </DialogClose>
                                    <Button 
                                        onClick={deletePossession}
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                    >
                                        Supprimer
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                    <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">Valeur</span>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-green-700">
                            {possession.valeurComptable.toLocaleString()}
                        </p>
                        <p className="text-xs text-green-600">{possession.devise.nom}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Acquisition</span>
                    </div>
                    <span className="text-sm font-medium text-blue-700">{possession.t}</span>
                </div>
            </div>
        </div>
    );
};

export default Page;