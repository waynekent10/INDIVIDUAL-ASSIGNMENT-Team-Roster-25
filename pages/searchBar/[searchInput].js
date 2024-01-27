import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getMembers } from '../../api/fantasyData';
import MemberCard from '../../components/Mambers';
import { useAuth } from '../../utils/context/authContext';

export default function Search() {
  const [searchMembers, setSearchMembers] = useState([]);
  const router = useRouter();
  const { user } = useAuth;
  const { searchInput } = router.query;

  const searchAllMembers = () => {
    getMembers(user.uid).then((members) => {
      const filteredMembers = members.filter((member) => member.name.toLowerCase().includes(searchInput));

      setSearchMembers(filteredMembers);
    });
  };

  useEffect(() => {
    searchAllMembers();
    return () => {
      setSearchMembers([]);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);
  return (
    <div className="d-flex flex-wrap">
      {searchMembers.map((obj) => <MemberCard key={obj.firebaseKey} nameObj={obj} onUpdate={searchAllMembers} />)}
    </div>
  );
}
