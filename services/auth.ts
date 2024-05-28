import axios from 'axios';

export const phoneIsUsed = async (body: any) => {
  try {
    return await axios.post('http://172.25.128.1:3000/user/check-phone-register', body);
  } catch (error) {
    throw error;
  }
};

export const emailIsUsed = async (body: any) => {
  try {
    return await axios.post('http://172.25.128.1:3000/user/check-email-register', body);
  } catch (error) {
    throw error;
  }
};
