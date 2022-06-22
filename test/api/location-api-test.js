import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { maggie, testLocations, randomLocation, myHouse } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Location API tests", () => {
  setup(async () => {
    let user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggie);
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggie);
    await placemarkService.deleteAllLocations();
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      // eslint-disable-next-line no-await-in-loop
      testLocations[i] = await placemarkService.createLocation(testLocations[i]);
      testLocations[i].userid = user._id;
    }
  });
  teardown(async () => {
    await placemarkService.deleteAllUsers();
  });

  test("create a new location", async () => {
    let returnedLocations = await placemarkService.getAllLocations();
    assert.equal(returnedLocations.length, 3);
    assertSubset(returnedLocations[0], testLocations[0]);
    await placemarkService.deleteAllLocations();
    returnedLocations = await placemarkService.getAllLocations();
    assert.equal(returnedLocations.length, 0);
  });

  test("get and delete an location", async () => {
    await placemarkService.createLocation(randomLocation);
    let allLocations = await placemarkService.getAllLocations();
    const returnedLocation = await placemarkService.getLocationById(allLocations[0]._id);
    assertSubset(randomLocation, returnedLocation);

    await placemarkService.deleteLocationById(returnedLocation._id);
    allLocations = await placemarkService.getAllLocations();
    assert.equal(allLocations.length, 3);
  });

  test("get and delete all attractions", async () => {
    await placemarkService.createLocation(randomLocation);
    let attractions = await placemarkService.getAllAttractionLocations();
    assert.equal(attractions.length, 2);

    await placemarkService.deleteAllAttractionLocations();
    attractions = await placemarkService.getAllAttractionLocations();
    assert.equal(attractions.length, 0);
  });

  test("get and delete all restaurants", async () => {
    await placemarkService.createLocation(randomLocation);
    let restaurants = await placemarkService.getAllRestaurantLocations();
    assert.equal(restaurants.length, 1);

    await placemarkService.deleteAllRestaurantLocations();
    restaurants = await placemarkService.getAllRestaurantLocations();
    assert.equal(restaurants.length, 0);
  });

  test("get and delete all hotels", async () => {
    await placemarkService.createLocation(randomLocation);
    let hotels = await placemarkService.getAllHotelLocations();
    assert.equal(hotels.length, 1);

    await placemarkService.deleteAllHotelLocations();
    hotels = await placemarkService.getAllHotelLocations();
    assert.equal(hotels.length, 0);
  });

  test("update a location", async () => {
    await placemarkService.createLocation(randomLocation);
    const allLocations = await placemarkService.getAllLocations();
    const returnedLocation = await placemarkService.getLocationById(allLocations[0]._id);
    assertSubset(randomLocation, returnedLocation);
    const updatedLocation = await placemarkService.updateLocationById(returnedLocation._id, myHouse);
    assertSubset(updatedLocation, myHouse);
  });
});
