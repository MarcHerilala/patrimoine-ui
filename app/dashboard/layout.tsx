"use client";

import React, { MouseEventHandler, useEffect, useState } from "react";
import {
    LogOut,
    Plus,
    Landmark,
    Package,
    DollarSign,
    ArrowLeftRight,
    TrendingUp,
    Home,
    Menu,
    X
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function ProductDetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSignOut = () => {
        signOut({
            callbackUrl: "/"
        });
    };

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="relative flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed left-0 top-0 z-50 h-full w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                bg-white/90 backdrop-blur-xl border-r border-white/20 shadow-xl
            `}>
                {/* Mobile Close Button */}
                <div className="flex items-center justify-between p-4 md:hidden">
                    <div className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                            <Landmark className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-semibold text-gray-900">Menu</span>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex flex-col h-full">
                    <div className="flex-1 px-4 py-6 space-y-2">
                        <div className="mb-8 hidden md:block">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
                                    <Landmark className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-gray-900">Dashboard</h2>
                                    <p className="text-xs text-muted-foreground">Gestion patrimoine</p>
                                </div>
                            </div>
                        </div>

                        <NavItem
                            link="/dashboard"
                            label="Vue d'ensemble"
                            Icon={<TrendingUp size={20} />}
                            description="Tableau de bord principal"
                        />
                        <NavItem
                            link="/dashboard/biens"
                            label="Biens matériels"
                            Icon={<Package size={20} />}
                            description="Gérer vos possessions"
                        />
                        <NavItem
                            link="/dashboard/tresorerie"
                            label="Trésoreries"
                            Icon={<DollarSign size={20} />}
                            description="Comptes et liquidités"
                        />
                        <NavItem
                            link="/dashboard/flux"
                            label="Flux financiers"
                            Icon={<ArrowLeftRight size={20} />}
                            description="Revenus et dépenses"
                        />
                    </div>

                    {/* Logout Button */}
                    <div className="border-t border-gray-200/50 p-4">
                        <button
                            onClick={handleSignOut}
                            className="flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200 group"
                        >
                            <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                            <span>Se déconnecter</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-0">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-white/20">
                    <button
                        onClick={toggleMobileMenu}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/60 border border-white/20 shadow-sm"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                    <div className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                            <Landmark className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-semibold text-gray-900">Patrimoine</span>
                    </div>
                </div>

                {/* Page Content */}
                <div className="flex-1 overflow-auto">
                    <div className="animate-fade-in-up">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

type INavItem = {
    label: string;
    Icon: React.ReactNode;
    link: string;
    description?: string;
};

function NavItem({ label, Icon, link, description }: INavItem) {
    const [isVisited, setIsVisited] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        pathname.endsWith(link) ? setIsVisited(true) : setIsVisited(false);
    }, [link, pathname]);

    return (
        <Link
            href={link}
            className={`
                group flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.02]
                ${isVisited
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                    : "text-gray-700 hover:bg-white/60 hover:shadow-md"
                }
            `}
        >
            <div className={`
                flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200
                ${isVisited 
                    ? "bg-white/20 text-white" 
                    : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                }
            `}>
                {Icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="truncate">{label}</p>
                {description && (
                    <p className={`text-xs truncate ${isVisited ? "text-white/70" : "text-gray-500"}`}>
                        {description}
                    </p>
                )}
            </div>
        </Link>
    );
}