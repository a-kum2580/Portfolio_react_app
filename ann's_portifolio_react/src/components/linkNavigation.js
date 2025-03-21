import { FaGithub, FaUniversity } from "react-icons/fa";

function LinkNavigation() {
  return (
    <nav>
      <h2>LINKS AND NAVIGATION</h2>
      <ul>
        <li>
          <FaGithub />{" "}
          <a href="https://github.com/a-kum2580" target="_blank" rel="noopener noreferrer">
            My GitHub Profile
          </a>
        </li>
        <li>
          <FaUniversity />{" "}
          <a href="https://moodle.ucu.ac.ug/" target="_blank" rel="noopener noreferrer">
            Moodle ucu webpage
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default LinkNavigation;
