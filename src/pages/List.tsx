import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type Course = {
  id: number;
  name: string;
  credit: number;
  category: string;
  teacher: string;
};

function ListPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const getAll = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/courses");
        setCourses(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAll();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Bệ hạ có chắc chắn muốn xóa khóa học này không?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/courses/${id}`);
        setCourses(courses.filter((course) => course.id !== id));
        alert("Xóa thành công rồi ạ!");
      } catch (error) {
        alert("Xóa thất bại!");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Danh sách</h1>
        <Link to="/add" className="border border-black px-4 py-2 hover:bg-gray-100 transition rounded text-sm">
          + Thêm mới
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Name</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Teacher</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{item.id}</td>
                <td className="px-4 py-2 border border-gray-300">{item.name}</td>
                <td className="px-4 py-2 border border-gray-300">{item.teacher}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <div className="flex gap-4">
                    <Link to={`/edit/${item.id}`} className="text-gray-600 hover:text-black underline text-sm">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(item.id)} className="text-gray-600 hover:text-black underline text-sm">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;