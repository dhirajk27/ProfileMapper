import React, { useState, useEffect } from 'react';
import ProfileList from './ProfileList';

const AdminPanel = () => {
  const [profiles, setProfiles] = useState([]); // State for storing profiles
  const [currentProfile, setCurrentProfile] = useState(null); // State for currently editing profile
  const [newProfile, setNewProfile] = useState({ name: '', image: '', description: '', lat: '', lng: '' }); // Form state

  // Mock fetching profile data from local storage or an API
  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem('profiles')) || [];
    setProfiles(storedProfiles);
  }, []);

  // Save profiles to local storage (simulates database saving)
  const saveProfilesToLocalStorage = (updatedProfiles) => {
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile({ ...newProfile, [name]: value });
  };

  // Add a new profile or update an existing one
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentProfile) {
      // Update existing profile
      const updatedProfiles = profiles.map((profile) =>
        profile.id === currentProfile.id
          ? { ...currentProfile, ...newProfile, address: { lat: parseFloat(newProfile.lat), lng: parseFloat(newProfile.lng) } }
          : profile
      );
      setProfiles(updatedProfiles);
      saveProfilesToLocalStorage(updatedProfiles);
    } else {
      // Add new profile
      const newProfileWithId = {
        ...newProfile,
        id: Date.now(), // Unique ID based on timestamp
        address: { lat: parseFloat(newProfile.lat), lng: parseFloat(newProfile.lng) },
      };
      const updatedProfiles = [...profiles, newProfileWithId];
      setProfiles(updatedProfiles);
      saveProfilesToLocalStorage(updatedProfiles);
    }
    resetForm();
  };

  // Handle editing a profile
  const handleEdit = (profile) => {
    setCurrentProfile(profile);
    setNewProfile({
      name: profile.name,
      image: profile.image,
      description: profile.description,
      lat: profile.address.lat,
      lng: profile.address.lng,
    });
  };

  // Handle deleting a profile
  const handleDelete = (profileId) => {
    const updatedProfiles = profiles.filter((profile) => profile.id !== profileId);
    setProfiles(updatedProfiles);
    saveProfilesToLocalStorage(updatedProfiles);
  };

  // Reset form after adding/updating profile
  const resetForm = () => {
    setNewProfile({ name: '', image: '', description: '', lat: '', lng: '' });
    setCurrentProfile(null);
  };

  return (
    <div className="container mt-5">
      <h1>Admin Panel</h1>

      {/* Profile Form */}
      <div className="mb-4">
        <h3>{currentProfile ? 'Edit Profile' : 'Add New Profile'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input type="text" name="name" value={newProfile.name} onChange={handleChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label>Image URL</label>
            <input type="text" name="image" value={newProfile.image} onChange={handleChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label>Description</label>
            <textarea name="description" value={newProfile.description} onChange={handleChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label>Latitude</label>
            <input type="number" step="any" name="lat" value={newProfile.lat} onChange={handleChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label>Longitude</label>
            <input type="number" step="any" name="lng" value={newProfile.lng} onChange={handleChange} className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary">
            {currentProfile ? 'Update Profile' : 'Add Profile'}
          </button>
          {currentProfile && (
            <button type="button" onClick={resetForm} className="btn btn-secondary ms-3">
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Profile List */}
      <div>
        <h3>Manage Profiles</h3>
        <ProfileList
          profiles={profiles}
          onSummaryClick={handleEdit} // Use onSummaryClick to edit a profile
          onDeleteClick={handleDelete} // Adding onDelete functionality
        />
      </div>
    </div>
  );
};

export default AdminPanel;
