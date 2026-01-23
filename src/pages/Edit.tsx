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
  const { id } = useParams();
  const nav = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>();

  useEffect(() => {
    const getDetail = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/courses/${id}`);
        reset(data);
      } catch (error) {
        alert("Không tìm thấy!");
      }
    };
    getDetail();
  }, [id, reset]);

  const onSubmit: SubmitHandler<FormInputs> = async (values) => {
    try {
      await axios.put(`http://localhost:3000/courses/${id}`, values);
      alert("Sửa thành công!");
      nav("/list");
    } catch (error) {
      alert("Lỗi cập nhật!");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto border border-gray-200 rounded mt-5">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Cập nhật dữ liệu</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input {...register("name", { required: "Cần nhập tên", minLength: { value: 4, message: "> 3 ký tự" } })} type="text" className="w-full border p-2 rounded outline-none" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block font-medium mb-1">Credit</label>
          <input {...register("credit", { required: "Cần nhập tín chỉ", valueAsNumber: true, min: { value: 1, message: "> 0" } })} type="number" className="w-full border p-2 rounded outline-none" />
          {errors.credit && <p className="text-red-500 text-sm">{errors.credit.message}</p>}
        </div>
        <div>
          <label className="block font-medium mb-1">Teacher</label>
          <input {...register("teacher", { required: "Cần nhập GV", minLength: { value: 4, message: "> 3 ký tự" } })} type="text" className="w-full border p-2 rounded outline-none" />
          {errors.teacher && <p className="text-red-500 text-sm">{errors.teacher.message}</p>}
        </div>
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select {...register("category")} className="w-full border p-2 rounded bg-white">
            <option value="Chuyên ngành">Chuyên ngành</option>
            <option value="Cơ sở">Cơ sở</option>
          </select>
        </div>
        <button type="submit" className="mt-4 px-6 py-2 border border-black hover:bg-gray-100 transition rounded w-full">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditPage;