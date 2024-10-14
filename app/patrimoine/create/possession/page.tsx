"use client";
import { PossessionFormContainer } from "@/components/possessions/Create-container";

const Page = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-center text-[#161747] mb-6">
                Veuillez créer une possession
            </h1>
            <PossessionFormContainer />
        </div>
    );
}

export default Page;
