'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProductById } from '@/services/api';
import { Product } from '@/interface/Product';
import DelButton from '@/components/DelButton';
import LinkButton from '@/components/LinkButton';

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetchProductById(id).then(setProduct);
    }, [id]);


    if (!product) return <p>Carregando...</p>;


    return (
        <div className='flex flex-col gap-4 container text-center w-full max-w-lg m-auto mt-10 border rounded-lg p-4'>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p><span className='font-bold'>Preço:</span> R$ {product.price}</p>
            <p><span className='font-bold'>Quantidade:</span> {product.quantity}</p>
            <p><span className='font-bold'>Descrição:</span> {product.description}</p>
            <div className='flex flex-col flex-wrap gap-3 md:flex-row place-items-center justify-center mt-6'>
                <LinkButton
                href={`${product._id}/edit`}
                text="Editar"
                classes="bg-indigo-500 hover:bg-indigo-600 text-white font-medium flex-1 hover:cursor-pointer"
                />
                <DelButton id={product._id} />
                <LinkButton
                href='/'
                text="Início"
                classes="bg-indigo-500 hover:bg-indigo-600 text-white font-medium flex-1 hover:cursor-pointer"
                />
            </div>
        </div>
    );
}