import React, { Component } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import Bar from './Components/navbar';
import Items from './Components/Items';
import { BrowserRouter, Route } from "react-router-dom";
const crudMethods = require('./Modules/CRUD.js');
const myfunctions =require('./Modules/myFunctions.js');
class App extends Component {
 
  constructor(props){
    super(props);
    this.state={
      dropDownTitle:'Music',
      searchTerm:'',
      isEmpty:true,
      isLikesEmpty:true,
      data:[],
      likes:[]
    }
    //binding this to event functions
    this.changeTitle=this.changeTitle.bind(this);
    this.isEmpty=this.isEmpty.bind(this);
    this.isNoFavourites=this.isNoFavourites.bind(this);
    this.mapper=this.mapper.bind(this);
    this.removeLike=this.removeLike.bind(this);
  }
  //This function handles getting data when search button is clicked
  loadData(){
    //read comments for handleSearchChange is the same
    const {searchTerm,dropDownTitle}=this.state;
    const Edited =searchTerm.split(' ').join('+');
    crudMethods.READ(myfunctions.PATH(dropDownTitle),Edited)
    .then((result)=> this.setState({ data: result.data}))
    .catch((error) => this.setState({error:error,data:[]}))
    .then(()=>this.isEmpty());
    
  }
  //This function handles items that are liked
  getLike(id){
    const {data}=this.state;//get the data array of all items displayed on search
    const object=myfunctions.GetObject(data.results,id);//GetObject function returns the object from data array using the items trackID
    const array=this.state.likes;//get the current liked items array 
    array.push(object);//add the new item object to the liked array
    this.setState({likes:array});//set the state of like to new array
    this.isNoFavourites();//run check to see if there is no items in liked array
    
  }
  //this function updates which search catogory the user is using
  changeTitle(e){
    this.setState({dropDownTitle:e});
  }
  //This function updates items displayed while typing in search
  
  handleSearchChange(e){
    //update search string with attribute e
    this.setState({searchTerm:e});
    //reformat string to remove white spaces and replace with + to comform to api requirements
    const Edited =e.split(' ').join('+');
    //use the crud function READ and pass in url
    //myfunction.Path takes in search string and category string and returns url with embedded query
    crudMethods.READ(myfunctions.PATH(this.state.dropDownTitle),Edited)
    .then((result)=> this.setState({ data: result.data}))//set the data array in state when promise is resolved
    .catch((error) => this.setState({error:error,data:[]}))//if error make array empty
    .then(()=>this.isEmpty());//check is array is empty
    
  }
  //This function checks if the data array in state is empty
  isEmpty(){
    const array=this.state.data.results;
    // set the isEmpty bool based of if array is empty or not
    if(array.length===0){
      this.setState({isEmpty:true});
    }else{
      this.setState({isEmpty:false});
    }
  }
  //function removes liked items from liked array
  removeLike(trackid){
    const {likes}=this.state;//get liked array
    let array=myfunctions.removeItem(likes,trackid);//use removeItem function which returns array that does not contain the item you want.
    
    
    this.setState({likes:array});//set the likes state to updated array
    if(likes.length===0){//if likes array length is 0 
      this.setState({likes:[]});//set it to a new array
    }
    
    
    this.isNoFavourites();//update the bool
  }
  //This function checks if the liked array is empty or not
  isNoFavourites(){
    const likes=this.state.likes;
    if(likes.length===0){
      this.setState({isLikesEmpty:true});
    }
    else{
      this.setState({isLikesEmpty:false});
    }
  }
  
  /*
  This function maps the objects in data  or likes array to items component
  Item component props:
    key = trackid,
    data= current item object,
    isLiked=Boolean,
    removeLike=event function to remove liked item,
    addLike = event function to add item to liked
  */
  mapper(data){
    const likes=this.state.likes;
    const mapper =data.map((item)=>
            <Items 
              key={item.trackId} data={item} 
              addLike={this.getLike.bind(this)} 
              isLike={myfunctions.ONList(likes,item.trackId)}
              removeLike={this.removeLike}
            />
     );
     return mapper;
  }
  
  render() {
    const {dropDownTitle,data,likes}=this.state;
      
    
      return (
        <div className="App">

          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
            crossOrigin="anonymous"
          />
         <BrowserRouter>
         <Container  style={style}>
         <Bar title={dropDownTitle} titleChange={this.changeTitle} searchEvent={this.handleSearchChange.bind(this)} onClick={this.loadData.bind(this)}/>
          
          <Route exact={true} path="/"
            render={()=>
              <div>
                {this.state.isEmpty? <h2 style={{color:'lightgray'}}>Search for Media</h2>: this.mapper(data.results)}
              </div>
            }
          />
           <Route exact={true} path="/favourite"
            render={()=>
              <div>
                {this.state.isLikesEmpty? <h2 style={{color:'lightgray'}}>no items added</h2>: this.mapper(likes)}
              </div>
            }
          />
          
         </Container> 
         </BrowserRouter>
        </div>
        
      );
  }
}
//inline css
const style = {
  
  paddingTop: "30px",
  width:"1200px",
  
};
export default App;


