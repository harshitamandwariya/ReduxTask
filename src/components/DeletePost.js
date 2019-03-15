import React from 'react';
import history from './history';
import {connect} from 'react-redux';
import {deletePost} from '../actions';
import { Link } from 'react-router-dom';
import Modal from './modal';
class DeletePost extends React.Component {

    delete = (id)=>{
        this.props.deletePost(id,(res)=>{
            if(res.status===200){
                history.push('/postlist');
            }
        });
    }

    renderActions() {
      const {id} = this.props.match.params;
        return (
            <React.Fragment>
           <div>  
                <button onClick={() => this.delete(id) }className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
           </div>
           </React.Fragment>
     );
}

    renderContent() {       
        return `Are  you sure you want to delete this Post ?`
    }

    render() {
        return (
            <div>
                <Modal
                title= 'Delete Stream'
                content = {this.renderContent()}
                actions = {this.renderActions()}
                
                />
            </div>
         );
     };
}

export default connect(null , {deletePost})(DeletePost);