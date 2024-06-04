import React,{ useEffect, useState } from 'react';
const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    department: '',
    email: '',
    phone: '',
  });
  const API_URL = 'http://127.0.0.1:8000/student/list/';
  const API_DELETE_URL = 'http://127.0.0.1:8000/student/delete/'
  const API_UPDATE_URL = 'http://127.0.0.1:8000/student/update/'

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
    setEditingStudent(student.id);
    setFormData({
      name: student.name,
      age: student.age,
      department: student.department,
      email: student.email,
      phone: student.phone,
    });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_UPDATE_URL}${editingStudent}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      setEditingStudent(null);
      fetchStudents(); // Re-fetch students after updating
    } catch (error) {
      console.error("There was an error updating the student!", error);
    }
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
      {/* Modal */}
      <div className={`modal fade ${editingStudent ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: editingStudent ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Student</h5>
              <button type="button" className="btn-close" onClick={() => setEditingStudent(null)}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Department</label>
                  <input
                    type="text"
                    className="form-control"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setEditingStudent(null)}>Cancel</button>
                  <button type="submit" className="btn btn-success">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;


