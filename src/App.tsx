import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ListPage from "./pages/List";
import AddPage from "./pages/Add";
import EditPage from "./pages/Edit";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);

  // Kiểm tra đăng nhập khi vào trang web
  useEffect(() => {
    const userLocal = localStorage.getItem("user");
    if (userLocal) {
      setUser(JSON.parse(userLocal));
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("Đăng xuất nhé?")) {
      localStorage.removeItem("user");
      setUser(null);
      nav("/login");
    }
  };

  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/list" className="text-xl font-semibold">
            <strong>WEB502 Lab 7</strong>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/list" className="hover:text-gray-200 font-medium">Danh sách</Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-yellow-300 font-semibold">Chào, {(user as any).username || (user as any).email}</span>
                <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm font-bold transition">
                  Thoát
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-200 font-medium">Đăng nhập</Link>
                <Link to="/register" className="bg-white text-blue-600 px-3 py-1 rounded font-bold hover:bg-gray-100 transition">
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          
          {/* Route mới cho Lab 7 */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;