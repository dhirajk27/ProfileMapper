import React from 'react';
import { Link } from 'react-router-dom'; // No need for Switch, use Routes in App.js
import AddEditProfile from './AddEditProfile';

const AdminDashboard = ({ profiles, setProfiles }) => {
  return (
    <div className="container mt-5">
      <h1>Admin Dashboard</h1>

      <Link to="/admin/add" className="btn btn-primary mb-4">
        Add New Profile
      </Link>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.name}</td>
              <td>{profile.description}</td>
              <td>
                <Link to={`/admin/edit/${profile.id}`} className="btn btn-warning me-2">
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => setProfiles(profiles.filter((p) => p.id !== profile.id))}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
