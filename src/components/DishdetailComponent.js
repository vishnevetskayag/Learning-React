import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle } from 'reactstrap';


    const DishDetail = (props) => {
        const dish = props.dish;
        if (props.dish != null) {
            return (
                <div className="container">
                    <div className="row col-12">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish = {dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <RenderComments comments = {dish.comments} />
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
    
    function RenderComments({comments}) {
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


export default DishDetail;