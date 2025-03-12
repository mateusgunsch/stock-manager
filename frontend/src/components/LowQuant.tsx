import { Product } from "@/interface/Product";
import { Card, CardContent } from "./ui/card"
import LinkButton from "./LinkButton";

const LowQuant = ({ products }: { products: Product[] }) => {
    const lowItems = products.filter(product => product.quantity < 10);
    return (
        <div className="max-w-5xl mx-auto container w-full mt-4">
            <Card>
                <CardContent className="px-6 py-4">
                    <p className="text-sm font-medium text-muted-foreground pb-4">Produtos abaixo de 10 unidades</p>
                    <div className="columns-1 sm:columns-2 md:columns-3 space-y-4 gap-4">
                        {lowItems.map(product => (
                            <div key={product._id} className="flex gap-2">
                                <p className="text-2xl font-bold">{product.name}</p>
                                <LinkButton href={`/product/${product._id}`} text="Detalhes" classes="bg-indigo-500 hover:bg-indigo-600 text-white hover:cursor-pointer w-full h-8" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default LowQuant