import type { Product } from "@/interface/Product"
import ProductCard from "./ProductCard"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc" | "quantity-asc" | "quantity-desc"

const ProductGrid = ({ products: initialProducts, productsPerPage = 6 }: {products: Product[], productsPerPage?: number}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [sortOption, setSortOption] = useState<SortOption>("name-asc")
    const [products, setProducts] = useState<Product[]>(initialProducts)

      // Sort products when sort option or initial products change
    useEffect(() => {
        const sortedProducts = [...initialProducts].sort((a, b) => {
            switch (sortOption) {
                case "name-asc":
                return a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" })
                case "name-desc":
                return b.name.localeCompare(a.name, "pt-BR", { sensitivity: "base" })
                case "price-asc":
                return a.price - b.price
                case "price-desc":
                return b.price - a.price
                case "quantity-asc":
                return a.quantity - b.quantity
                case "quantity-desc":
                return b.quantity - a.quantity
                default:
                return 0
            }
        })
        setProducts(sortedProducts)
    }, [initialProducts, sortOption])

    const totalPages = Math.ceil(products.length / productsPerPage)

    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

    useEffect(() => {
        // If current page is greater than total pages, go to last page
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages)
        }
        // If there are no products but we're not on page 1, go to page 1
        else if (products.length === 0 && currentPage !== 1) {
            setCurrentPage(1)
        }
    }, [products, currentPage, totalPages])


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
            {/* Selection */}
            {products.length > 0 && (
                <div className="flex justify-end mb-4 mt-0">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Ordenar por:</span>
                    <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
                        <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
                        <SelectItem value="price-asc">Preço (Ascendente)</SelectItem>
                        <SelectItem value="price-desc">Preço (Descendente)</SelectItem>
                        <SelectItem value="quantity-asc">Quantidade (Ascendente)</SelectItem>
                        <SelectItem value="quantity-desc">Quantidade (Descendente)</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                </div>
            )}
        
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length === 0 ? (
                    <p className="text-muted-foreground col-span-full text-center py-8">Nenhum produto cadastrado</p>
                ) : currentProducts.length === 0 ? (
                    <p className="text-muted-foreground col-span-full text-center py-8">Nenhum produto nesta página. 
                    <Button variant="link" onClick={() => setCurrentPage(1)}>Voltar para página 1</Button></p>
                ): (
                    currentProducts.map((product) => <ProductCard key={product._id} product={product} />)
                )}
            </div>
    
            {/* Pagination Controls */}
            {products.length > 0 && totalPages > 1 && (
            <div className="flex flex-col gap-2 sm:flex-row items-center justify-between mt-8">
                <Button
                variant="outline"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="flex items-center gap-1 hover:cursor-pointer"
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
                        className={`w-8 h-8 p-0 ${currentPage === i + 1 ? "" : "hover:cursor-pointer"}`}
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
                    className="flex items-center gap-1 hover:cursor-pointer"
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