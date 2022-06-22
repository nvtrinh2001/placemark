import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { maggie, testLocations, randomLocation, myHouse } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Discovery API tests", () => {
  setup(async () => {
    let user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggie);
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggie);
    await placemarkService.deleteAllLondonLocations();
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      // eslint-disable-next-line no-await-in-loop
      testLocations[i] = await placemarkService.createLondonLocation(testLocations[i]);
    }
  });
  teardown(async () => {
    await placemarkService.deleteAllUsers();
  });

  test("create a new London location", async () => {
    let returnedLocations = await placemarkService.getAllLondonLocations();
    assert.equal(returnedLocations.length, 3);
    assertSubset(returnedLocations[0], testLocations[0]);
    await placemarkService.deleteAllLondonLocations();
    returnedLocations = await placemarkService.getAllLondonLocations();
    assert.equal(returnedLocations.length, 0);
  });

  test("get and delete an London location", async () => {
    await placemarkService.createLondonLocation(randomLocation);
    let allLocations = await placemarkService.getAllLondonLocations();
    const returnedLocation = await placemarkService.getLondonLocationById(allLocations[0]._id);
    assertSubset(randomLocation, returnedLocation);

    await placemarkService.deleteLondonLocationById(returnedLocation._id);
    allLocations = await placemarkService.getAllLondonLocations();
    assert.equal(allLocations.length, 3);
  });

  test("get and delete all London locations", async () => {
    await placemarkService.createLondonLocation(randomLocation);
    let attractions = await placemarkService.getAllLondonLocations();
    assert.equal(attractions.length, 4);

    await placemarkService.deleteAllLondonLocations();
    attractions = await placemarkService.getAllLondonLocations();
    assert.equal(attractions.length, 0);
  });

  test("get and delete all London attractions", async () => {
    await placemarkService.createLondonLocation(randomLocation);
    let attractions = await placemarkService.getLondonAttractionLocations();
    assert.equal(attractions.length, 2);

    await placemarkService.deleteLondonAttractionLocations();
    attractions = await placemarkService.getLondonAttractionLocations();
    assert.equal(attractions.length, 0);
  });

  test("get and delete all London restaurants", async () => {
    await placemarkService.createLondonLocation(randomLocation);
    let restaurants = await placemarkService.getLondonRestaurantLocations();
    assert.equal(restaurants.length, 1);

    await placemarkService.deleteLondonRestaurantLocations();
    restaurants = await placemarkService.getLondonRestaurantLocations();
    assert.equal(restaurants.length, 0);
  });

  test("get and delete all London hotels", async () => {
    await placemarkService.createLondonLocation(randomLocation);
    let hotels = await placemarkService.getLondonHotelLocations();
    assert.equal(hotels.length, 1);

    await placemarkService.deleteLondonHotelLocations();
    hotels = await placemarkService.getLondonHotelLocations();
    assert.equal(hotels.length, 0);
  });

  test("update a London location", async () => {
    await placemarkService.createLondonLocation(randomLocation);
    const allLocations = await placemarkService.getAllLondonLocations();
    const returnedLocation = await placemarkService.getLondonLocationById(allLocations[0]._id);
    assertSubset(randomLocation, returnedLocation);
    const updatedLocation = await placemarkService.updateLondonLocationById(returnedLocation._id, myHouse);
    assertSubset(updatedLocation, myHouse);
  });
});
