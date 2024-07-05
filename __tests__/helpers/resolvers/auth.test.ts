import { checkEmailRegister, checkPhoneRegister } from '~/helpers/resolvers/auth';
import { phoneIsUsed, emailIsUsed } from '~/services/auth';

jest.mock('~/services/auth', () => ({
  phoneIsUsed: jest.fn(),
  emailIsUsed: jest.fn(),
}));

describe('Auth Check Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('checkPhoneRegister', () => {
    it('returns false if phone number length is not 11', async () => {
      const result = await checkPhoneRegister('123456789');
      expect(result).toBe(false);
    });

    it('returns true if phoneIsUsed resolves', async () => {
      (phoneIsUsed as jest.Mock).mockResolvedValue({ data: true });

      const result = await checkPhoneRegister('12345678901');
      expect(phoneIsUsed).toHaveBeenCalledWith({ phone: '+5512345678901' });
      expect(result).toBe(true);
    });

    it('returns false if phoneIsUsed rejects', async () => {
      (phoneIsUsed as jest.Mock).mockRejectedValue(new Error('Phone not registered'));

      const result = await checkPhoneRegister('12345678901');
      expect(phoneIsUsed).toHaveBeenCalledWith({ phone: '+5512345678901' });
      expect(result).toBe(false);
    });
  });

  describe('checkEmailRegister', () => {
    it('returns true if emailIsUsed resolves', async () => {
      (emailIsUsed as jest.Mock).mockResolvedValue({ data: true });

      const result = await checkEmailRegister('test@example.com');
      expect(emailIsUsed).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(result).toBe(true);
    });

    it('returns false if emailIsUsed rejects', async () => {
      (emailIsUsed as jest.Mock).mockRejectedValue(new Error('Email not registered'));

      const result = await checkEmailRegister('test@example.com');
      expect(emailIsUsed).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(result).toBe(false);
    });
  });
});
