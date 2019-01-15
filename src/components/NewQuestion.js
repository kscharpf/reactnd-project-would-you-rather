import React, { Component } from 'react'
import { handleAddQuestion } from '../actions/questions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false,
    }

    handleChange = (e) => {
        const target = e.target
        const option = target.value
        const name = target.name
        this.setState(() => ({
            [name]: option,
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { optionOne, optionTwo } = this.state
        const { dispatch } = this.props

        dispatch(handleAddQuestion(optionOne, optionTwo))

        this.setState(() => ({
            optionOne: '',
            optionTwo: '',
            toHome: true,
        }))
    }

    render() {

        const { optionOne, optionTwo, toHome } = this.state
        if(toHome) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <h3 className="center">
                    Ask New Question
                </h3>
                <h1>Would you rather</h1>
                <form className="new-question" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" name="optionOne" placeholder="Option One" value={this.state.optionOne} onChange={this.handleChange}/>
                </div>
                <h1>OR</h1><br/>
                <div className="form-group">
                    <input type="text" className="form-control" name="optionTwo" placeholder="Option Two" value={this.state.optionTwo} onChange={this.handleChange}/>
                </div>
                <button
                    className="btn"
                    type="submit"
                    disabled={optionOne==='' || optionTwo===''}>
                    Submit
                </button>
                </form>
            </div>
        )

    }
}

export default connect()(NewQuestion)