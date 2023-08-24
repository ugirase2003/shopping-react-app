import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  RemoveCatProducts,
  setCatProducts,
} from "../redux/actions/productAction";
import Loader from "../components/assets/Loader";

// subcategory eg.men is catgeory and   men - tshirt  is subcategory
const SubCategoryWiseView = () => {
  const { category, subCat } = useParams();
  const [NoData, setNoData] = useState(false);

  useEffect(() => {
    fetch();

    return () => {
      setNoData(false);
      dispatch(RemoveCatProducts());
    };
  }, [subCat]);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.catProducts);
  console.log("renderd");
  const fetch = async () => {
    const res = await axios
      .get(process.env.REACT_APP_BASE_URL+`/categorywise/${category}/${subCat}`)
      .catch((e) => {
        console.log("error", e);
      });
    console.log(res, "resdata");
    res.data.length === 0 ? setNoData(true) : dispatch(setCatProducts(res.data));

    dispatch(setCatProducts(res.data));
  };

  const renderlist = products.products.map((item, index) => {
    return (
      <div key={index}>
        <Link to={"/productdetail/" + item._id}>
          <div className="w-full min-h-[300px]  rounded-sm shadow-sm cursor-pointer flex flex-col justify-between hover:scale-105 duration-150 h-full">
            <img src={item.image} />
            <div className="p-3">
              <p className="font-semibold">{"Wrogn"}</p>
              <p className="text-gray-600 ">{item.title}</p>
              <div className="w-full flex justify-between pr-2 flex-col md:flex-row flex-wrap">
                <span className="font-bold">{item.price + " Rs."}</span>{" "}
                <span>{"Quantity: " + 12}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-0">
      <p className="text-xs text-gray-500 uppercase mt-5 mb-5">
        {"Category  / " + category}
      </p>
      <div className="w-full h-[100px] sm:h-[150px]">
        <img
          src="https://sslimages.shoppersstop.com/sys-master/root/h14/h93/30236538142750/SAVE23-Coupon-Code-1840x250-Web----new-code--2023-06--22-hp.jpg"
          className="w-full h-full object-fill mt-5"
        />
      </div>

      <div className=" relative grid text-sm sm:text-base sm:grid-cols-4 grid-cols-2 lg:grid-cols-6 gap-8  w-full min-h-[200px]">
        {!NoData ? (
          products.products.length === 0 ? (
            <Loader />
          ) : (
            renderlist
          )
        ) : (
          <div className="flex justify-center items-center font-bold  text-lg absolute inset-0">
            Sorry We Don't Have Stuff For You
          </div>
        )}
      </div>
    </div>
  );
};

export default SubCategoryWiseView;
