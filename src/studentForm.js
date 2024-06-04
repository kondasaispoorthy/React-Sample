import React, {useState} from 'react';
import { Link,useNavigate} from 'react-router-dom';



const StudentForm = () => {
  const [student, setStudent] = useState({
    name: '',
    age: '',
    department: '',
    email: '',
    phone: '',
  });
  const API_URL = 'http://127.0.0.1:8000/student/create/';
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    };
    try {
      await fetch(API_URL, options);
      navigate('/'); // Redirect to Home page after successful submission
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
    setStudent({
        name: '',
        age: '',
        department: '',
        email: '',
        phone: '',
      })
  };

  return (
    <div className="container mt-5 f1" >
      <h2 className="text-center mb-4">Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={student.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            className="form-control"
            name="department"
            value={student.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={student.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={student.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success mt-3 b1">
          Add
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
