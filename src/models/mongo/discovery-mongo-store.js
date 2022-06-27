import { Discovery } from "./discovery.js";

export const discoveryMongoStore = {
  async getAllLocations() {
    const locations = await Discovery.find().lean();
    return locations;
  },

  async getAllAttractionLocations() {
    const locations = await Discovery.find({ type: "attraction" }).lean();
    return locations;
  },

  async getAllRestaurantLocations() {
    const locations = await Discovery.find({ type: "restaurant" }).lean();
    return locations;
  },

  async getAllHotelLocations() {
    const locations = await Discovery.find({ type: "hotel" }).lean();
    return locations;
  },

  async addANewLocation(name, address, lat, lng, description, images, type) {
    const newLocation = new Discovery({
      name,
      address,
      lat,
      lng,
      description,
      images,
      type,
    });
    await newLocation.save();
    return newLocation;
  },

  async getLocationById(id) {
    if (id) {
      const location = await Discovery.findOne({ _id: id }).lean();
      return location;
    }
    return null;
  },

  async deleteLocationById(id) {
    await Discovery.deleteOne({ _id: id });
  },

  async deleteAll() {
    await Discovery.deleteMany({});
  },

  async deleteAllAttractions() {
    await Discovery.deleteMany({ type: "attraction" });
  },

  async deleteAllRestaurants() {
    await Discovery.deleteMany({ type: "restaurant" });
  },

  async deleteAllHotels() {
    await Discovery.deleteMany({ type: "hotel" });
  },

  async updateLocationById(id, infoObject) {
    if (id) {
      const query = await Discovery.findByIdAndUpdate(id, infoObject);
      return query;
    }
    return null;
  },
};
