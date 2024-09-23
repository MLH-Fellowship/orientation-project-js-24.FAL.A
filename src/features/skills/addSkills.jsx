import { useState } from "react";
import AddSkillForm from "./addSkillForm";

export default function AddSkills() {
  const [showForm, setShowForm] = useState(false);
  return (
    <section>
      {showForm ? (
        <AddSkillForm setShowForm={setShowForm} />
      ) : (
        <>
          <p>You can add your skills in here</p>
          <button onClick={() => setShowForm(true)}>Add Skill</button>
        </>
      )}
    </section>
  );
}
