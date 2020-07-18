import React, { Component } from "react";
import { Navbar,Nav,NavDropdown, Form, Button,FormControl} from "react-bootstrap";
import {Search,HeartFill} from 'react-bootstrap-icons';
import { Link } from "react-router-dom";


//Nar bar component which handles routing the view and allowing the user to select category and enter search text 

class NavBar extends Component {
    
  //this event in herits props event passed in 
  handleSearch(event){
    this.props.searchEvent(event.target.value);
  }
  render() {
    const {title,titleChange,onClick}=this.props;
    return (
        <Navbar bg="dark" expand="lg" >
        <Navbar.Brand style={{color:'white'}}>Your Content Libary</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Link to='/favourite'><HeartFill/> Favourites</Link>
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="ml-auto">
            
          <NavDropdown title={title} id="basic-nav-dropdown" style={style} onSelect={titleChange} text='light'>
              <NavDropdown.Item eventKey='Movie'>Movie</NavDropdown.Item>
              <NavDropdown.Item eventKey='Podcast'>Podcast</NavDropdown.Item>
              <NavDropdown.Item eventKey='Music'>Music</NavDropdown.Item>
              <NavDropdown.Item eventKey='Audiobook'>Audiobook</NavDropdown.Item>
              <NavDropdown.Item eventKey='Short Film'>Short Film</NavDropdown.Item>
              <NavDropdown.Item eventKey='TV show'>TV show</NavDropdown.Item>
              <NavDropdown.Item eventKey='Software'>Software</NavDropdown.Item>
              <NavDropdown.Item eventKey='Ebook'>Ebook</NavDropdown.Item>
              <NavDropdown.Item eventKey='All'>All</NavDropdown.Item>
              <NavDropdown.Divider />
              
            </NavDropdown>
          </Nav>
          <Form inline>
          <Link to='/'> <FormControl type="text" placeholder="Search..." className="mr-sm-2" onChange={this.handleSearch.bind(this)} /></Link>
            <Button variant="light" onClick={onClick}><Search/>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
//inline css
const style={
    float:'right',
    color:'white'
}
export default NavBar;
