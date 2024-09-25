import { React, useEffect, useState } from "react";
import {
  API_URL,
  EMAIL_ADDRESS_REGEX,
  PHONE_NUMBER_REGEX,
} from "../../constants";
import "./UserInformationComponent.css";

function AddUserInformationComponent({ onSubmit, userInfoToEdit }) {
  const defaultUserInformation = {
    name: "",
    phone_number: "",
    email_address: "",
  };

  const [formData, setFormData] = useState(defaultUserInformation);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userInfoToEdit) {
      setFormData({
        name: userInfoToEdit.name || "",
        phone_number: userInfoToEdit.phone_number || "",
        email_address: userInfoToEdit.email_address || "",
      });
    }
  }, [userInfoToEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (name) => {
    setErrors((prevErrors) => {
      const { [name]: _, ...rest } = prevErrors;
      return rest;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required!";
    }

    const internationalPhoneFormat = PHONE_NUMBER_REGEX;
    if (!internationalPhoneFormat.test(formData.phone_number)) {
      newErrors.phone_number = "Please enter a valid phone number";
    }

    const emailFormat = EMAIL_ADDRESS_REGEX;
    if (!emailFormat.test(formData.email_address)) {
      newErrors.email_address = "Please enter a valid email address.";
    }

    return newErrors;
  };

  const closePage = () => {
    setFormData(defaultUserInformation);
    onSubmit();
  };

  const submitForm = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    console.log(formData);

    setErrors(validationErrors);

    if (
      !validationErrors.name &&
      !validationErrors.email_address &&
      !validationErrors.phone_number
    ) {
      const data = {
        name: formData.name,
        email_address: formData.email_address,
        phone_number: formData.phone_number,
      };

      const method = userInfoToEdit ? "PUT" : "POST";

      fetch(`${API_URL}/resume/user_information`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          closePage();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log(validationErrors);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <div className="form-group">
        <div className="input-group">
          <label htmlFor="name">
            <h4>Name</h4>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            onBlur={() => handleBlur("name")}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="phone_bumber">
            <h4>Phone Number</h4>
          </label>
          <input
            type="tel"
            name="phone_number"
            required
            placeholder="+1 234-567-890"
            value={formData.phone_number}
            onChange={handleChange}
            onBlur={() => handleBlur("phone_number")}
          />
          {errors.phone_number && (
            <span className="error-message">{errors.phone_number}</span>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="email_address">
            <h4>Email Address</h4>
          </label>
          <input
            type="email"
            name="email_address"
            required
            placeholder="example@email.com"
            value={formData.email_address}
            onChange={handleChange}
            onBlur={() => handleBlur("email_address")}
          />
          {errors.email_address && (
            <span className="error-message">{errors.email_address}</span>
          )}
        </div>
      </div>

      <div className="buttonGroup">
        <button type="button" className="cancelButton" onClick={closePage}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default AddUserInformationComponent;
