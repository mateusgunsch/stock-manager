'use client'

interface Product {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}

import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import DelButton from '@/components/DelButton';
import LinkButton from '@/components/LinkButton';

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts().then(setProducts);
    }, [products]);

    return (
        <>
            <div className="container w-1/4 m-auto mt-10 p-4 border rounded">
            <h1 className="text-2xl font-bold">Lista de Produtos</h1>
                {products.map((product) => (
                    <div key={product._id} className="p-2 my-2">
                    {product.name} - R$ {product.price} - {product.quantity} unidades
                    <LinkButton href={`/product/${product._id}`} text='Detalhes' classes='ml-7 mr-2 bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold p-2' />
                    <DelButton id={product._id} />
                    </div>
                ))}
                <LinkButton href='/add' text='Adicionar Produto' classes='bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold p-6 mt-10' />
            </div>
            
        </>
    );
}