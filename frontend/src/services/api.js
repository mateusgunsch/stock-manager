import { redirect } from "next/navigation";

const API_URL =  "http://localhost:3001/products";

export const fetchProducts = async () => {
    const response = await fetch(`${API_URL}`);
    return response.json();
};

export async function addProduct(product) {
    if (product.name === '' || product.quantity === 0 || product.price === 0) {
        const err = new Error(`O nome não pode ser vazio.\nA quantidade deve ser maior que 0.\nO preço deve ser maior que 0.`)
        alert(err.message)
        return
    }
    await fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    alert('Produto Adicionado!');
    redirect('/');
}

export async function fetchProductById(id) {
    const res = await fetch(`${API_URL}/${id}`);
    return res.json();
}

export async function updateProduct(id, product, redirected = true) {
    if(product.quantity === 0) {
        deleteProduct(id);
        return
    }
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    if(redirected){
        alert('Produto Atualizado!');
        redirect(`/product/${id}`);
    }
}

export async function deleteProduct(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    alert('Produto Removido!');
    redirect('/');
}