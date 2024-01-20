import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { FaStar } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { motion } from "framer-motion";
import Modal from "./Modal";

const ProductCard = ({ admin, productDetails, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleDelete = () => {
    onDelete(productDetails._id);
  };

  const handleImageClick = () => {
    setModalImage(productDetails?.image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "tween", duration: 0.5 }}
      className="bg-[#76453B] shadow-md p-2 md:p-3 flex flex-col gap-3"
    >
      <div className="w-full h-40 md:h-44 relative">
        {admin && (
          <span className="absolute w-full h-full bg-black bg-opacity-50"></span>
        )}
        <img
          className="w-full h-full object-cover object-center cursor-pointer"
          src={productDetails?.image}
          alt="product"
          onClick={handleImageClick}
        />
        {admin && (
          <Link to={`/admin/edit_product/${productDetails._id}`}>
            <span className="absolute right-3 top-3 z-10 p-2 cursor-pointer bg-myBrown text-white border-[1px] border-white text-base transition-all duration-300">
              <FiEdit2 />
            </span>
          </Link>
        )}
        {admin && (
          <span
            className="absolute right-3 bottom-3 z-10 p-2 cursor-pointer bg-myBrown text-white border-[1px] border-white text-base transition-all duration-300"
            onClick={handleDelete}
          >
            <AiOutlineDelete />
          </span>
        )}
      </div>

      <div>
        <p className="text-sm md:text-base font-inter font-[500] text-white line-clamp-2 mb-2">
          {productDetails?.name}
        </p>
        <p className="text-xs md:text-sm text-white line-clamp-2 mb-2">
          {productDetails?.desc}{" "}
        </p>
        <div className="flex gap-2 justify-between">
          <span className="text-sm md:text-base lg:text-lg font-inter text-white font-[600]">
            ₦ {productDetails?.price}
          </span>
          {productDetails?.vipPrice && (
            <div className="flex items-center gap-1">
              <span className="text-sm md:text-base lg:text-lg font-inter text-white font-[600]">
                ₦ {productDetails?.vipPrice}
              </span>
              <FaStar className="text-white" />
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <img src={modalImage} alt="product" />
        </Modal>
      )}
    </motion.div>
  );
};

export default ProductCard;
