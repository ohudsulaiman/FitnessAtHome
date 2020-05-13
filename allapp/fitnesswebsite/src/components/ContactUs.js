import React from "react";

class ContactUs extends React.Component {
  render() {
    return (
      <>
        <section classNameName="ContactUs" id="contact">
          <h1>Contact Us</h1>
          <form className="cf">
            <div className="half left cf">
              <input type="text" id="input-name" placeholder="Name" />
              <input
                type="email"
                id="input-email"
                placeholder="Email address"
              />
              <input type="text" id="input-subject" placeholder="Subject" />
            </div>
            <div className="half right cf">
              <textarea
                name="message"
                type="text"
                id="input-message"
                placeholder="Message"
                rows="4"
                cols="100"
              >
                Enter your message...
              </textarea>
            </div>
            <input type="submit" value="Submit" id="input-submit" />
          </form>
        </section>
      </>
    );
  }
}

export default ContactUs;
