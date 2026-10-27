import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const PLACEHOLDER = "https://placehold.co/600x450?text=No+Image";

export default function ListingDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/listings/${id}`)
      .then((res) => setListing(res.data))
      .catch(() => setError("Listing not found"));
  }, [id]);

  if (error) return <div className="container"><p className="error">{error}</p></div>;
  if (!listing) return <div className="container"><p>Loading...</p></div>;

  const isOwner = user && user._id === listing.seller._id;
  const phone = listing.seller.phone?.replace(/\D/g, "");

  return (
    <div className="container detail">
      <img src={listing.imageUrl || PLACEHOLDER} alt={listing.title} />
      <div>
        <h1>{listing.title}</h1>
        <p className="price big">₹{listing.price}</p>
        <p className="meta">{listing.category} · {listing.condition}</p>
        {listing.isSold && <span className="badge sold">Sold</span>}
        <p>{listing.description}</p>

        <div className="seller-box">
          <h3>Seller</h3>
          <p>{listing.seller.name}</p>
          {listing.seller.hostel && <p>📍 {listing.seller.hostel}</p>}
          {user ? (
            <>
              {listing.seller.phone && <p>📞 {listing.seller.phone}</p>}
              <p>✉️ {listing.seller.email}</p>
              {phone && !isOwner && !listing.isSold && (
                <a
                  className="btn"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://wa.me/${phone}?text=${encodeURIComponent(
                    `Hi, I'm interested in your listing "${listing.title}" on CampusMart.`
                  )}`}
                >
                  Chat on WhatsApp
                </a>
              )}
            </>
          ) : (
            <p><em>Login to see contact details.</em></p>
          )}
        </div>
      </div>
    </div>
  );
}
