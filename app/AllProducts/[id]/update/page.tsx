"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        setProduct(response.data);
        setProductName(response.data.name);
        setPrice(response.data.price);
        setImageUrl(response.data.image);
      } catch (err) {
        setError("Failed to load product");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    const updatedProduct = {
      name: productName,
      price: price,
      image: imageUrl,
    };

    axios
      .put(`http://localhost:5000/products/${id}`, updatedProduct)
      .then((response) => {
        alert("Product updated successfully!");
        router.push("/");
      })
      .catch((error) => {
        setError("Failed to update product");
        console.error("Error updating product:", error);
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 font-semibold">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          <div className="text-red-600 font-semibold text-lg mb-4">{error}</div>
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            ← Back
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Update Product
            </h1>
            <p className="text-gray-600">
              Modify the product details and save your changes
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 rounded">
              <p className="text-red-700 font-semibold">{error}</p>
            </div>
          )}

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
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors text-gray-800"
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
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  required
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors text-gray-800"
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
                  placeholder="Enter image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors text-gray-800"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={updating}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors duration-200"
              >
                {updating ? "Updating..." : "Update Product"}
              </button>
              <Link
                href="/"
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg text-center transition-colors duration-200"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;