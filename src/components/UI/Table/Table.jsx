import React, { useEffect, useState } from "react";
import "./Table.scss";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import { useLocation } from "react-router-dom";

const Table = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation()?.pathname;

  // getCategories
  async function getCategories() {
    await axios
      .get(`https://autoapi.dezinfeksiyatashkent.uz/api${location}`)
      .then((data) => {
        console.log(data);
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
    const formData = new FormData(e.target);
    axios
      .post(
        `https://autoapi.dezinfeksiyatashkent.uz/api${location}`,
        formData,
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

  // Edit function
  const handleEdit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios
      .put(
        `https://autoapi.dezinfeksiyatashkent.uz/api${location}/${selectedCategory.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((data) => {
        if (data?.data?.success) {
          setCategories(
            categories.map((category) =>
              category.id === selectedCategory.id ? data?.data?.data : category
            )
          );
          toast.success("Category edited successfully");
          setIsModalOpen(false);
          setSelectedCategory(null);
        } else {
          toast.error("Failed to edit category");
        }
      })
      .catch((error) => {
        toast.error("Error editing category");
      });
  };

  // Delete function
  const handleDelete = (id) => {
    axios
      .delete(`https://autoapi.dezinfeksiyatashkent.uz/api${location}/${id}`, {
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
          <div className="modaldiv">
            <h1 style={{ textTransform: "capitalize" }}>{location.slice(1)}</h1>
            <button className="add" onClick={() => setIsModalOpen(true)}>
              Add
            </button>
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedCategory(null);
            }}
          >
            <form onSubmit={selectedCategory ? handleEdit : handleAdd}>
              {location === "/categories" ? (
                <>
                  <label>
                    Name (EN):
                    <input
                      type="text"
                      name="name_en"
                      defaultValue={
                        selectedCategory ? selectedCategory.name_en : ""
                      }
                      required
                    />
                  </label>
                  <label>
                    Name (RU):
                    <input
                      type="text"
                      name="name_ru"
                      defaultValue={
                        selectedCategory ? selectedCategory.name_ru : ""
                      }
                      required
                    />
                  </label>
                  <label>
                    Image Source:
                    <input type="file" name="images" accept="image/*" />
                  </label>
                </>
              ) : location === "/brands" ? (
                <>
                  <label>
                    Model:
                    <input
                      type="text"
                      name="title"
                      defaultValue={
                        selectedCategory ? selectedCategory.title : ""
                      }
                      required
                    />
                  </label>
                  <label>
                    Image Source:
                    <input type="file" name="images" accept="image/*" />
                  </label>
                </>
              ) : location === "/cities" || location === "/locations" ? (
                <>
                  <label>
                    Model:
                    <input
                      type="text"
                      name="name"
                      defaultValue={
                        selectedCategory ? selectedCategory.name : ""
                      }
                      required
                    />
                  </label>
                  <label>
                    Text:
                    <input
                      type="text"
                      name="text"
                      defaultValue={
                        selectedCategory ? selectedCategory.text : ""
                      }
                      required
                    />
                  </label>
                  <label>
                    Image Source:
                    <input type="file" name="images" accept="image/*" />
                  </label>
                </>
              ) : location === "/models" ? (
                <>
                  <label>
                    Model:
                    <input
                      type="text"
                      name="name"
                      defaultValue={
                        selectedCategory ? selectedCategory.name : ""
                      }
                      required
                    />
                  </label>
                </>
              ) : null}

              <button type="submit">{selectedCategory ? "Edit" : "Add"}</button>
            </form>
          </Modal>
          <table>
            <thead>
              {location === "/categories" ? (
                <tr>
                  <th>Name_en</th>
                  <th>Name_ru</th>
                  <th>Status</th>
                  <th>Images</th>
                  <th>Actions</th>
                </tr>
              ) : location === "/brands" ? (
                <tr>
                  <th>Model</th>
                  <th>Status</th>
                  <th>Images</th>
                  <th>Actions</th>
                </tr>
              ) : location === "/cities" || location === "/locations" ? (
                <tr>
                  <th>Name</th>
                  <th>Text</th>
                  <th>Status</th>
                  <th>Images</th>
                  <th>Actions</th>
                </tr>
              ) : location === "/models" ? (
                <tr>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              ) : null}
            </thead>
            <tbody>
              {currentCategories.map((elem, index) => (
                <tr key={index}>
                  {location === "/categories" ? (
                    <>
                      <td>{elem?.name_en}</td>
                      <td>{elem?.name_ru}</td>
                      <td>Active</td>
                      <td>
                        <img
                          src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${elem.image_src}`}
                          alt=""
                        />
                      </td>
                    </>
                  ) : location === "/brands" ? (
                    <>
                      <td>{elem?.title}</td>
                      <td>Active</td>
                      <td>
                        <img
                          src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${elem.image_src}`}
                          alt=""
                        />
                      </td>
                    </>
                  ) : location === "/cities" || location === "/locations" ? (
                    <>
                      <td>{elem?.name}</td>
                      <td>{elem?.text}</td>
                      <td>Active</td>
                      <td>
                        <img
                          src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${elem.image_src}`}
                          alt=""
                        />
                      </td>
                    </>
                  ) : location === "/models" ? (
                    <>
                      <td>{elem?.name}</td>
                      <td>{elem?.brand_title}</td>
                      <td>Active</td>
                    </>
                  ) : null}

                  <td>
                    <button
                      className="edit"
                      onClick={() => {
                        setSelectedCategory(elem);
                        setIsModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
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
