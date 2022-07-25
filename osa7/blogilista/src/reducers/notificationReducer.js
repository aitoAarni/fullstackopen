import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        createNotification(state, action) {
            console.log('loadiii', action.payload)
            state = action.payload
            return state
        },
    },
})

let timeoutId

export const setNotification = (content, sec = 5) => {
    return async (dispatch) => {
        if (timeoutId) clearTimeout(timeoutId)
        dispatch(createNotification(content))
        timeoutId = setTimeout(() => {
            dispatch(createNotification(null))
            timeoutId = undefined
        }, sec * 1000)
    }
}

export const { createNotification } = notificationSlice.actions
export default notificationSlice.reducer
