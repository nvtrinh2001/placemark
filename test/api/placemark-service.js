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

  async makeDonation(id, donation) {
    const response = await axios.post(`${this.placemarkUrl}/api/candidates/${id}/donations`, donation);
    return response.data;
  },

  async getDonations(id) {
    const response = await axios.get(`${this.placemarkUrl}/api/candidates/${id}/donations`);
    return response.data;
  },

  async createCandidate(newCandidate) {
    const response = await axios.post(`${this.placemarkUrl}/api/candidates`, newCandidate);
    return response.data;
  },

  // Location
  async createLocation(location) {
    try {
      const res = await axios.post(`${this.placemarkUrl}/api/locations`, location);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async getAllLocations() {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/locations`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async getAllAttractionLocations() {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/locations/attractions`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async getAllRestaurantLocations() {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/locations/restaurants`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async getAllHotelLocations() {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/locations/hotels`);
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

  async deleteAllLocations() {
    const res = await axios.delete(`${this.placemarkUrl}/api/locations`);
    return res.data;
  },

  async deleteAllAttractionLocations() {
    const res = await axios.delete(`${this.placemarkUrl}/api/locations/attractions`);
    return res.data;
  },

  async deleteAllRestaurantLocations() {
    const res = await axios.delete(`${this.placemarkUrl}/api/locations/restaurants`);
    return res.data;
  },

  async deleteAllHotelLocations() {
    const res = await axios.delete(`${this.placemarkUrl}/api/locations/hotels`);
    return res.data;
  },

  async updateLocationById(id, location) {
    const res = await axios.put(`${this.placemarkUrl}/api/locations/${id}`, location);
    return res.data;
  },
};
