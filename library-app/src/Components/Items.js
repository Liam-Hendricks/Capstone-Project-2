import React, { Component } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { HeartFill, Heart } from "react-bootstrap-icons";
const myfunctions = require("../Modules/myFunctions.js");



class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: this.props.isLike,
    };
    //binding this to event function
    this.toggleHeart = this.toggleHeart.bind(this);
  }
  //function toggles like boolean when heart is clicked
  toggleHeart() {
    const { liked } = this.state;
    const { trackId } = this.props.data;

    if (liked === true) {//if the item is liked 
      this.props.removeLike(trackId);//remove it from the liked array 
      this.setState({ liked: !liked });// toggle bool
    }
    if (liked === false) {//if the item is  not liked 
      this.props.addLike(trackId);//add to liked array
      this.setState({ liked: !liked });//toggle bool
    }
  }
  //this function handles what is rendered in certain col based on category
  renderSwitch() {
    const { data } = this.props;
    var converteddate = new Date(data.releaseDate);
    switch (data.kind || data.wrapperType) {
      case "software":
        return <h5>Rating :{data.trackContentRating}</h5>;
      case "track":
        return <h5>{myfunctions.TIME(data.trackTimeMillis)}</h5>;
      case "podcast":
        return (<h5>{`${converteddate.getUTCDate()} ${myfunctions.MONTH(converteddate.getMonth())} ${converteddate.getUTCFullYear()}`}</h5>);
      case "audiobook":
        return (<h5>{`${converteddate.getUTCDate()} ${myfunctions.MONTH(converteddate.getMonth())} ${converteddate.getUTCFullYear()}`}</h5>);
      case "ebook":
        return <h5>{data.genres[0]}</h5>;
      default:
        return <h5>{myfunctions.TIME(data.trackTimeMillis)}</h5>;
    }
  }
  //this function handles what is rendered in certain col based on category
  renderSwitchTitle(param) {
    const { data } = this.props;
    switch (param) {
      case "software":
        return <h5>{data.primaryGenreName}</h5>;
      case "track":
        return <h5>{data.primaryGenreName}</h5>;
      case "ebook":
        return <h5>{data.formattedPrice}</h5>;
      default:
        return <h5>{data.primaryGenreName}</h5>;
    }
  }

  render() {
    const { data } = this.props;

    //const {data}=this.props
    return (
      <Card bg="light" style={style} key={data.trackId}>
        <Row>
          <Col className="justify-items-left" md="auto">
            <Card.Body className="text-left" style={{ padding: 0 }}>
              <Card.Img variant="left" src={data.artworkUrl100} />
            </Card.Body>
          </Col>
          <Col md="auto" style={center}>
            <h5><a href={data.trackViewUrl} target="_blank" rel="noopener noreferrer" >{data.trackName}</a></h5>
          </Col>
          <Col style={center}>
            {this.renderSwitchTitle(data.kind)}
          </Col>
          <Col style={center}>
            {this.renderSwitch()}
          </Col>
          <Col style={center}>
            <ul style={{ listStyle: "none" }}>
              <li>
                <h5>Artist: {data.artistName}</h5>{" "}
              </li>
              <li>
                <h5>Type: {data.kind || data.wrapperType}</h5>
              </li>
            </ul>
          </Col>

          <Col style={{ textAlign: "right" }}>
            {this.state.liked ? (
              <HeartFill
                color="red"
                size={30}
                onClick={this.toggleHeart}
                style={{ float: "right" }}
              />
            ) : (
              <Heart
                color="red"
                size={30}
                onClick={this.toggleHeart}
                style={{ float: "right" }}
              />
            )}
          </Col>
        </Row>
      </Card>
    );
  }
}
//inline css
const style = {
  marginTop: "15px",
  marginBottom: "15px",
  paddingLeft: "15px",
  paddingRight: "15px",
  paddingBottom: "10px",
  paddingTop: "10px",
};
const center = {
  marginTop: "auto",
  marginBottom: "auto",
  maxWidth: "250px",
  padding: 0,
};

export default Items;
