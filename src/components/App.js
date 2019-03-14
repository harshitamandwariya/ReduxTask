import React from 'react';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import CreatePost from './CreatePost';
import DeletePost from './DeletePost';
import EditPost from './EditPost';
import {Router,Route } from 'react-router-dom';
import PostList from './PostList';
import history from './history';
import ReduxToastr from 'react-redux-toastr';


class App extends React.Component {
  render() {
    return (
      <div className="ui container" >
         <Router history={history}>      
          <div> 
            <Route path = '/SignUp' exact component = {SignUpForm} />
            <Route path = '/'exact component = {LoginForm} />   
            <Route path = '/PostList'exact component = {PostList} />  
            <Route path = '/CreatePost' exact component = {CreatePost} />         
            <Route path = '/EditPost/:id' exact component = {EditPost} /> 
            <Route path = '/DeletePost/:id' exact component = {DeletePost} /> 
            </div>
         </Router>
            <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates
                position="top-left"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar
                closeOnToastrClick/>      
      </div>
    );
  }
}

export default App;
