import React, { Component } from "react"
import { Columns, Column, Field, Control, Input, Button } from 'bloomer'
import 'bulma/css/bulma.css'
// import { Columns } from "bloomer/lib/grid/Columns";
// import { Column } from "bloomer/lib/grid/Column";


class Login extends Component {

    // Set initial state
    state = {
        email: "",
        password: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
        console.log(stateToChange)
    }.bind(this)

    // Handle for login submit
    handleLogin = function (e) {
        e.preventDefault()
        console.log(this.state.email)
        // Determine if a user already exists in API
        fetch(`http://localhost:8088/users?email=${this.state.email}`)
            .then(r => r.json())
            .then(user => {
                // User exists. Set local storage, and show home view
                if (user.length) {
                    this.props.setActiveUser(user[0].id)
                    this.props.showView("welcome")

                    // User doesn't exist
                } else { alert("Please go sign up!") }

            })
    }.bind(this)


    /*
        TODO:
            - Add first name field
            - Add last name field
            - Add password verification field
    */
    render() {
        return (
            <div>
                <div>
                    <Columns isCentered>
                        <Column isSize="1/2">
                        <form onSubmit={this.handleLogin}>
                            <Field>
                            {/* <Title isSize={2}>Sign Up!</Title> */}
                                <Control>
                                    <Input isSize="large" onChange={this.handleFieldChange} isColor='light' placeholder='Email' type="email" id="email" />
                                    <Input isSize="large" onChange={this.handleFieldChange} isColor='light' placeholder='Password' type="password" id="password" />
                                </Control>
                                <Control>
                                    <Button type="submit" isColor='primary' isOutlined>Log In</Button>
                                </Control>
                            </Field>
                            <Button isColor='primary'id="page__register" onClick={this.props.showView} isOutlined>Sign Up!
                            </Button>
                        </form>
                        </Column>
                </Columns>
                {/* </div>
                    <div> */}
                </div>
            </div>

            // <form className="form-signin" onSubmit={this.handleLogin}>
            //     <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            //     <label htmlFor="inputEmail" className="sr-only">Email address</label>
            //     <input onChange={this.handleFieldChange} type="email" id="email" className="form-control" placeholder="Email address" required="" autoFocus="" />
            //     <label htmlFor="inputPassword" className="sr-only">Password</label>
            //     <input onChange={this.handleFieldChange} type="password" id="password" className="form-control" placeholder="Password" required="" />
            //     <div className="checkbox mb-3">
            //         <input type="checkbox" value="remember-me" /> Remember me
            //     </div>
            //     <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            //     <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
            // </form>
        )
    }
}

export default Login