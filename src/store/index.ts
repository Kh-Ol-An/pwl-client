import { configureStore } from '@reduxjs/toolkit';
import myUserSliceReducer from './my-user/slice';
import usersSliceReducer from './users/slice';

const store = configureStore({
    reducer: {
        myUser: myUserSliceReducer,
        users: usersSliceReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
