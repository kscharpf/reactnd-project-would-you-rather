import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const ANSWERED=1
const UNANSWERED=2

class Dashboard extends Component {

    state = {
        activeTab: UNANSWERED,
    }


    handleClick = (e) => {
        this.setState({
            activeTab: e.target.value,
        })
    }
    render() {

        const { questions, user, loading } = this.props
        const { activeTab } = this.state

        const answeredQuestions = Object.values(questions).filter((q) => q.optionOne.votes.includes(user.id) ||
            q.optionTwo.votes.includes(user.id))
        const unansweredQuestions = Object.values(questions).filter((q) => !q.optionOne.votes.includes(user.id) &&
            !q.optionTwo.votes.includes(user.id))

        const questions2 = (activeTab===ANSWERED) ? answeredQuestions : unansweredQuestions

        questions2.sort((a,b) => a.timestamp > b.timestamp ? -1 : 1)

        const qlist = loading===true ? null : questions2
            .map((q) =>
                (
                    (<li key={q.id}>
                        <Link to={`/questions/${q.id}`}>
                            Would you rather {q.optionOne.text} OR {q.optionTwo.text}?
                        </Link>
                    </li>))

                )

        const answeredClassName=activeTab===ANSWERED ? 'active' : null
        const unansweredClassName=activeTab===UNANSWERED ? 'active' : null
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li key={ANSWERED} className={answeredClassName} value={ANSWERED} onClick={this.handleClick}>Answered Questions</li>
                    <li key={UNANSWERED} className={unansweredClassName} value={UNANSWERED} onClick={this.handleClick}>Unanswered Questions</li>
                </ul>
                <ul>
                {qlist}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({questions, authedUser, users}) {
    return {
        user: users[authedUser.userId],
        questions,
        loading: authedUser===null,
    }
}

export default connect(mapStateToProps)(Dashboard)