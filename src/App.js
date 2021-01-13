import React, {useEffect, useState} from "react";
import axios from "axios"
import {Form, Button, Jumbotron, Container} from "react-bootstrap";
import './App.css';

function App() {
  const [ value, setValue ] = useState(25000);
  const [currentPrice, setCurrentPrice] = useState("")
  useEffect(() => {
    axios.get('/price').then((res) => {
      setCurrentPrice(res.data.price)
    })
    .catch((err) => {
      console.log(err)
    })
  },[])

  const submitPrice = () => {
    axios.post('/api', {price: "test"}).then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  return (
    <div className="App">
      <Jumbotron fluid>
        <Container>
          <h1>{currentPrice}</h1>
        </Container>
      </Jumbotron>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="formBasicRange">
        <Form.Label>Enter the price in which you want to be notified</Form.Label>
        <Form.Control onChange={e => setValue(e.target.value)} value={value} type="text" placeholder="Normal text" />
        </Form.Group>
        <Button onClick={submitPrice()} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
