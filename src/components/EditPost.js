import React from 'react';
import {connect} from 'react-redux';
import { postList , editPost, getSinglepost } from '../actions';
import CreatePost from './CreatePost';
import renderHTML from 'react-render-html';

class EditPost extends React.Component {

    componentWillMount() {
        this.props.getSinglepost(this.props.match.params.id, (res)=>{});
    }

    onSubmit = (formValue) => {
        this.props.editPost(this.props.match.params.id,formValue)
        console.log('formVaalues', formValue);
        this.props.history.push('/PostList')
    }

    render() {   
        const {post} = this.props;
            if(this.props.post){
                if(this.props.post.content){
                    const description = renderHTML(post.content.rendered);
                    console.log('post', description[0].props.children[0]);
                    return (
                        <div>
                            <h3>Edit a Post</h3>
                            <CreatePost 
                              initialValues={{
                                title:post.title.rendered,
                                content: description[0].props.children[0],
                                status:post.status
                             }} 
                              onSubmit={this.onSubmit}
                            />        
                        </div>
                    );  
                } else {
                    return <div><h1>Loading...</h1></div>
                   }
                
                }
           }
    }
   const mapStateToProps = (state) => {
        return {post : state.FetchUser };
     };
    
  export default connect(mapStateToProps ,{postList ,editPost, getSinglepost })(EditPost);
