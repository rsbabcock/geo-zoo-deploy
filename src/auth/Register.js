import React, { Component } from "react"
import { Field, Control, Input, Button } from 'bloomer'
import 'bulma/css/bulma.css'
import './register.css'
// import logo from "../img/Group.png"

export default class Register extends Component {
    // Then a registration form should be displayed where the user 
    // can enter an email address, first name, last name, and password
    // Set initial state
    state = {
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
        console.log(stateToChange)
    }.bind(this)

    handleSignUp = function (e) {
        e.preventDefault()
        console.log(this.state.email)
        console.log(this.state.firstName)
        console.log(this.state.lastName)
        console.log(this.state.password)

        // Create user in API
        fetch(`https://geo-zoo-api.herokuapp.com/users?email=${this.state.email}`)
            .then(r => r.json())
            .then(user => {
                // User exists. Set local storage, and show home view
                if (user.length) {
                    alert("We've already met, please go log in")
                    this.props.showView("login")

                    // User doesn't exist
                } else {
                    return fetch("https://geo-zoo-api.herokuapp.com/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: this.state.email,
                            firstName: this.state.firstName,
                            lastName: this.state.lastName,
                            password: this.state.password
                        })
                    })
                        // Set local storage with newly created user's id and show home view
                        .then(r => r.json())
                        .then(newUser => {
                            // debugger
                            this.props.setActiveUser(newUser.id)
                            this.props.showView("welcome")
                        })
                }
            })
    }.bind(this)

    render() {
        return (
            <div className="registContatiner">
                <form onSubmit={this.handleSignUp} >
                <div>
                    <Field>
                        <h1>Please Sign Up!</h1>
                        <Control>
                            <Input style={{marginBottom: 10}} onChange={this.handleFieldChange} isColor='success' placeholder='Email' type="email" id="email" isSize="large"/>
                            <Input style={{marginBottom: 10}} onChange={this.handleFieldChange} isColor='success' placeholder='First Name' type="text" id="firstName" isSize="large"/>
                            <Input style={{marginBottom: 10}} onChange={this.handleFieldChange} isColor='success' placeholder='Last Name' type="text" id="lastName" isSize="large"/>
                            <Input onChange={this.handleFieldChange} isColor='success' placeholder='Password' type="password" id="password" isSize="large"/>
                        </Control>
                        <Control id="controller">
                            <Button id="button__signUp" type="submit" isColor='primary' isSize="large"isOutlined>Sign Up!</Button>
                        </Control>
                    </Field>
                </div >
                </form>
            </div>
        )
    }
}


