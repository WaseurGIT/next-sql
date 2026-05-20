"use client";

import axios from "axios";
import React, { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
// import { ArrowLeft, ShoppingCart, Loader } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Page = () => {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((response) => {
        console.log("API DATA:", response.data);
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setError("Failed to load product details");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          {/* <Loader className="w-12 h-12 text-indigo-600 animate-spin" /> */}
          <p className="text-gray-600 mt-4">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-gray-600 text-lg mb-6">
            {error || "Product not found"}
          </p>
          <Link
            href="/AllProducts"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            {/* <ArrowLeft className="w-4 h-4" /> */}
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/AllProducts"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-8 transition-colors"
        >
          {/* <ArrowLeft className="w-4 h-4" /> */}
          Back to Products
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 p-4">
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md h-96 bg-gray-200 rounded-xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>

              <div className="mb-8">
                <p className="text-gray-600 text-sm mb-2">
                  Price{" "}
                  <span className="font-bold text-2xl text-indigo-600">${product.price.toFixed(2)}</span>
                </p>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors shadow-md hover:shadow-lg">
                  {/* <ShoppingCart className="w-5 h-5" /> */}
                  Add to Cart
                </button>
                <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition-colors">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
