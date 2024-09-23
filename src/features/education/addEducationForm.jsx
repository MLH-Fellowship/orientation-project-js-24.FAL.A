import { useState } from "react";
import styles from "./style.module.css";
import { API_URL } from "../../constants";

export default function AddEducationForm({ setShowForm }) {
  const [course, setCourse] = useState("");
  const [school, setSchool] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [grade, setGrade] = useState("");
  const [logo, setLogo] = useState("");

  const [loading, setLoading] = useState(false);

  const handleAddEducation = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      course,
      school,
      startDate,
      endDate,
      grade,
      logo,
    };
    console.log(JSON.stringify(data));
    try {
      const response = await fetch(`${API_URL}/resume/education`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Skill was added successfully!!");
        setCourse("");
        setSchool("");
        setStartDate("");
        setEndDate("");
        setGrade("");
        setLogo("");
      } else {
        alert("Failed to add the skill");
      }
    } catch (error) {
      console.error("Error adding skill:", error);
      alert("An error occurred while adding the skill");
    }
    setLoading(false);
  };

  return (
    <form className={styles.EduForm} onSubmit={(e) => handleAddEducation(e)}>
      <div className={styles.formBody}>
        <div className={styles.inputs}>
          <label htmlFor="course" className={styles.eduLabel}>
            Course Name:{" "}
          </label>
          <input
            type="text"
            name="course"
            id="course"
            placeholder="add Course ..."
            value={course}
            onChange={(e) => setCourse(e.target.value)}
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
            value={school}
            onChange={(e) => setSchool(e.target.value)}
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
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
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
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
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
            id="grade"
            placeholder="Ex:86% ..."
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
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
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
