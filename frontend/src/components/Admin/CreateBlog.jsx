import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../../redux/actions/blog";
import { toast } from "react-toastify";
import EditorToolbar, { modules, formats } from "../EditorToolbar";
import ReactQuill from "react-quill";
import { blogcategoriesData } from "../../static/data";
const CreateBlog = () => {
  const { success, error } = useSelector((state) => state.blogs);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [metadescription, setMetaDescription] = useState("");
  const [blogcategory, setBlogCategory] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Tạo bài viết thành công!");
      navigate("/admin/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("metadescription", metadescription);
    newForm.append("description", description);
    newForm.append("blogcategory", blogcategory);

    dispatch(createBlog(newForm));
  };

  return (
    <div className="container mt-5 mb-5">
      {/* create blog form */}
      <form onSubmit={handleSubmit} >
      <h5 className="text-[30px] font-Poppins text-center">Tạo bài viết</h5>
        <br />
        <div>
          <label className="pb-2">
            Tiêu đề <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tiêu đề bài viết..."
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
            Danh mục <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={blogcategory}
            onChange={(e) => setBlogCategory(e.target.value)}
          >
            <option value="Chọn danh mục">Chọn danh mục</option>
            {blogcategoriesData &&
              blogcategoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br/>
        <div>
          <label className="pb-2">
            Nội dung bài viết <span className="text-red-500">*</span>
          </label>
          <div className="">
          <EditorToolbar />
                  <ReactQuill
                  name="description"
                  className="bg-white"
                  placeholder="Viết cho đúng chuẩn SEO nhé shop"
                  onChange={setDescription}
                  value={description}
                  modules={modules}
                  formats={formats}
                />
              </div>
        </div>
        <br/>
        <div>
          <br/>
          <label className="pb-2">
            Ảnh thumbnail <span className="text-red-500">*</span>
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

export default CreateBlog;
