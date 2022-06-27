import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testLocations, randomLocation, myHouse, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

let user;

suite("Location Model tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.userStore.deleteAll();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      user = await db.userStore.addUser(testUsers[i]);
    }
    await db.locationStore.deleteAll(user._id);
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testLocations[i] = await db.locationStore.addANewLocation(
        testLocations[i].name,
        testLocations[i].address,
        testLocations[i].lat,
        testLocations[i].lng,
        testLocations[i].description,
        testLocations[i].image,
        testLocations[i].type,
        user._id
      );
    }
  });

  test("create a new location", async () => {
    let returnedLocations = await db.locationStore.getAllLocations(user._id);
    assert.equal(returnedLocations.length, 3);
    assertSubset(returnedLocations[0], testLocations[0]);
    await db.locationStore.deleteAll(user._id);
    returnedLocations = await db.locationStore.getAllLocations(user._id);
    assert.equal(returnedLocations.length, 0);
  });

  test("get and delete an location", async () => {
    await db.locationStore.addANewLocation(
      randomLocation.name,
      randomLocation.address,
      randomLocation.lat,
      randomLocation.lng,
      randomLocation.description,
      randomLocation.image,
      randomLocation.type,
      user._id
    );
    let allLocations = await db.locationStore.getAllLocations(user._id);
    const returnedLocation = await db.locationStore.getLocationById(allLocations[0]._id);
    assertSubset(randomLocation, returnedLocation);

    await db.locationStore.deleteLocationById(returnedLocation._id);
    allLocations = await db.locationStore.getAllLocations(user._id);
    assert.equal(allLocations.length, 3);
  });

  test("get and delete all locations", async () => {
    await db.locationStore.addANewLocation(
      randomLocation.name,
      randomLocation.address,
      randomLocation.lat,
      randomLocation.lng,
      randomLocation.description,
      randomLocation.image,
      randomLocation.type,
      user._id
    );
    let attractions = await db.locationStore.getAllLocations(user._id);
    assert.equal(attractions.length, 4);

    await db.locationStore.deleteAll(user._id);
    attractions = await db.locationStore.getAllLocations(user._id);
    assert.equal(attractions.length, 0);
  });

  test("get and delete all attractions", async () => {
    await db.locationStore.addANewLocation(
      randomLocation.name,
      randomLocation.address,
      randomLocation.lat,
      randomLocation.lng,
      randomLocation.description,
      randomLocation.image,
      randomLocation.type,
      user._id
    );
    let attractions = await db.locationStore.getAllAttractionLocations(user._id);
    assert.equal(attractions.length, 2);

    await db.locationStore.deleteAllAttractions(user._id);
    attractions = await db.locationStore.getAllAttractionLocations(user._id);
    assert.equal(attractions.length, 0);
  });

  test("get and delete all restaurants", async () => {
    await db.locationStore.addANewLocation(
      randomLocation.name,
      randomLocation.address,
      randomLocation.lat,
      randomLocation.lng,
      randomLocation.description,
      randomLocation.image,
      randomLocation.type,
      user._id
    );
    let restaurants = await db.locationStore.getAllRestaurantLocations(user._id);
    assert.equal(restaurants.length, 1);

    await db.locationStore.deleteAllRestaurants(user._id);
    restaurants = await db.locationStore.getAllRestaurantLocations(user._id);
    assert.equal(restaurants.length, 0);
  });

  test("get and delete all hotels", async () => {
    await db.locationStore.addANewLocation(
      randomLocation.name,
      randomLocation.address,
      randomLocation.lat,
      randomLocation.lng,
      randomLocation.description,
      randomLocation.image,
      randomLocation.type,
      user._id
    );
    let hotels = await db.locationStore.getAllHotelLocations(user._id);
    assert.equal(hotels.length, 1);

    await db.locationStore.deleteAllHotels(user._id);
    hotels = await db.locationStore.getAllHotelLocations(user._id);
    assert.equal(hotels.length, 0);
  });

  test("update a location", async () => {
    await db.locationStore.addANewLocation(
      randomLocation.name,
      randomLocation.address,
      randomLocation.lat,
      randomLocation.lng,
      randomLocation.description,
      randomLocation.image,
      randomLocation.type,
      user._id
    );
    const allLocations = await db.locationStore.getAllLocations(user._id);
    const returnedLocation = await db.locationStore.getLocationById(allLocations[0]._id);
    assertSubset(randomLocation, returnedLocation);
    const updatedLocation = await db.locationStore.updateLocationById(returnedLocation._id, myHouse);
    assertSubset(updatedLocation, myHouse);
  });
});
