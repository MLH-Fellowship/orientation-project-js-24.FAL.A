import { React, useState } from 'react';
import ViewExperiencesComponent from './ViewExperiencesComponent';
import AddEditExperienceComponent from './AddEditExperienceComponent';

function ExperienceComponent() {

  const [displayAddEditExperienceComponent, setDisplayAddEditExperienceComponent] = useState(false);
  const [displayAddExperienceButton, setDisplayAddExperienceButton] = useState(true);
  const [experienceToEdit, setExperienceToEdit] = useState(null);

  function toggleDisplayAddEditExperienceComponent() {
    setDisplayAddEditExperienceComponent(!displayAddEditExperienceComponent);
  }

  function toggleDisplayAddExperienceButton() {
    setDisplayAddExperienceButton(!displayAddExperienceButton);
  }

  function onAddExperienceButtonClick() {
    toggleDisplayAddEditExperienceComponent();
    toggleDisplayAddExperienceButton();
    setExperienceToEdit(null);
  }

  function handleExperienceToEdit(experience) {
    setExperienceToEdit(experience);
    toggleDisplayAddEditExperienceComponent();
    toggleDisplayAddExperienceButton();
  }

  return (
    <div>
      {displayAddEditExperienceComponent ? <AddEditExperienceComponent
        onAddExperienceButtonClick={onAddExperienceButtonClick}
        experienceToEdit={experienceToEdit} /> :
        <ViewExperiencesComponent
          onEditExperience={handleExperienceToEdit} />}
      <br></br>
      <br></br>
      {displayAddExperienceButton && <button onClick={onAddExperienceButtonClick}>Add Experience</button>}
    </div>
  );

}

export default ExperienceComponent;