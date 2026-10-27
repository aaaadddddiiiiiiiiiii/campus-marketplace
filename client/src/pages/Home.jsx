import { useEffect, useState } from "react";
import api from "../api";
import ListingCard from "../components/ListingCard";

const CATEGORIES = ["All", "Books", "Electronics", "Furniture", "Clothing", "Cycles", "Stationery", "Other"];

export default function Home() {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/listings", { params: { search, category } });
        setListings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [search, category]);

  return (
    <div className="container">
      <h1>Buy &amp; sell within your campus</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : listings.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="grid">
          {listings.map((l) => (
            <ListingCard key={l._id} listing={l} />
          ))}
        </div>
      )}
    </div>
  );
}
