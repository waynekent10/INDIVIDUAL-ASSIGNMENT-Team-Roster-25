import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getMembers } from '../../api/fantasyData';
import { useAuth } from '../../utils/context/authContext';
import MemberCard from '../../components/Mambers';

// Define the SearchBar component
export default function SearchBar() {
  // State to store the filtered members
  const [searchMembers, setSearchMembers] = useState([]);
  const { user } = useAuth();
  // Get user information from the authentication context
  const router = useRouter();
  // Extract the 'searchBar' query parameter from the router
  const { searchBar } = router.query;

  // Function to fetch and filter members based on the search bar input
  const searchAllMembers = () => {
    // Fetch members using the user's ID
    getMembers(user.uid).then((members) => {
      // Filter members based on name or role containing the search bar input
      const filteredMembers = members.filter((member) => member.name.toLowerCase().includes(searchBar) || member.role.toLowerCase().includes(searchBar));
      setSearchMembers(filteredMembers);
    });
  };
  // Effect hook to trigger the search when the 'searchBar' query parameter changes
  useEffect(() => {
    searchAllMembers();
    // Clean up the state when the component is unmounted
    return () => {
      setSearchMembers([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBar]);
  // Render the Component
  return (
    <>
      <div className="d-flex flex-wrap">
        {searchMembers.map((member) => <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={searchAllMembers} />)}
      </div>
    </>
  );
}
