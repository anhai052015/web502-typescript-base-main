import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Định nghĩa kiểu dữ liệu cho Form (khớp với db.json)
type FormInputs = {
  name: string;
  credit: number;
  category: string;
  teacher: string;
};

function AddPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const nav = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = async (values) => {
    try {
      // Gọi API tạo mới
      await axios.post("http://localhost:3000/courses", values);
      alert("Thêm thành công!");
      nav("/list"); // Chuyển về trang danh sách
    } catch (error) {
      console.log(error);
      alert("Lỗi khi thêm mới!");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto border rounded-lg shadow-lg mt-5">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Thêm Môn Học</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 1. Tên môn học */}
        <div>
          <label className="block font-medium mb-1">Tên môn học</label>
          <input
            {...register("name", { required: "Không được để trống tên môn" })}
            type="text"
            className="w-full border p-2 rounded focus:outline-blue-500"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        {/* 2. Số tín chỉ (Lưu ý: valueAsNumber để ép kiểu số) */}
        <div>
          <label className="block font-medium mb-1">Số tín chỉ</label>
          <input
            {...register("credit", { 
              required: "Nhập số tín chỉ", 
              valueAsNumber: true,
              min: { value: 1, message: "Tín chỉ phải lớn hơn 0" }
            })}
            type="number"
            className="w-full border p-2 rounded focus:outline-blue-500"
          />
          {errors.credit && <span className="text-red-500 text-sm">{errors.credit.message}</span>}
        </div>

        {/* 3. Giảng viên */}
        <div>
          <label className="block font-medium mb-1">Giảng viên</label>
          <input
            {...register("teacher", { required: "Nhập tên giảng viên" })}
            type="text"
            className="w-full border p-2 rounded focus:outline-blue-500"
          />
          {errors.teacher && <span className="text-red-500 text-sm">{errors.teacher.message}</span>}
        </div>

        {/* 4. Danh mục (Select) */}
        <div>
          <label className="block font-medium mb-1">Danh mục</label>
          <select
            {...register("category")}
            className="w-full border p-2 rounded focus:outline-blue-500 bg-white"
          >
            <option value="Chuyên ngành">Chuyên ngành</option>
            <option value="Cơ sở">Cơ sở</option>
            <option value="Thực tập">Thực tập</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full font-bold">
          Thêm Mới
        </button>
      </form>
    </div>
  );
}

export default AddPage;