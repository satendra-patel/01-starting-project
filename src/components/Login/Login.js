import React, { useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { act } from 'react-dom/test-utils';

const emailReducer=(state,action)=>{
  if(action.type==='USER_INPUT'){
    return{value:action.val , isValid:action.val.Includes('@')};
  }
  if(action.type==='INPUT_BLUR'){
    return{value:state.value,isValid:state.value.Includes('@')};
  }
  return {value:'',isValid:false}

}

const passwordReducer=(state,action)=>{
  if(action.type==='USER_INPUT'){
    return{value:action.val,isValid:action.val.trim().length>6}
  }
  if(action.type==='INPUT_BLUR'){
    return{value:state.value,isValid:state.value.trim().lenght>6}
  }
  return {value:'',isValid:false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollege,setEnteredCollege]=useState('');
  const [collegenameIsValid,setCollegeNameIsValid]=useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispatchEmail]=useReducer(emailReducer,{value:'',isValid:null,});

  const [passwordState,dispatchPassword]=useReducer(passwordReducer,{
    value:'',
    isValid:null
  });

  useEffect(()=>{
    setFormIsValid(
      emailState.isValid && passwordState.trim().length > 6 &&enteredCollege.trim().length > 4
    );

  },[emailState.value,passwordState.value]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT' ,val:event.target.value});
    // setEnteredEmail(event.target.value);

   
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:'USER_INPUT',val:event.target.value});

  };

  const collegeHandler=(event)=>{
    setEnteredCollege(event.target.value);
  }

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type:'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type:'INPUT_BLUR'})
  };

  const validatecollegHandler=()=>{
    setCollegeNameIsValid(enteredCollege.trim().length>4);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value,enteredCollege);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegenameIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="colleg"
            value={enteredCollege}
            onChange={collegeHandler}
            onBlur={validatecollegHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
