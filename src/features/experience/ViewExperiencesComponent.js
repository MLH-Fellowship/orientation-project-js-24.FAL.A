import { React, useEffect, useState } from "react";
import "./ExperienceComponent.css";
import { API_URL } from "../../constants";

function ViewExperiencesComponent({ onEditExperience }) {
  const [experiences, setExperiences] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/resume/experience`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setExperiences(data);
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        setError(true);
      });
  }, []);

  return (
    <div>
      {error ? (
        <p>Error in fetching experiences. Please refresh.</p>
      ) : experiences === null ? (
        <p>Loading experiences...</p>
      ) : experiences.length < 1 ? (
        <p>No experiences added yet!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Description</th>
              <th>Logo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((experience) => (
              <tr key={experience.id}>
                <td>{experience.company}</td>
                <td>{experience.title}</td>
                <td>{experience.start_date}</td>
                <td>{experience.end_date}</td>
                <td>{experience.description}</td>
                <td>
                  {experience.logo ? (
                    <img
                      src={`${API_URL}/uploads/${experience.logo}`}
                      alt={experience.logo}
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : (
                    <p>No logo</p>
                  )}
                </td>
                <td>
                  <button onClick={() => onEditExperience(experience)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default ViewExperiencesComponent;
