import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getMembers } from '../../api/fantasyData';
import MemberCard from '../../components/Mambers';

export default function SearchBar() {
  const [searchMember, setSearchMember] = useState([]);
  const router = useRouter();
  const { searchBar } = router.query;

  const searchAllMembers = () => {
    getMembers().then((members) => {
      const filteredMembers = members.filter((member) => member.name.toLowerCase().includes(searchBar));

      setSearchMember(filteredMembers);
    });
  };

  useEffect(() => {
    searchAllMembers([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBar]);
  return (
    <div>
      {searchMember.map((name) => <MemberCard key={name.firebaseKey} memberObj={name} onUpdate={searchAllMembers} />)}
    </div>
  );
}
