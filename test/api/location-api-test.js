import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { maggie, testLocations, randomLocation, myHouse } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

let user;

suite("Location API tests", () => {
  setup(async () => {
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggie);
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggie);
    await placemarkService.deleteAllLocations(user._id);
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      // eslint-disable-next-line no-await-in-loop
      testLocations[i] = await placemarkService.createLocation(testLocations[i], user._id);
    }
  });
  teardown(async () => {
    await placemarkService.deleteAllUsers();
  });

  test("create a new location", async () => {
    let returnedLocations = await placemarkService.getAllLocations(user._id);
    assert.equal(returnedLocations.length, 3);
    assertSubset(returnedLocations[0], testLocations[0]);
    await placemarkService.deleteAllLocations(user._id);
    returnedLocations = await placemarkService.getAllLocations(user._id);
    assert.equal(returnedLocations.length, 0);
  });

  test("get and delete an location", async () => {
    await placemarkService.createLocation(randomLocation);
    let allLocations = await placemarkService.getAllLocations(user._id);
    const returnedLocation = await placemarkService.getLocationById(allLocations[0]._id);
    assertSubset(randomLocation, returnedLocation);

    await placemarkService.deleteLocationById(returnedLocation._id);
    allLocations = await placemarkService.getAllLocations(user._id);
    assert.equal(allLocations.length, 3);
  });

  test("get and delete all locations", async () => {
    await placemarkService.createLocation(randomLocation, user._id);
    let attractions = await placemarkService.getAllLocations(user._id);
    assert.equal(attractions.length, 4);

    await placemarkService.deleteAllLocations(user._id);
    attractions = await placemarkService.getAllLocations(user._id);
    assert.equal(attractions.length, 0);
  });

  test("get and delete all attractions", async () => {
    await placemarkService.createLocation(randomLocation, user._id);
    let attractions = await placemarkService.getAllAttractionLocations(user._id);
    assert.equal(attractions.length, 2);

    await placemarkService.deleteAllAttractionLocations(user._id);
    attractions = await placemarkService.getAllAttractionLocations(user._id);
    assert.equal(attractions.length, 0);
  });

  test("get and delete all restaurants", async () => {
    await placemarkService.createLocation(randomLocation, user._id);
    let restaurants = await placemarkService.getAllRestaurantLocations(user._id);
    assert.equal(restaurants.length, 1);

    await placemarkService.deleteAllRestaurantLocations(user._id);
    restaurants = await placemarkService.getAllRestaurantLocations(user._id);
    assert.equal(restaurants.length, 0);
  });

  test("get and delete all hotels", async () => {
    await placemarkService.createLocation(randomLocation, user._id);
    let hotels = await placemarkService.getAllHotelLocations(user._id);
    assert.equal(hotels.length, 1);

    await placemarkService.deleteAllHotelLocations(user._id);
    hotels = await placemarkService.getAllHotelLocations(user._id);
    assert.equal(hotels.length, 0);
  });

  test("update a location", async () => {
    await placemarkService.createLocation(randomLocation, user._id);
    const allLocations = await placemarkService.getAllLocations(user._id);
    const returnedLocation = await placemarkService.getLocationById(allLocations[0]._id);
    assertSubset(randomLocation, returnedLocation);
    const updatedLocation = await placemarkService.updateLocationById(returnedLocation._id, myHouse);
    assertSubset(updatedLocation, myHouse);
  });
});
