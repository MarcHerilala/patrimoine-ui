"use client"
import { Calendar, DollarSign, Clock, FileText, TrendingDown, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';
import { DialogBoilerplate } from "@/components/dialog";
import CreateFuxForm from '@/components/possessions/flux-argent/create-form';
import { useEffect, useState } from 'react';
import { url } from '@/lib/api-url';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { Loading } from '@/components/loading';
import { jsonFetcher } from '@/lib/fetch-utls';

export default function FluxList() {
  const { data: session } = useSession();

  const { data: fluxData, error, isLoading } = useSWR<Flux[]>(
    session?.user?.email ? `${url}/patrimoines/fluxArgents?email=${session?.user?.email}` : null,
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg">
              <TrendingDown className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Flux financiers</h1>
              <p className="text-muted-foreground">Suivez vos revenus et dépenses</p>
            </div>
          </div>
          
          <DialogBoilerplate title="créer un flux" key={"1"} description="" triggerText="Créer un flux">
            <CreateFuxForm />
          </DialogBoilerplate>
        </div>

        {/* Content */}
        <div className="animate-slide-in-right">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loading />
            </div>
          ) : fluxData?.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <TrendingDown className="h-8 w-8 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun flux financier</h3>
              <p className="text-gray-500 mb-6">Commencez par ajouter votre premier flux</p>
              <DialogBoilerplate title="créer un flux" key={"empty"} description="" triggerText="Créer le premier flux">
                <CreateFuxForm />
              </DialogBoilerplate>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fluxData?.map((flux, index) => (
                <FluxCard key={index} flux={flux} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// types.ts
export interface Devise {
  nom: string;
  valeurEnAriary: number;
  tauxDappréciationAnnuel: number;
}

export interface Flux {
  nom: string;
  debut: string;
  fin: string;
  fluxMensuel: number;
  dateOperation: number;
  devise: Devise;
  valeurComptable: number;
}

function FluxCard({ flux }: { flux: Flux }) {
  const isPositive = flux.fluxMensuel >= 0;
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Header */}
      <div className={`p-4 ${isPositive 
        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
        : 'bg-gradient-to-r from-red-500 to-pink-500'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
              {isPositive ? (
                <ArrowUpRight className="h-5 w-5 text-white" />
              ) : (
                <ArrowDownRight className="h-5 w-5 text-white" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{flux.nom}</h3>
              <p className={`text-sm ${isPositive ? 'text-green-100' : 'text-red-100'}`}>
                {isPositive ? 'Revenu' : 'Dépense'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Montant principal */}
        <div className={`flex items-center justify-between p-4 rounded-xl border ${
          isPositive 
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-100' 
            : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-100'
        }`}>
          <div className="flex items-center space-x-2">
            <DollarSign className={`h-5 w-5 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
            <span className="text-sm font-medium text-gray-700">Flux mensuel</span>
          </div>
          <div className="text-right">
            <p className={`text-xl font-bold ${isPositive ? 'text-green-700' : 'text-red-700'}`}>
              {Math.abs(flux.fluxMensuel).toLocaleString()}
            </p>
            <p className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {flux.devise.nom}
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">Début</span>
            </div>
            <p className="text-sm font-semibold text-blue-800">{flux.debut}</p>
          </div>

          <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              <span className="text-xs font-medium text-purple-700">Fin</span>
            </div>
            <p className="text-sm font-semibold text-purple-800">{flux.fin}</p>
          </div>
        </div>

        {/* Date d'opération */}
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Jour d'opération</span>
            </div>
            <span className="text-sm font-semibold text-gray-800">{flux.dateOperation}</span>
          </div>
        </div>
      </div>
    </div>
  );
}