import React, {useEffect, useState} from "react";
import {Form, Button} from "react-bootstrap";
import './App.css';

function App() {
  const [ value, setValue ] = useState(25000);
  useEffect(() => {
    fetch('/api').then((res) => {
      res.json().then(data => console.log(data))
    })
  },[])
  return (
    <div className="App">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="formBasicRange">
        <Form.Label>Enter the price in which you want to be notified</Form.Label>
        <Form.Control onChange={e => setValue(e.target.value)} value={value} type="text" placeholder="Normal text" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
