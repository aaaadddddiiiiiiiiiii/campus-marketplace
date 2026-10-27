import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

const CATEGORIES = ["Books", "Electronics", "Furniture", "Clothing", "Cycles", "Stationery", "Other"];
const CONDITIONS = ["New", "Like New", "Good", "Fair"];

export default function ListingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", description: "", price: "", category: "Other", condition: "Good", imageUrl: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      api.get(`/listings/${id}`).then(({ data }) =>
        setForm({
          title: data.title,
          description: data.description,
          price: data.price,
          category: data.category,
          condition: data.condition,
          imageUrl: data.imageUrl || "",
        })
      );
    }
  }, [id]);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, price: Number(form.price) };
      if (id) await api.put(`/listings/${id}`, payload);
      else await api.post("/listings", payload);
      navigate("/my-listings");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="form-box">
      <h2>{id ? "Edit listing" : "Sell an item"}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" required value={form.title} onChange={update("title")} />
        <textarea placeholder="Description" required rows={4} value={form.description} onChange={update("description")} />
        <input type="number" placeholder="Price (₹)" required min="0" value={form.price} onChange={update("price")} />
        <select value={form.category} onChange={update("category")}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={form.condition} onChange={update("condition")}>
          {CONDITIONS.map((c) => <option key={c}>{c}</option>)}
        </select>
        <input placeholder="Image URL (optional)" value={form.imageUrl} onChange={update("imageUrl")} />
        <button className="btn" type="submit">{id ? "Update" : "Post listing"}</button>
      </form>
    </div>
  );
}
