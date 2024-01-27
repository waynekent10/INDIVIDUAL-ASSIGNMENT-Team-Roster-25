import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');

  const router = useRouter();

  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (setSearchInput !== '') router.push(`/search/${searchInput}`);
  };
  return (
    <Form className="search" onSubmit={handleSubmit}>
      <FormControl type="text" placeholder="Search" onChange={handleChange} value={searchInput} style={{ width: '700px' }} />
    </Form>
  );
}
