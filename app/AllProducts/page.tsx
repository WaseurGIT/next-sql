"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Products {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Page = () => {
  const [products, setProducts] = useState<Products[]>([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">All Products</h1>
            <p className="text-gray-600">Discover our collection</p>
          </div>
          <Link
            href="/AddProduct"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            {/* <Plus className="w-5 h-5" /> */}
            Add Product
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
            >
              <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-2 truncate">
                  {product.name}
                </h2>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-indigo-600">
                    ${product.price.toFixed(2)}
                  </span>
                  {/* <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            {/* <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" /> */}
            <p className="text-gray-600 text-lg">No products available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
