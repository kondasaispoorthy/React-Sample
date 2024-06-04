// Importing Required Libraries
import React, {useState} from 'react';
import { Link,useNavigate} from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
const MyInput = ({ label, ...props }) => {
    //useField() returns [formik.getFieldProps(),formik.getFieldMeta()]
    //which we can spread on <input>.we can use field meta to show an error
    //message if the field is invalid and it has been touched(i.e visited)
    const [field,meta] = useField(props);
    return(
        <>
        <label htmlFor ={props.id ||props.name}>{label}</label>
        <input className='form-control'{...field} {...props}/>
        {meta.touched && meta.error ? (
            <div className='error'>{meta.error}</div>
        ) : null}

        </>
    );
};
const StudentForm1 = () => {
    const API_URL = 'http://127.0.0.1:8000/student/create/';
    const navigate = useNavigate(); // Initialize useNavigate
    return(
        <>
         <div className="container mt-5 f1" >
         <h2 className="text-center mb-4">Add Student</h2>
         
        <Formik
        initialValues={{
         name : '',
         age : '',
         department : '',
         email : '',
         phone : '',
        }}
        validationSchema={Yup.object({
            name :Yup.string()
            .max(15,'Must be 15 characters or less')
            .required('Required'),
            age : Yup.number()
            .required('Required')
            .min(0,'Must be between 0 and 100')
            .max(100,'Must be between 0 and 100'),
            department : Yup.string()
            .required('Required')
            .max(10,'Must be less than 15 characters'),
            email: Yup.string()
            .required('Required')
            .email('Invalid email address')
            .required('Required'),
            phone:Yup.string()
            .required('Required')
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(10, 'Must be exactly 10 digits')
            .max(10, 'Must be exactly 10 digits')
        })}
        onSubmit={async(values,{setSubmitting})=>{
            const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              };
              try {
                await fetch(API_URL, options);
                navigate('/'); // Redirect to Home page after successful submission
              } catch (error) {
                console.error("There was an error submitting the form!", error);
              }
       
        }}
 >
    <Form>
    <div className="form-group">
    <MyInput
            label="Name"
            name="name"
            type="text"
            placeholder="Jane"
    />
    </div>
    <div className="form-group">
    <MyInput
            label="Age"
            name="age"
            type="number"
            placeholder="25"
    />
    </div>
    <div className="form-group">
    <MyInput
            label="Department"
            name="department"
            type="text"
            placeholder="EEE"
    />
    </div>
    <div className="form-group">
    <MyInput
            label="Email"
            name="email"
            type="email"
            placeholder="sp@gmail.com"
    />
    </div>
    <div className="form-group">
    <MyInput
            label="Phone"
            name="phone"
            type="text"
            placeholder="1234567890"
    />
    </div>
    <button type="submit" className="btn btn-success mt-3 b1">Add</button>
    </Form>
     </Formik>
        </div>
        </>
    );
};
export default StudentForm1;
