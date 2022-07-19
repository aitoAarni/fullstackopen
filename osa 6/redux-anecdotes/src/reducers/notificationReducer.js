import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: '',
    reducers : {
        createNotification(state, action) {
            state = action.payload
            return state
      }
    }
})

let timeoutId 

export const setNotification = (content, sec=5) => {
    return async dispatch => {
        timeoutId ? clearTimeout(timeoutId):
        dispatch(createNotification(content))
        timeoutId = setTimeout(() => {
            console.log('loppu')
            dispatch(createNotification(''))
            timeoutId = undefined
        }, sec * 1000)
    }
}

export const { createNotification } = notificationSlice.actions
export default notificationSlice.reducer