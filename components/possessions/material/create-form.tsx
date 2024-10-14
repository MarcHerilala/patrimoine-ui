
"use client"
import z, { number } from "zod";
import { ErrorOption, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { url } from "@/lib/api-url";
import { useSession } from "next-auth/react";




const formSchema = z.object({
    nom: z.string(),
    t: z.string(),
    valeurComptable: z.string(),
    dateAcquisition:z.string(),
    tauxDAppreciationAnnuelle:z.string()
});

export default function CreateMaterialForm() {

    const {data:session}=useSession()

    const router=useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nom: "",
            t: "",
            valeurComptable: "",
            dateAcquisition:"",
            tauxDAppreciationAnnuelle:""
         
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        try {

            const valuesToSubmit=[values]
            // Example: Sending data to an API endpoint
            const response = await fetch(`${url}/patrimoines/patrimoine/possessions/materiel?email=${session?.user?.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(valuesToSubmit),
            });
    
            console.log("io ny url ",url);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            router.push(`/dashboard/possessions`);

            const data = await response.json();
            console.log('Login successful:', data);
            // Handle successful login (e.g., redirect, show success message)
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error (e.g., show error message)
        }
    }

    return (
        <div className="container ">
            <div className="flex h-full flex-grow items-center justify-center">
                <div className="mx-auto w-full max-w-[375px]">
                   
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6 flex-col gap-1"
                        >
                            <FormField
                                control={form.control}
                                name="nom"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>name</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="nom"
                                                placeholder="nom possession"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="t"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>date</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                placeholder="date"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             

                            <FormField
                                control={form.control}
                                name="valeurComptable"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>valeur comptable</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                              <FormField
                                control={form.control}
                                name="dateAcquisition"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>date acquisition</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                              <FormField
                                control={form.control}
                                name="tauxDAppreciationAnnuelle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>taux d appreciation annuelle</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             
                            <Button className="w-full bg-[#161747]" type="submit">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}

