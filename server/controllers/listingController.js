import Listing from "../models/Listing.js";

export const createListing = async (req, res) => {
  try {
    const { title, description, price, category, condition, imageUrl } = req.body;
    if (!title || !description || price === undefined) {
      return res.status(400).json({ message: "Title, description and price are required" });
    }
    const listing = await Listing.create({
      title, description, price, category, condition, imageUrl,
      seller: req.user._id,
    });
    res.status(201).json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getListings = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;
    const filter = { isSold: false };
    if (search) filter.$text = { $search: search };
    if (category && category !== "All") filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    const listings = await Listing.find(filter)
      .populate("seller", "name hostel")
      .sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("seller", "name phone hostel email");
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({ seller: req.user._id }).sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    if (listing.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your listing" });
    }
    const fields = ["title", "description", "price", "category", "condition", "imageUrl", "isSold"];
    fields.forEach((f) => {
      if (req.body[f] !== undefined) listing[f] = req.body[f];
    });
    await listing.save();
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    if (listing.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your listing" });
    }
    await listing.deleteOne();
    res.json({ message: "Listing deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
