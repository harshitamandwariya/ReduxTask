import React from 'react';
import {Field,reduxForm} from 'redux-form';
import {createUser} from '../actions/index';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';


class SignUpForm extends React.Component{
    
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
      return(
          <form onSubmit = {this.props.handleSubmit(this.onSubmit)}>
                <h1>SignUp</h1>
                <div>
                    <label>firstname</label>
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
                    <label>lastname</label>
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
                    <label>username</label>
                    <div>
                    <Field
                        name="username"
                        component={this.renderField}
                        type="username"
                        placeholder="UserName"
                    />
                    </div>
                </div>
                <div>
                    <label>password</label>
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
                    <label>confirm   password</label>
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
    }
}

const  validate = (formValue) => {
    const errors = {}
     if(!formValue.first_name) {
        errors.first_name='you must enter a firstName';
    } else if(formValue.first_name.length > 15){
        errors.first_name="you must enter less than 15 letters"
    }

     if(!formValue.last_name){
        errors.last_name='you must enter a lastName';
     }else if(formValue.last_name.length > 15){
        errors.last_name="you must enter less than 15 letters"
    }

     if (!formValue.email) {
        errors.email = 'you must enter an Email'
     }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(formValue.email)) {
        errors.email = 'Enter Valid Email'
    }

   
    if(!formValue.username) {
        errors.username='you must enter an UserName';
    }else if(formValue.username.length > 15){
        errors.username="you must enter less than 15 letters"
    }


    if(!formValue.password) {
       errors.password='you must enter a strong PassWord';
    }else if(formValue.password.length < 6){
        errors.password="you must enter password of atleast 6 letters"
    }

    if(!formValue.confirmpassword) {
        errors.confirmpassword='you must re-enter PassWord';
    }else  if (formValue.confirmpassword !== formValue.password){
            errors.confirmpassword = 'Password doesn\'t match'
   }
  return errors;                            
}

export default connect(null ,{createUser})(reduxForm({
    form :'SignUpForm',
    validate
 }) (SignUpForm))
