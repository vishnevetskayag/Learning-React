import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap';

class DishDetail extends Component {


    render() {
        const dish = this.props.dish;
        if (dish != null) {
            return (
                <div class="container">
                    <div className="row col-12">
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(dish)}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            {this.renderComments(dish.comments)}
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

    renderDish(dish) {
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
    
    renderComments(comments) {
        if (comments != null){
            return (
                comments.map((comment) => {
                    return (
                        <div key={comment.id}>
                            <ul className="list-unstyled">
                                <li>
                                    {comment.comment} <br/> {comment.author},
                                    {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'})
                                        .format(new Date(Date.parse(comment.date)))}
                                </li>
                            </ul>
                        </div>
                    )
                })
            )}
        else {
            <div></div>
        }
    }
}


export default DishDetail;