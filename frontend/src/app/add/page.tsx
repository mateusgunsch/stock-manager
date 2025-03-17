'use client';
import { useState, useEffect } from 'react';
import { addProduct } from '@/services/api';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LinkButton from '@/components/LinkButton';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AddProduct() {
    const [product, setProduct] = useState({name: '', price: 0, quantity: 0, description: ''});
    const { status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            redirect('/login');
        }
    }, [status]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addProduct(product);
    };

    return (
        <div className='container w-full max-w-lg m-auto mt-10 p-4 border rounded'>
            <h1 className="text-2xl font-bold mb-4">Adicionar Produto</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Label htmlFor="name">Nome:</Label>
                <Input
                    id='name'
                    className="p-2 w-full" 
                    placeholder="Nome do Produto" 
                    value={product.name} 
                    onChange={(e) => setProduct({ ...product, name: e.target.value })} 
                />

                <Label htmlFor="price">Preço:</Label>
                <Input
                    id='price'
                    type='number'
                    step={0.01}
                    className="p-2 w-16" 
                    placeholder="Preço" 
                    value={product.price} 
                    onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                />

                <Label htmlFor="quantity">Quantidade:</Label>
                <Input
                    id='quantity'
                    type='number'
                    className="p-2 w-16" 
                    placeholder="Quantidade"
                    value={product.quantity} 
                    onChange={(e) => setProduct({ ...product, quantity: Number(e.target.value) })} 
                />

                <Label htmlFor="desc">Descrição: (Opcional)</Label>
                <Textarea
                    id='desc'
                    placeholder='Descrição do Produto...'
                    value={product.description}
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                />

            <Button type="submit" className="bg-indigo-500 hover:bg-indigo-600 hover:cursor-pointer text-white font-bold p-2 w-full">Salvar</Button>
        </form>
        <LinkButton href='/' text='Voltar' classes='bg-indigo-500 hover:bg-indigo-600 hover:cursor-pointer text-white font-bold p-2 mt-6 w-full' />
        </div>
    );
}