
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { Input } from "@/components/ui/input";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { url } from "@/lib/api-url";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useArgentStore from "@/store/ArgentStore";





const formSchema = z.object({
    nom: z.string(),
    dateOuverture: z.string(),
    t: z.string(),
    valeurComptable: z
        .string()
        .transform((val) => Number(val)), // Transforme la chaîne en nombre
    devise:z.string()
});


export default function CreateMoneyForm() {
    const [isLoading,setIsLoading]=useState(false)
    const {addMonnaie,argentList}=useArgentStore()

    const {data:session}=useSession()
    const router=useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nom: "",
            dateOuverture:"",
            t: "",
            valeurComptable: 0,
            devise:""
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        try {
            // Example: Sending data to an API endpoint
            setIsLoading(true)
            const response = await fetch(`${url}/patrimoines/patrimoine/possessions/argent?email=${session?.user?.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
    
            console.log("io ny url ",url);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            router.push(`/dashboard/tresorerie`);
            setIsLoading(false)
            console.log("io le data nom:",values.nom);
            
            addMonnaie(values.nom)
            console.log("reo ny argent list",argentList);
            
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
                                        <FormLabel>nom</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="nom"
                                                placeholder="nom "
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
                            <FormField
                                control={form.control}
                                name="devise"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>devise</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="devise" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        <SelectItem value="MGA">MGA</SelectItem>
                                        <SelectItem value="EUR">EUR</SelectItem>
                                        <SelectItem value="CAD">CAD</SelectItem>
                                        </SelectContent>
                                    </Select>
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

