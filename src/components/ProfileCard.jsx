import React from 'react';

const ProfileCard = ({ profile, onSummaryClick }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <img
        src={profile.image}
        alt={profile.name}
        className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
      />
      <h3 className="text-lg font-bold text-center mb-2">{profile.name}</h3>
      <p className="text-center text-gray-600 mb-4">{profile.description}</p>
      <button
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        onClick={() => onSummaryClick(profile)}
      >
        Summary
      </button>
    </div>
  );
};

export default ProfileCard;
