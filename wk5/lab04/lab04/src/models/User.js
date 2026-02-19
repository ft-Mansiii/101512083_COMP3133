const mongoose = require("mongoose");

// Validations required by lab
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cityRegex = /^[A-Za-z ]+$/;             // alphabets + space only
const urlRegex = /^https?:\/\/.+/i;           // must start http:// or https://
const zipRegex = /^\d{5}-\d{4}$/;             // 12345-1234
const phoneRegex = /^\d-\d{3}-\d{3}-\d{4}$/;  // 1-123-123-1234

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
        match: [/^[A-Za-z .]+$/, "name can contain only alphabets, spaces and dots"]

    },

    username: {
      type: String,
      required: [true, "username is required"],
      minlength: [4, "username must be at least 4 characters"],
      maxlength: [100, "username must be at most 100 characters"],
      trim: true
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [emailRegex, "email must be a valid email address"]
    },

    address: {
      street: {
        type: String,
        required: [true, "address.street is required"],
        trim: true
      },
      suite: {
        type: String,
        required: [true, "address.suite is required"],
        trim: true
      },
      city: {
        type: String,
        required: [true, "address.city is required"],
        trim: true,
        match: [cityRegex, "city can contain only alphabets and spaces"]
      },
      zipcode: {
        type: String,
        required: [true, "address.zipcode is required"],
        match: [zipRegex, "zipcode must be in format 12345-1234"]
      },
      geo: {
        lat: {
          type: String,
          required: [true, "address.geo.lat is required"]
        },
        lng: {
          type: String,
          required: [true, "address.geo.lng is required"]
        }
      }
    },

    phone: {
      type: String,
      required: [true, "phone is required"],
      match: [phoneRegex, "phone must be in format 1-123-123-1234"]
    },

    website: {
      type: String,
      required: [true, "website is required"],
      trim: true,
      match: [urlRegex, "website must be a valid URL starting with http:// or https://"]
    },

    company: {
      name: {
        type: String,
        required: [true, "company.name is required"],
        trim: true
      },
      catchPhrase: {
        type: String,
        required: [true, "company.catchPhrase is required"],
        trim: true
      },
      bs: {
        type: String,
        required: [true, "company.bs is required"],
        trim: true
      }
    }
  },
  { collection: "users", timestamps: true }
);


module.exports = mongoose.model("User", UserSchema);
