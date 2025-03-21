import React from 'react';
import { FaEnvelope, FaGithub } from "react-icons/fa";

function ContactInformation() {
  return (
    <section>
      <h2>CONTACT INFORMATION</h2>
      <ul className="contact-info">
        <li>
          <FaEnvelope />{" "}
          <a href="mailto:annakum510@gmail.com" aria-label="Send an email">
            annakum510@gmail.com
          </a>
        </li>
      
        <li>
          <FaGithub />{" "}
          <a
            href="https://github.com/a-kum2580"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my GitHub profile"
          >
            My GitHub Account
          </a>
        </li>
      </ul>
    </section>
  );
}

export default ContactInformation;
