import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const placemarkService = {
  placemarkUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placemarkUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.placemarkUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },

  // Location
  async createLocation(location, id) {
    try {
      const res = await axios.post(`${this.placemarkUrl}/api/locations`, location, id);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async getAllLocations(id) {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/locations`, id);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async getAllAttractionLocations(id) {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/locations/attractions`, id);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async getAllRestaurantLocations(id) {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/locations/restaurants`, id);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async getAllHotelLocations(id) {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/locations/hotels`, id);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async getLocationById(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/locations/${id}`);
    return res.data;
  },

  async deleteLocationById(id) {
    const res = await axios.delete(`${this.placemarkUrl}/api/locations/${id}`);
    return res.data;
  },

  async deleteAllLocations(id) {
    const res = await axios.delete(`${this.placemarkUrl}/api/locations`, id);
    return res.data;
  },

  async deleteAllAttractionLocations(id) {
    const res = await axios.delete(`${this.placemarkUrl}/api/locations/attractions`, id);
    return res.data;
  },

  async deleteAllRestaurantLocations(id) {
    const res = await axios.delete(`${this.placemarkUrl}/api/locations/restaurants`, id);
    return res.data;
  },

  async deleteAllHotelLocations(id) {
    const res = await axios.delete(`${this.placemarkUrl}/api/locations/hotels`, id);
    return res.data;
  },

  async updateLocationById(id, location) {
    const res = await axios.put(`${this.placemarkUrl}/api/locations/${id}`, location);
    return res.data;
  },

  // Discovery
  async createLondonLocation(location) {
    try {
      const res = await axios.post(`${this.placemarkUrl}/api/discovery`, location);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async getAllLondonLocations() {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/discovery`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async getLondonAttractionLocations() {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/discovery/attractions`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async getLondonRestaurantLocations() {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/discovery/restaurants`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async getLondonHotelLocations() {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/discovery/hotels`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async getLondonLocationById(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/discovery/${id}`);
    return res.data;
  },

  async deleteLondonLocationById(id) {
    const res = await axios.delete(`${this.placemarkUrl}/api/discovery/${id}`);
    return res.data;
  },

  async deleteAllLondonLocations() {
    const res = await axios.delete(`${this.placemarkUrl}/api/discovery`);
    return res.data;
  },

  async deleteLondonAttractionLocations() {
    const res = await axios.delete(`${this.placemarkUrl}/api/discovery/attractions`);
    return res.data;
  },

  async deleteLondonRestaurantLocations() {
    const res = await axios.delete(`${this.placemarkUrl}/api/discovery/restaurants`);
    return res.data;
  },

  async deleteLondonHotelLocations() {
    const res = await axios.delete(`${this.placemarkUrl}/api/discovery/hotels`);
    return res.data;
  },

  async updateLondonLocationById(id, location) {
    const res = await axios.put(`${this.placemarkUrl}/api/discovery/${id}`, location);
    return res.data;
  },
};
