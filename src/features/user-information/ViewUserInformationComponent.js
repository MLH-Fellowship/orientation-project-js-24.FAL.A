import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import "./UserInformationComponent.css";

function ViewUserInformationComponent({ onEditUserInfo }) {
  const [userInformation, setUserInformation] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/resume/user_information`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setUserInformation(data[0]);
          console.log(data);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return (
    <div>
      {error ? (
        <p>No User information added yet!</p>
      ) : userInformation === null ? (
        <p>Loading user information....</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr key={userInformation.name}>
              <td>{userInformation.name}</td>
              <td>{userInformation.phone_number}</td>
              <td>{userInformation.email_address}</td>
              <td>
                <button onClick={() => onEditUserInfo(userInformation)}>
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewUserInformationComponent;
