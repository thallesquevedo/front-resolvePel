import { emailIsUsed, phoneIsUsed } from '~/services/auth';
import client from '~/services/client';

jest.mock('~/services/client', () => ({
  post: jest.fn(),
}));

describe('authServices', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('checks if phone is used', async () => {
    const mockResponse = { data: { isUsed: true } };
    (client.post as jest.Mock).mockResolvedValue(mockResponse);

    const body = { phone: '1234567890' };
    const response = await phoneIsUsed(body);

    expect(response).toBe(mockResponse);
    expect(client.post).toHaveBeenCalledWith('/user/check-phone-register', body);
  });

  it('checks if email is used', async () => {
    const mockResponse = { data: { isUsed: true } };
    (client.post as jest.Mock).mockResolvedValue(mockResponse);

    const body = { email: 'test@example.com' };
    const response = await emailIsUsed(body);

    expect(response).toBe(mockResponse);
    expect(client.post).toHaveBeenCalledWith('/user/check-email-register', body);
  });

  it('handles error for phoneIsUsed', async () => {
    const mockError = new Error('Phone check failed');
    (client.post as jest.Mock).mockRejectedValue(mockError);

    const body = { phone: '1234567890' };
    await expect(phoneIsUsed(body)).rejects.toThrow('Phone check failed');
    expect(client.post).toHaveBeenCalledWith('/user/check-phone-register', body);
  });

  it('handles error for emailIsUsed', async () => {
    const mockError = new Error('Email check failed');
    (client.post as jest.Mock).mockRejectedValue(mockError);

    const body = { email: 'test@example.com' };
    await expect(emailIsUsed(body)).rejects.toThrow('Email check failed');
    expect(client.post).toHaveBeenCalledWith('/user/check-email-register', body);
  });
});
