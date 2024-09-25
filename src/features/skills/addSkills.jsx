import { useEffect, useState } from "react";
import AddSkillForm from "./addSkillForm";
import ViewSkills from "./viewSkills";
import { API_URL } from "../../constants";
import styles from "./style.module.css";

export default function AddSkills() {
  const [showForm, setShowForm] = useState(false);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(false);
  const [skillToEdit, setSkillToEdit] = useState(null);

  const fetchSkills = async () => {
    try {
      const response = await fetch(`${API_URL}/resume/skill`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const addSkill = async (newSkill) => {
    await fetchSkills();
    setShowForm(false); 
  };

  const updateSkill = async (updatedSkill) => {
    await fetchSkills();
    setShowForm(false);
    setSkillToEdit(null);
  };

  const handleEditSkill = (skill, index) => {
    setSkillToEdit({ ...skill, index });
    setShowForm(true);
  };

  return (
    <section>
      {showForm ? (
        <AddSkillForm
          setShowForm={setShowForm}
          addSkill={addSkill}
          skillToEdit={skillToEdit}
          onUpdate={updateSkill}
        />
      ) : (
        <>
          {error ? (
            <p>Error fetching skills. Please refresh.</p>
          ) : (
            <ViewSkills skills={skills} onEditSkills={handleEditSkill} />
          )}
          <div className={styles.btncontainer} >
            <button
              onClick={() => {
                setSkillToEdit(null);
                setShowForm(true);
              }}
            >
              Add Skill
            </button>
          </div>
        </>
      )}
    </section>
  );
}  