import { configureStore } from '@reduxjs/toolkit';
import myUserSliceReducer from '@/store/my-user/slice';
import usersSliceReducer from '@/store/users/slice';
import wishesSliceReducer from '@/store/wishes/slice';
import selectedUserSliceReducer from '@/store/selected-user/slice';

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
