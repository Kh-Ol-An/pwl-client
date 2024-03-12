import { configureStore } from '@reduxjs/toolkit';
import myUserSliceReducer from './my-user/slice';
import usersSliceReducer from './users/slice';
import wishesSliceReducer from './wishes/slice';
import selectedUserSliceReducer from './selected-user/slice';

const store = configureStore({
    reducer: {
        myUser: myUserSliceReducer,
        users: usersSliceReducer,
        wishes: wishesSliceReducer,
        selectedUser: selectedUserSliceReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
