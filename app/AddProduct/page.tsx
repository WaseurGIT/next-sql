"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      name: productName,
      price: price,
      image: imageUrl,
    };

    axios
      .post("http://localhost:5000/products", newProduct)
      .then((response) => {
        alert("Product added successfully!");
        console.log("Product added successfully:", response.data);
        setProductName("");
        setPrice(0);
        setImageUrl("");
        router.push("/");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            Back
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Add Product</h1>
          <p className="text-gray-600 mb-8">
            Fill in the details to create a new product
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Price
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-500 text-lg">
                  $
                </span>
                <input
                  type="text"
                  placeholder="0.00"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Product Image
              </label>
              <div className="space-y-4">
                {imageUrl && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-indigo-200">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Add Product
              </button>
              <button
                type="button"
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
