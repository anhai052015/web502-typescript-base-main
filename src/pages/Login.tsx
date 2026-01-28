import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
// Đã bỏ import useNavigate để không bị báo lỗi "never read"

type FormInputs = {
  email: string;
  password: string;
};

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  // Đã bỏ dòng khai báo nav

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      // Gọi API tìm user khớp email và password
      const { data: users } = await axios.get(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`
      );

      if (users.length > 0) {
        // 1. Lưu user vào localStorage
        localStorage.setItem("user", JSON.stringify(users[0]));
        
        alert("Đăng nhập thành công!");
        
        // 2. Chuyển hướng bằng cách reload trang (để Header cập nhật tên user)
        // Đây là lý do chúng ta không cần dùng 'nav' nữa
        window.location.href = "/list"; 
      } else {
        alert("Email hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      alert("Lỗi kết nối server!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-green-600">Đăng Nhập</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
        {/* Input Email */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input 
            {...register("email", { required: "Vui lòng nhập email" })} 
            type="email" 
            className="w-full border p-2 rounded focus:outline-green-500"
          />
           {errors.email && <span className="text-red-500 text-sm mt-1 block">{errors.email.message}</span>}
        </div>

        {/* Input Password */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Password</label>
          <input 
            {...register("password", { required: "Vui lòng nhập mật khẩu" })} 
            type="password" 
            className="w-full border p-2 rounded focus:outline-green-500"
          />
           {errors.password && <span className="text-red-500 text-sm mt-1 block">{errors.password.message}</span>}
        </div>

        {/* Button Submit */}
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold transition mt-4">
          Đăng Nhập
        </button>
      </form>
    </div>
  );
}

export default Login;