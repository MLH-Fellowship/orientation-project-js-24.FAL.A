import styles from "./style.module.css";
import { useState } from "react";

const edu = [
  {
    course: "Engineering",
    school: "NYU",
    start_date: "October 2022",
    end_date: "August 2024",
    grade: "86%",
    logo: "default.jpg",
  },
  {
    course: "Computer Engineering",
    school: "MIT",
    start_date: "January 2021",
    end_date: "July 2023",
    grade: "90%",
    logo: "updated-logo.jpg",
  },
];

export default function EditEducationForm({ setShowForm }) {
  const [educations, setEducations] = useState(edu);
  const [loading, setLoading] = useState(false);

  const handleAddEducation = async (e) => {
    e.preventDefault();
    console.log(educations);
    setLoading(false);
  };

  return (
    <form className={styles.EduForm} onSubmit={(e) => handleAddEducation(e)}>
      {educations.map((edu, idx) => {
        return (
          <>
            <div className={styles.formBody}>
              <h2>Edit {idx + 1} Education</h2>
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
                      i === idx ? { ...item, course: e.target.value } : item,
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
                      i === idx ? { ...item, school: e.target.value } : item,
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
                      i === idx ? { ...item, end_date: e.target.value } : item,
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
                  required
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
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </>
        );
      })}
    </form>
  );
}
