import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";

const ProductCard = ({ data,isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Sản phẩm đã trong giỏ hàng!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Thêm sản phẩm vào giỏ hàng thành công!");
      }
    }
  };

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-sm relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link  
        onClick={() => {
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });}}
         to={`${isEvent === true ? `/san-pham/${data.slug}?isEvent=true` : `/san-pham/${data.slug}`}`}>
          <img
            src={`${backend_url}${data.images && data.images[0]}`}
            alt=""
            className="w-full object-contain  p-2"
          />
        </Link>
       
        <Link 
        onClick={() => {
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });}}
        to={`${isEvent === true ? `/san-pham/${data.slug}?isEvent=true` : `/san-pham/${data.slug}`}`}>
          <h4 className="font-[500] text-center mt-2 text-xl text-[orange]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="py-1 flex items-center text-center justify-center">
            <div className="price">
            <h4 className={`${styles.productDiscountPrice} text-xl text-[green]`}>
              {data.originalPrice === 0
                ? data.originalPrice
                : data.discountPrice.toLocaleString(navigator.language, {
                    minimumFractionDigits: 0,
                  })}
              đ
            </h4>
            <h4 className={`${styles.price} text-lg pl-0`}>
              {data.originalPrice
                ? data.originalPrice.toLocaleString(navigator.language, {
                    minimumFractionDigits: 0,
                  }) + " đ"
                : null}
            </h4>
            
            </div>

          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
        
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to cart"
          />
        </div>
      </div>
    </>
  );
};

export default ProductCard;
