import React, { Component, Fragment } from 'react';
import '../App.css';
import Login from './Login'
import Dashboard from './Dashboard'
import {handleInitialData} from "../actions/shared";
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Question from './Question'
import Leaderboard from './Leaderboard'
import NewQuestion from './NewQuestion'
import Nav from './Nav'
import { setAuthedUser} from "../actions/authedUser";
import LoadingBar from 'react-redux-loading'


const NoMatch = ({ location }) => (
    <div>
        <h3>Page <code>{location.pathname}</code> does not exist</h3>
    </div>
)

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    handleOnClick = () => {
       const { dispatch } = this.props
       dispatch(setAuthedUser(null))
    }
  render() {

      const {authedUser, users} = this.props
      const user = (authedUser && authedUser.userId) ? users[authedUser.userId] : null
      console.log("user set as: ", user)
      return (
          <div>
              <Router>
                  <Fragment>
                      <LoadingBar/>
                          <div>
                            {this.props.loading === true ? null :
                              (authedUser && authedUser.userId) ?
                                  <div className="container">
                                  <img
                                      src={user.avatarURL}
                                      alt={`Alt of ${user.name}`}
                                      className='avatar'
                                      />
                                  <br/><label>{user.name}</label>
                                  <button className="btn-link" onClick={this.handleOnClick}>Logout</button>
                                  <Nav />
                                  <Switch>
                                    <Route path="/" exact component={Dashboard}/>
                                    <Route path="/questions/:id" exact component={Question}/>
                                    <Route path="/add" exact component={NewQuestion}/>
                                    <Route path="/leaderboard" exact component={Leaderboard}/>
                                    <Route component={NoMatch}/>
                                  </Switch>
                              </div>
                            : <Login />}
                        </div>
                  </Fragment>
              </Router>
          </div>
      )
  }
}

function mapStateToProps( {authedUser, users} ) {
    return {
        authedUser,
        users,
        loading: users===null,
    }

}

export default connect(mapStateToProps)(App);
