import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const locationsApi = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        const locations = db.locationStore.getAllLocations(loggedInUser._id);
        return locations;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all userApi",
    notes: "Returns details of all userApi",
  },

  findAllAttractions: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        const locations = db.locationStore.getAllAttractionLocations(loggedInUser._id);
        return locations;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findAllRestaurants: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        const locations = db.locationStore.getAllRestaurantLocations(loggedInUser._id);
        return locations;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findAllHotels: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        const locations = db.locationStore.getAllHotelLocations(loggedInUser._id);
        return locations;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  createLocation: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        const location = await db.locationStore.addANewLocation(
          request.payload.name,
          request.payload.address,
          request.payload.lat,
          request.payload.lng,
          request.payload.description,
          request.payload.image,
          request.payload.type,
          loggedInUser._id
        );
        if (location) {
          return location;
        }
        return Boom.badImplementation("error creating playlist");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.locationStore.deleteLocationById(request.params.id);
        return { success: true };
      } catch (err) {
        return Boom.serverUnavailable("No Location with this id");
      }
    },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const location = await db.locationStore.getLocationById(request.params.id);
        if (!location) {
          return Boom.notFound("No Location with this id");
        }
        return location;
      } catch (err) {
        return Boom.serverUnavailable("No Location with this id");
      }
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        await db.locationStore.deleteAll(loggedInUser._id);
        return { success: true };
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAllAttractions: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        await db.locationStore.deleteAllAttractions(loggedInUser._id);
        return { success: true };
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAllRestaurants: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        await db.locationStore.deleteAllRestaurants(loggedInUser._id);
        return { success: true };
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAllHotels: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        await db.locationStore.deleteAllHotels(loggedInUser._id);
        return { success: true };
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  updateOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        const newLocationInfo = {
          name: request.payload.name,
          address: request.payload.address,
          lat: request.payload.lat,
          lng: request.payload.lng,
          description: request.payload.description,
          image: request.payload.image,
          type: request.payload.type,
          userid: loggedInUser._id,
        };
        const newLocation = await db.locationStore.updateLocationById(request.params.id, newLocationInfo);
        return newLocation;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
