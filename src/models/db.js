import { userMongoStore } from "./mongo/user-mongo-store.js";
import { locationMongoStore } from "./mongo/location-mongo-store.js";
import { discoveryMongoStore } from "./mongo/discovery-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  locationStore: null,
  discoveryStore: null,

  init(storeType) {
    switch (storeType) {
      case "mongo":
        this.userStore = userMongoStore;
        this.locationStore = locationMongoStore;
        this.discoveryStore = discoveryMongoStore;
        connectMongo();
        break;
      default:
    }
  },
};
