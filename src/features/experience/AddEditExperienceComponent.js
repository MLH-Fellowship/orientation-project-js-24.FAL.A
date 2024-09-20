import { React, useState, useEffect } from 'react';
import './ExperienceComponent.css';


function AddEditExperienceComponent({experienceToEdit, onAddExperienceButtonClick }) {
    
   const  defaultExperience = {
        title: '',
        company: '',
        start_date: '',
        end_date: '',
        description: '',
        logo: null,
    };
    const [formData, setFormData] = useState(defaultExperience);


    useEffect(() => {
        if (experienceToEdit) {
          setFormData(experienceToEdit); 
        }
      }, [experienceToEdit]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (event) => {
        setFormData({
            ...formData,
            logo: event.target.files[0] 
        });
    };
    function closePage() {
        onAddExperienceButtonClick();
    }

   
    function submitForm(event) {
       event.preventDefault();
       const data = new FormData();

       for (const key in formData) {
        data.append(key, formData[key]); 
    }
    
    
        fetch('http://127.0.0.1:5000/resume/experience', {
            method: 'POST',
            body: data,
        })
            .then(response => response.json())
            .then(data => {
                alert("Data added successfully");
                closePage();
            })
            .catch((error) => {
                alert("Error adding data");
            });
    }


    return (

        <form onSubmit={submitForm}>
            <div className="form-group">
            <label><h4>Title</h4>
                <input type="text"
                    name="title"
                    required
                    placeholder='Title'
                    value={formData.title}
                    onChange={handleChange} />
            </label>

            <label><h4>Company</h4>
                <input type="text"
                    name="company"
                    required placeholder='Company'
                    value={formData.company}
                    onChange={handleChange} />
            </label>


            <label> <h4>Start Date</h4>
                <input type="text"
                    name="start_date"
                    required
                    placeholder='Start Date'
                    value={formData.start_date}
                    onChange={handleChange} />
            </label>

            <label><h4>End Date</h4>
                <input type="text"
                    name="end_date"
                    required placeholder='End Date'
                    value={formData.end_date}
                    onChange={handleChange} />
            </label>

            <label><h4>Description</h4>
                <textarea name="description"
                    required
                    placeholder='Description'
                    value={formData.description}
                    onChange={handleChange}>
                </textarea>
            </label>

            <label><h4>Logo</h4>
                <input type="file"
                    name="logo"
                    placeholder='Logo'
                    accept="image/*"
                    onChange={handleFileChange} />
            </label>
            </div>
            <br></br>
            <br></br>
            <div className="buttonGroup">
                <button type="button" className="cancelButton" onClick={closePage}>Cancel</button>
                <button type="submit">Submit</button>
            </div>

        </form>

    );

}

export default AddEditExperienceComponent;