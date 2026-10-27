import { Link } from "react-router-dom";

const PLACEHOLDER = "https://placehold.co/400x300?text=No+Image";

export default function ListingCard({ listing }) {
  return (
    <Link to={`/listing/${listing._id}`} className="card">
      <img src={listing.imageUrl || PLACEHOLDER} alt={listing.title} />
      <div className="card-body">
        <h3>{listing.title}</h3>
        <p className="price">₹{listing.price}</p>
        <p className="meta">
          {listing.category} · {listing.condition}
        </p>
        {listing.seller?.hostel && <p className="meta">📍 {listing.seller.hostel}</p>}
        {listing.isSold && <span className="badge sold">Sold</span>}
      </div>
    </Link>
  );
}
