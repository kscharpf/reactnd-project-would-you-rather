export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser(userId) {
    return {
        type: SET_AUTHED_USER,
        authedUser: userId,
    }
}