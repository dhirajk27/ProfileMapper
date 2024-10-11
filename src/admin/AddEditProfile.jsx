import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddEditProfile = ({ profiles, setProfiles }) => {
  const [profileData, setProfileData] = useState({
    name: '',
    image: '',
    description: '',
    lat: '',
    lng: ''
  });

  const navigate = useNavigate(); // Replacing useHistory with useNavigate
  const { id } = useParams(); // Get the profile ID from URL params

  useEffect(() => {
    if (id) {
      const profileToEdit = profiles.find((profile) => profile.id === parseInt(id));
      if (profileToEdit) {
        setProfileData({
          name: profileToEdit.name,
          image: profileToEdit.image,
          description: profileToEdit.description,
          lat: profileToEdit.address.lat,
          lng: profileToEdit.address.lng,
        });
      }
    }
  }, [id, profiles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Edit existing profile
      const updatedProfiles = profiles.map((profile) =>
        profile.id === parseInt(id)
          ? { ...profile, ...profileData, address: { lat: parseFloat(profileData.lat), lng: parseFloat(profileData.lng) } }
          : profile
      );
      setProfiles(updatedProfiles);
    } else {
      // Add new profile
      const newProfile = {
        id: Date.now(), // Unique ID
        name: profileData.name,
        image: profileData.image,
        description: profileData.description,
        address: {
          lat: parseFloat(profileData.lat),
          lng: parseFloat(profileData.lng),
        },
      };
      setProfiles([...profiles, newProfile]);
    }
    navigate('/admin'); // Navigate back to the admin dashboard
  };

  return (
    <div className="container mt-5">
      <h1>{id ? 'Edit Profile' : 'Add New Profile'}</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={profileData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={profileData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lat" className="form-label">Latitude</label>
          <input
            type="number"
            className="form-control"
            id="lat"
            name="lat"
            value={profileData.lat}
            onChange={handleChange}
            step="any"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lng" className="form-label">Longitude</label>
          <input
            type="number"
            className="form-control"
            id="lng"
            name="lng"
            value={profileData.lng}
            onChange={handleChange}
            step="any"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Update Profile' : 'Add Profile'}
        </button>
        <button type="button" onClick={() => navigate('/admin')} className="btn btn-secondary ms-3">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddEditProfile;
