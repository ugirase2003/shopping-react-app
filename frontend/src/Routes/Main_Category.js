import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  removeMainCatProducts,
  setMainCatProducts,
} from "../redux/actions/productAction";

import axios from "axios";
import Loader from "../components/assets/Loader";
import GoToTop from "../components/subComp/GoToTop";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

// caetgorywise view
const Main_Category = () => {
  const [smallBanner, setSmallBanner] = useState(false);
  const { category } = useParams();
  console.log(category);
  const [laoder, setLoader] = useState(true);
  const [noData, setNoData] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    console.log("Selector in", state);
    return state.setMainCatProducts;
  });

  const fetch = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_BASE_URL+"/categorywise/" + category);
      console.log(res.data);
      res.data.length != 0
        ? dispatch(setMainCatProducts(res.data))
        : setNoData(true);
      setLoader(false);
    } catch (err) {
      console.log("Error in category", err);
    }
  };

  const calPercentage=(mrp,off_price)=>{
    return Math.round(off_price/mrp*100) ;
}


  useEffect(() => {
    fetch();
    return () => {
      setLoader(true);
      setNoData(false);
      dispatch(removeMainCatProducts());
    };
  }, [category]);

  const offer_banner =
    "https://i.pinimg.com/originals/88/d3/c8/88d3c815f5ffbfd4ab1b4d8f7d977385.jpg";

  const renderlist = products.products.map((item, index) => {
    return (
      <div key={index}>
        <Link to={"/productdetail/" + item._id}>
          <div className="max-w-[200px] sm:min-h-[300px]  cursor-pointer flex flex-col justify-between hover:scale-105 duration-150 h-full bg-white ">
          <img src={item.img[1]} className="  h-56 w-full mx-auto object-contain"  />
            <div className="p-2 mx-auto ">
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
    <SkeletonTheme baseColor="white" highlightColor="#C8C6C5 ">
      <div className="max-w-[1400px] mx-auto md:p-0 p-4">
        {/* specific category offer banner */}

        <p className="text-xs text-gray-500 uppercase mt-5 mb-5 ">
          {"Category  / " + category}
        </p>
        <div className=" mb-5  mt-5 h-[80px] sm:h-[150px]  w-full relative overflow-hidden shadow-md flex items-center ">
          {smallBanner ? null : <Skeleton className="absolute w-full h-full" />}
          <img
            src="https://img1.junaroad.com//assets/images/mobileNotif/img-1690634797428.jpg?crsl_pos=3"
            className="w-full h-full my-auto  object-contain"
            onLoad={() => {
              setSmallBanner(true);
            }}
          />
          <img
            src="https://img1.junaroad.com//assets/images/mobileNotif/img-1679910119705.jpg?crsl_pos=3"
            className="w-full h-full my-auto  object-contain"
          />
        </div>
        <div className="relative min-h-[200px]">
          {laoder ? (
            <Loader />
          ) : noData ? (
            <div className="justify-center flex items-center  h-[200px]">
              {" "}
              Sorry We Don't Have Stuff For You
            </div>
          ) : (
            <div className="relative  grid text-sm sm:text-base sm:grid-cols-4 grid-cols-2 lg:grid-cols-6  gap-2 bg shadow-lg  mt-5 min-h-[200px] ">
              {renderlist}
            </div>
          )}
        </div>
        <GoToTop />
      </div>
    </SkeletonTheme>
  );
};

export default Main_Category;
