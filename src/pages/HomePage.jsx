import React, { useState } from 'react';
import ProfileList from '../components/ProfileList';
import ProfileMap from '../components/ProfileMap';
import { profiles } from '../data/profileData';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSummaryClick = (profile) => {
    setSelectedProfile(profile);
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-4">Profile Explorer</h1>

      {/* Search Bar */}
      <SearchBar onSearch={setSearchTerm} />

      {/* Profile List and Map */}
      <div className="flex flex-col md:flex-row">
        {/* Profiles List */}
        <div className="md:w-1/3 w-full">
          <ProfileList profiles={filteredProfiles} onSummaryClick={handleSummaryClick} />
        </div>

        {/* Map */}
        <div className="md:w-2/3 w-full mt-4 md:mt-0 md:ml-4">
          {selectedProfile ? (
            <ProfileMap location={selectedProfile.address} />
          ) : (
            <div className="text-center bg-gray-100 p-4 rounded-lg">
              Select a profile to view its location on the map.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
