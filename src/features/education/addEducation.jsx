import { useState } from "react";
import AddEducationForm from "./addEducationForm";
import EditEducationForm from "./editEducationForm";

export default function AddEducation() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  return (
    <section>
      {showAddForm ? (
        <AddEducationForm setShowForm={setShowAddForm} />
      ) : showEditForm ? (
        <EditEducationForm setShowForm={setShowEditForm} />
      ) : (
        <>
          <p>You can add/Edit your Education in here</p>
          <button
            onClick={() => setShowEditForm(true)}
            style={{ marginLeft: "4px" }}
          >
            Edit Education
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            style={{ marginLeft: "4px" }}
          >
            Add Education
          </button>
        </>
      )}
    </section>
  );
}
