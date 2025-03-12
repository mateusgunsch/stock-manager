'use client';

import { Product } from "@/interface/Product";
import { fetchProductById, updateProduct } from "@/services/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetchProductById(id).then(setProduct);
    }, [id]);


    if (!product) return <p>Carregando...</p>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUpdate = async (e: any) => {
        e.preventDefault();
        await updateProduct(id, product);
        alert('Produto Atualizado!');
    };

    return (
        <>
            <form onSubmit={handleUpdate} className="space-y-4">
                <label htmlFor="name">Nome: </label>
                <input
                className="border p-2 w-full"
                placeholder="Nome do Produto"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                />

                <label htmlFor="price">Preço: </label>
                <input
                className="border p-2 w-full"
                placeholder="Preço"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                />

                <label htmlFor="quantity">Quantidade: </label>
                <input
                className="border p-2 w-full"
                placeholder="Quantidade"
                value={product.quantity}
                onChange={(e) => setProduct({ ...product, quantity: Number(e.target.value) })}
                />

                <button type="submit" className="bg-blue-500 text-white p-2 hover:cursor-pointer hover:bg-blue-700 rounded">
                Salvar
                </button>
            </form>
            <a href={`/product/${id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-2 py-1">Cancelar</a>
        </>
    );
};

export default EditProduct;
