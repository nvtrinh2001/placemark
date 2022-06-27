![Travisor](./public/images/Travisor.png)

# Travisor Hapi

![NPM](https://img.shields.io/npm/l/svelte?color=orange)

The application provides API to manage users and locations of [Travisor Application](https://travisor-svelte.vercel.app/).

It is built using Nodejs with Hapi Framework, along with some other packages. Mongodb is also used to manage the database of the application.

Data (has been modified to fit the application) is based on several APIs hosted on RapidAPI:

- [Places](https://rapidapi.com/opentripmap/api/places1/)
- [Hotels com Provider](https://rapidapi.com/tipsters/api/hotels-com-provider/)
- [Worldwide Restaurants](https://rapidapi.com/ptwebsolution/api/worldwide-restaurants/)
- [Forward & Reverse Geocoding](https://rapidapi.com/GeocodeSupport/api/forward-reverse-geocoding/)

## Website

Check out [Travisor Hapi](https://travisor-hapi.herokuapp.com/) website:

- https://travisor-hapi.herokuapp.com/

## Key Features

- Favorite: list, add, update, and remove your favorite locations.
- London Discovery: list, add, update, and remove London locations.
- Account Management: change avatar and detail information.
- Administration: change every user information, and delete favorite locations of any user.

**Important Notes**

Only account having `type: administrator` can use the Administration feature. By default, only the account `admin@travisor.com` have the `adminitrator` privilege. You can find the password on the [seed data file](./src/models/mongo/seed-data.js).

When a new user is created, it will be given the type of `client` by default, and only account with type of `administrator` can change this.

## Installation

**Clone this directory**

```
git clone git@github.com:nvtrinh2001/placemark-hapi.git
```

**Update new versions for dependent packages**

    // Check if there is any new versions
    ncu
    // Update new versions in package.json
    ncu -u

**Build**

```
npm install
```

To run the application on your local machine:

```
npm run dev
```

The application should start running:

- http://localhost:4000/
