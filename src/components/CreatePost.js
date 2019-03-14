import React from 'react';
import { connect } from 'react-redux';
import { createPost } from '../actions';
import {Field,reduxForm} from 'redux-form';
import history from './history';
import {Link} from 'react-router-dom';



class CreatePost extends React.Component  {
     
      onSubmit=(formValue)=>{
       
        this.props.createPost(formValue,(res)=>{
            console.log(res,'function')
        if(!res.status===200){
            history.push('/')
        }
        if(res.status===201){
            history.push('/PostList');
            }          
        }); 
  }

  onSubmitLogout(){
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    history.push('/');
 }


    renderField = (formValue) => {
        return (
        <div>
            <input type={formValue.type}
            {...formValue.input} 
            className='form-control is-danger' 
            placeholder={formValue.placeholder} />
           <font color='red'>{formValue.meta.touched ? formValue.meta.error : ''}</font>
        </div>
        )
        }

    render(){
        let onSubmitHelper=this.onSubmit;
       if(this.props.onSubmit){
            onSubmitHelper=this.props.onSubmit
       }

       if(localStorage.getItem('token')){
        return (
          
            <form onSubmit= {this.props.handleSubmit(onSubmitHelper)}>
                  <h3>Create Post</h3>
                  <div>
                      <label>title</label>
                      <div>
                      <Field
                          name="title"
                          component={this.renderField}
                          type="text"
                          placeholder="title"                    
                      />
                      </div>
                  </div>
                  <div>
                      <label>description</label>
                      <div>
                      <Field
                          name="content"
                          component={this.renderField}
                          type="text"
                          placeholder="description"                    
                      />
                      </div>
                  </div>
                  <div>
                      <label>status</label>
                      <div>
                      <Field
                          name="status"
                          component="select"
                          type="text"
                          placeholder="Publish"  >
                          <option className='form-control is-danger'/>
                          <option value="publish">publish</option>
                          <option value="future">future</option>
                          <option value="draft">draft</option>     
                          <option value="private">private</option> 
                          <option value="pending">pending</option>              
                      </Field>
                      </div>
                  </div>
                  <div>
                      <button type='submit'  className="ui button primary">Submit</button>
                       <Link to='/'><button  className="ui button primary" onClick={this.onSubmitLogout}>Logout</button></Link>
                     
                  </div>
            </form>      
        );
       } else {
            return(
                 <div>{history.push('/')}</div>
                 )
          }
     }
  }
  const validate = (formValue) => {
    const errors={};
    if(!formValue.title) {
        errors.title='you must enter a title';
    }else if(formValue.title.length > 15){
        errors.title="you must enter less than 15 letters"
    }

    if(!formValue.content){
        errors.content='you must enter a description';
    }else if(formValue.content.length > 200){
        errors.content="you must enter less than 200 letters"
    }

    if(!formValue.status){
        errors.status='select any one choice';
    }
    return errors;
  }
  

export default connect(null , {createPost})((reduxForm({
    form : 'CreatePost',
    validate

}))(CreatePost));
