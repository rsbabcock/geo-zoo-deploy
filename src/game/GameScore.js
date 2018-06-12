import React, { Component } from "react"
import { Content } from 'bloomer'


export default class GameScore extends Component {
    state = {
        userinfo : []
    }
    // receives user score and active user 
    postScore = () => fetch("http://localhost:8088/scores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId : this.props.activeUser,
            finalScore : this.props.score,
            timeStamp: new Date()
        })
    })
    .then(r => r.json())
    .then(score => {
        // and posts to api as well as gives message
        console.log("score saved")
    })
    // .then(() => {return fetch(`http://localhost:8088/users/${this.props.activeUser}`)
    // })
    // .then(r => r.json())
    // .then(user => {
    //     this.setState({
    //         userinfo: user
    //     })
    // })

    componentDidMount(){
       this.postScore()
    }

    render() {
        return (
            <div className="card score">
                <div className="card-body">
                    <Content>
                        <h1> Congrats </h1>
                        <h3>You scored {this.props.score} out of {this.props.counter+1}!</h3>
                    </Content>
                    </div>
                </div>
                )
            }
        }