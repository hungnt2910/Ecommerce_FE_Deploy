import { useEffect, useState } from "react";
import { TbInfoHexagon } from "react-icons/tb";
import { BsTicketPerforated } from "react-icons/bs";
import { FaCheckCircle, FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToWishlistAsync } from "../../redux/slices/wishListSlice";
import { useNavigate } from "react-router-dom";
import { addToCartAsync } from "../../redux/slices/cartSlice";
import { toast, Toaster } from "react-hot-toast";

export const ProductDetailInfo = ({
  product,
  variants,
  attributes,
  onAttributesChange,
  selectedAttributes,
  selectedVariant,
}) => {
  // console.log(product)
  const [liked, setLiked] = useState(product?.wishlist || false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLiked(product?.wishlist || false);
  }, [product]);
  // const cartLoading = useSelector((state) => state.cart.loading);

  const handleAddToWishList = async (productId) => {
      const newLiked = !liked; 
      setLiked(newLiked); 
  
      dispatch(addToWishlistAsync({ productId, status: newLiked }))
        .unwrap()
        .then(() => {
        })
        .catch((err) => {
          console.error("Add To Wish List Failed: ", err);
  
          if (err === 400) {
            toast.error("Please login!!!");
            nav("/login");
          } else {
            toast.error(err);
          }
  
          setLiked(!newLiked); 
        });
    };

  const handleAttributeSelect = (type, value) => {
    const newSelectedAttributes = { ...selectedAttributes };
    if (newSelectedAttributes[type] === value) {
      delete newSelectedAttributes[type]; // Bỏ chọn nếu đã chọn
    } else {
      newSelectedAttributes[type] = value; // Chọn giá trị mới
    }
    onAttributesChange(newSelectedAttributes);
  };

  // Tính toán các giá trị tương thích cho một thuộc tính
  const getCompatibleValues = (type) => {
    const otherSelected = { ...selectedAttributes };
    delete otherSelected[type]; // Loại bỏ thuộc tính hiện tại để kiểm tra

    // Lọc ra các biến thể (variants) mà vẫn thỏa mãn các thuộc tính đã chọn trước đó
    const compatibleVariants = variants.filter((v) =>
      Object.entries(otherSelected).every(([t, val]) =>
        v.attributes.some((attr) => attr.type === t && attr.value === val)
      )
    );

    // Lấy tất cả các giá trị thuộc tính của `type` từ các biến thể phù hợp
    const compatibleValues = new Set(
      compatibleVariants.flatMap((v) =>
        v.attributes
          .filter((attr) => attr.type === type)
          .map((attr) => attr.value)
      )
    );
    return compatibleValues;
  };

  // console.log(selectedVariant);
  // console.log(product);

  const handleAddToCart = async (variantId, quantity) => {
    setIsSelected(true);
    if (!variantId) {
      return;
    }
    dispatch(addToCartAsync({ variantId, quantity }))
      .unwrap()
      .then(() => {
        toast.success("Added to cart!");
      })
      .catch((err) => {
        console.error("Add to Cart Failed:", err);
        toast.error(err);
      });
  };

  const handleBuyNow = () => {
    if (!selectedVariant) {
      alert("Please select full product information before purchasing!");
      return;
    }
    nav("/checkout");
  };

  return (
    <div className="flex flex-col gap-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="pt-4">
        <div className="flex justify-between text-2xl font-semibold text-[#444143]">
          <h2>{product?.name}</h2>
          {selectedVariant && (
            <h2 className="flex items-center gap-5">
              <div className="flex items-center gap-1 relative">
                <span className="block text-2xl text-red-500">
                  $
                  {selectedVariant.salePrice?.toFixed(2) ||
                    selectedVariant.price.toFixed(2)}
                </span>
                {selectedVariant.salePrice && (
                  <>
                    <BsTicketPerforated className="text-red-500" />
                    <FaCheckCircle className="text-sm text-red-500 absolute right-[-5%] bottom-[10%] bg-white" />
                  </>
                )}
              </div>
              {selectedVariant.salePrice && (
                <span className="block line-through text-xl text-[#7b7779]">
                  ${selectedVariant.price.toFixed(2)}
                </span>
              )}
            </h2>
          )}
        </div>
        <h2 className="text-[#ada9ab] text-2xl font-semibold">
          {product?.brand_name}
        </h2>
      </div>
      {attributes.map((attribute) => (
        <div key={attribute.type} className="w-full">
          <h4 className="text-lg font-semibold text-[#444143] mb-2">
            {attribute.type}
          </h4>
          <ul className="flex flex-wrap gap-5">
            {attribute.values.map((value, index) => {
              const isSelected = selectedAttributes[attribute.type] === value;
              const compatibleValues = getCompatibleValues(attribute.type);
              const isCompatible = compatibleValues.has(value); // Kiểm tra giá trị có có thuộc attribute không

              return (
                <li
                  key={index}
                  className={`py-2 px-5 border-2 ${
                    isSelected || variants.length === 1
                      ? "border-pink-500"
                      : isCompatible
                      ? "border-[#ada9ab] hover:border-pink-500"
                      : "border-gray-300 cursor-not-allowed opacity-50"
                  } overflow-hidden rounded-xl cursor-pointer`}
                  onClick={() =>
                    isCompatible && handleAttributeSelect(attribute.type, value)
                  }
                >
                  <span>{value}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      {isSelected && !selectedVariant && (
        <p className="text-red-500">
          Please select all required options before adding to cart.
        </p>
      )}

      {selectedVariant && (
        <div className="w-full">
          <span className="flex items-center pt-2 gap-2 text-[#7f7c7d]">
            {selectedVariant.stock > 10 ? (
              <>
                <TbInfoHexagon /> {selectedVariant.stock}
              </>
            ) : selectedVariant.stock > 0 ? (
              <>
                <TbInfoHexagon /> {selectedVariant.stock} items left!
              </>
            ) : (
              <span className="text-red-500 font-semibold">Out of Stock</span>
            )}
          </span>
        </div>
      )}
      <div className="w-full px-2 py-3 bg-[#eeebed] text-[#454244] font-semibold rounded-md">
        <h4>{product?.name} Specifications</h4>
      </div>
      <div className="w-full flex flex-col gap-4">
        <span className="block mb-2">Delivery on March 5th-11th</span>
        <div class="flex items-center gap-5">
          <span>Quantity: </span>
          <div className="text-[#a4aaaf]">
            <button
              className="bg-[#f7f7f7] w-10 font-semibold py-1 border-r-0"
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            >
              -
            </button>
            <input
              className="w-10 border-1 border-[#f7f7f7] text-black text-center py-[3px]"
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
            <button
              className="bg-[#f7f7f7]  w-10 py-1 font-semibold border-l-0"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            disabled={selectedVariant && selectedVariant.stock === 0}
            className={`${
              selectedVariant && selectedVariant.stock === 0
                ? "cursor-not-allowed opacity-50"
                : ""
            } w-4/9 bg-[#2e2b2d] text-[#c2c0c1] py-3 rounded-md text-xl cursor-pointer hover:bg-[#3f3b3e]`}
            onClick={() => handleBuyNow()}
          >
            Buy now
          </button>
          <button
            // disabled={selectedVariant && selectedVariant.stock === 0}
            className={`${
              selectedVariant && selectedVariant.stock === 0
                ? "cursor-not-allowed opacity-50"
                : ""
            } w-4/9 bg-[#2e2b2d] text-[#c2c0c1] py-3 rounded-md text-xl cursor-pointer hover:bg-[#3f3b3e]`}
            onClick={() => handleAddToCart(selectedVariant?._id, quantity)}
          >
            Add to cart
          </button>
          <button
            className="flex justify-center items-center w-1/9 border border-[#605d5e] py-3 rounded-md text-2xl cursor-pointer hover:border-pink-400 hover:text-pink-400"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToWishList(product?._id);
            }}
          >
            {liked ? (
              <FaHeart className="text-red-500 text-xl transition" />
            ) : (
              <FaRegHeart className="text-gray-500 text-xl transition" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
