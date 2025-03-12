'use client'
import { Product } from '@/interface/Product';

import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import DelButton from '@/components/DelButton';
import LinkButton from '@/components/LinkButton';
import AllProductCount from '@/components/AllProductCount';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts().then(setProducts);
    }, [products]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <AllProductCount products={products} />
            </div>
            <Card className="max-w-5xl mx-auto">
                <CardHeader className="flex flex-row items-center justify-between flex-wrap">
                <CardTitle className="text-2xl font-bold">Lista de Produtos</CardTitle>
                <LinkButton
                    href="/add"
                    text="Adicionar Produto"
                    classes="scheme-light text-black font-medium flex items-center gap-2 hover:cursor-pointer hover:scale-103 transition-all duration-300"
                    icon={<Plus className="h-4 w-4" />}
                />
                </CardHeader>
                <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.length === 0 ? (
                    <p className="text-muted-foreground col-span-full text-center py-8">Nenhum produto cadastrado</p>
                    ) : (
                    products.map((product) => (
                        <Card key={product._id} className="overflow-hidden">
                        <CardHeader className="bg-muted/50 pb-2">
                            <CardTitle className="text-lg font-medium">{product.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Preço:</span>
                                <span className="font-medium">R$ {product.price}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Estoque:</span>
                                <span className="font-medium">{product.quantity} unidades</span>
                            </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between gap-2 pt-2">
                            <LinkButton
                            href={`/product/${product._id}`}
                            text="Detalhes"
                            classes="bg-blue-500 hover:bg-blue-600 text-white font-medium flex-1 hover:cursor-pointer"
                            />
                            <DelButton id={product._id} />
                        </CardFooter>
                        </Card>
                    ))
                    )}
                </div>
                </CardContent>
            </Card>

            {/* <div className="container w-1/4 m-auto mt-10 p-4 border rounded">
            <h1 className="text-2xl font-bold">Lista de Produtos</h1>
                {products.map((product) => (
                    <div key={product._id} className="p-2 my-2">
                    {product.name} - R$ {product.price} - {product.quantity} unidades
                    <LinkButton href={`/product/${product._id}`} text='Detalhes' classes='ml-7 mr-2 bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold p-2' />
                    <DelButton id={product._id} />
                    </div>
                ))}
                <LinkButton href='/add' text='Adicionar Produto' classes='bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold p-6 mt-10' />
            </div> */}
        </div>
    );
}