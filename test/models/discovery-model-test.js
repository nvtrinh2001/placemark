import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testLocations, randomLocation, myHouse, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Discovery Model tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.userStore.deleteAll();
    await db.discoveryStore.deleteAll();
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testLocations[i] = await db.discoveryStore.addANewLocation(
        testLocations[i].name,
        testLocations[i].address,
        testLocations[i].lat,
        testLocations[i].lng,
        testLocations[i].description,
        testLocations[i].image,
        testLocations[i].type
      );
    }
  });

  test("create a new London location", async () => {
    let returnedLocations = await db.discoveryStore.getAllLocations();
    assert.equal(returnedLocations.length, 3);
    assertSubset(returnedLocations[0], testLocations[0]);
    await db.discoveryStore.deleteAll();
    returnedLocations = await db.discoveryStore.getAllLocations();
    assert.equal(returnedLocations.length, 0);
  });

  test("get and delete a London location", async () => {
    await db.discoveryStore.addANewLocation(
      randomLocation.name,
      randomLocation.address,
      randomLocation.lat,
      randomLocation.lng,
      randomLocation.description,
      randomLocation.image,
      randomLocation.type
    );
    let allLocations = await db.discoveryStore.getAllLocations();
    const returnedLocation = await db.discoveryStore.getLocationById(allLocations[0]._id);
    assertSubset(randomLocation, returnedLocation);

    await db.discoveryStore.deleteLocationById(returnedLocation._id);
    allLocations = await db.discoveryStore.getAllLocations();
    assert.equal(allLocations.length, 3);
  });

  test("get and delete all locations", async () => {
    await db.discoveryStore.addANewLocation(
      randomLocation.name,
      randomLocation.address,
      randomLocation.lat,
      randomLocation.lng,
      randomLocation.description,
      randomLocation.image,
      randomLocation.type
    );
    let attractions = await db.discoveryStore.getAllLocations();
    assert.equal(attractions.length, 4);

    await db.discoveryStore.deleteAll();
    attractions = await db.discoveryStore.getAllLocations();
    assert.equal(attractions.length, 0);
  });

  test("get and delete all attractions", async () => {
    await db.discoveryStore.addANewLocation(
      randomLocation.name,
      randomLocation.address,
      randomLocation.lat,
      randomLocation.lng,
      randomLocation.description,
      randomLocation.image,
      randomLocation.type
    );
    let attractions = await db.discoveryStore.getAllAttractionLocations();
    assert.equal(attractions.length, 2);

    await db.discoveryStore.deleteAllAttractions();
    attractions = await db.discoveryStore.getAllAttractionLocations();
    assert.equal(attractions.length, 0);
  });

  test("get and delete all restaurants", async () => {
    await db.discoveryStore.addANewLocation(
      randomLocation.name,
      randomLocation.address,
      randomLocation.lat,
      randomLocation.lng,
      randomLocation.description,
      randomLocation.image,
      randomLocation.type
    );
    let restaurants = await db.discoveryStore.getAllRestaurantLocations();
    assert.equal(restaurants.length, 1);

    await db.discoveryStore.deleteAllRestaurants();
    restaurants = await db.discoveryStore.getAllRestaurantLocations();
    assert.equal(restaurants.length, 0);
  });

  test("get and delete all hotels", async () => {
    await db.discoveryStore.addANewLocation(
      randomLocation.name,
      randomLocation.address,
      randomLocation.lat,
      randomLocation.lng,
      randomLocation.description,
      randomLocation.image,
      randomLocation.type
    );
    let hotels = await db.discoveryStore.getAllHotelLocations();
    assert.equal(hotels.length, 1);

    await db.discoveryStore.deleteAllHotels();
    hotels = await db.discoveryStore.getAllHotelLocations();
    assert.equal(hotels.length, 0);
  });

  test("update a location", async () => {
    await db.discoveryStore.addANewLocation(
      randomLocation.name,
      randomLocation.address,
      randomLocation.lat,
      randomLocation.lng,
      randomLocation.description,
      randomLocation.image,
      randomLocation.type
    );
    const allLocations = await db.discoveryStore.getAllLocations();
    const returnedLocation = await db.discoveryStore.getLocationById(allLocations[0]._id);
    assertSubset(randomLocation, returnedLocation);
    const updatedLocation = await db.discoveryStore.updateLocationById(returnedLocation._id, myHouse);
    assertSubset(updatedLocation, myHouse);
  });
});
