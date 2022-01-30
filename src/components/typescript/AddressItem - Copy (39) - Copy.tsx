import React, {useState, useEffect} from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const AddressItem = ({ data }) => {

  const [isModalOpen, setModalIsOpen] = useState(false);
  const [itemData, setItemData] = useState(data);
  const [remove, SetRemove] = useState('block');

  const toggleModal = () => {
      setModalIsOpen(!isModalOpen);
  };

  const changeItemData = (value) =>{    
    var CustomerData = JSON.parse(localStorage.getItem("CustomerData"));
    var index =0, item;
    for(item of CustomerData){
        if(item.firstname === data.firstname && item.lastname === data.lastname)
        {            
            CustomerData[index] = value;
            break;
        }
        index++;
    }
    localStorage.setItem("CustomerData", JSON.stringify(CustomerData));    
    setItemData(value);
  }

  const removeCustomer = () =>{
    var CustomerData = JSON.parse(localStorage.getItem("CustomerData"));
    var item, index = 0;
    for(item of CustomerData){
        if(item.firstname === itemData.firstname && item.lastname === itemData.lastname)
        {   
            CustomerData.splice(index, 1)
            break;
        }
        index++;
    }
    localStorage.setItem("CustomerData", JSON.stringify(CustomerData));    
    SetRemove('none')
  }

  const Modal = ({ onRequestClose }) => {
    // Use useEffect to add an event listener to the document
    useEffect(() => {
        function onKeyDown(event) {
            if (event.keyCode === 27) {onRequestClose();}
        }  
        // Prevent scolling
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onKeyDown);  
        // Clear things up when unmounting this component
        return () => {
            document.body.style.overflow = "visible";
            document.removeEventListener("keydown", onKeyDown);
        };
    });
  
    const [contacts, setContacts] = useState(() => {
        return {
            firstname: itemData.firstname,
            lastname: itemData.lastname,
            address: itemData.address,
            address2: itemData.address2,
            city: itemData.city,
            state: itemData.state,
            zipcode: itemData.zipcode
        };
    });
  
    const handleOnSubmit = () => {
        // event.preventDefault();
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
            changeItemData(contacts);
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
                                <Button variant="primary" type="button" onClick={handleOnSubmit}>Update</Button>
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
        <div 
            style={{display:remove}}
            >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {isModalOpen && <Modal onRequestClose={toggleModal}  />}
              <div style={{       padding: '10px', margin: '10px', display: 'flex', flexDirection: 'column', boxShadow: '1px 1px 2px 1px rgba(0,0,0,0.1)', borderRadius: '5px', minWidth: '300px' }}>
                  <b>Customer Address</b>
                  <div className=''>Full Name : {itemData.firstname}&nbsp;&nbsp;&nbsp;{itemData.lastname}</div>
                  <div className=''>Address1 : {itemData.address}</div>
                  <div className=''>Address2 : {itemData.address2 ? itemData.address2:''}</div>
                  <div className=''>Location : {itemData.city}, {itemData.state}, US {itemData.zipcode}</div>
                  <button style={{ margin: '10px', cursor: 'pointer' }} onClick={toggleModal}>Edit</button>
                  <button style={{ margin: '10px', cursor: 'pointer' }} onClick={removeCustomer}>Remove</button>
              </div>
          </div>
        </div>
      </>
  );
};

export default AddressItem;