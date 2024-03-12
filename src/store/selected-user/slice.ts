import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';

interface IUsersState {
    id: IUser['id'];
}

const initialState: IUsersState = {
    id: '',
};

const selectedUserSlice = createSlice({
    name: 'selected-user',
    initialState,
    reducers: {
        selectUserId(state, action: PayloadAction<Partial<IUser['id']>>) {
            state.id = action.payload;
        },
    },
});

export const { selectUserId } = selectedUserSlice.actions;

export default selectedUserSlice.reducer;