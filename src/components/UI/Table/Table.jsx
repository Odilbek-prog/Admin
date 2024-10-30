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
  const [brands, setBrands] = useState([]);
  const [selectedbrand, setSelectedbrand] = useState("");
  const [selectedCate, setSelectedcate] = useState("");
  const [cate, setCate] = useState([]);
  const [model, setModel] = useState([]);
  const [selectedModel, setSelectedmodel] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedlocations, setSelectedlocations] = useState("");
  const [City, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [inclusive, setinclusive] = useState(false);

  // getCategories
  async function getCategories() {
    await axios
      .get(`https://autoapi.dezinfeksiyatashkent.uz/api${location}`)
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
    getBrands();
    getCate();
    getModel();
    getLocations();
    getCities();
  }, []);

  // Add function
  const handleAdd = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Agar `location` models bo'lsa, tanlangan brendni qo'shing
    if (location === "/models") {
      formData.append("brand_id", selectedbrand);
    } else if (location === "/cars") {
      formData.append("category_id", selectedCate);
      formData.append("brand_id", selectedbrand);
      formData.append("location_id", selectedlocations);
      formData.append("city_id", selectedCity);
      formData.append("model_id", selectedModel);
      formData.append("inclusive", inclusive);
    }

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
          toast.success(`${location} muvaffaqiyatli qoʻshildi`);
          setIsModalOpen(false); // Modalni yopish
          getCategories(); // Ma'lumotlarni qayta olish
        } else {
          toast.error(`${location} qoʻshishda xatolik`);
        }
      })
      .catch((error) => {
        toast.error("Qoʻshishda xatolik");
      });
  };

  // Edit function
  const handleEdit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Agar `location` models bo'lsa, tanlangan brendni qo'shing
    if (location === "/models") {
      formData.append("brand_id", selectedbrand);
    } else if (location === "/cars") {
      formData.append("category_id", selectedCate);
      formData.append("brand_id", selectedbrand);
      formData.append("location_id", selectedlocations);
      formData.append("city_id", selectedCity);
      formData.append("model_id", selectedModel);
      formData.append("inclusive", inclusive);
    }

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
          toast.success(`${location} muvaffaqiyatli tahrirlandi`);
          setIsModalOpen(false); // Modalni yopish
          setSelectedCategory(null); // Tanlangan kategoriyani tiklash
          getCategories(); // Ma'lumotlarni qayta olish
        } else {
          toast.error(`${location} tahrirlashda xatolik`);
        }
      })
      .catch((error) => {
        toast.error("Tahrirlashda xatolik");
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

  // Fetch brands

  async function getBrands() {
    await axios
      .get(`https://autoapi.dezinfeksiyatashkent.uz/api/brands`)
      .then((data) => {
        if (data?.data?.success) {
          setBrands(data?.data?.data);
        } else {
          toast.error("Malumotlar kelmadi");
        }
      });
  }

  // Fetch categories

  async function getCate() {
    await axios
      .get(`https://autoapi.dezinfeksiyatashkent.uz/api/categories`)
      .then((data) => {
        if (data?.data?.success) {
          setCate(data?.data?.data);
        } else {
          toast.error("Malumotlar kelmadi");
        }
      });
  }

  // Fetch model

  async function getModel() {
    await axios
      .get(`https://autoapi.dezinfeksiyatashkent.uz/api/models`)
      .then((data) => {
        if (data?.data?.success) {
          setModel(data?.data?.data);
          console.log(data);
        } else {
          toast.error("Malumotlar kelmadi");
        }
      });
  }

  // Fetch locations

  async function getLocations() {
    await axios
      .get(`https://autoapi.dezinfeksiyatashkent.uz/api/locations`)
      .then((data) => {
        if (data?.data?.success) {
          setLocations(data?.data?.data);
        } else {
          toast.error("Malumotlar kelmadi");
        }
      });
  }

  // Fetch city

  async function getCities() {
    await axios
      .get(`https://autoapi.dezinfeksiyatashkent.uz/api/cities`)
      .then((data) => {
        if (data?.data?.success) {
          setCity(data?.data?.data);
        } else {
          toast.error("Malumotlar kelmadi");
        }
      });
  }

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
                  <label>
                    Brand:
                    <select
                      onChange={(e) => {
                        setSelectedbrand(e.target.value);
                      }}
                    >
                      {brands.map((brand, index) => (
                        <option
                          name="brand_id"
                          defaultValue={
                            selectedCategory ? selectedCategory.brand_id : ""
                          }
                          key={index}
                          value={brand?.id}
                        >
                          {brand.title}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              ) : location === "/cars" ? (
                <>
                  <label>
                    Category:
                    <select
                      onChange={(e) => {
                        setSelectedcate(e.target.value);
                      }}
                    >
                      <option value="" selected disabled hidden>
                        Choose here
                      </option>
                      {cate.map((cate, index) => (
                        <option
                          name="category_id"
                          defaultValue={
                            selectedCategory ? selectedCategory.category_id : ""
                          }
                          key={index}
                          value={cate?.id}
                        >
                          {cate.name_en}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Brand:
                    <select
                      onChange={(e) => {
                        setSelectedbrand(e.target.value);
                      }}
                    >
                      <option value="" selected disabled hidden>
                        Choose here
                      </option>

                      {brands.map((brand, index) => (
                        <option
                          name="brand_id"
                          defaultValue={
                            selectedCategory ? selectedCategory.brand_id : ""
                          }
                          key={index}
                          value={brand?.id}
                        >
                          {brand.title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Model:
                    <select
                      onChange={(e) => {
                        setSelectedmodel(e.target.value);
                      }}
                    >
                      <option value="" selected disabled hidden>
                        Choose here
                      </option>

                      {model.map((model, index) => (
                        <option
                          name="model_id"
                          defaultValue={
                            selectedCategory ? selectedCategory.model_id : ""
                          }
                          key={index}
                          value={model?.id}
                        >
                          {model.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Location:
                    <select
                      onChange={(e) => {
                        setSelectedlocations(e.target.value);
                      }}
                    >
                      <option value="" selected disabled hidden>
                        Choose here
                      </option>

                      {locations.map((location, index) => (
                        <option
                          name="location_id"
                          defaultValue={
                            selectedCategory ? selectedCategory.location_id : ""
                          }
                          key={index}
                          value={location?.id}
                        >
                          {location.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    City:
                    <select
                      onChange={(e) => {
                        setSelectedCity(e.target.value);
                      }}
                    >
                      <option value="" selected disabled hidden>
                        Choose here
                      </option>

                      {City.map((city, index) => (
                        <option
                          name="city_id"
                          defaultValue={
                            selectedCategory ? selectedCategory.city_id : ""
                          }
                          key={index}
                          value={city?.id}
                        >
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Color:
                    <input
                      type="text"
                      name="color"
                      defaultValue={
                        selectedCategory ? selectedCategory.color : ""
                      }
                      required
                    />
                  </label>
                  <label>
                    Yil:
                    <input
                      type="text"
                      name="year"
                      defaultValue={
                        selectedCategory ? selectedCategory.year : ""
                      }
                      required
                    />
                  </label>
                  <label>
                    Seconds:
                    <input
                      type="text"
                      name="seconds"
                      defaultValue={
                        selectedCategory ? selectedCategory.seconds : ""
                      }
                      required
                    />
                  </label>
                  <label>
                    Max_speed:
                    <input
                      type="text"
                      name="max_speed"
                      defaultValue={
                        selectedCategory ? selectedCategory.max_speed : ""
                      }
                      required
                    />
                  </label>
                  <label>
                    Max_people:
                    <input
                      type="text"
                      name="max_people"
                      defaultValue={
                        selectedCategory ? selectedCategory.max_people : ""
                      }
                      required
                    />
                  </label>
                  <label>
                    Motor:
                    <input
                      type="text"
                      name="motor"
                      defaultValue={
                        selectedCategory ? selectedCategory.motor : ""
                      }
                      required
                    />
                  </label>
                  <label>
                    Transmission:
                    <input
                      type="text"
                      name="transmission"
                      defaultValue={
                        selectedCategory ? selectedCategory.transmission : ""
                      }
                      required
                    />
                  </label>
                  <label>
                    Drive_side:
                    <input
                      type="text"
                      name="drive_side"
                      defaultValue={
                        selectedCategory ? selectedCategory.drive_side : ""
                      }
                      required
                    />
                  </label>
                  <label>
                    Yoqilg'i:
                    <input
                      type="text"
                      name="petrol"
                      defaultValue={
                        selectedCategory ? selectedCategory.petrol : ""
                      }
                      required
                    />
                  </label>
                  <label>
                    Limit Per Day:
                    <input
                      type="text"
                      name="limitperday"
                      defaultValue={
                        selectedCategory ? selectedCategory.limitperday : ""
                      }
                      required
                    />
                  </label>
                  <label>
                    Deposit:
                    <input
                      type="text"
                      name="deposit"
                      defaultValue={
                        selectedCategory ? selectedCategory.deposit : ""
                      }
                      required
                    />
                  </label>
                  <label>
                    Premium Protection Price:
                    <input
                      type="text"
                      name="premium_protection"
                      defaultValue={
                        selectedCategory
                          ? selectedCategory.premium_protection
                          : ""
                      }
                      required
                    />
                  </label>
                  <label>
                    Price in AED:
                    <input
                      type="text"
                      name="price_in_aed"
                      defaultValue={
                        selectedCategory ? selectedCategory.price_in_aed : ""
                      }
                      required
                    />
                  </label>
                  <label>
                    Price in USD(Otd):
                    <input
                      type="text"
                      name="price_in_usd_sale"
                      defaultValue={
                        selectedCategory
                          ? selectedCategory.price_in_usd_sale
                          : ""
                      }
                      required
                    />
                  </label>
                  <label>
                    Price in USD:
                    <input
                      type="text"
                      name="price_in_usd"
                      defaultValue={
                        selectedCategory ? selectedCategory.price_in_usd : ""
                      }
                      required
                    />
                  </label>
                  <label>
                    Price in AED (Otd):
                    <input
                      type="text"
                      name="price_in_aed_sale"
                      defaultValue={
                        selectedCategory
                          ? selectedCategory.price_in_aed_sale
                          : ""
                      }
                      required
                    />
                  </label>
                  <label className="switch">
                    Inclusive:
                    <input
                      type="checkbox"
                      name="inclusive"
                      defaultValue={
                        selectedCategory ? selectedCategory.inclusive : Boolean
                      }
                      onClick={() => {
                        setinclusive(!inclusive);
                      }}
                    />
                    <span class="slider round"></span>
                  </label>
                  <label>
                    Upload car images:
                    <input type="file" name="images" accept="image/*" />
                  </label>
                  <label>
                    Upload the main image:
                    <input type="file" name="images" accept="image/*" />
                  </label>
                  <label>
                    Upload the cover image:
                    <input type="file" name="cover" accept="image/*" />
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
              ) : location === "/cars" ? (
                <tr>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Color</th>
                  <th>City</th>
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
                  ) : location === "/cars" ? (
                    <>
                      <td>{elem?.brand?.title}</td>
                      <td>{elem?.model?.name}</td>
                      <td>{elem?.color}</td>
                      <td>{elem?.city?.name}</td>
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
