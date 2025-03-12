import type { Product } from "@/interface/Product"
import ProductCard from "./ProductCard"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"


const ProductGrid = ({ products, productsPerPage = 6 }: {products: Product[], productsPerPage?: number}) => {
    const [currentPage, setCurrentPage] = useState(1)

    // Calculate total pages
    const totalPages = Math.ceil(products.length / productsPerPage)

    // Get current products
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

    // Change page
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
        }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length === 0 ? (
                    <p className="text-muted-foreground col-span-full text-center py-8">Nenhum produto cadastrado</p>
                ) : (
                    currentProducts.map((product) => <ProductCard key={product._id} product={product} />)
                )}
            </div>
    
            {/* Pagination Controls */}
            {products.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-between mt-8">
                <Button
                variant="outline"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="flex items-center gap-1"
                >
                <ChevronLeft className="h-4 w-4" />
                Anterior
                </Button>
    
                <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => setCurrentPage(i + 1)}
                    >
                    {i + 1}
                    </Button>
                ))}
                </div>
    
                <Button
                variant="outline"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1"
                >
                Próxima
                <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
            )}
        </div>
    )
}

export default ProductGrid