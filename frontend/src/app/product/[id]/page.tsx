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
        <>
            <div>
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <p>Preço: R$ {product.price}</p>
                <p>Quantidade: {product.quantity}</p>
            </div>
            <LinkButton href={`${product._id}/edit`} text='Editar' classes='bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold p-2 m-3' />
            <DelButton id={product._id} />
            <LinkButton href='/' text='Início' classes='bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold p-2 m-3' />
        </>
    );
}