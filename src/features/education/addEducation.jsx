import { useEffect, useState } from "react";
import AddEducationForm from "./addEducationForm";
import ViewEducation from "./ViewEducation";
import { API_URL } from "../../constants";
import styles from "./style.module.css";

export default function AddEducation() {
  const [showForm, setShowForm] = useState(false);
  const [educations, setEducations] = useState([]);
  const [error, setError] = useState(false);
  const [educationToEdit, setEducationToEdit] = useState(null);

  const fetchEducations = async () => {
    try {
      const response = await fetch(`${API_URL}/resume/education`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setEducations(data);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching educations:", error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const addEducation = async (newEducation) => {
    await fetchEducations();
    setShowForm(false);
  };

  const updateEducation = async (updatedEducation) => {
    await fetchEducations();
    setShowForm(false);
    setEducationToEdit(null);
  };

  const handleEditEducation = (education, index) => {
    setEducationToEdit({ ...education, index });
    setShowForm(true);
  };

  return (
    <section>
      {showForm ? (
        <AddEducationForm
          setShowForm={setShowForm}
          addEducation={addEducation}
          educationToEdit={educationToEdit}
          onUpdate={updateEducation}
        />
      ) : (
        <>
          {error ? (
            <p>Error fetching educations. Please refresh.</p>
          ) : (
            <ViewEducation
              educations={educations}
              onEditEducation={handleEditEducation}
            />
          )}
          <div className={styles.btncontainer}>
            <button
              onClick={() => {
                setEducationToEdit(null);
                setShowForm(true);
              }}
            >
              Add Education
            </button>
          </div>
        </>
      )}
    </section>
  );
}
