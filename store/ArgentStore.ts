import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Définir un type pour les monnaies (argent)
interface ArgentStore {
  argentList: string[]; // Liste des noms de monnaies
  addMonnaie: (nouvelleMonnaie: string) => void; // Fonction pour ajouter une monnaie
  removeMonnaie: (monnaie: string) => void; // Fonction pour supprimer une monnaie
  updateMonnaie: (ancienneMonnaie: string, nouvelleMonnaie: string) => void; // Fonction pour mettre à jour une monnaie
}

// Créer le store avec persist pour stocker les données dans localStorage
const useArgentStore = create<ArgentStore>()(
  persist(
    (set) => ({
      argentList: [], // Liste initiale des monnaies

      addMonnaie: (nouvelleMonnaie) => {
        if (nouvelleMonnaie) { // Vérifiez que la nouvelle monnaie n'est pas null ou vide
            set((state) => ({
                argentList: [...state.argentList, nouvelleMonnaie],
            }));
        }
    },
    

      removeMonnaie: (monnaie) =>
        set((state) => ({
          argentList: state.argentList.filter((item) => item !== monnaie),
        })),

      updateMonnaie: (ancienneMonnaie, nouvelleMonnaie) =>
        set((state) => ({
          argentList: state.argentList.map((item) =>
            item === ancienneMonnaie ? nouvelleMonnaie : item
          ),
        })),
    }),
    {
      name: 'argent-storage', // Nom de la clé localStorage
    }
  )
);

export default useArgentStore;
