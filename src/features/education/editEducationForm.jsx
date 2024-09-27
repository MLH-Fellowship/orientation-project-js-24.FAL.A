import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants";

export default function EditEducationForm({ setShowForm }) {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getEducations = async () => {
      try {
        const res = await fetch(`${API_URL}/resume/education`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log([...data]);
        setEducations([...data]);
      } catch (error) {
        console.error("Error fetching education data:", error);
      } finally {
        setLoading(false);
      }
    };
    getEducations();
  }, []);

  const handleEdit = async (index, id) => {
    setLoading(true);
    const eduToEdit = educations.find((edu) => edu.id === id);
    console.log(eduToEdit);
    try {
      const response = await fetch(`${API_URL}/resume/education/${index}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eduToEdit),
      });
      if (response.ok) {
        alert("Education was edited successfully!!");
      } else {
        alert("Failed to edit the Education");
      }
    } catch (error) {
      console.error("Error editing Education:", error);
      alert("An error occurred while editing the Education");
    }
    setLoading(false);
  };

  return (
    <form className={styles.EduForm}>
      {loading
        ? "loading data ..."
        : educations.map((edu, idx) => {
            return (
              <div key={edu.id}>
                <div className={styles.formBody}>
                  <h2>Edit {edu.id} Education</h2>
                  <div className={styles.inputs}>
                    <label htmlFor="course" className={styles.eduLabel}>
                      Course Name:{" "}
                    </label>
                    <input
                      type="text"
                      name="course"
                      id="course"
                      placeholder="add Course ..."
                      value={edu.course}
                      onChange={(e) => {
                        const updatedEdu = educations.map((item, i) =>
                          i === idx
                            ? { ...item, course: e.target.value }
                            : item,
                        );
                        setEducations(updatedEdu);
                      }}
                      required
                      minLength={3}
                      className={styles.eduInput}
                    />
                  </div>
                  <div className={styles.inputs}>
                    <label htmlFor="school" className={styles.eduLabel}>
                      School:{" "}
                    </label>
                    <input
                      type="text"
                      name="school"
                      id="school"
                      placeholder="add school name ..."
                      value={edu.school}
                      onChange={(e) => {
                        const updatedEdu = educations.map((item, i) =>
                          i === idx
                            ? { ...item, school: e.target.value }
                            : item,
                        );
                        setEducations(updatedEdu);
                      }}
                      required
                      minLength={3}
                      className={styles.eduInput}
                    />
                  </div>
                  <div className={styles.inputs}>
                    <label htmlFor="startDate" className={styles.eduLabel}>
                      Start Date:{" "}
                    </label>
                    <input
                      type="text"
                      name="startDate"
                      id="startDate"
                      placeholder="Ex:October 2021 ..."
                      value={edu.start_date}
                      onChange={(e) => {
                        const updatedEdu = educations.map((item, i) =>
                          i === idx
                            ? { ...item, start_date: e.target.value }
                            : item,
                        );
                        setEducations(updatedEdu);
                      }}
                      required
                      minLength={3}
                      className={styles.eduInput}
                    />
                  </div>
                  <div className={styles.inputs}>
                    <label htmlFor="endDate" className={styles.eduLabel}>
                      End Date:{" "}
                    </label>
                    <input
                      type="text"
                      name="endDate"
                      id="endDate"
                      placeholder="Ex:October 2022 ..."
                      value={edu.end_date}
                      onChange={(e) => {
                        const updatedEdu = educations.map((item, i) =>
                          i === idx
                            ? { ...item, end_date: e.target.value }
                            : item,
                        );
                        setEducations(updatedEdu);
                      }}
                      required
                      minLength={3}
                      className={styles.eduInput}
                    />
                  </div>
                  <div className={styles.inputs}>
                    <label htmlFor="grade" className={styles.eduLabel}>
                      Grade:{" "}
                    </label>
                    <input
                      type="text"
                      name="grade"
                      id={`grade_${idx + 1}`}
                      placeholder="Ex:86% ..."
                      value={edu.grade}
                      onChange={(e) => {
                        const updatedEdu = educations.map((item, i) =>
                          i === idx ? { ...item, grade: e.target.value } : item,
                        );
                        setEducations(updatedEdu);
                      }}
                      required
                      minLength={3}
                      className={styles.eduInput}
                    />
                  </div>
                  <div className={styles.inputs}>
                    <label htmlFor="logo">Logo: </label>
                    <input
                      type="file"
                      name="logo"
                      id="logo"
                      placeholder="add skill logo ..."
                      onChange={(e) => {
                        const file = e.target.value;
                        const updatedEdu = educations.map((item, i) =>
                          i === idx
                            ? {
                                ...item,
                                logo: file ? file : item.logo,
                              }
                            : item,
                        );
                        setEducations(updatedEdu);
                      }}
                    />
                    <p>Current Logo: {edu.logo}</p>
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
                  <button
                    type="button"
                    onClick={() => handleEdit(idx, edu.id)}
                    className={styles.submitButton}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </div>
            );
          })}
    </form>
  );
}
