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


  const calPercentage=(mrp,off_price)=>{
      return Math.round(off_price/mrp*100) ;
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // here is item card nd we are renering all the data with given below layout
  const renderlist = products.products.map((item, index) => {
    return (
      <div key={index}>
        <Link to={"/productdetail/" + item._id}>
          <div className="max-w-[200px] sm:min-h-[200px] cursor-pointer flex flex-col justify-between hover:scale-105 duration-150 h-full bg-white ">
            <img src={item.img[1]} className="  h-56 w-full mx-auto object-contain"  />
            <div className="p-2 ">
              <p className="font-semibold text-sm">{item.brand}</p>
              <p className="text-gray-600  text-xs">{item.title.length>30?item.title.slice(0,36)+'...':item.title}</p>
              <div className="w-full flex items-center ">
                <span className="font-bold text-sm">{item.off_price + " Rs."}</span>{" "}
                <s className="text-[10px] text-gray-600 ml-[0.5px]">{"MRP: " + item.o_price}</s>
                <span className="text-[9px] font-bold text-orange-500 ml-[0.5px]">{'('+calPercentage(item.o_price,item.off_price)+'%)OFF'}</span>
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
