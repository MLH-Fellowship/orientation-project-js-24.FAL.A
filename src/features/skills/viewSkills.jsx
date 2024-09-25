import { React } from "react";

export default function ViewSkills({ skills, onEditSkills }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Skill</th>
            <th>Proficiency</th>
            <th>Logo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <tr key={index}>
                <td>{skill.name}</td>
                <td>{skill.proficiency}</td>
                <td>
                  {skill.logo && (
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      width={50}
                    />
                  )}
                </td>
                <td>
                  <button onClick={() => onEditSkills(skill, index)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No skills added yet :(</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
