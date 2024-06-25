import client from './client';

export const phoneIsUsed = async (body: any) => {
  try {
    return await client.post('/user/check-phone-register', body);
  } catch (error) {
    throw error;
  }
};

export const emailIsUsed = async (body: any) => {
  try {
    return await client.post('/user/check-email-register', body);
  } catch (error) {
    throw error;
  }
};
