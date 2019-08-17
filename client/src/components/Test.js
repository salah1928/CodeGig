import React, { Component } from 'react'

 class Test extends Component {
    constructor(){
        super()
        this.state = {
            msg:[],
        }
    }
    componentDidMount() {
        fetch('/api/users')
        .then(res=>res.json())
        .then(json=>this.setState({msg:json})
        )
    }
    render() {

        

        return (
            <div>
                {this.state.msg.map(mg=><li>{mg.firstName}</li>)}
            </div>
        )
    }
}
export default Test;