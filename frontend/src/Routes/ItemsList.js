import React, { useState, useEffect, useContext } from "react";
import { ItemCard } from "../components/subComp/ItemCard";
import Carousel from "../components/subComp/Carousel";
import GoToTop from "../components/subComp/GoToTop";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CategoryOfferCard from "../components/subComp/CategoryOfferCard";

const ItemsList = () => {
  const [smallBanner, setSmallBanner] = useState(false);
  const Category_Offer_Data = [
    {
      category: "Men",
      offer: "40%-80%",
      img: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      category: "Kids",
      offer: "30%-50%",
      img: "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      category: "Women",
      offer: "25%-60%",
      img: "https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];


  return (
    <SkeletonTheme baseColor="white" highlightColor="#C8C6C5 ">
      <div className="max-w-[1400px] mx-auto">
        <div className=" mb-5  mt-5 h-[80px] sm:h-[150px] border  w-full relative overflow-hidden shadow-md grid grid-cols-2 ">
          {smallBanner ? null : <Skeleton className="absolute w-full h-full" />}
          <img
            src="https://img1.junaroad.com//assets/images/mobileNotif/img-1690634797428.jpg?crsl_pos=3"
            className="w-full  max-h-[150px] object-contain "
          />
          <img
            src="https://img1.junaroad.com//assets/images/mobileNotif/img-1679910119705.jpg?crsl_pos=3"
            className="w-full max-h-[150px]   object-contain "
            onLoad={() => {
              setSmallBanner(true);
            }}
          />
        </div>
        <div>
          <Carousel
            slides={[
              
              "https://sslimages.shoppersstop.com/sys-master/root/h00/h28/30739403505694/adios-old-school-web--2023-088--23--new-sizee.jpg",
              "https://img.freepik.com/premium-vector/best-season-sale-banner-design-template_2239-1175.jpg",
              "https://sslimages.shoppersstop.com/sys-master/root/h50/h42/30721089470494/rakhi-main-web---hp-page-main-crousel-20230821.jpg"
            ]}
          />
        </div>

        <p className="font-bold text-lg mt-8 text-center uppercase ">
          SHOP by category
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10   items-center justify-center mt-8 w-[90%] sm:w-full mx-auto">
          {Category_Offer_Data.map((item) => {
            return <CategoryOfferCard item={item} />;
          })}
        </div>

        <div>
          <div className="relative py-2 grid text-sm sm:text-base sm:grid-cols-4 grid-cols-2 lg:grid-cols-6  gap-0 bg shadow-lg  mt-5 min-h-[200px]  ">
            <ItemCard />
          </div>
        </div>
        <GoToTop />
      </div>
    </SkeletonTheme>
  );
};

export default ItemsList;
