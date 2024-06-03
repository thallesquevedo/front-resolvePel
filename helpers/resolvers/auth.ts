import { emailIsUsed, phoneIsUsed } from '~/services/auth';

export async function checkPhoneRegister(val: any) {
  if (val.length !== 11) {
    return false;
  }
  try {
    await phoneIsUsed({ phone: '+55' + val });
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
    return false;
  }
}
