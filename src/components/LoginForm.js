import React from 'react';
import {Field,reduxForm} from 'redux-form';
import {loginUser} from '../actions/index';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import {toastr} from 'react-redux-toastr'
import history from './history';

class LoginForm extends React.Component {
   
    onSubmit=(formValue)=>{
      this.props.loginUser(formValue,(res)=>{
          if(res.status === 200){
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user_id", res.data.user_id);
          this.props.history.push('/PostList')  
        //   toastr.success('you can see all post')
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
          <form className='ui form' onSubmit={this.props.handleSubmit(this.onSubmit)}>
                     <h2> LoginForm </h2>
                <div>
                    <label>Username</label>
                    <div>
                    <Field
                        name="username"
                        component={this.renderField}
                        type="text"
                        placeholder="Username"
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
                        placeholder="Password"
                    />
                    </div>
                </div>
                <div>
                    <button type="submit"  className="ui button primary">Login</button>
                     <Link to="/SignUp"> <button className="ui button ">Don't have an account?</button></Link>
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
    if(!formValue.username) {
        errors.username='you must enter an UserName';
    }else if(formValue.username.length > 20){
        errors.username="you must enter less than 20 letters"
    }


    if(!formValue.password) {
        errors.password='you must enter PassWord';
    }
    return errors;
}


export default connect(null , {loginUser}) (reduxForm({
    form :'LoginForm',
    validate
 }) (LoginForm));

