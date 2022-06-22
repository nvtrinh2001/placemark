import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const placemarkController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      return h.view("Favorite", { title: "Favorite Locations", user: loggedInUser });
    },
  },
  favorite: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const locations = await db.locationStore.getAllLocations(loggedInUser._id);
      return h.view("Favorite", {
        title: "Favorite Locations",
        user: loggedInUser,
        locations: locations,
        all: true,
      });
    },
  },
  favoriteAttractions: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const locations = await db.locationStore.getAllAttractionLocations(loggedInUser._id);
      return h.view("Favorite", {
        title: "Favorite Attractions",
        user: loggedInUser,
        locations: locations,
        attractions: true,
      });
    },
  },
  favoriteHotels: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const locations = await db.locationStore.getAllHotelLocations(loggedInUser._id);
      return h.view("Favorite", {
        title: "Favorite Hotels",
        user: loggedInUser,
        locations: locations,
        hotels: true,
      });
    },
  },
  favoriteRestaurants: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const locations = await db.locationStore.getAllRestaurantLocations(loggedInUser._id);
      return h.view("Favorite", {
        title: "Favorite Restaurants",
        user: loggedInUser,
        locations: locations,
        restaurants: true,
      });
    },
  },
  getLocationById: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const location = await db.locationStore.getLocationById(request.params.id);
      return h.view("Update", {
        title: "Update Location",
        user: loggedInUser,
        location: location,
      });
    },
  },
  updateLocationById: {
    payload: {
      maxBytes: 100 * 1024 * 1024, // 100 mb
      multipart: true,
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const locationData = {
        name: request.payload.name,
        address: request.payload.address,
        lat: request.payload.lat,
        lng: request.payload.lng,
        description: request.payload.description,
        type: request.payload.type,
        userid: loggedInUser._id,
      };
      const file = request.payload.imagefile;
      if (Object.keys(file).length > 0) {
        locationData.image = await imageStore.uploadImage(file);
        await db.locationStore.updateLocationById(request.params.id, locationData);
      }
      return h.redirect("/favorite");
    },
  },

  removeLocationById: {
    handler: async function (request, h) {
      await db.locationStore.deleteLocationById(request.params.id);
      return h.redirect("/favorite");
    },
  },

  getCreatingLocationForm: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      return h.view("Create", {
        title: "Create A New Location",
        user: loggedInUser,
      });
    },
  },

  create: {
    payload: {
      maxBytes: 100 * 1024 * 1024, // 100 mb
      multipart: true,
    },
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        const locationData = {
          name: request.payload.name,
          address: request.payload.address,
          lat: request.payload.lat,
          lng: request.payload.lng,
          description: request.payload.description,
          type: request.payload.type,
          userid: loggedInUser._id,
        };
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          locationData.image = await imageStore.uploadImage(file);
          await db.locationStore.addANewLocation(
            locationData.name,
            locationData.address,
            locationData.lat,
            locationData.lng,
            locationData.description,
            locationData.image,
            locationData.type,
            locationData.userid
          );
        }
        return h.redirect("/favorite");
      } catch (err) {
        console.log(err);
        return h.redirect("/favorite");
      }
    },
  },

  updateImage: {
    payload: {
      maxBytes: 100 * 1024 * 1024, // 100 mb
      multipart: true,
    },
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          loggedInUser.avatar = await imageStore.uploadImage(file);
          await db.userStore.updateUserById(loggedInUser._id, loggedInUser);
        }
        return h.redirect("/user");
      } catch (err) {
        console.log(err);
        return h.redirect("/user");
      }
    },
  },

  getUserInformation: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const returnedUsers = await db.userStore.getAllUsers();
      const finalUsers = returnedUsers.filter((value) => value._id !== loggedInUser._id);
      return h.view("User", {
        title: "My Account",
        user: loggedInUser,
        allUsers: finalUsers,
      });
    },
  },

  updateInfo: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const userData = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: request.payload.password,
        avatar: loggedInUser.avatar,
        type: request.payload.type,
      };
      await db.userStore.updateUserById(loggedInUser._id, userData);
      return h.redirect("/user");
    },
  },

  showDiscovery: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const locations = await db.discoveryStore.getAllLocations();
      return h.view("Discovery", {
        title: "London Discovery",
        user: loggedInUser,
        locations: locations,
        all: true,
      });
    },
  },

  showDiscoveryCreateForm: {
    handler: async function (request, h) {
      return h.view("DiscoveryCreate", {
        title: "Create A New London Location",
      });
    },
  },

  discoveryCreate: {
    payload: {
      maxBytes: 100 * 1024 * 1024, // 100 mb
      multipart: true,
    },
    handler: async function (request, h) {
      try {
        const locationData = {
          name: request.payload.name,
          address: request.payload.address,
          lat: request.payload.lat,
          lng: request.payload.lng,
          description: request.payload.description,
          type: request.payload.type,
        };
        locationData.images = {
          first: "",
          second: "",
        };
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          locationData.images.first = await imageStore.uploadImage(file);
          locationData.images.second = "";
          await db.discoveryStore.addANewLocation(
            locationData.name,
            locationData.address,
            locationData.lat,
            locationData.lng,
            locationData.description,
            locationData.images,
            locationData.type
          );
        }
        return h.redirect("/discovery");
      } catch (err) {
        console.log(err);
        return h.redirect("/discovery");
      }
    },
  },

  showDiscoveryAttractions: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const locations = await db.discoveryStore.getAllAttractionLocations();
      return h.view("Discovery", {
        title: "London Attractions",
        user: loggedInUser,
        locations: locations,
        attractions: true,
      });
    },
  },
  showDiscoveryHotels: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const locations = await db.discoveryStore.getAllHotelLocations();
      return h.view("Discovery", {
        title: "London Hotels",
        user: loggedInUser,
        locations: locations,
        hotels: true,
      });
    },
  },
  showDiscoveryRestaurants: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const locations = await db.discoveryStore.getAllRestaurantLocations();
      return h.view("Discovery", {
        title: "London Restaurants",
        user: loggedInUser,
        locations: locations,
        restaurants: true,
      });
    },
  },

  showDiscoveryUpdateForm: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const location = await db.discoveryStore.getLocationById(request.params.id);
      return h.view("DiscoveryUpdate", {
        title: "Update London Location",
        user: loggedInUser,
        location: location,
      });
    },
  },

  discoveryUpdate: {
    payload: {
      maxBytes: 100 * 1024 * 1024, // 100 mb
      multipart: true,
    },
    handler: async function (request, h) {
      const locationData = {
        name: request.payload.name,
        address: request.payload.address,
        lat: request.payload.lat,
        lng: request.payload.lng,
        description: request.payload.description,
        type: request.payload.type,
      };
      locationData.images = {
        first: "",
        second: "",
      };
      const file = request.payload.imagefile;
      const currentLocation = await db.discoveryStore.getLocationById(request.params.id);
      locationData.images = currentLocation.images;

      if (Object.keys(file).length > 0) {
        if (currentLocation.images.second !== "") {
          // eslint-disable-next-line prefer-destructuring
          locationData.images.first = locationData.images.second;
        }

        locationData.images.second = await imageStore.uploadImage(file);
        await db.discoveryStore.updateLocationById(request.params.id, locationData);
      }
      return h.redirect("/discovery");
    },
  },

  discoveryRemove: {
    handler: async function (request, h) {
      await db.discoveryStore.deleteLocationById(request.params.id);
      return h.redirect("/discovery");
    },
  },
};
