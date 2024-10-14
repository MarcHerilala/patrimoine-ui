
"use client"
import z from "zod";
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


import { signIn } from "next-auth/react";
import Link from "next/link";
import { url } from "@/lib/api-url";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";




const formSchema = z.object({
    nom: z.string().nonempty(),
    t: z.string(),
    dateOuverture: z.string(),
    valeurComptable: z
        .string()
        .nonempty()
        .transform((val) => Number(val)), // Transforme la chaîne en nombre
});


export default function CreateMoneyForm() {
    const [isLoading,setIsLoading]=useState(false)

    const {data:session}=useSession()
    const router=useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nom: "",
            t: "",
            dateOuverture:"",
            valeurComptable: 0,
         
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        try {
            // Example: Sending data to an API endpoint
            setIsLoading(true)
            const dataToSend=[values]
            const response = await fetch(`${url}/patrimoines/patrimoine/possessions/argent?email=${session?.user?.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
    
            console.log("io ny url ",url);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            router.push(`/dashboard/possessions`);
            setIsLoading(false)
            console.log('Login successful:', data);
            // Handle successful login (e.g., redirect, show success message)
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error (e.g., show error message)
        }
    }

    return (
        <div className="container">
            <div className="flex h-full flex-grow items-center justify-center">
                <div className=" w-full max-w-[375px]">
                   
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6 flex flex-col "
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
                                name="dateOuverture"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>date ouverture</FormLabel>
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
                             
                             <Button className="w-full bg-[#0E0F2F]" type="submit">
                                {isLoading?<p className="animate-spin rounded-full h-7 w-6 border-t-4 border-b-2 border-white"></p>:"connexion"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}

