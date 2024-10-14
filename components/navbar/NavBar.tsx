"use client"
import * as React from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation"; // Import pour accéder au chemin d'URL
import User, { UserRound } from "lucide-react";
import { BanknoteIcon } from "lucide-react";

const Navbar = () => {
    const { data: session } = useSession();
    const pathname = usePathname(); // Récupère l'URL actuelle

    return (
        <nav className="ease-in-outs custom-filter sticky top-0 z-30 w-full border-b border-accent py-3 transition duration-300 md:bg-background/90">
            <div className="container mx-auto px-6">
                <div className="mx-auto">
                    <div className="flex w-full items-center justify-between gap-5">
                        <div className="flex items-center gap-4">
                            <div className="w-10">
                                <p className="title hidden text-xl font-bold md:block">
                                    logo
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            {/* Afficher les informations utilisateur uniquement si le chemin contient '/dashboard' */}
                            {pathname.includes("/dashboard") && (
                                <div className="flex items-center space-x-2 flxco">
                                    <div>
                                        <UserRound />
                                    </div>
                                    <div>{session?.user?.email}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
