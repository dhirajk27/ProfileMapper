import React from 'react';

const ProfileDetails = ({ profile }) => {
  return (
    <div>
      <h2>{profile.name}</h2>
      <p>{profile.summary}</p>
      <img src={profile.image} alt={profile.name} />
      <p>{profile.description}</p>
    </div>
  );
};

export default ProfileDetails;
