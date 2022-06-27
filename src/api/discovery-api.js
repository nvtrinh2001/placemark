import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const discoveryApi = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const locations = db.discoveryStore.getAllLocations();
        return locations;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findAllAttractions: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const locations = db.discoveryStore.getAllAttractionLocations();
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
        const locations = db.discoveryStore.getAllRestaurantLocations();
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
        const locations = db.discoveryStore.getAllHotelLocations();
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
        const location = await db.discoveryStore.addANewLocation(
          request.payload.name,
          request.payload.address,
          request.payload.lat,
          request.payload.lng,
          request.payload.description,
          request.payload.images,
          request.payload.type
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
        await db.discoveryStore.deleteLocationById(request.params.id);
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
        const location = await db.discoveryStore.getLocationById(request.params.id);
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
        await db.discoveryStore.deleteAll();
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
        await db.discoveryStore.deleteAllAttractions();
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
        await db.discoveryStore.deleteAllRestaurants();
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
        await db.discoveryStore.deleteAllHotels();
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
        const newLocationInfo = {
          name: request.payload.name,
          address: request.payload.address,
          lat: request.payload.lat,
          lng: request.payload.lng,
          description: request.payload.description,
          images: request.payload.images,
          type: request.payload.type,
        };
        const newLocation = await db.discoveryStore.updateLocationById(request.params.id, newLocationInfo);
        return newLocation;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
