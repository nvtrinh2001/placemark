import { Location } from "./location.js";

export const locationMongoStore = {
  async getAllLocations(id) {
    const locations = await Location.find({ userid: id }).lean();
    return locations;
  },

  async getAllAttractionLocations(id) {
    const locations = await Location.find({ type: "attraction", userid: id }).lean();
    return locations;
  },

  async getAllRestaurantLocations(id) {
    const locations = await Location.find({ type: "restaurant", userid: id }).lean();
    return locations;
  },

  async getAllHotelLocations(id) {
    const locations = await Location.find({ type: "hotel", userid: id }).lean();
    return locations;
  },

  async addANewLocation(name, address, lat, lng, description, image, type, userid) {
    const newLocation = new Location({
      name,
      address,
      lat,
      lng,
      description,
      image,
      type,
      userid,
    });
    await newLocation.save();
    return newLocation;
  },

  async getLocationById(id) {
    if (id) {
      const location = await Location.findOne({ _id: id }).lean();
      return location;
    }
    return null;
  },

  async deleteLocationById(id) {
    await Location.deleteOne({ _id: id });
  },

  async deleteAll(id) {
    await Location.deleteMany({ userid: id });
  },

  async deleteAllAttractions(id) {
    await Location.deleteMany({ type: "attraction", userid: id });
  },

  async deleteAllRestaurants(id) {
    await Location.deleteMany({ type: "restaurant", userid: id });
  },

  async deleteAllHotels(id) {
    await Location.deleteMany({ type: "hotel", userid: id });
  },

  async updateLocationById(id, infoObject) {
    if (id) {
      const query = await Location.findByIdAndUpdate(id, infoObject);
      return query;
    }
    return null;
  },
};
