import { http } from './index';

export const login = async (data:any): Promise<{ message: string; data: any }> => {
    return await http.post('/api/login',data);
  };