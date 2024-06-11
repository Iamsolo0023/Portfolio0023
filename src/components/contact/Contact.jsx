import { useRef, useState } from "react";
import "./contact.scss";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";

const variants = {
  initial: {
    y: 500,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const Contact = () => {
  const ref = useRef();
  const formRef = useRef();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpInput, setOtpInput] = useState("");

  const isInView = useInView(ref, { margin: "-100px" });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const sendOtp = async (email) => {
    try {
      const response = await fetch('/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setOtpSent(true);
        setEmailError("");
      } else {
        setEmailError("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setEmailError("An error occurred. Please try again.");
    }
  };

  const verifyOtp = async (otp) => {
    try {
      const response = await fetch('/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });

      if (response.ok) {
        return true;
      } else {
        setOtpError("Invalid OTP. Please try again.");
        return false;
      }
    } catch (error) {
      setOtpError("An error occurred. Please try again.");
      return false;
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    const email = formRef.current.email.value;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    sendOtp(email);
  };

  const handleOtpChange = (e) => {
    setOtpInput(e.target.value);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const isOtpValid = await verifyOtp(otpInput);

    if (isOtpValid) {
      sendEmail(e);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_3tm5fai",
        "template_t9d05ls",
        formRef.current,
        "pwHkaSODknymTaIXg"
      )
      .then(
        (result) => {
          setSuccess(true);
          setError(false);
        },
        (error) => {
          setError(true);
          setSuccess(false);
        }
      );
  };

  return (
    <motion.div
      ref={ref}
      className="contact"
      variants={variants}
      initial="initial"
      whileInView="animate"
    >
      <motion.div className="textContainer" variants={variants}>
        <motion.h1 variants={variants}>Let’s work together</motion.h1>
        <motion.div className="item" variants={variants}>
          <h2>Mail</h2>
          <span>hopesalive0023@gmail.com</span>
        </motion.div>
        <motion.div className="item" variants={variants}>
          <h2>Address</h2>
          <span>Banglore-India</span>
        </motion.div>
        <motion.div className="item" variants={variants}>
          <h2>Phone</h2>
          <span>+91 9925096783</span>
        </motion.div>
      </motion.div>
      <div className="formContainer">
        <motion.div
          className="phoneSvg"
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 0 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <svg width="450px" height="450px" viewBox="0 0 32.666 32.666">
           
