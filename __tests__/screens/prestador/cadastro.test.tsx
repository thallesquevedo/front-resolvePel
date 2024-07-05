import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { router } from 'expo-router';
import { TamaguiProvider } from 'tamagui';

import Cadastro from '~/app/prestador/cadastro';
import config from '~/tamagui.config';

describe('Cadastro', () => {
  const mockCadastro = (
    <TamaguiProvider config={config}>
      <Cadastro />
    </TamaguiProvider>
  );

  it('should render the Cadastro screen', () => {
    const { getByText } = render(mockCadastro);
    expect(getByText('Criar conta')).toBeTruthy();
    expect(getByText('Informe os dados solicitados para criar a sua conta')).toBeTruthy();
  });

  it('should show the expected fields on the Cadastro screen', () => {
    const { getByText } = render(mockCadastro);
    expect(getByText('Nome completo')).toBeTruthy();
    expect(getByText('CPF')).toBeTruthy();
    expect(getByText('E-mail')).toBeTruthy();
    expect(getByText('Telefone')).toBeTruthy();
    expect(getByText('Senha')).toBeTruthy();
    expect(getByText('Repetir Senha')).toBeTruthy();
    expect(getByText('Finalizar cadastro')).toBeTruthy();
  });

  jest.mock('~/context/auth-context', () => ({
    useAuth: jest.fn(),
  }));

  jest.mock('expo-router', () => ({
    router: {
      replace: jest.fn(),
      navigate: jest.fn(),
    },
  }));

  jest.mock('react-native-toast-message', () => ({
    show: jest.fn(),
  }));

  it('must show a mandatory field message when trying to finish without filling in the name field', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(mockCadastro);

    const campoNome = getByPlaceholderText('Ex: João das Neves');
    const buttonFinalizaCadastro = getByText('Finalizar cadastro');

    expect(queryByText('Nome é obrigatório')).toBeNull();

    fireEvent.press(campoNome);
    fireEvent.press(buttonFinalizaCadastro);

    await waitFor(() => {
      expect(getByText('Nome é obrigatório')).toBeTruthy();
    });

    expect(getByText('Nome é obrigatório')).not.toBeNull();
  });

  it('must show a mandatory field message when trying to finish without filling in the CPF field', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(mockCadastro);

    const campoCPF = getByPlaceholderText('Ex: 000.000.000-00');
    const buttonFinalizaCadastro = getByText('Finalizar cadastro');

    expect(queryByText('CPF é obrigatório')).toBeNull();

    fireEvent.press(campoCPF);
    fireEvent.press(buttonFinalizaCadastro);

    await waitFor(() => {
      expect(getByText('CPF é obrigatório')).toBeTruthy();
    });

    expect(getByText('CPF é obrigatório')).not.toBeNull();
  });

  it('must show a mandatory field message when trying to finish without filling in the phone number field', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(mockCadastro);

    const campoPhone = getByPlaceholderText('Ex: (DDD) 9 9999.9999');
    const buttonFinalizaCadastro = getByText('Finalizar cadastro');

    expect(queryByText('Telefone é obrigatório')).toBeNull();

    fireEvent.press(campoPhone);
    fireEvent.press(buttonFinalizaCadastro);

    await waitFor(() => {
      expect(getByText('Telefone é obrigatório')).toBeTruthy();
    });

    expect(getByText('Telefone é obrigatório')).not.toBeNull();
  });

  it('must show a mandatory field message when trying to finish without filling in the senha field', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(mockCadastro);

    const campoSenha = getByPlaceholderText('Informe sua senha');
    const buttonFinalizaCadastro = getByText('Finalizar cadastro');

    expect(queryByText('Senha é obrigatório')).toBeNull();

    fireEvent.press(campoSenha);
    fireEvent.press(buttonFinalizaCadastro);

    await waitFor(() => {
      expect(getByText('Senha é obrigatório')).toBeTruthy();
    });

    expect(getByText('Senha é obrigatório')).not.toBeNull();
  });

  it('must show a mandatory field message when trying to finish without filling in the repeat senha field', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(mockCadastro);

    const campoRepeatSenha = getByPlaceholderText('Repita sua senha');
    const buttonFinalizaCadastro = getByText('Finalizar cadastro');

    expect(queryByText('Campo obrigatório')).toBeNull();

    fireEvent.press(campoRepeatSenha);
    fireEvent.press(buttonFinalizaCadastro);

    await waitFor(() => {
      expect(getByText('Campo obrigatório')).toBeTruthy();
    });

    expect(getByText('Campo obrigatório')).not.toBeNull();
  });

  it('must show a message when the password and repeat password fields are different', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(mockCadastro);

    const campoSenha = getByPlaceholderText('Informe sua senha');
    const campoRepeatSenha = getByPlaceholderText('Repita sua senha');
    const buttonFinalizaCadastro = getByText('Finalizar cadastro');

    fireEvent.changeText(campoSenha, '12345678');
    fireEvent.changeText(campoRepeatSenha, '87654321');

    expect(queryByText('Senhas não conferem')).toBeNull();

    fireEvent.press(buttonFinalizaCadastro);

    await waitFor(() => {
      expect(getByText('Senhas não conferem')).toBeTruthy();
    });

    expect(getByText('Senhas não conferem')).not.toBeNull();
  });

  it('must show a message when the CPF field has less than 11 characters', async () => {
    const { getByPlaceholderText, getByText } = render(mockCadastro);

    const campoCPF = getByPlaceholderText('Ex: 000.000.000-00');
    const buttonFinalizaCadastro = getByText('Finalizar cadastro');

    fireEvent.changeText(campoCPF, '1234567890');

    fireEvent.press(buttonFinalizaCadastro);

    await waitFor(() => {
      expect(getByText('CPF Inválido')).toBeTruthy();
    });

    expect(getByText('CPF Inválido')).not.toBeNull();
  });

  it('must show a message when the email field is invalid', async () => {
    const { getByPlaceholderText, getByText } = render(mockCadastro);

    const campoEmail = getByPlaceholderText('Ex: joao@email.com');
    const buttonFinalizaCadastro = getByText('Finalizar cadastro');

    fireEvent.changeText(campoEmail, 'joaoemail.com');

    fireEvent.press(buttonFinalizaCadastro);

    await waitFor(() => {
      expect(getByText('Email inválido')).toBeTruthy();
    });

    expect(getByText('Email inválido')).not.toBeNull();
  });
});
