import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        storeUser(state, action) {
            state = action.payload
            return state
        },
        logOut(state, action) {
            state = null
            return state
        },
    },
})

export const { storeUser, logOut } = userSlice.actions

export default userSlice.reducer
