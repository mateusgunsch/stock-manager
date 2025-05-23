'use client'
import type { Product } from '@/interface/Product';

import { useCallback, useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import LinkButton from '@/components/LinkButton';
import AllProductCount from '@/components/AllProductCount';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductGrid from '@/components/ProductGrid';
import LowQuant from '@/components/LowQuant';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const { status } = useSession();

    const refreshProducts = useCallback(async () => {
        const data = await fetchProducts()
        setProducts(data)
    }, [])

    useEffect(() => {
        refreshProducts()
    }, [products, refreshProducts])

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/" });
    };

    const handleLogin = () => {
        redirect("/login");
    }


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex">
                <AllProductCount products={products} />
            </div>
            <Button className="absolute top-10 right-20 hover:cursor-pointer" onClick={status === "authenticated" ? handleLogout : handleLogin}>{ status === "authenticated" ? "Sair" : "Login"}</Button>

            <Card className="max-w-5xl mx-auto shadow-lg pt-0">
                <CardHeader className="flex flex-row flex-wrap items-center justify-between bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-t-lg py-4">
                    <CardTitle className="text-2xl font-bold">Lista de Produtos</CardTitle>
                    <LinkButton
                        href="/add"
                        text="Adicionar Produto"
                        classes="bg-white text-purple-700 hover:bg-gray-100 hover:cursor-pointer font-medium transition-all duration-200"
                    />
                </CardHeader>
                <CardContent className="p-6">
                    <ProductGrid products={products} />
                </CardContent>
            </Card>
            <LowQuant products={products} />
        </div>
    );
}