"use client";
import React, { useState } from "react";

interface Possession {
    nom: string;
    valeurComptable: number;
    dateAcquisition: string;
    tauxDAppreciationAnnuelle: number;
    marque?: string;
    type?: string;
}

const Page: React.FC = () => {
    const [possessions, setPossessions] = useState<Possession[]>([
        {
            nom: "Voiture",
            valeurComptable: 40000000,
            dateAcquisition: "2024-09-20",
            tauxDAppreciationAnnuelle: -0.5,
            marque: "Tesla",
            type: "Electrique",
        },
        {
            nom: "Maison",
            valeurComptable: 100000000,
            dateAcquisition: "2020-01-15",
            tauxDAppreciationAnnuelle: 3.2,
            marque: "Immeuble",
            type: "Résidentiel",
        },
    ]);

    const [selectedDates, setSelectedDates] = useState<string[]>(
        possessions.map(() => new Date().toISOString().split("T")[0])
    );

    const [newPossession, setNewPossession] = useState<Possession>({
        nom: "",
        valeurComptable: 0,
        dateAcquisition: "",
        tauxDAppreciationAnnuelle: 0,
    });

    const addPossession = () => {
        setPossessions([...possessions, newPossession]);
        setSelectedDates([...selectedDates, new Date().toISOString().split("T")[0]]);
        setNewPossession({
            nom: "",
            valeurComptable: 0,
            dateAcquisition: "",
            tauxDAppreciationAnnuelle: 0,
        });
    };

    return (
<div className="bg-gray-100">
        <button
        onClick={addPossession}
        className="bg-blue-500 text-white mt-4 px-4 py-2 rounded-md hover:bg-blue-600"
        >
        Ajouter Possession
        </button>
        <div className="min-h-screen flex flex-col items-center justify-center  p-4 space-y-6">
           
            <div className="w-full space-y-4">
                {possessions.map((possession, index) => (
                    <div key={index} className="w-full bg-white shadow-lg rounded-lg overflow-hidden p-6">
                        <h2 className="text-xl font-bold text-gray-800">{possession.nom}</h2>
                        <p className="text-gray-700 mt-2">
                            <span className="font-semibold">Valeur Comptable:</span> {possession.valeurComptable.toLocaleString()} €
                        </p>
                        <p className="text-gray-700 mt-2">
                            <span className="font-semibold">Date dAcquisition:</span> {possession.dateAcquisition}
                        </p>
                        <p className="text-gray-700 mt-2">
                            <span className="font-semibold">Taux dAppréciation Annuelle:</span> {possession.tauxDAppreciationAnnuelle}%
                        </p>
                        <div className="mt-4">
                            <label className="block text-gray-700">Sélectionnez une date future:</label>
                            <input
                                type="date"
                                value={selectedDates[index]}
                                onChange={(e) => {
                                    const newDates = [...selectedDates];
                                    newDates[index] = e.target.value;
                                    setSelectedDates(newDates);
                                }}
                                className="border border-gray-300 rounded-md p-2 mt-2"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Section to add a new possession */}
            <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden p-6">
                <h2 className="text-xl font-bold text-gray-800">Ajouter une nouvelle possession</h2>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="block text-gray-700">Nom</label>
                        <input
                            type="text"
                            value={newPossession.nom}
                            onChange={(e) => setNewPossession({ ...newPossession, nom: e.target.value })}
                            className="border border-gray-300 rounded-md p-2 mt-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Valeur Comptable</label>
                        <input
                            type="number"
                            value={newPossession.valeurComptable}
                            onChange={(e) => setNewPossession({ ...newPossession, valeurComptable: parseFloat(e.target.value) })}
                            className="border border-gray-300 rounded-md p-2 mt-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Date d&apos;Acquisition</label>
                        <input
                            type="date"
                            value={newPossession.dateAcquisition}
                            onChange={(e) => setNewPossession({ ...newPossession, dateAcquisition: e.target.value })}
                            className="border border-gray-300 rounded-md p-2 mt-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Taux d&apos;Appréciation Annuelle (%)</label>
                        <input
                            type="number"
                            value={newPossession.tauxDAppreciationAnnuelle}
                            onChange={(e) => setNewPossession({ ...newPossession, tauxDAppreciationAnnuelle: parseFloat(e.target.value) })}
                            className="border border-gray-300 rounded-md p-2 mt-2 w-full"
                        />
                    </div>
                </div>
                <button
                    onClick={addPossession}
                    className="bg-blue-500 text-white mt-4 px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Ajouter Possession
                </button>
            </div>
        </div>
    </div>
    );
};

export default Page;
