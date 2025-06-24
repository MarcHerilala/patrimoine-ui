"use client"
import * as React from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { UserRound, Landmark, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
                            <Landmark className="h-5 w-5 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="title text-2xl font-bold text-gradient tracking-wide">
                                Patrimoine
                            </h1>
                            <p className="text-xs text-muted-foreground -mt-1">
                                Gestion intelligente
                            </p>
                        </div>
                    </div>

                    {/* Desktop User Info */}
                    {pathname.includes("/dashboard") && session && (
                        <div className="hidden md:flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 shadow-sm">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                                <UserRound className="h-4 w-4 text-white" />
                            </div>
                            <div className="text-sm">
                                <p className="font-medium text-gray-900">
                                    {session.user?.email?.split('@')[0]}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Connecté
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    {pathname.includes("/dashboard") && (
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg bg-white/60 backdrop-blur-sm border border-white/20 shadow-sm transition-all duration-200 hover:bg-white/80"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-5 w-5 text-gray-700" />
                            ) : (
                                <Menu className="h-5 w-5 text-gray-700" />
                            )}
                        </button>
                    )}
                </div>

                {/* Mobile User Info */}
                {isMobileMenuOpen && pathname.includes("/dashboard") && session && (
                    <div className="md:hidden border-t border-white/20 bg-white/60 backdrop-blur-sm">
                        <div className="flex items-center space-x-3 px-4 py-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                                <UserRound className="h-4 w-4 text-white" />
                            </div>
                            <div className="text-sm">
                                <p className="font-medium text-gray-900">
                                    {session.user?.email?.split('@')[0]}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {session.user?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;