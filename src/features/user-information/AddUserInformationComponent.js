import {React, useEffect, useState} from "react";
import { API_URL } from "../../constants";

function AddUserInformationComponent({onSubmit, userInfoToEdit}){
    const defaultUserInformation = {
        name: '',
        phone_number: '',
        email_address:'',
    }

    const [formData, setFormData] = useState(defaultUserInformation);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (userInfoToEdit) {
            setFormData({
                name: userInfoToEdit.name || '',
                phone_number: userInfoToEdit.phone_number || '',
                email_address: userInfoToEdit.email_address || '',
            });
        }
    }, [userInfoToEdit]);

    const handleChange = (event)=>{
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () =>{
        const newErrors = {};

        if(!formData.name){
            newErrors.name = "Name is required!";
        }

        const internationalPhoneFormat = /^\+\d{1,3}\d{7,14}$/;;
        if(internationalPhoneFormat.test(formData.phone_number)){
            newErrors.phone_number = "Please enter a valid phone number";
        }

        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailFormat.test(formData.email_address)){
            newErrors.email_address = "Please enter a valid email address."
        }

        return newErrors;
    }

    const closePage = ()=>{
        setFormData(defaultUserInformation);
        onSubmit();               
    }
    
    const submitForm = (event) =>{
        event.preventDefault();
        const validationErrors = validateForm();
        console.log(formData);

        setErrors(validationErrors);

        if(!validationErrors.name && !validationErrors.email_address && !validationErrors.phone_number){
            const data = {
                name: formData.name,
                email_address: formData.email_address,
                phone_number: formData.phone_number,
            };

            const method = userInfoToEdit ? 'PUT' : 'POST';

            fetch(`${API_URL}/resume/user_information`, {
                method,
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(data),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    closePage(); 
                })
                .catch((error) => {
                    console.error("Error:", error); 
                });
        }else{
            console.log(validationErrors);
        }
    }

    return(
        <form onSubmit={submitForm}>
            <div className="form-group">
                <label>
                    <br></br>
                    <h4>Name</h4>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                {errors.name && <span style={{color:'red'}}>{errors.name}</span>}
                <label>
                    <h4>Phone Number<br></br>(with country code)</h4>
                    <input
                        type="tel"
                        name="phone_number"
                        required
                        placeholder='+1234567890'
                        value={formData.phone_number}
                        onChange={handleChange}
                    />
                </label>
                {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}

                <label>
                    <h4>Email Address</h4>
                    <input
                        type="email"
                        name="email_address"
                        required
                        placeholder='example@email.com'
                        value={formData.email_address}
                        onChange={handleChange}
                    />
                </label>
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
            </div>

            <div className="buttonGroup">
                <button type="button" className="cancelButton" onClick={closePage}>Cancel</button>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default AddUserInformationComponent;