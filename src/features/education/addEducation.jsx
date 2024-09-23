import { useState } from "react";
import AddEducationForm from "./addEducationForm";

export default function AddEducation() {
  const [showForm, setShowForm] = useState(false);
  return (
    <section>
      {showForm ? (
        <AddEducationForm setShowForm={setShowForm} />
      ) : (
        <>
          <p>You can add your Education in here</p>
          <button onClick={() => setShowForm(true)}>Add Education</button>
        </>
      )}
    </section>
  );
}
