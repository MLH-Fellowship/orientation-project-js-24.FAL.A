import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { API_URL } from "../../constants";
import Dropzone from "react-dropzone";

export default function AddSkillForm({
  setShowForm,
  addSkill,
  skillToEdit,
  onUpdate,
}) {
  const [name, setName] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    if (skillToEdit) {
      setName(skillToEdit.name);
      setProficiency(skillToEdit.proficiency);
      setLogo(skillToEdit.logo);
    }
  }, [skillToEdit]);

  const handleAddSkill = async (e) => {
    e.preventDefault();

    const data = {
      name,
      proficiency,
      logo,
    };
    console.log(JSON.stringify(data));
    try {
      let response = "";
      console.log(logo);
      if (skillToEdit) {
        response = await fetch(`${API_URL}/resume/skill/${skillToEdit.index}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const updatedSkill = { ...skillToEdit, name, proficiency, logo };
          onUpdate(updatedSkill);
        }
      } else {
        response = await fetch(`${API_URL}/resume/skill`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const newSkill = await response.json();
          addSkill(newSkill);
        }
      }

      setName("");
      setProficiency("");
      setLogo(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding skill:", error);
      console.log("An error occurred while adding the skill");
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

        {logo ? (
          <>
            <div className={styles.inputs}>
              <label htmlFor="logo">Logo: </label>
              <Dropzone
                onDrop={(acceptedFiles) => {
                  setLogo(acceptedFiles[0]);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section className={styles.dropzone} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className={styles.dropzoneText}>
                      Drag and drop your files here, or{" "}
                      <span className={styles.browseText}>click</span> to browse
                      for files.
                    </p>
                    {logo && (
                      <p className={styles.fileName}>
                        Current file: {logo.name}
                      </p>
                    )}
                  </section>
                )}
              </Dropzone>
            </div>
          </>
        ) : (
          <div className={styles.inputs}>
            <label htmlFor="logo">Logo: </label>
            <Dropzone
              onDrop={(acceptedFiles) => {
                setLogo(acceptedFiles[0]);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section className={styles.dropzone} {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p style={{ backgrounColor: "white", padding: "10px" }}>
                    Drag and drop your files here, or click to browse for files.
                  </p>
                  {logo && <p>Current file: {logo.name}</p>}
                </section>
              )}
            </Dropzone>
          </div>
        )}
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
