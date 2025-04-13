import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "./RequestForm.css";

const RequestForm = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    clientName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    requestDetails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="request-form-overlay">
      <div
        className={`request-form-container ${isDarkMode ? "dark" : "light"}`}
      >
        <div className="request-form-header">
          <h2>Submit Your Request</h2>
          <button className="close-button" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6.87305 17.1275L17.1275 6.87305"
                stroke={isDarkMode ? "white" : "black"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.1275 17.1275L6.87305 6.87305"
                stroke={isDarkMode ? "white" : "black"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="clientName">Client's Name*</label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="companyName">Company Name*</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter your company"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number*</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your number"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="requestDetails">Request Details*</label>
            <textarea
              id="requestDetails"
              name="requestDetails"
              value={formData.requestDetails}
              onChange={handleChange}
              placeholder="Describe your request..."
              required
            />
          </div>
          <button type="submit" className="submit-button">
            <span className="text">
              <span className="square"></span>
            </span>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
