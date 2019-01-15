import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {

    render() {
        const { users } = this.props

        console.log("Leaderboard.users: ", users)

        const userTotals = Object.keys(users).map((u) => {
            const askedTotal = users[u].questions.length
            const answeredTotal = Object.keys(users[u].answers).length

            console.log("u: ", u, askedTotal, answeredTotal)

            return {
                id: u,
                contributions: askedTotal + answeredTotal,
                asked: askedTotal,
                answered: answeredTotal,
            }
        })

        console.log("userTotals: ", userTotals)

        userTotals.sort((a,b) =>
            a.contributions > b.contributions ? -1 : a.contributions < b.contributions ? 1 :
                a.id < b.id ? -1 : 1
        )

        const leaderboard = userTotals.map((u) => {
            console.log("leaderboard.u: ", u)
            return (
                <tr key={u.id}>
                <td><img src={users[u.id].avatarURL}
                         alt={`Alt of ${users[u.id].name}`}
                         className='avatar' />
                </td>
                <td>{users[u.id].name}</td>
                <td>{u.contributions}</td>
                <td>{u.asked}</td>
                <td>{u.answered}</td>
            </tr>)
        })

        return (
            <div>
                <h1>Leaderboard</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Contributions</th>
                        <th>Questions</th>
                        <th>Answers</th>
                    </tr>
                    </thead>
                    <tbody>
                      {leaderboard}
                    </tbody>
                </table>
            </div>
        )
    }

}

function mapStateToProps({questions, users}) {
    return {
        users,
    }
}

export default connect(mapStateToProps)(Leaderboard)