import { useState } from "react";
import styles from "./style.module.css";
import { API_URL } from "../../constants";

export default function AddSkillForm({ setShowForm }) {
  const [name, setName] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [logo, setLogo] = useState("");

  const handleAddSkill = async (e) => {
    e.preventDefault();

    const data = {
      name,
      proficiency,
      logo,
    };
    console.log(JSON.stringify(data));
    try {
      const response = await fetch(`${API_URL}/resume/skill`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Skill was added successfully!!");
        setName("");
        setProficiency("");
        setLogo("");
      } else {
        alert("Failed to add the skill");
      }
    } catch (error) {
      console.error("Error adding skill:", error);
      alert("An error occurred while adding the skill");
    }
  };

  return (
    <form className={styles.form} onSubmit={(e) => handleAddSkill(e)}>
      <div className={styles.formBody}>
        <div className={styles.inputs}>
          <label htmlFor="name">Skill Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="add skill name ..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={3}
          />
        </div>
        <div className={styles.inputs}>
          <label htmlFor="proficiency">Skill proficiency: </label>
          <input
            type="text"
            name="proficiency"
            id="proficiency"
            placeholder="add skill proficiency ..."
            value={proficiency}
            onChange={(e) => setProficiency(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputs}>
          <label htmlFor="proficiency">Logo: </label>
          <input
            type="file"
            name="logo"
            id="logo"
            placeholder="add skill logo ..."
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            required
          />
        </div>
      </div>
      <div className={styles.formButtons}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
