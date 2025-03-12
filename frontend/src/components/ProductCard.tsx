import type { Product } from "@/interface/Product"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import LinkButton from "@/components/LinkButton"
import DelButton from "@/components/DelButton"
import { Button } from "./ui/button"
import { updateProduct } from "@/services/api"


const ProductCard = ({ product }: {product: Product}) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleQuantChange = async (e: any) => {
        e.preventDefault();
        await updateProduct(product._id, {...product, quantity: (product.quantity + Number(e.target.value))}, false);
    };

    return (
        <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 max-w-5xl min-w-full mx-auto pt-0 flex justify-between">
        <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 pb-2 text-center text-pretty">
            <CardTitle className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            {product.name}
            </CardTitle>
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
            classes="bg-indigo-500 hover:bg-indigo-600 text-white font-medium flex-1 transition-all duration-200 hover:cursor-pointer"
            />
            <DelButton id={product._id} />
            <div className="flex gap-1">
                <Button className="w-0.5 hover:cursor-pointer" onClick={handleQuantChange} value={-1}>-</Button>
                <Button className="w-0.5 hover:cursor-pointer" onClick={handleQuantChange} value={1}>+</Button>
            </div>
        </CardFooter>
        </Card>
    )
}

export default ProductCard

