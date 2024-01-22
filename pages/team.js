import React, { useEffect, useState } from 'react';

import { useAuth } from '../utils/context/authContext';
import MemberCard from '../components/MemberCard';
import { getMembers } from '../api/fantasyData';

export default function TeamView() {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();

  const getAllTheMembers = () => {
    getMembers(user.uid).then(setMembers);
  };
  useEffect(() => {
    getAllTheMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <header><h1>Team</h1></header>
      <div>
        {members.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllTheMembers} />
        ))}
      </div>
    </>
  );
}
