import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useTheme } from "../context/ThemeContext";
import emailjs from "@emailjs/browser";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const data = useStaticQuery(graphql`
    query {
      allSrcJson {
        edges {
          node {
            banner {
              requestForm {
                title
                clientName {
                  label
                  placeholder
                }
                companyName {
                  label
                  placeholder
                }
                email {
                  label
                  placeholder
                }
                phoneNumber {
                  label
                  placeholder
                }
                requestDetails {
                  label
                  placeholder
                }
                submitButton
              }
            }
          }
        }
      }
    }
  `);

  const formTexts = data.allSrcJson.edges[0].node.banner.requestForm;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const templateParams = {
        from_name: formData.clientName,
        from_email: formData.email,
        company_name: formData.companyName,
        phone_number: formData.phoneNumber,
        message: formData.requestDetails,
      };

      await emailjs.send(
        process.env.GATSBY_EMAILJS_SERVICE_ID,
        process.env.GATSBY_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.GATSBY_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus({
        type: "success",
        message: "Your request has been sent successfully!",
      });

      // Reset form
      setFormData({
        clientName: "",
        companyName: "",
        email: "",
        phoneNumber: "",
        requestDetails: "",
      });

      // Close form after a short delay
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus({
        type: "error",
        message: "Failed to send your request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="request-form-overlay">
      <div
        className={`request-form-container ${isDarkMode ? "dark" : "light"}`}
      >
        <div className="request-form-header">
          <h2>{formTexts.title}</h2>
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
        {submitStatus.message && (
          <div className={`submit-status ${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="clientName">{formTexts.clientName.label}</label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder={formTexts.clientName.placeholder}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="companyName">{formTexts.companyName.label}</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder={formTexts.companyName.placeholder}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">{formTexts.email.label}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={formTexts.email.placeholder}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">{formTexts.phoneNumber.label}</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder={formTexts.phoneNumber.placeholder}
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="requestDetails">
              {formTexts.requestDetails.label}
            </label>
            <textarea
              id="requestDetails"
              name="requestDetails"
              value={formData.requestDetails}
              onChange={handleChange}
              placeholder={formTexts.requestDetails.placeholder}
              required
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            className={`submit-button ${isSubmitting ? "submitting" : ""}`}
            disabled={isSubmitting}
          >
            <span className="text">
              <span className="square"></span>
            </span>
            {isSubmitting ? "Sending..." : formTexts.submitButton}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
