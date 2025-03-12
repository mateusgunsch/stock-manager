import { deleteProduct } from "@/services/api";
import { Button } from "./ui/button";

const DelButton = ( { id } : { id: string }) => {

    const handleDelete = async () => {
        await deleteProduct(id);
        alert('Produto Removido!');
    }

    return (
        <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 hover:cursor-pointer text-white font-bold p-2">Deletar</Button>
    )
}

export default DelButton