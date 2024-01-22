import { getSingleMember } from './fantasyData';

const ViewMemberDetails = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memberFirebaseKey).then((memberObject) => {
    resolve({ ...memberObject });
  }).catch((error) => reject(error));
});

export default { ViewMemberDetails };
