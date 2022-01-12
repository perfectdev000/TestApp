
import React, {useState, useEffect} from 'react';
import AddressItem from './AddressItem';
import { Form, Button, Row, Col } from 'react-bootstrap';

const initCustomerData = [
  { customer_id: 0, firstname: "Bob", lastname: "Smith", address: "87 Main St", address2: "Apt 87", city: "Los Angeles", state: "CA", zipcode: "17435" },
  { customer_id: 1, firstname: "Barb", lastname: "Belmont", address: "84 Palm", address2: null, city: "Petersburg", state: "AR", zipcode: "34625" },
  { customer_id: 2, firstname: "Jerry", lastname: "Seinfeld", address: "4876 22nd", address2: "4", city: "New York City", state: "NY", zipcode: "38756" },
  { customer_id: 3, firstname: "Yijun", lastname: "Li", address: "95 Cherry", address2: null, city: "Orlando", state: "FL", zipcode: "26564" },
  { customer_id: 4, firstname: "Corey", lastname: "Smith", address: "83573 Oregon Ave", address2: "Suite # 544", city: "Eagle Rock", state: "WA", zipcode: "97524" },
  { customer_id: 5, firstname: "Gloria", lastname: "Hernandez", address: "9 Pine Rd", address2: "2", city: "Sacramento", state: "CA", zipcode: "34655" }
];
const CustomerDirectory = () => {
  var CustomerData = JSON.parse(localStorage.getItem("CustomerData"));
  if(CustomerData == null || CustomerData[0] == null)
  {
    localStorage.setItem("CustomerData", JSON.stringify(initCustomerData));
    CustomerData = initCustomerData;
  }
  const [_CustomerData, setCustomerData] = useState(CustomerData);
  const [isModalOpen, setModalIsOpen] = useState(false);
  
  const toggleModal = () => {
      setModalIsOpen(!isModalOpen);
  };

  const Modal = ({ onRequestClose }) => {  
    const [contacts, setContacts] = useState(() => {
        return {
            firstname: "",
            lastname: "",
            address: "",
            address2: "",
            city: "",
            state: "",
            zipcode: ""
        };
    });
  
    const handleOnSubmit = () => {
        const values = [firstname, lastname, address, address2, city, state, zipcode];
        let errorMsg = '';  
        var allFieldsFilled = true;        
        for(var i=0;i<values.length;i++){
            if(values[i]==="" && i!==3){
                allFieldsFilled = false;
                break;
            }
        }
  
        if (allFieldsFilled) {
            const contacts = { firstname, lastname, address, address2, city, state, zipcode };
            var newCustomerData = _CustomerData;
            newCustomerData.push(contacts)            
            localStorage.setItem("CustomerData", JSON.stringify(newCustomerData));
            setCustomerData(newCustomerData)
            onRequestClose();
        } else {
            errorMsg = 'Please fill out all the fields.';
        }
        setErrorMsg(errorMsg);
    };
  
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            default:
                setContacts((prevState) => ({
                    ...prevState,
                    [name]: value
                }));
        }
    };
  
    const [errorMsg, setErrorMsg] = useState('');
    const { firstname, lastname, address, address2, city, state, zipcode } = contacts;  
  
    return (
        <div className="modal__backdrop">
            <div className="modal__container">
                <h3 className="modal__title" style={{padding:'20px 10px 0 10px', textAlign:'center'}}>Customer Address</h3>
                <div className="main-form">
                    {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                    <Form >
                        <Row style={{padding:'10px'}}>
                            <Col>
                                <Form.Group controlId="firstname">
                                    <Form.Label>First Name *</Form.Label>
                                    <Form.Control
                                        className="input-control"
                                        type="text"
                                        name="firstname"
                                        value={firstname}
                                        placeholder="Enter first name"
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="lastname">
                                    <Form.Label>Last Name *</Form.Label>
                                    <Form.Control
                                        className="input-control"
                                        type="text"
                                        name="lastname"
                                        value={lastname}
                                        placeholder="Enter last name"
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="address"  style={{padding:'10px'}}>
                            <Form.Label>Address *</Form.Label>
                            <Form.Control
                                className="input-control"
                                type="text"
                                name="address"
                                value={address}
                                placeholder="Enter available quantity"
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="address2"  style={{padding:'10px'}}>
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control
                                className="input-control"
                                type="text"
                                name="address2"
                                value={address2}
                                placeholder="Enter address 2"
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        
                        <Row style={{padding:'10px'}}>
                            <Col>
                                <Form.Group controlId="city">
                                    <Form.Label>City *</Form.Label>
                                    <Form.Control
                                        className="input-control"
                                        type="text"
                                        name="city"
                                        value={city}
                                        placeholder="Enter city"
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="state">
                                    <Form.Label>State *</Form.Label>
                                    <Form.Control
                                        className="input-control"
                                        type="text"
                                        name="state"
                                        value={state}
                                        placeholder="Enter State"
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="zipcode">
                                    <Form.Label>Zip Code *</Form.Label>
                                    <Form.Control
                                        className="input-control"
                                        type="text"
                                        name="zipcode"
                                        value={zipcode}
                                        placeholder="Enter zip code"
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={{padding:'10px'}}>
                            <Col style={{display:'flex', justifyContent:'center'}}>
                                <Button variant="primary" type="button" onClick={handleOnSubmit}>Add Customer</Button>
                            </Col>
                            <Col style={{display:'flex', justifyContent:'center'}}>
                                <Button variant="primary" type="button" onClick={onRequestClose}>Exit</Button>
                            </Col>
                        </Row>
                        
                    </Form>
                </div>
            </div>
        </div>
    );
  };
  
  return (
    <>
      <div style={{display:'flex', justifyContent:'center'}}>
        <button style={{ margin: '10px', cursor: 'pointer' }} onClick={toggleModal}>Add Customer</button>
      </div>
      {isModalOpen && <Modal onRequestClose={toggleModal}  />}
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' , justifyContent:'center'}}>
          {_CustomerData.map(customer => <AddressItem key={customer.customer_id} data={customer} />)}
      </div>
    </>
  );
};

export default CustomerDirectory;