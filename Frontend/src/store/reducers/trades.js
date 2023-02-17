import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userDetails: {
        emailOrUsername: "",
        inActiveDate: "",
        createdOn: "",
        isAdmin: false,
        isEndUser: false,
        isSubAdmin: false,
        displayName: "",
        user_ID: "",
    }
}

const trades = createSlice({
    name: 'trades',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.userDetails = action.payload
        }

    },
})

export const { setUserDetails } = trades.actions
export default trades.reducer