import React, { Component } from 'react';
import './CardData.css';
/** import axios library instance customized for our app
 * our API URL and headers are configured at this axios instance
 * find 'axios.js' in 'src' folder for configuration
*/
import axios from '../../axios';
/** import custom error component which is used to show errors*/
import { FormErrors } from '../FormErrors/FormErrors';
/** import react bootstrap to add responsiveness in UI*/
import Form from 'react-bootstrap/Form';
/***/
import Button from 'react-bootstrap/Button';
/** import button componentf from bootstrap*/
import Container from 'react-bootstrap/Container';
/** import rows to enable grids*/
import Row from 'react-bootstrap/Row';
/**import columns to enable grids*/
import Col from 'react-bootstrap/Col';

class CardData extends Component {
    state = {
        name: '',
        cardNumber: '',
        cvv: '',
        expiry: '',
        formErrors: { name: '', cardNumber: '', cvv: '', expiry: '' },
        nameValid: false,
        cardNumberValid: false,
        cvvValid: false,
        expiryValid: false,
        formValid: false,
        sendDataSuccess: null
    }
    /*sending a POST request to API*/
    postDataHandler = () => {
        const data = {
            name: this.state.name,
            cardNumber: this.state.cardNumber,
            cvv: this.state.cardNumber,
            expiry: this.state.expiry
        };
        axios.post('/posts', data)
            .then(response => {
                console.log(response);
                if(response.data.success === true){
                    this.setState({
                        sendDataSuccess: true
                    })
                }else{
                    this.setState({
                        sendDataSuccess: false
                    })
                }
                
            }).catch(err => {
                this.setState({
                    sendDataSuccess: false
                })
            });
        
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    /**custom validator function*/
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let cardNumberValid = this.state.cardNumberValid;
        let cvvValid = this.state.cvvValid;
        let expiryValid = this.state.expiryValid;

        /** will match according to form field name attribute */
        switch (fieldName) {
            case 'name':
                /** check if  name contains alphabets only*/
                nameValid = value.match("^[A-Za-z\\s]+$");
                fieldValidationErrors.name = nameValid ? '' : 'Name is invalid!';
                break;
            case 'cardNumber':
                /** check if  cardNumber contains numbers only*/
                cardNumberValid = value.match("^[0-9]*$");
                fieldValidationErrors.cardNumber = cardNumberValid ? '' : 'Card Number is invalid!';
                break;
            case 'cvv':
                /** check if  cvv contains numbers only*/
                cvvValid = value.match("^[0-9]*$");
                fieldValidationErrors.cvv = cvvValid ? '' : 'CVV is invalid!';
                break;
            case 'expiry':
                /** check if  expiry date is not empty
                 * this functions needs improvement to check if valid date format is accepted or not
                */
                expiryValid = value.length !== 0 || value !== "";
                fieldValidationErrors.expiry = expiryValid ? '' : 'Expiry Date is invalid!';
                break;
            default:
                break;
        }

        /**setting errors in state if any*/
        this.setState({
            formErrors: fieldValidationErrors,
            nameValid: nameValid,
            cardNumberValid: cardNumberValid,
            cvvValid: cvvValid,
            expiryValid: expiryValid
        }, this.validateForm);
    }

    /*function to check form validity*/
    validateForm() {
        this.setState({ formValid: this.state.nameValid &&
             this.state.cardNumberValid && 
             this.state.cvvValid && 
             this.state.expiryValid 
        });
    }

    render() {

        let statusMessage = '';
        if(this.state.sendDataSuccess === true){
            /** setting statusMessage if API is successful */
            statusMessage = "Data Sent Successfully";
            
            /** wait for 5 seconds then clear state of component*/
            setTimeout( ()=>{
                this.setState({
                    name: '',
                    cardNumber: '',
                    cvv: '',
                    expiry: '',
                    formErrors: { name: '', cardNumber: '', cvv: '', expiry: '' },
                    nameValid: false,
                    cardNumberValid: false,
                    cvvValid: false,
                    expiryValid: false,
                    formValid: false,
                    sendDataSuccess: null
                });
            }, 5000 )
            
        }else if(this.state.sendDataSuccess === false){
            /** setting statusMessage if API is unsuccessful */
            statusMessage = 'Error sending Data';
        }

        return (
            <Container>
                <Row>
                    <Col sm={12} md={8}>
                        <Form>
                            <div className="statusPopup">
                                <p md={12}>{statusMessage}</p>
                            </div>
                            <h3>Card Details</h3>
                            <Form.Group className="mb-3">
                                <Form.Label>Name*</Form.Label>
                                <Form.Control placeholder="Enter Name" type="text" name="name" value={this.state.name} onChange={(event) => this.handleUserInput(event)} />
                                <Form.Text className="text-muted"> Only alphabets(A-Z) allowed</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Card Number*</Form.Label>
                                <Form.Control placeholder="Enter Card Number" name="cardNumber" value={this.state.cardNumber} onChange={(event) => this.handleUserInput(event)} />
                                <Form.Text className="text-muted"> Only numbers(0-9) allowed</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>CVV*</Form.Label>
                                <Form.Control name="cvv" placeholder="Enter CVV" value={this.state.cvv} onChange={(event) => this.handleUserInput(event)} />
                                <Form.Text className="text-muted"> Only numbers(0-9) allowed</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Expiry*</Form.Label>
                                <Form.Control name="expiry" placeholder="Enter Expiry Date" value={this.state.expiry} onChange={(event) => this.handleUserInput(event)} />
                                <Form.Text className="text-muted"> Expiry date cannot be empty</Form.Text>
                            </Form.Group>


                            <div>
                                {/* show form errors here /> */}
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>

                            {/* send formData to POST API. If form is invalid this button cannot be clicked /> */}
                            <Button variant="primary" onClick={this.postDataHandler} disabled={!this.state.formValid}>Save Card Details</Button>
                            
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default CardData;