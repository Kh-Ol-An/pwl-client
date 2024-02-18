import { AxiosResponse } from 'axios';
import api from '../../utils/api';
import { IUser } from '../../models/IUser';

const getUsers = async (): Promise<AxiosResponse<IUser>> => {
    return api.post('/users');
}

const usersApi = {
    getUsers,
};

export default usersApi;
