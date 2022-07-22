import axios from "axios";
import Notification from "../ui/notification";
import { useState, useEffect } from "react";
import classes from "./contact-form.module.css";
function ContactForm() {
  async function sendContactData(contactDetails) {
    // const response = await axios.post("/api/contact", contactDetails);
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(contactDetails),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
  }
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState(); // pending, success, error
  const [requestError, setRequestError] = useState(); // pending, success, error

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      setEmail("");
      setName("");
      setMessage("");
      const resetContact = setTimeout(() => {
        setRequestStatus(undefined);
      }, 6000);
      return () => {
        clearTimeout(resetContact);
      };
    }
  }, [requestStatus]);
  async function sendMessageHandler(event) {
    event.preventDefault();
    try {
      setRequestStatus("pending");
      await sendContactData({ email, name, message });
      setRequestStatus("success");
    } catch (error) {
      setRequestStatus("error");
      setRequestError(error.message);
    }
  }
  let notification;
  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }
  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success",
      message: "Message sent successfully!",
    };
  }
  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error",
      message: requestError,
    };
  }
  let actions = (
    <div className={classes.actions}>
      <button>Send Message</button>
    </div>
  );
  if (notification) {
    if ((notification.status = "pending")) {
      actions = (
        <div className={`${classes.actions} ${classes.disabled}`}>
          <button disabled>Sending</button>
        </div>
      );
    }
  }
  return (
    <section className={classes.contact}>
      <h1> How can I help you?</h1>
      <form onSubmit={sendMessageHandler} className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              id="email"
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              id="name"
              required
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            id="message"
            rows="5"
          ></textarea>
        </div>
        {actions}
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
