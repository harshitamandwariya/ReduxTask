import React from 'react';
import {Field,reduxForm} from 'redux-form';
import {createUser} from '../actions/index';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import history from './history';

class SignUpForm extends React.Component{
    
componentWillMount = () => {
  if(localStorage.getItem("token")){
      localStorage.removeItem("token")
  }
}
    onSubmit=(formValue)=>{  
       this.props.createUser(formValue,(res)=>{
       if(res.status === 200){
           console.log(res.status);
           
              localStorage.setItem("token", res.data.token);
              this.props.history.push('/')  
        } 
    });
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

    if(!localStorage.getItem("token")) {
      return(
          <form className='ui form' onSubmit = {this.props.handleSubmit(this.onSubmit)}>
                <h1>SignUp</h1>
                <div>
                    <label>FirstName</label>
                    <div>
                    <Field
                        name="first_name"
                        component={this.renderField}
                        type="text"
                        placeholder="First Name"                    
                    />
                    </div>
                </div>
                <div>
                    <label>LastName</label>
                    <div>
                    <Field
                        name="last_name"
                        component={this.renderField}
                        type="text"
                        placeholder="Last Name"
                    />
                    </div>
                </div>  
                <div>
                    <label>Email</label>
                    <div>
                    <Field
                        name="email"
                        component={this.renderField}
                        type="email"
                        placeholder="Email"
                    />
                    </div>
                </div>
                <div>
                    <label className='ui form'>Username</label>
                    <div>
                    <Field
                        name="username"
                        component={this.renderField}
                        type="text"
                        placeholder="UserName"
                    />
                    </div>
                </div>
                <div>
                    <label>Password</label>
                    <div>
                    <Field
                        name="password"
                        component={this.renderField}
                        type="Password"
                        placeholder="PassWord"
                    />
                    </div>
                </div>
                <div>
                    <label>Confirm Password</label>
                    <div>
                    <Field
                        name="confirmpassword"
                        component={this.renderField}
                        type="PassWord"
                        placeholder="re-enter PassWord"
                    />
                    </div>
                </div>
                <div>
                    <button className="ui button primary" type="submit">Submit </button>
                    <Link to="/" className="ui button "> back to Login</Link>
                </div>
            </form>
        );
    }else{
        return(
            <div>{history.push('/PostList')}</div>
        )
    }
 }
}
const  validate = (formValue) => {
    const errors = {}
     if(!formValue.first_name) {
        errors.first_name='You must enter a firstname';
    } else if(formValue.first_name.length > 15){
        errors.first_name="You must enter less than 15 letters"
    }

     if(!formValue.last_name){
        errors.last_name='You must enter a lastname';
     }else if(formValue.last_name.length > 15){
        errors.last_name="You must enter less than 15 letters"
    }

     if (!formValue.email) {
        errors.email = 'You must enter an Email'
     }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(formValue.email)) {
        errors.email = 'Enter Valid Email'
    }

   
    if(!formValue.username) {
        errors.username='You must enter an Username';
    }else if(formValue.username.length > 15){
        errors.username="You must enter less than 15 letters"
    }


    if(!formValue.password) {
       errors.password='You must enter a strong Password';
    }else if(formValue.password.length < 6){
        errors.password="You must enter password of atleast 6 letters"
    }

    if(!formValue.confirmpassword) {
        errors.confirmpassword='You must re-enter PassWord';
    }else  if (formValue.confirmpassword !== formValue.password){
            errors.confirmpassword = 'Password doesn\'t match'
   }
  return errors;                            
}

export default connect(null ,{createUser})(reduxForm({
    form :'SignUpForm',
    validate
 }) (SignUpForm))
