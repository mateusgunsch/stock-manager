import type { Product } from "@/interface/Product"
import { Card, CardContent } from "./ui/card"
import { BarChart3, CircleAlert, Package } from "lucide-react"

const AllProductCount = ({ products } : { products: Product[]}) => {
    const totalProducts = products.length
    const totalStock = products.reduce((total, product) => total + product.quantity, 0)
    const lowItems = products.filter(product => product.quantity < 10);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl mx-auto">
            <Card>
                <CardContent className="flex items-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Package className="h-8 w-8 text-primary" />
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Quantidade de produtos</p>
                    <p className="text-3xl font-bold">{totalProducts}</p>
                </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="flex items-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Quantidade total em estoque</p>
                    <p className="text-3xl font-bold">{totalStock}</p>
                </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="flex items-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <CircleAlert className="h-8 w-8 text-primary" />
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Produtos acabando</p>
                    <p className="text-3xl font-bold">{lowItems.length}</p>
                </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AllProductCount