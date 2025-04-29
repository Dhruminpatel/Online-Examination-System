// const { builtinModules } = require('module');
const { json } = require('express');
const { z } = require('zod');

//creating registration schema

const signupschema = z.object({
  username: z
    .string({ required_error: 'name is required;' })
    .trim()
    .min(3, { message: 'name should be alteast 3 character' })
    .max(50, { message: 'no more than 50 characters username are allowed' }),
  email: z
    .string({ required_error: 'email is required;' })
    .trim()
    .min(3, { message: 'email should be alteast 3 character' })
    .max(50, { message: 'no more than 50 characters email are allowed' }),
  phone: z
    .string({ required_error: 'phone is required;' })
    .trim()
    .min(10, { message: 'phone should be alteast 10 character' })
    .max(11, { message: 'no more than 11 numbers are allowed' }),
  password: z
    .string({ required_error: 'name is required;' })
    .trim()
    .min(3, { message: 'password should be alteast 3 character' })
    .max(25, { message: 'no more than 25 characters password are allowed' }),
});

const loginschema = z.object({
  email: signupschema.shape.email, // Reuse email validation from signup schema
  password: signupschema.shape.password, // Reuse password validation from signup schema
});

module.exports = { signupschema, loginschema };
