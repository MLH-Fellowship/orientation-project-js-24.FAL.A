import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { API_URL } from "../../constants";
import Dropzone from "react-dropzone";

export default function EditEducationForm({
  setShowForm,
  educationToEdit,
  onUpdate,
}) {
  const [course, setCourse] = useState("");
  const [school, setSchool] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [grade, setGrade] = useState("");
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    if (educationToEdit) {
      setCourse(educationToEdit.course || "");
      setSchool(educationToEdit.school || "");
      setStartDate(educationToEdit.start_date || "");
      setEndDate(educationToEdit.end_date || "");
      setGrade(educationToEdit.grade || "");
      setLogo(educationToEdit.logo || null);
    }
  }, [educationToEdit]);

  const handleEditEducation = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("course", course);
    formData.append("school", school);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("grade", grade);
    if (logo && typeof logo !== "string") {
      formData.append("logo", logo);
    }

    try {
      const response = await fetch(
        `${API_URL}/resume/education/${educationToEdit.index}`,
        {
          method: "PUT",
          body: formData,
        },
      );

      if (response.ok) {
        const updatedEducation = {
          ...educationToEdit,
          course,
          school,
          start_date: startDate,
          end_date: endDate,
          grade,
          logo,
        };
        onUpdate(updatedEducation);
        setShowForm(false);
      } else {
        console.error("Failed to update education");
      }
    } catch (error) {
      console.error("Error updating education:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleEditEducation}>
      <div className={styles.formBody}>
        {/* Form fields pre-filled with the current education data */}
        <div className={styles.inputs}>
          <label htmlFor="course">Course: </label>
          <input
            type="text"
            name="course"
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputs}>
          <label htmlFor="school">School: </label>
          <input
            type="text"
            name="school"
            id="school"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputs}>
          <label htmlFor="startDate">Start Date: </label>
          <input
            type="text"
            name="startDate"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputs}>
          <label htmlFor="endDate">End Date: </label>
          <input
            type="text"
            name="endDate"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputs}>
          <label htmlFor="grade">Grade: </label>
          <input
            type="text"
            name="grade"
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </div>

        {/* Logo upload using Dropzone */}
        <div className={styles.inputs}>
          <label htmlFor="logo">Logo: </label>
          <Dropzone onDrop={(acceptedFiles) => setLogo(acceptedFiles[0])}>
            {({ getRootProps, getInputProps }) => (
              <section className={styles.dropzoneContainer} {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={styles.dropzoneContent}>
                  <p className={styles.dropzoneText}>
                    Drag & drop your file here, or{" "}
                    <span className={styles.browseText}>browse</span> to select
                    a file.
                  </p>
                  {logo && typeof logo === "string" && (
                    <p className={styles.fileName}>Current file: {logo}</p> // Show current logo
                  )}
                  {logo && typeof logo !== "string" && (
                    <p className={styles.fileName}>
                      Selected file: {logo.name}
                    </p> // Show new logo file
                  )}
                </div>
              </section>
            )}
          </Dropzone>
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
