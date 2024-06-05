// Importing Required Libraries
import React, {useState} from 'react';
import { Link,useNavigate,useLocation} from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
// Creating Resuable Component(MyInput) for '<input>' fields
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
            <div className='error' style={{ color: 'red' }}>{meta.error}</div>
        ) : null}

        </>
    );
};
const StudentForm2 = () => {
   // API for Creating and Updating Students
    const API_URL = 'http://127.0.0.1:8000/student/create/';
    const UPDATE_URL = 'http://127.0.0.1:8000/student/update/';
    const navigate = useNavigate(); // Initialize useNavigate
    const [isUpdate, setIsUpdate] = useState(false);
    // Using useLocation() to use information from other components
    const location = useLocation();
    const state = location.state || {};
    const name = state.name || '';
    const age = state.age || '';
    const department = state.department || '';
    const email = state.email || '';
    const phone = state.phone || '';
    // handleSubmit function handles both adding and updating a student
    const handleSubmit = async (values, { setSubmitting }) => {
      const endpoint = isUpdate ? `${UPDATE_URL}${state.id}/` : API_URL;
      const method = isUpdate ? 'PUT' : 'POST';
      const options = {
          method: method,
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
      };

      try {
          await fetch(endpoint, options);
          navigate('/'); // Redirect to Home page
      } catch (error) {
          console.error("There was an error submitting the form!", error);
      } finally {
          setSubmitting(false);
      }
  };
    return(
        <>
         <div className="container mt-5 f1" >
         <h2 className="text-center mb-4">Student Form</h2>
         
        <Formik
        initialValues={{
         name : name,
         age : age,
         department : department,
         email : email,
         phone : phone,
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
        onSubmit={handleSubmit}
 >
   {({ isSubmitting, submitForm }) => (
                    <Form>
                        <div className="form-group">
                            <MyInput
                                label="Name"
                                name="name"
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <MyInput
                                label="Age"
                                name="age"
                                type="number"
                            />
                        </div>
                        <div className="form-group">
                            <MyInput
                                label="Department"
                                name="department"
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <MyInput
                                label="Email"
                                name="email"
                                type="email"
                            />
                        </div>
                        <div className="form-group">
                            <MyInput
                                label="Phone"
                                name="phone"
                                type="text"
                            />
                        </div>
                        <div class="d-flex justify-content-center mt-3">
                        <button
                            type="submit"
                            className="btn btn-success mx-2"
                            disabled={isSubmitting||state.id}
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary mx-2"
                            onClick={async () => {
                                if (!state.id) {
                                    alert("No student selected for update");
                                    return;
                                }
                                setIsUpdate(true);
                                await submitForm();
                                setIsUpdate(false);
                            }}
                            disabled={isSubmitting}
                        >
                            Update
                        </button>
                        </div>
                    </Form>
                )}
     </Formik>
        </div>
        </>
    );
};
export default StudentForm2;