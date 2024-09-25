import React, { useState } from "react";
import AddUserInformationComponent from "./AddUserInformationComponent";
import ViewUserInformationComponent from "./ViewUserInformationComponent";

function UserInformationComponent() {
  const [displayAddUserInformation, setDisplayAddUserInformation] =
    useState(false);
  const [dispalyAddUserInformationButton, setDisplayAddUserInformationButton] =
    useState(true);
  const [userInfoToEdit, setUserInfoToEdit] = useState(null);

  function toggleDisplayAddUserInformation() {
    setDisplayAddUserInformation(!displayAddUserInformation);
  }

  function toggleDisplayAddUserInformationButton() {
    setDisplayAddUserInformationButton(!dispalyAddUserInformationButton);
  }

  function onAddUserInformationButtonClick() {
    toggleDisplayAddUserInformation();
    toggleDisplayAddUserInformationButton();
    setUserInfoToEdit(null);
  }

  function handleUserInfoToEdit(userInfo) {
    setUserInfoToEdit(userInfo);
    toggleDisplayAddUserInformation();
    toggleDisplayAddUserInformationButton();
  }

  return (
    <div>
      {displayAddUserInformation ? (
        <AddUserInformationComponent
          onSubmit={onAddUserInformationButtonClick}
          userInfoToEdit={userInfoToEdit}
        />
      ) : (
        <ViewUserInformationComponent onEditUserInfo={handleUserInfoToEdit} />
      )}
      <br />
      <br />
      {!displayAddUserInformation && dispalyAddUserInformationButton && (
        <button onClick={onAddUserInformationButtonClick}>
          Add User Details
        </button>
      )}
    </div>
  );
}

export default UserInformationComponent;
