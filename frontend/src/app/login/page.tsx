"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    useEffect(() => {
        if (status === "authenticated" || session) {
            router.push("/");
        }
    }, [status, router, session]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const result = await signIn("credentials", {
            username: form.username,
            password: form.password,
            redirect: false,
        });

        if (result?.error) {
            setError("Usuário ou senha incorretos");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <Input
            type="text"
            placeholder="Usuário"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="border p-2"
            />
            <Input
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border p-2"
            />
            <Button type="submit" className="bg-indigo-500 hover:bg-indigo-600 hover:cursor-pointer text-white px-4 py-2">
            Entrar
            </Button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}
