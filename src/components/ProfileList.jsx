import React from 'react';
import ProfileCard from './ProfileCard';

const ProfileList = ({ profiles, onSummaryClick }) => {
  return (
    <div className="space-y-4">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} onSummaryClick={onSummaryClick} />
      ))}
    </div>
  );
};

export default ProfileList;
