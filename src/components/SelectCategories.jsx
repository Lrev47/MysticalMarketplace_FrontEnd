import { useGetAllProductsQuery } from "../StoreApi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductDisplay from "./ProductDisplay";

const CategoryLinks = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetAllProductsQuery();
  const [categoryNames, setcategoryNames] = useState([]);
  const [category, setCategory] = useState("");

  console.log("THE ORIGINAL DATA", data);

  const handleClick = (category) => {
    setCategory(category);
    navigate(`/Categories/${category}`);
    window.scrollTo({ top: 0, behavior: "smooth" });

    console.log("You Clicked Category: ", category);
  };
  useEffect(() => {
    if (data) {
      const categories = data.map((product) => product.category);
      const removeExtraCategoryNames = Array.from(new Set(categories));
      const RemoveUltraGear = removeExtraCategoryNames.indexOf("Ultra Gear");
      if (RemoveUltraGear !== -1) {
        removeExtraCategoryNames.splice(RemoveUltraGear, 1);
      }
      setcategoryNames(removeExtraCategoryNames);
    }
  }, [data]);

  const categoryImageUrls = {
    "Home Essentials": "https://imagizer.imageshack.com/img924/8539/i0KZTe.png",
    Fitness: "https://imagizer.imageshack.com/img922/9974/leavjk.png",
    Electronics: "https://imagizer.imageshack.com/img923/2039/Wvayfk.png",
    Groceries: "https://imagizer.imageshack.com/img924/7457/P4yQXb.png",
    "Home Decor": "https://imagizer.imageshack.com/img922/5876/Zw5zry.png",
    Accessories: "https://imagizer.imageshack.com/img923/1213/4Nnj87.png",
    Stationery: "https://imagizer.imageshack.com/img924/5995/BYtg44.png",
    Apparel: "https://imagizer.imageshack.com/img922/4590/lMahRS.png",
    Books: "https://imagizer.imageshack.com/img923/1907/nDUvdd.png",
    Health: "https://imagizer.imageshack.com/img922/1935/nQZRS2.png",
    Occult: "https://imagizer.imageshack.com/img924/4258/Dcol1w.png",
    Weapons: "https://imagizer.imageshack.com/img923/2323/MTw1uW.png",
    Beverages: "https://imagizer.imageshack.com/img924/3956/2dJXQH.png",
    Kitchenware: "https://imagizer.imageshack.com/img923/7987/Zv7ju5.png",
    Jewelry: "https://imagizer.imageshack.com/img924/2043/vd4iNI.png",
    Outdoor: "https://imagizer.imageshack.com/img922/1300/DnVGRW.png",
    Collectibles: "https://imagizer.imageshack.com/img923/9231/rb6Edm.png",
    Lighting: "https://imagizer.imageshack.com/img922/8413/98mgm4.png",
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  0;

  return (
    <>
      <div className="CategoryDisplayContainer">
        {categoryNames.map((category, index) => (
          <div
            onClick={() => handleClick(category)}
            key={index}
            //Didnt know how to accomplish this so i asked chat gpt
            className="CategoryContainer"
            style={{
              backgroundImage: `url(${categoryImageUrls[category]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="CategoryOverlay">{category}</div>
          </div>
        ))}
      </div>
      <div className="ProductDisplayContainerTwo">
        <ProductDisplay />
      </div>
    </>
  );
};
export default CategoryLinks;
