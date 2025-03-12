import { deleteProduct } from "@/services/api";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

const DelButton = ( { id } : { id: string }) => {

    const handleDelete = async () => {
        if (confirm('Voce realmente deseja deletar esse produto?')) {
            await deleteProduct(id);
            alert('Produto Removido!');
        }
    }

    return (
        <Button onClick={handleDelete} variant="destructive" className="font-medium hover:cursor-pointer max-w-fit bg-red-700 transition-all duration-200"> <Trash2 className="h-4 w-4" /> Deletar</Button>
    )
}

export default DelButton