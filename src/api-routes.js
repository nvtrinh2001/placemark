import { userApi } from "./api/users-api.js";
import { locationsApi } from "./api/locations-api.js";
import { discoveryApi } from "./api/discovery-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "GET", path: "/api/user", config: userApi.findCurrentUser },
  { method: "POST", path: "/api/user/update", config: userApi.updateCurrentUser },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "GET", path: "/api/locations", config: locationsApi.findAll },
  { method: "GET", path: "/api/locations/attractions", config: locationsApi.findAllAttractions },
  { method: "GET", path: "/api/locations/restaurants", config: locationsApi.findAllRestaurants },
  { method: "GET", path: "/api/locations/hotels", config: locationsApi.findAllHotels },
  { method: "GET", path: "/api/locations/{id}", config: locationsApi.findOne },
  { method: "PUT", path: "/api/locations/{id}", config: locationsApi.updateOne },
  { method: "POST", path: "/api/locations", config: locationsApi.createLocation },
  { method: "DELETE", path: "/api/locations/{id}", config: locationsApi.deleteOne },
  { method: "DELETE", path: "/api/locations", config: locationsApi.deleteAll },
  { method: "DELETE", path: "/api/locations/attractions", config: locationsApi.deleteAllAttractions },
  { method: "DELETE", path: "/api/locations/restaurants", config: locationsApi.deleteAllRestaurants },
  { method: "DELETE", path: "/api/locations/hotels", config: locationsApi.deleteAllHotels },

  { method: "GET", path: "/api/discovery", config: discoveryApi.findAll },
  { method: "GET", path: "/api/discovery/attractions", config: discoveryApi.findAllAttractions },
  { method: "GET", path: "/api/discovery/restaurants", config: discoveryApi.findAllRestaurants },
  { method: "GET", path: "/api/discovery/hotels", config: discoveryApi.findAllHotels },
  { method: "GET", path: "/api/discovery/{id}", config: discoveryApi.findOne },
  { method: "PUT", path: "/api/discovery/{id}", config: discoveryApi.updateOne },
  { method: "POST", path: "/api/discovery", config: discoveryApi.createLocation },
  { method: "DELETE", path: "/api/discovery/{id}", config: discoveryApi.deleteOne },
  { method: "DELETE", path: "/api/discovery", config: discoveryApi.deleteAll },
  { method: "DELETE", path: "/api/discovery/attractions", config: discoveryApi.deleteAllAttractions },
  { method: "DELETE", path: "/api/discovery/restaurants", config: discoveryApi.deleteAllRestaurants },
  { method: "DELETE", path: "/api/discovery/hotels", config: discoveryApi.deleteAllHotels },
];
