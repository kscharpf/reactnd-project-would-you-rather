import { SET_AUTHED_USER} from "../actions/authedUser";

export default function authedUser(state = null, action) {
    console.log("reducer.setAuthedUseraction: ", action, " state ", state)
    switch(action.type) {
        case SET_AUTHED_USER:
            return {
                ...state,
                userId: action.authedUser,
            }

        default:
            return state
    }
}