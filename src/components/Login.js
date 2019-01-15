import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser} from "../actions/authedUser";

class Login extends Component {
    state = {
        userId: 'None',
    }

    handleSubmit = (e) => {
        e.preventDefault()

        if (this.state.userId !== 'None') {
            const { dispatch } = this.props
            dispatch(setAuthedUser(this.state.userId))
        }
    }

    handleChange = (e) => {
        this.setState({userId: e.target.value})
    }
    render() {
       const { users } = this.props

        const listItems = [<option value="None" key="None">Select User</option>].concat(Object.values(users).map((u) => (
            <option value={u.id} key={u.id}>{u.name}</option>
        )))

       return (
           <div>
               <form onSubmit={this.handleSubmit}>
                   <div className="form-group">
                       <select value={this.state.name} className="form-control" onChange={this.handleChange}>
                           {listItems}
                       </select>
                   </div>
                   <input type="submit" value="Login"/>
               </form>
           </div>
       )
    }
}

function mapStateToProps({users}) {
    return {
        users,
        defaultUser: users.map
    }

}

export default connect(mapStateToProps)(Login)