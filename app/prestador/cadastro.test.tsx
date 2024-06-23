import { TamaguiProvider } from 'tamagui';

import Cadastro from './cadastro';
import config from '~/tamagui.config';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { useAuth } from '~/context/auth-context';
import { number } from 'yup';
import { router } from 'expo-router';

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
        useAuth: jest.fn(), // Certifique-se de que useAuth é uma função mockada
      }));


    //pedir ajuda para corrigir
    // it('should access the login page by clicking the button', () => {
    //     const { getByText } = render(mockCadastro);
    //     const loginButton = getByText('Clique aqui');
    //     fireEvent.press(loginButton);
    //     expect(router.navigate).toHaveBeenCalledWith('./login');
    // });

    //criar cenário que valida cadastro com sucesso
    //criar cenário cpf menor que 11 caracteres e sua respectiva mensagem
    //criar cenário com email inválido e sua respectiva mensagem
    //criar cenário com telefone inválido e sua respectiva mensagem
    //criar cenário com senha menor que 8 caracteres e sua respectiva mensagem
    //criar cenário de senha e repetir senha diferentes e sua respectiva mensagem
    //criar cenário que cadastra e vai apra login

    it('must show a mandatory field message when trying to finish without filling in the name field' , async () => {
  
        const {getByPlaceholderText, getByText, queryByText} = render(mockCadastro);

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

    it('must show a mandatory field message when trying to finish without filling in the CPF field' , async () => {
  
      const {getByPlaceholderText, getByText, queryByText} = render(mockCadastro);

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

  it('must show a mandatory field message when trying to finish without filling in the phone number field' , async () => {
  
    const {getByPlaceholderText, getByText, queryByText} = render(mockCadastro);

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

  it('must show a mandatory field message when trying to finish without filling in the senha field' , async () => {
  
    const {getByPlaceholderText, getByText, queryByText} = render(mockCadastro);

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

  it('must show a mandatory field message when trying to finish without filling in the repeat senha field' , async () => {
  
    const {getByPlaceholderText, getByText, queryByText} = render(mockCadastro);

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
});