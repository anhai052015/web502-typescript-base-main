import { Toaster } from "react-hot-toast";
import { Link, Route, Routes } from "react-router-dom";
import ListPage from "./pages/List";
import AddPage from "./pages/Add";
import EditPage from "./pages/Edit"; // Nhớ import EditPage

function App() {
  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/list" className="text-xl font-semibold">
            <strong>WEB502 App</strong>
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/list" className="hover:text-gray-200">Danh sách</Link>
            <Link to="/add" className="hover:text-gray-200">Thêm mới</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto mt-10 px-4">
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/add" element={<AddPage />} />
          
          {/* QUAN TRỌNG: Route cho trang sửa, có :id ở cuối */}
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </div>

      <Toaster />
    </>
  );
}

export default App;