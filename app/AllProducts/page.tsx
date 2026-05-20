"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdAdd, MdVisibility, MdEdit, MdDelete, MdAccountCircle, MdLogout } from "react-icons/md";
import { useAuth } from "../AuthProvider/page";
import { useRouter } from "next/navigation";


interface Products {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Page = () => {
  const router = useRouter();
  const {user, logout} = useAuth();
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

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              All Products
            </h1>
            <p className="text-gray-600">Discover our collection</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/AddProduct"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              <MdAdd className="w-5 h-5" />
              Add Product
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                  <MdAccountCircle className="w-6 h-6 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700 truncate max-w-xs">
                    {user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  <MdLogout className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/Login"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                Login
              </Link>
            )}
          </div>
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
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-indigo-600">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 w-full">
                  <Link
                    href={`/AllProducts/${product.id}`}
                    className="flex items-center justify-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold border-2 border-indigo-600 hover:border-indigo-800 py-2 px-4 rounded-lg transition-colors w-full"
                  >
                    <MdVisibility className="w-4 h-4" />
                    View
                  </Link>
                  <Link
                    href={`/AllProducts/${product.id}/update`}
                    className="flex items-center justify-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold border-2 border-indigo-600 hover:border-indigo-800 py-2 px-4 rounded-lg transition-colors w-full"
                  >
                    <MdEdit className="w-4 h-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full"
                  >
                    <MdDelete className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-600 text-lg">No products available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
