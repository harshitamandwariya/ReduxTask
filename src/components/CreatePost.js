import React from 'react';
import { connect } from 'react-redux';
import { createPost } from '../actions';
import {Field,reduxForm} from 'redux-form';
import history from './history';



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

        renderTextAreaField = (field) => {
            const { input} = field;
            return (
                <div>
                    <label>{field.label}</label>
                    <div>
                    <textarea value={field.value} {...input} placeholder={field.placeholder ? field.placeholder : ''}></textarea>
                    </div>
                </div>
            );
        }

    render(){
        let onSubmitHelper=this.onSubmit;

       if(this.props.onSubmit){
            onSubmitHelper=this.props.onSubmit
       }

       if(localStorage.getItem('token')){
        return (
          
            <form className='ui form' onSubmit= {this.props.handleSubmit(onSubmitHelper)}>
                  <div>
                      <label>Title</label>
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
                      <label>Description</label>
                      <div>
                      <Field
                          name="content"
                          component={this.renderTextAreaField}
                          placeholder="description"                    
                      />
                      </div>
                  </div>
                  <div>
                      <label>Select Status</label>
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
    }else if(formValue.content.length > 500){
        errors.content="you must enter less than 500 letters"
    }    if(!formValue.status){
        errors.status='select any one choice';
    }
    return errors;
  }
  
export default connect(null , {createPost})((reduxForm({
    form : 'CreatePost',
    validate,
    enableReinitialize: true,


}))(CreatePost));
