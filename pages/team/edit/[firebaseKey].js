// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';
// import { getSingleMember } from '../../../api/fantasyData';

// export default function EditMember() {
//   const [editItem, setEditItem] = useState({});
//   const router = useRouter();
//   const { firebaseKey } = router.query;

//   useEffect(() => {
//     getSingleMember(firebaseKey).then(setEditItem);
//   }, [firebaseKey]);

//   // return (<MemberForm obj={editItem} />);
// }
