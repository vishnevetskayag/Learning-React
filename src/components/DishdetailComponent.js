import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, 
     Modal, ModalHeader, ModalBody, Button, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import Select from 'react-select'
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';


const DishDetail = (props) => {
    const dish = props.dish;
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) 
    
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row col-12">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>                
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish = {dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}
                        />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
            </div>
        )
    }    
};

function RenderDish({dish}) {
    return (
        <div key={dish.id}>
            <Card>
                <CardBody>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments, addComment, dishId}) {
    if (comments != null){
        return (
            <div>
                {comments.map((comment) => {
                    return (
                        <div key={comment.id}>
                            <ul className="list-unstyled">
                                <li>
                                    <p>{comment.comment}</p>
                                    <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'})
                                        .format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            </ul>
                        </div>
                    )
                })}
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        )}
    else {
        <div></div>
    }
}

const options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' }
  ]

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.newcomment);

    }

    render(){
        return(
            <div>
                <Button outline onClick={this.toggleModal}><i class="fa fa-pencil" aria-hidden="true"></i> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="select" md={12}>Rating</Label>
                                <Col md={12}>
                                <Select options={options} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={10}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="newcomment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".newcomment" id="newcomment" name="newcomment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


export default DishDetail;
