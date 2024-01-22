import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getMembers } from '../api/fantasyData';
import MemberCard from '../components/Mambers';

function Home() {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();

  const getAllTheMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllTheMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {members.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllTheMembers} />
        ))}
      </div>

    </div>
  );
}

export default Home;
