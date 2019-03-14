import React from 'react';
import {connect} from 'react-redux';
import { postList , editPost } from '../actions';
import CreatePost from './CreatePost';


class EditPost extends React.Component {
 
    onSubmit = (formValue) => {
        this.props.editPost(this.props.match.params.id,formValue)   
        this.props.history.push('/PostList')
 };

render() {  
   return(
        <div>
            <h3>Edit a Post</h3>
            <CreatePost 
               onSubmit={this.onSubmit}
          />        
        </div>
     );  
   }
}

export default connect(null ,{postList ,editPost })(EditPost);