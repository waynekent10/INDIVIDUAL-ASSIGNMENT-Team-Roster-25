import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getMembers } from '../../api/fantasyData';
import MemberCard from '../../components/Mambers';

export default function SearchBar() {
  const [searchMembers, setSearchMembers] = useState([]);
  // declares a state variable for search questions using the usestate hook. utilizing an empty array, the setsearch questions function is used to update the value of the searchquestions state
  const router = useRouter();
  const { searchBar } = router.query;

  const searchAllMembers = () => {
    getMembers().then((members) => {
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
