import { getSingleMember } from './fantasyData';

const viewMemberDetails = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memberFirebaseKey).then((memberObject) => {
    resolve({ ...memberObject });
  }).catch((error) => reject(error));
});

const viewMemberDetail = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memberFirebaseKey).then((memberObject) => {
    resolve({ ...memberObject });
  }).catch((error) => reject(error));
});

export {
  viewMemberDetails,
  viewMemberDetail,
};
