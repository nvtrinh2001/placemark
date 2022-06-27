import Joi from "joi";
import Mongoose from "mongoose";

const { Schema } = Mongoose;

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  avatar: Joi.string().default("https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f6/ee/68/default-avatar-2020-9.jpg?w=100&h=-1&s=1"),
  type: Joi.string().default("client"),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const DiscoverySpec = {
  name: Joi.string().required(),
  address: Joi.string().required(),
  lat: Joi.string().required(),
  lng: Joi.string().required(),
  description: Joi.string().required(),
  images: {
    0: Joi.string().required(),
    1: Joi.string(),
  },
};
