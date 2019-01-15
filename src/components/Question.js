import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddVote } from '../actions/questions'

class Question extends Component {

    state = {
        selectedEntry: 'optionOne'
    }

    handleChange1 = (e) => {
        this.setState({
            selectedEntry: 'optionOne'
        })
    }
    handleChange2 = (e) => {
        this.setState({
            selectedEntry: 'optionTwo'
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch, question, user } = this.props
       dispatch(handleAddVote({qid: question.id, answer: this.state.selectedEntry, authedUser: user.id}))
    }

    render() {
        const { question, users, user } = this.props

        if (!question) {
            return (
                <p>This question doesn't exist</p>
            )
        }

        const hasVoted = question.optionOne.votes.includes(user.id) ||
            question.optionTwo.votes.includes(user.id)

        let questionRender = <div></div>

        if(hasVoted) {
            const o1Votes = question.optionOne.votes.length
            const o2Votes = question.optionTwo.votes.length
            const totalVotes = o1Votes + o2Votes
            const o1Pct = (o1Votes / totalVotes).toFixed(2) * 100 + '%'
            const o2Pct = (o2Votes / totalVotes).toFixed(2) * 100 + '%'
            const lbl = <span className="label label-default">My Choice</span>
            const o1Lbl = (user.answers[question.id] === 'optionOne' ? lbl : null)
            const o2Lbl = (user.answers[question.id] === 'optionTwo' ? lbl : null)
            questionRender = <div>
                <ul className="list-group">
                    <li className="list-group-item">{question.optionOne.text} {o1Lbl}
                        <span className="badge">{o1Pct}</span>
                      <span className="badge">{o1Votes}</span>
                    </li>
                    <li className="list-group-item">{question.optionTwo.text} {o2Lbl}
                        <span className="badge">{o2Pct}</span>
                        <span className="badge">{o2Votes}</span>
                    </li>
                </ul>
            </div>
        } else {
            questionRender =
                <div>
                    <h1>Would you rather</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="radio" onChange={this.handleChange1}>
                            <label><input type="radio" name="optradio"/>{question.optionOne.text}</label>
                        </div>
                        <div className="radio" onChange={this.handleChange2}>
                            <label><input type="radio" name="optradio"/>{question.optionTwo.text}</label>
                        </div>
                        <button className="btn btn-primary" type="submit" value="Vote!">Vote!</button>
                    </form>
                </div>
        }

        return (
            <div>
                {questionRender}
                <br/>
                submitted by <img src={users[question.author].avatarURL}
                                  alt={users[question.author].name}
                                  className='avatar' />
            </div>
        )
    }

}

function mapStateToProps({questions, users, authedUser}, props) {
    const { id } = props.match.params

    return {
        question: questions[id],
        users,
        user: users[authedUser.userId],
    }
}

export default connect(mapStateToProps)(Question)