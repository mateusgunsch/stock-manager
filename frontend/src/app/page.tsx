'use client'
import type { Product } from '@/interface/Product';

import { useCallback, useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import LinkButton from '@/components/LinkButton';
import AllProductCount from '@/components/AllProductCount';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductGrid from '@/components/ProductGrid';
import LowQuant from '@/components/LowQuant';

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);

    const refreshProducts = useCallback(async () => {
        const data = await fetchProducts()
        setProducts(data)
    }, [])

    useEffect(() => {
        refreshProducts()
    }, [products, refreshProducts])

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <AllProductCount products={products} />
                
            </div>

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