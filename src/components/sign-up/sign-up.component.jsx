import React from 'react';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils'

import './sign-up.styles.scss';

class SignUp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            displayName:'',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {

        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state

        if(password !== confirmPassword){
            alert("passwords don't match");
            return;
        }
        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, {displayName});

            this.state = {
                displayName:'',
                email: '',
                password: '',
                confirmPassword: ''
            }
        }catch (e) {
            console.error(e);
        }
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state
        return (
            <div className='sign-up'>
                <h2 className='title'>I don't have an account</h2>
                <span>Sign up with your email and password </span>
                <form onSubmit={this.handleSubmit}>

                    <FormInput
                        handleChange={this.handleChange}
                        name='displayName'
                        type="text"
                        value={displayName}
                        label="Display Name"
                        required
                    />

                    <FormInput
                        handleChange={this.handleChange}
                        name='email'
                        type="email"
                        value={email}
                        label="email"
                        required
                    />

                    <FormInput
                        handleChange={this.handleChange}
                        name='password'
                        type="password"
                        value={password}
                        label="password"
                        required
                    />

                    <FormInput
                        handleChange={this.handleChange}
                        name='confirmPassword'
                        type="password"
                        value={confirmPassword}
                        label="Confirm Password"
                        required
                    />

                    <div className='buttons'>
                        <CustomButton type='submit' value='Submit Form'>Sign Up</CustomButton>
                    </div>

                </form>

            </div>
        )
    }

}
export default SignUp;