import axios from "axios";
import { useState } from "react";
import classes from "./contact-form.module.css";
function ContactForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  async function sendMessageHandler(event) {
    event.preventDefault();

    const response = await axios.post("/api/contact", { email, name, message });
    console.log(response);
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
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
    </section>
  );
}

export default ContactForm;
