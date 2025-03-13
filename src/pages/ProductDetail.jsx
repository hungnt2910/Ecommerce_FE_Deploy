import React, { useEffect, useState } from "react";
import { ProductDetailInfo } from "../components/ProductDetail/ProductDetailInfo";
import { ProductDetailImage } from "../components/ProductDetail/ProductDetailImage";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDetailProduct,
  fetchRelatedProduct,
  resetProductState,
} from "../redux/slices/productSlice";
import { SellerProfile } from "../components/ProductDetail/SellerProfile";
import AsSeenOn from "../components/ProductDetail/AsSeenOn";
import { ListProduct } from "../components/Product/ListProduct";
import SkeletonLoader from "../components/Loader/SkeletionLoader";
import { Toaster } from "react-hot-toast";

export const ProductDetail = () => {
  const [productData, setProductData] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [shopId, setShopId] = useState(null)
  const [selectedAttributes, setSelectedAttributes] = useState({}); // Thuộc tính đã chọn
  const [selectedVariant, setSelectedVariant] = useState(null); // Biến thể được chọn
  const [attributes, setAttributes] = useState([]); // Danh sách thuộc tính
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, relatedProduct, loading, error } = useSelector(
    (state) => state.products || {}
  );

  function extractAttributes(variants) {
    const attributeMap = {};

    variants.forEach((variant) => {
      variant.attributes.forEach((attr) => {
        if (!attributeMap[attr.type]) {
          attributeMap[attr.type] = new Set();
        }
        attributeMap[attr.type].add(attr.value);
      });
    });

    return Object.entries(attributeMap).map(([type, values]) => ({
      type,
      values: [...values],
    }));
  }

  useEffect(() => {
    if (id) {
      dispatch(resetProductState());
      dispatch(fetchDetailProduct(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      setProductData(product.productData); // Update when Redux fetches new data
    }
  }, [product]);

  // Xử lý dữ liệu sản phẩm khi nhận được
  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      // setProductData(product);
      // console.log(product)
      // Tạo danh sách thuộc tính từ các biến thể
      const groupedAttributes = extractAttributes(product.variants);

      setAttributes(groupedAttributes);

      // console.log(groupedAttributes);
    }
  }, [product]);

  useEffect(() => {
    if (product && product.variants?.length === 1) {
      setSelectedVariant(product.variants[0]);
      return;
    }

    if (
      product &&
      product.variants &&
      Object.keys(selectedAttributes).length ===
        product.variants[0]?.attributes?.length
    ) {
      const compatibleVariants = product.variants.filter((v) =>
        Object.entries(selectedAttributes).every(([type, value]) =>
          v.attributes.some(
            (attr) => attr.type === type && attr.value === value
          )
        )
      );
      if (compatibleVariants.length === 1) {
        setSelectedVariant(compatibleVariants[0]);
      } else {
        setSelectedVariant(null);
      }
    } else {
      setSelectedVariant(null);
    }
  }, [selectedAttributes, product]);

  // Callback để cập nhật thuộc tính
  const handleAttributesChange = (newAttributes) => {
    setSelectedAttributes(newAttributes);
  };

  useEffect(() => {
    if (product) {
      setCategoryId(product.productData?.category_id);
      setShopId(product.productData?.shop_id?._id)
      // console.log(shopId)
    }
  }, [product]);

  useEffect(() => {
    if (categoryId) {
      console.log("Fetching related products for category:", categoryId);
      dispatch(fetchRelatedProduct(categoryId));
    }
  }, [categoryId, dispatch]);

  return loading || !product || !product.productData ? (
    <>
      <div className="flex justify-center items-center my-50">
        <SkeletonLoader />
      </div>
    </>
  ) : (
    <>
      <div className="container mx-auto py-8">
        <Toaster position="top-center" reverseOrder={false} />

        <div className="grid grid-cols-1 md:grid-cols-3 mt-15 md:mt-0">
          <div className="md:col-span-2">
            <ProductDetailImage
              product={productData}
              variants={product?.variants}
              images={product?.productData?.images}
              selectedAttributes={selectedAttributes}
              selectedVariant={selectedVariant}
            />
          </div>
          <div className="md:col-span-1">
            <ProductDetailInfo
              product={productData}
              variants={product?.variants}
              attributes={attributes}
              onAttributesChange={handleAttributesChange}
              selectedAttributes={selectedAttributes}
              selectedVariant={selectedVariant}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center db-content mt-20">
          <p
            dangerouslySetInnerHTML={{
              __html: product.productData?.description,
            }}
          ></p>
        </div>
        <SellerProfile shopId={shopId}/>
        <ListProduct title={"Related Product"} productList={relatedProduct} />
        <AsSeenOn />
      </div>
    </>
  );
};
