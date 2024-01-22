import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteMember } from '../api/fantasyData';

function MemberCard({ memberObj, onUpdate }) {
  const deleteThisMember = () => {
    if (window.confirm(`Delete ${memberObj.name}?`)) {
      deleteMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={memberObj.image} />
      <Card.Body>
        <Card.Title>{memberObj.name}</Card.Title>
        <p>{memberObj.role}</p>
        <Link href={`/team/${memberObj.firebaseKey}`} passHref>
          <Button variant="success" className="lg">VIEW</Button>
        </Link>
        <Link href={`/team/edit/${memberObj.firebaseKey}`} passHref>
          <Button variant="warning" className="lg">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisMember} className="lg">DELETE</Button>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
