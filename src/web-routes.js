import { accountsController } from "./controllers/accounts-controller.js";
import { placemarkController } from "./controllers/placemark-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "POST", path: "/admin/change/{id}", config: accountsController.updateUserById },
  { method: "GET", path: "/admin/remove/{id}", config: accountsController.getRemoveView },
  { method: "POST", path: "/admin/remove/{id}", config: accountsController.removeUserById },

  { method: "GET", path: "/user", config: placemarkController.getUserInformation },
  { method: "POST", path: "/user/uploadimage", config: placemarkController.updateImage },
  { method: "POST", path: "/user/updateinfo", config: placemarkController.updateInfo },
  { method: "GET", path: "/search", config: placemarkController.index },
  // { method: "POST", path: "/search", config: placemarkController.search },
  { method: "GET", path: "/favorite/create", config: placemarkController.getCreatingLocationForm },
  { method: "POST", path: "/favorite/create", config: placemarkController.create },
  { method: "GET", path: "/favorite/attractions", config: placemarkController.favoriteAttractions },
  { method: "GET", path: "/favorite/hotels", config: placemarkController.favoriteHotels },
  { method: "GET", path: "/favorite/restaurants", config: placemarkController.favoriteRestaurants },
  { method: "GET", path: "/favorite/update/{id}", config: placemarkController.getLocationById },
  { method: "POST", path: "/favorite/update/{id}", config: placemarkController.updateLocationById },
  { method: "GET", path: "/favorite/remove/{id}", config: placemarkController.removeLocationById },
  { method: "GET", path: "/favorite", config: placemarkController.favorite },

  { method: "GET", path: "/discovery/attractions", config: placemarkController.showDiscoveryAttractions },
  { method: "GET", path: "/discovery/hotels", config: placemarkController.showDiscoveryHotels },
  { method: "GET", path: "/discovery/restaurants", config: placemarkController.showDiscoveryRestaurants },
  { method: "GET", path: "/discovery", config: placemarkController.showDiscovery },
  { method: "GET", path: "/discovery/create", config: placemarkController.showDiscoveryCreateForm },
  { method: "POST", path: "/discovery/create", config: placemarkController.discoveryCreate },
  { method: "GET", path: "/discovery/update/{id}", config: placemarkController.showDiscoveryUpdateForm },
  { method: "POST", path: "/discovery/update/{id}", config: placemarkController.discoveryUpdate },
  { method: "GET", path: "/discovery/remove/{id}", config: placemarkController.discoveryRemove },

  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public",
      },
    },
    options: { auth: false },
  },
];
