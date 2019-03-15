import React from 'react';
import {connect} from 'react-redux';
import { getSinglepost } from '../actions';
import renderHTML from 'react-render-html';

class PostView extends React.Component {
    componentDidMount() {
        this.props.getSinglepost(this.props.match.params.id , (res)=>{});
    }

    render() {
        const { post} = this.props;
        if(this.props.post){
            if(this.props.post.content){
                const description = renderHTML(post.content.rendered);
                return (
                    <div>
                      <h3>Post</h3>
                        <div>
                            <h1>{post.title.rendered}</h1>
                            <h5>{description[0].props.children[0]}</h5>
                       </div>
                    </div>
                  );  
             }  else {
                     return <div><h1>Loading...</h1></div>
                     }
        }  
    }
} 

const mapStateToProps = (state) =>  {
    console.log('state.props==', state);
    return { post : state.FetchUser};
};
export default connect (mapStateToProps , { getSinglepost }) (PostView);