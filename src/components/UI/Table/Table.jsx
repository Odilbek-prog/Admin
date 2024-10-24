import React, { useEffect, useState } from "react";
import "./Table.scss";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";

const Table = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5);
  var formdata = new FormData();
  formdata.append("name_en", "");
  formdata.append("name_ru", "");
  formdata.append("images", "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // getCategories
  async function getCategories() {
    await axios
      .get(`https://autoapi.dezinfeksiyatashkent.uz/api/categories`)
      .then((data) => {
        if (data?.data?.success) {
          setCategories(data?.data?.data);
        } else {
          toast.error("Malumotlar kelmadi");
        }
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  // Add function
  const handleAdd = (e) => {
    e.preventDefault();

    axios
      .post(
        `https://autoapi.dezinfeksiyatashkent.uz/api/categories`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((data) => {
        if (data?.data?.success) {
          setCategories([...categories, data?.data?.data]);
          toast.success("Category added successfully");
          setIsModalOpen(false);
        } else {
          toast.error("Failed to add category");
        }
      })
      .catch((error) => {
        toast.error("Error adding category");
      });
  };

  // Delete function
  const handleDelete = (id) => {
    axios
      .delete(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((data) => {
        if (data?.data?.success) {
          setCategories(categories.filter((category) => category.id !== id));
          toast.success("Category deleted successfully");
        } else {
          toast.error("Failed to delete category");
        }
      })
      .catch((error) => {
        toast.error("Error deleting category");
      });
  };

  // Pagination logic
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="table-container">
      {categories.length === 0 ? (
        <Loader />
      ) : (
        <>
          <button className="add" onClick={() => setIsModalOpen(true)}>
            Add
          </button>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <form onSubmit={handleAdd}>
              <label>
                Name (EN):
                <input
                  type="text"
                  value={formdata.name_en}
                  onChange={(e) => formdata.set("name_en", e.target.value)}
                  required
                />
              </label>
              <label>
                Name (RU):
                <input
                  type="text"
                  value={formdata.name_ru}
                  onChange={(e) => formdata.set("name_ru", e.target.value)}
                  required
                />
              </label>
              <label>
                Image Source:
                <input
                  type="file"
                  onChange={(e) => formdata.set("images", e.target.files[0])}
                  accept="image/*"
                  required
                />
              </label>
              <button type="submit">Add</button>
            </form>
          </Modal>
          <table>
            <thead>
              <tr>
                <th>Name_en</th>
                <th>Name_ru</th>
                <th>Status</th>
                <th>Images</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((elem, index) => (
                <tr key={index}>
                  <td>{elem?.name_en}</td>
                  <td>{elem?.name_ru}</td>
                  <td>Active</td>
                  <td>
                    <img
                      src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${elem.image_src}`}
                      alt=""
                    />
                  </td>
                  <td>
                    <button className="edit">Edit</button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(elem?.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {[
              ...Array(Math.ceil(categories.length / categoriesPerPage)).keys(),
            ].map((number) => (
              <button
                key={number}
                onClick={() => paginate(number + 1)}
                className={number + 1 === currentPage ? "active" : ""}
              >
                {number + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Table;
