import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Register() {
  // Lấy thêm hàm watch để theo dõi giá trị password
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const nav = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      // Xóa confirmPassword trước khi gửi lên server cho sạch data
      const { confirmPassword, ...userData } = data;

      await axios.post("http://localhost:3000/users", userData);
      alert("Đăng ký thành công!");
      nav("/login");
    } catch (error) {
      alert("Lỗi rồi Bệ hạ ơi!");
    }
  };

  // Theo dõi giá trị password để so sánh
  const password = watch("password");

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Đăng Ký Tài Khoản
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
        {/* 1. Username (> 4 ký tự) */}
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            {...register("username", {
              required: "Username không được để trống",
              minLength: { value: 5, message: "Phải lớn hơn 4 ký tự" },
            })}
            type="text"
            className="w-full border p-2 rounded outline-none focus:border-blue-500"
          />
          {errors.username && (
            <span className="text-red-500 text-sm block mt-1">
              {(errors.username as any).message}
            </span>
          )}
        </div>

        {/* 2. Email (Format) */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            {...register("email", {
              required: "Email không được để trống",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email không đúng định dạng",
              },
            })}
            type="email"
            className="w-full border p-2 rounded outline-none focus:border-blue-500"
          />
          {errors.email && (
            <span className="text-red-500 text-sm block mt-1">
              {(errors.email as any).message}
            </span>
          )}
        </div>

        {/* 3. Password (> 6 ký tự) */}
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            {...register("password", {
              required: "Mật khẩu không được để trống",
              minLength: { value: 7, message: "Phải lớn hơn 6 ký tự" },
            })}
            type="password"
            className="w-full border p-2 rounded outline-none focus:border-blue-500"
          />
          {errors.password && (
            <span className="text-red-500 text-sm block mt-1">
              {(errors.password as any).message}
            </span>
          )}
        </div>

        {/* 4. Confirm Password (Match) */}
        <div>
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            {...register("confirmPassword", {
              required: "Nhập lại mật khẩu đi ạ",
              validate: (value) => value === password || "Mật khẩu không khớp",
            })}
            type="password"
            className="w-full border p-2 rounded outline-none focus:border-blue-500"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm block mt-1">
              {(errors.confirmPassword as any).message}
            </span>
          )}
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold transition">
          Đăng Ký Ngay
        </button>
      </form>
    </div>
  );
}

export default Register;
