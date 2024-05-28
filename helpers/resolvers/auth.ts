import { emailIsUsed, phoneIsUsed } from '~/services/auth';

export async function checkPhoneRegister(val: any) {
  console.log(val);
  if (val.length !== 11) {
    return false;
  }
  try {
    await phoneIsUsed({ phone: val });
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
}

export async function checkEmailRegister(val: any) {
  try {
    await emailIsUsed({ email: val });
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log(error);
    return false;
  }
}
