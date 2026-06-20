"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from '../shared/ProductCard';
import ProductModal, { Product } from '../shared/ProductModal'; // tomar actual path diyo

import { useGetProductsQuery } from '@/redux/api/productApi'; // tomar actual path diyo
import { useAppDispatch } from '@/redux';
import { addToCart, decreaseQuantity } from '@/redux/slices/cartSlice';
import { mapProductForCard } from '@/utils/Productcardmapper';

const filters = [
    { id: 'all', label: 'ALL PRODUCTS' },
    { id: 'new', label: 'NEW ARRIVALS' },
    { id: 'best', label: 'BEST SELLER' },
    { id: 'popular', label: 'MOST POPULAR' },
    { id: 'featured', label: 'FEATURED' },
];

// Filter UI id -> API query param mapping
// (tomar productApi te jodi alada query param name thake, eখানে map kore nio)
const filterToQuery: Record<string, Record<string, any>> = {
    all: {},
    new: { isNew: true },
    best: { isFeatured: true }, // example — tomar API te "bestSeller" field thakle change koro
    popular: { sort: '-numReviews' },
    featured: { isFeatured: true },
};

const PopularProducts: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const dispatch = useAppDispatch();
    const router = useRouter();

    // ---- Real API call ----
    const { data, isLoading, isError } = useGetProductsQuery({
        limit: 10,
        status: 'active',
        ...filterToQuery[activeFilter],
    });

    const products: Product[] = (data?.data || []) as Product[];

    // ---- Quick View Modal state ----
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleOpenModal = (product: Product) => setSelectedProduct(product);
    const handleCloseModal = () => setSelectedProduct(null);

    const handleAddToCart = (product: Product, variant: any, quantity: number) => {
        dispatch(
            addToCart({
                id: product._id,
                name: product.name,
                price: variant ? variant.salePrice || variant.regularPrice : (product.salePrice || product.regularPrice),
                mrp: variant ? variant.regularPrice : product.regularPrice,
                image: product.thumbnail,
                category: product.categoryID?.name || '',
            })
        );
    };

    const relatedProducts = selectedProduct
        ? products.filter((p) => p._id !== selectedProduct._id).slice(0, 4)
        : [];

    return (
        <div className='container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-20'>
            {/* Section Header - Left Aligned */}
            <div className='mb-12'>
                <h2 className='text-3xl font-bold text-gray-900 mb-8'>
                    Popular Departments
                </h2>

                {/* Filter Tabs - Left Aligned */}
                <div className='flex flex-wrap gap-4'>
                    {filters.map(filter => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`px-6 py-2.5 text-[13px] font-bold tracking-wider rounded-md transition-all ${activeFilter === filter.id
                                ? 'bg-[var(--color-primary)] text-white shadow-xl shadow-[var(--color-primary)]/20'
                                : 'bg-white text-gray-500 border border-gray-100 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
                <div className='text-center py-10 text-gray-500'>Loading products...</div>
            ) : isError ? (
                <div className='text-center py-10 text-red-500'>Failed to load products.</div>
            ) : products.length === 0 ? (
                <div className='text-center py-10 text-gray-400'>No products found.</div>
            ) : (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
                    {products.slice(0, 10).map(product => (
                        <ProductCard
                            key={product._id}
                            product={mapProductForCard(product)}
                            onClick={() => handleOpenModal(product)}
                        />
                    ))}
                </div>
            )}

            {/* ---- Quick View Product Modal ---- */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    relatedProducts={relatedProducts}
                    onClose={handleCloseModal}
                    onAddToCart={handleAddToCart}
                    onBuyNow={(product, variant, quantity) => {
                        handleAddToCart(product, variant, quantity);
                        router.push('/checkout');
                    }}
                    onAddRelated={(rp) => handleAddToCart(rp, null, 1)}
                    onDecreaseRelated={(rp) => dispatch(decreaseQuantity(rp._id))}
                />
            )}
        </div>
    );
};

export default PopularProducts;