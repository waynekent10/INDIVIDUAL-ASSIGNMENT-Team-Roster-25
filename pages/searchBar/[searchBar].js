import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getMembers } from '../../api/fantasyData';
import { useAuth } from '../../utils/context/authContext';
import MemberCard from '../../components/Mambers';

export default function SearchBar() {
  const [searchMembers, setSearchMembers] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { searchBar } = router.query;

  const searchAllMembers = () => {
    getMembers(user.uid).then((members) => {
      const filteredMembers = members.filter((member) => member.name.toLowerCase().includes(searchBar) || member.role.toLowerCase().includes(searchBar));
      setSearchMembers(filteredMembers);
    });
  };

  useEffect(() => {
    searchAllMembers();
    return () => {
      setSearchMembers([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBar]);

  return (
    <>
      <div className="d-flex flex-wrap">
        {searchMembers.map((member) => <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={searchAllMembers} />)}
      </div>
    </>
  );
}
