import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../containers";
import { Button, ProductCard } from "../components";
import { BiCategoryAlt, BiFoodTag } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { ClipLoader } from "react-spinners";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa6";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const token = Cookies.get("auth_token");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCat = async () => {
    try {
      const response = await axios.get("/category");
      setCategories(response?.data?.categoryList);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const fetchPro = async () => {
    try {
      setIsLoadingProducts(true);
      const response = await axios.get("/product");
      setAllProducts(response?.data?.productList); // Save all products
      setProducts(response?.data?.productList);
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchCat();
    fetchPro();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filteredProducts = allProducts.filter(
        (p) => p.category._id === selectedCategory._id
      );
      setProducts(filteredProducts);
    } else {
      setProducts(allProducts); // Show all products if no category is selected
    }
  }, [selectedCategory, allProducts]);

  const deleteProduct = async (productId) => {
    const config = {
      headers: {
        token: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.delete(`/product/${productId}`, config);
      if (response?.status === 204) {
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p._id !== productId)
        );
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex flex-col relative min-h-screen">
      <Navbar />
      <section className="flex-grow w-full container mx-auto px-5 md:px-0 lg:px-8 pt-14">
        <h1 className="relative w-fit mx-auto text-black text-2xl md:text-3xl lg:text-4xl font-grotesk font-[500] uppercase leading-[1.3] after:w-2 after:h-2 lg:after:w-3 lg:after:h-3 after:bg-black after:absolute after:bottom-2 after:-right-3 lg:after:-right-4">
          LEVA LOUNGE
        </h1>
        <div className="mt-4">
          <h3 className="text-base lg:text-xl font-[500] font-nunito text-myGold">
            Dashboard
          </h3>
        </div>
        <div className="products_display my-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base lg:text-lg">Categories</h3>
            <Button
              label="Add category"
              onClick={() => navigate("/admin/add_category")}
            />
          </div>
          <ul className="categories flex items-center gap-3 capitalize overflow-scroll">
            {categories.map((c) => (
              <div
                className="w-fit max-w-[120px] cursor-pointer"
                key={c._id}
                onClick={() => setSelectedCategory(c)}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto bg-myBrown relative">
                  <img
                    src={c.image}
                    alt=""
                    className="w-full h-full object-cover bg-center"
                  />
                  {selectedCategory === c && (
                    <>
                      <span className="absolute bg-black bg-opacity-50 w-full h-full top-0 left-0 z-20"></span>
                      <span className="bg-white p-2 absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] z-30">
                        <FaCheck />
                      </span>
                    </>
                  )}
                </div>
                <p className="mt-2 text-center text-xs uppercase line-clamp-2">
                  {c.name}
                </p>
              </div>
            ))}
          </ul>
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base lg:text-lg">Products</h3>
              <Button
                label="Add product"
                onClick={() => navigate("/admin/add_product")}
              />
            </div>
            <div>
              {isLoadingProducts ? (
                <div className="w-full min-h-[400px] md:min-h-[250px] flex justify-center items-center">
                  <ClipLoader size={30} color="#040D12" />
                </div>
              ) : (
                <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
                  {products.map((p) => (
                    <ProductCard
                      key={p._id}
                      admin={true}
                      productDetails={p}
                      onDelete={deleteProduct}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
