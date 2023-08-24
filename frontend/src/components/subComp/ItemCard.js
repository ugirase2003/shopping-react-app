import React, { useContext, useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../redux/actions/productAction";

import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../assets/Loader";
import { Cart_Context } from "../Context/CartSizeContext";

export const ItemCard = () => {
  const products = useSelector((state) => state.allProducts);
  console.log("products all", products);
  const cartCon = useContext(Cart_Context);
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    const res = await axios
      .get(process.env.REACT_APP_BASE_URL+"/allitems")
      .catch((err) => {
        console.log(err);
      });

    dispatch(setProducts(res.data.items));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // here is item card nd we are renering all the data with given below layout
  const renderlist = products.products.map((item, index) => {
    return (
      <div key={index}>
        <Link to={"/productdetail/" + item._id}>
          <div className="w-full min-h-[300px]  rounded-md shadow-md cursor-pointer flex flex-col justify-between hover:scale-105 duration-150 h-full bg-white ">
            <img src={item.img[0]} />
            <div className="p-3">
              <p className="font-semibold">{item.brand}</p>
              <p className="text-gray-600 ">{item.title}</p>
              <div className="w-full flex justify-between pr-2 flex-col md:flex-row flex-wrap">
                <span className="font-bold">{item.off_price + " Rs."}</span>{" "}
                <span>{"MRP: " + item.o_price}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <>
    {/* here we are setting loader till the fetch operation */}
      {products.products.length === 0 ? (
        <div>
          <Loader />
        </div>
      ) : (
        renderlist
      )}
    </>
  );
};
