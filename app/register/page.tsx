
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

import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { url } from "@/lib/api-url";

const formSchema = z.object({
    name:z.string(),
    email: z.string(),
    password: z.string().min(6),
});

export default function Home() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:"",
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        try {
            // Example: Sending data to an API endpoint
            const response = await fetch(`${url}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
    
            console.log("io ny url ",url);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.text;
            console.log('Login successful:', data);
            // Handle successful login (e.g., redirect, show success message)
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error (e.g., show error message)
        }
    }

    return (
        <div className="container h-[calc(100vh-320px)]">
            <div className="flex h-full flex-grow items-center justify-center">
                <div className="mx-auto w-full max-w-[375px]">
                    <div className="my-8">
                        <h1 className="mb-2 text-3xl text-center">patrimoine management</h1>
                    </div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>name</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="name@gmail.com"
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
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full" type="submit">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}

