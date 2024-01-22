import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/fantasyData';

const initialState = {
  name: '',
  image: '',
  role: '',
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput).then(() => router.push(`/team/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/team');
        });
      });
    }
  };

  return (
    <><header><h1>Add A Member</h1></header>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Member</h2>

        {/* TITLE INPUT  */}
        <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter a Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* IMAGE INPUT  */}
        <FloatingLabel controlId="floatingInput2" label="Members Image" className="mb-3">
          <Form.Control
            type="url"
            placeholder="Enter an image url"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* ROLE INPUT  */}
        <FloatingLabel controlId="floatingInput3" label="Member Role" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Role"
            name="role"
            value={formInput.role}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* SUBMIT BUTTON  */}
        <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Member</Button>
      </Form>
    </>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};

export default MemberForm;
