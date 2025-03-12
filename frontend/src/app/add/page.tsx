'use client';
import { useState } from 'react';
import { addProduct } from '@/services/api';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LinkButton from '@/components/LinkButton';

export default function AddProduct() {
    const [product, setProduct] = useState({name: '', price: 0, quantity: 0});

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await addProduct(product);
        alert('Produto Adicionado!');
    };

    return (
        <div className='container w-full max-w-lg m-auto mt-10 p-4 border rounded'>
            <h1 className="text-2xl font-bold mb-4">Adicionar Produto</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Label htmlFor="name">Nome:</Label>
                <Input
                    className="border p-2 w-full" 
                    placeholder="Nome do Produto" 
                    value={product.name} 
                    onChange={(e) => setProduct({ ...product, name: e.target.value })} 
                />

                <Label htmlFor="price">Preço:</Label>
                <Input 
                    type='number'
                    step={0.01}
                    className="border p-2 w-16" 
                    placeholder="Preço" 
                    value={product.price} 
                    onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                />

                <Label htmlFor="quantity">Quantidade:</Label>
                <Input
                    type='number'
                    className="border p-2 w-16" 
                    placeholder="Quantidade"
                    value={product.quantity} 
                    onChange={(e) => setProduct({ ...product, quantity: Number(e.target.value) })} 
                />

            <Button type="submit" className="bg-indigo-500 hover:bg-indigo-600 hover:cursor-pointer text-white font-bold p-2 w-full">Salvar</Button>
        </form>
        <LinkButton href='/' text='Voltar' classes='bg-indigo-500 hover:bg-indigo-600 hover:cursor-pointer text-white font-bold p-2 mt-6 w-full' />
        </div>
    );
}