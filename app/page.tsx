
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

import { redirect, useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { url } from "@/lib/api-url";
import { useAuthStore } from "@/store/auth-store";
import { useState } from "react";

const formSchema = z.object({
    email: z.string(),
    password: z.string().min(6),
});

export default function Login() {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const [error,setError]=useState("")

    const router=useRouter()

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setError("")

      const result= await signIn("credentials",{
        email:values.email,
        password:values.password,
        redirect:false
      })
      if (result?.error) {
        setError("Email ou mot de passe incorrect")
    
    }
     else {
        router.push("/dashboard")
     }

    
    }

    return (
        <div className="container h-[calc(100vh-320px)]">
            <div className="flex h-full flex-grow items-center justify-center">
                <div className="mx-auto w-full max-w-[375px]">
                    <div className="my-8">
                        <h1 className="mb-2 text-3xl text-center text-[#161747] font-bold">connextion</h1>
                    </div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="test@gmail.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mot de passe</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full bg-[#0E0F2F]" type="submit">
                                envoyer
                            </Button>
                        </form>
                    </Form>
                    <p className="text-center mt-5 text-red-500">{error}</p>
                    <p className="text-center mt-5">vous n &apos; avez pas de compte?<Link href={"/register"} className="font-extrabold text-[#161747]">creer un compte</Link></p>
                </div>
            </div>
        </div>
    );
}

