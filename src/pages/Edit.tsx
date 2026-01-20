import axios from "axios";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

type FormInputs = {
  name: string;
  credit: number;
  category: string;
  teacher: string;
};

function EditPage() {
  const { id } = useParams(); // Lấy ID từ URL
  const nav = useNavigate();
  
  const {
    register,
    handleSubmit,
    reset, // Hàm này dùng để đổ dữ liệu cũ vào form
    formState: { errors },
  } = useForm<FormInputs>();

  // 1. Lấy dữ liệu cũ khi vào trang
  useEffect(() => {
    const getDetail = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/courses/${id}`);
        reset(data); // Đổ dữ liệu vào form
      } catch (error) {
        console.log(error);
        alert("Không tìm thấy môn học!");
      }
    };
    getDetail();
  }, [id]);

  // 2. Xử lý cập nhật
  const onSubmit: SubmitHandler<FormInputs> = async (values) => {
    try {
      await axios.put(`http://localhost:3000/courses/${id}`, values);
      alert("Cập nhật thành công!");
      nav("/list");
    } catch (error) {
      console.log(error);
      alert("Lỗi khi cập nhật!");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto border rounded-lg shadow-lg mt-5 bg-yellow-50">
      <h1 className="text-2xl font-bold mb-6 text-yellow-700">Cập nhật Môn Học</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Các ô input y hệt trang Add, chỉ khác màu sắc chút cho dễ nhìn */}
        <div>
          <label className="block font-medium mb-1">Tên môn học</label>
          <input
            {...register("name", { required: true })}
            type="text"
            className="w-full border p-2 rounded focus:outline-yellow-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Số tín chỉ</label>
          <input
            {...register("credit", { required: true, valueAsNumber: true, min: 1 })}
            type="number"
            className="w-full border p-2 rounded focus:outline-yellow-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Giảng viên</label>
          <input
            {...register("teacher", { required: true })}
            type="text"
            className="w-full border p-2 rounded focus:outline-yellow-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Danh mục</label>
          <select
            {...register("category")}
            className="w-full border p-2 rounded focus:outline-yellow-500 bg-white"
          >
            <option value="Chuyên ngành">Chuyên ngành</option>
            <option value="Cơ sở">Cơ sở</option>
            <option value="Thực tập">Thực tập</option>
          </select>
        </div>

        <button className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 w-full font-bold">
          Lưu Cập Nhật
        </button>
      </form>
    </div>
  );
}

export default EditPage;