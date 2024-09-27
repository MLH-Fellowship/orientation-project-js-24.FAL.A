import { React } from "react";
import { API_URL } from "../../constants";

export default function ViewEducation({ educations, onEditEducation }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>School</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Grade</th>
            <th>Logo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {educations.length > 0 ? (
            educations.map((education, index) => (
              <tr key={index}>
                <td>{education.course}</td>
                <td>{education.school}</td>
                <td>{education.start_date}</td>
                <td>{education.end_date}</td>
                <td>{education.grade}</td>
                <td>
                  {education.logo && (
                    <img
                      src={`${API_URL}/uploads/${education.logo}`}
                      alt={education.course}
                      width={50}
                    />
                  )}
                </td>
                <td>
                  <button onClick={() => onEditEducation(education, index)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No education records added yet :(</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
