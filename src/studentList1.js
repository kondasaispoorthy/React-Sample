import React,{ useEffect, useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
const StudentList1 = () => {

  const [students, setStudents] = useState([]);
  const API_URL = 'http://127.0.0.1:8000/student/list/';
  const API_DELETE_URL = 'http://127.0.0.1:8000/student/delete/'
  const API_UPDATE_URL = 'http://127.0.0.1:8000/student/update/'
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("There was an error fetching the students!", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_DELETE_URL}${id}/`, { method: 'DELETE' });
      fetchStudents(); // Re-fetch students after deleting
    } catch (error) {
      console.error("There was an error deleting the student!", error);
    }
  };
  const handleEdit = (student) => {
    navigate('/add',{state:{
      id:student.id,
      name:student.name,
      age: student.age,
      department: student.department,
      email: student.email,
      phone: student.phone,
    }});
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Student Table</h2>
      <table className="table table-bordered table-striped mb-5">
        <thead>
          <tr>
            <th>NAME</th>
            <th>AGE</th>
            <th>DEPARTMENT</th>
            <th>EMAIL</th>
            <th>PHONE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.department}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(student)}>Update</button>
                <button className="btn btn-danger" onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList1;


