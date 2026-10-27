import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function MyListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const { data } = await api.get("/listings/mine");
      setListings(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const toggleSold = async (l) => {
    await api.put(`/listings/${l._id}`, { isSold: !l.isSold });
    load();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this listing?")) return;
    await api.delete(`/listings/${id}`);
    load();
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <h1>My Listings</h1>
      {listings.length === 0 && (
        <p>You haven't listed anything yet. <Link to="/sell">Sell an item</Link></p>
      )}
      <div className="my-list">
        {listings.map((l) => (
          <div key={l._id} className="my-row">
            <div>
              <Link to={`/listing/${l._id}`}><strong>{l.title}</strong></Link>
              <span className="price"> ₹{l.price}</span>
              {l.isSold && <span className="badge sold">Sold</span>}
            </div>
            <div className="row-actions">
              <button className="btn btn-outline" onClick={() => toggleSold(l)}>
                {l.isSold ? "Mark available" : "Mark sold"}
              </button>
              <Link className="btn btn-outline" to={`/edit/${l._id}`}>Edit</Link>
              <button className="btn btn-danger" onClick={() => remove(l._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
