import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData, unit } from "../../static/data";
import { toast } from "react-toastify";
import EditorToolbar, { modules, formats } from "../EditorToolbar";
import ReactQuill from "react-quill";

const CreateProduct = () => {
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [metadescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Tạo sản phẩm thành công!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  console.log(images);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("metadescription", metadescription);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    dispatch(createProduct(newForm));
  };

  return (
    <div className="container mt-5 mb-5">
      {/* create product form */}
      <form onSubmit={handleSubmit} >
      <h5 className="text-[30px] font-Poppins text-center">Tạo sản phẩm</h5>
        <br />
        <div>
          <label className="pb-2">
            Tên sản phẩm <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên sản phẩm..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Meta <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            type="text"
            name="metadescription"
            value={metadescription}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setMetaDescription(e.target.value)}
            placeholder="Nhập meta description..."
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Mô tả sản phẩm <span className="text-red-500">*</span>
          </label>
          <div className="">
          <EditorToolbar />
                  <ReactQuill
                  name="description"
                  className="bg-white"
                  placeholder="Viết miêu tả cho sản phẩm"
                  onChange={setDescription}
                  value={description}
                  modules={modules}
                  formats={formats}
                />
              </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-3">
          <div>
          <label className="pb-2">
            Danh mục <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Chọn danh mục">Chọn danh mục</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
          </div>
          <div className="col-2">
          <div>
          <label className="pb-2">
            Đơn vị tính
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={unit}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Đơn vị tính">Đơn vị tính</option>
            {unit &&
              unit.map((i) => (
                <option value={i.title} key={i.unit}>
                  {i.unit}
                </option>
              ))}
          </select>
        </div>
          </div>
          <div className="col-3">
          <div>
          <label className="pb-2">Giá gốc</label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Nhập giá"
          />
        </div>
          </div>
          <div className="col-3">
          <div>
          <label className="pb-2">
            Giá sản phẩm <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Giá sản phẩm..."
          />
        </div>
        </div>
        </div>
        <div>
          <br/>
          <label className="pb-2">
            Upload hình ảnh <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>

  );
};

export default CreateProduct;
