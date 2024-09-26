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
        if (data && typeof data === "object" && data.name) {
          setUserInformation(data);
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
        <p>Error in fetching user information. Please refresh.</p>
      ) : userInformation === null ? (
        <p>Loading user information....</p>
      ) : userInformation.length < 1 ? (
        <p>No user information added yet :(</p>
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
