import { TamaguiProvider } from 'tamagui';

import Cadastro from './cadastro';
import config from '~/tamagui.config';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useAuth } from '~/context/auth-context';

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

    //criar cenário com textos de campos obrigatórios
    // --------------nome, cpf, email, telefone, senha, repetir senha
    //criar cenário que valida cadastro com sucesso
    //criar cenário cpf menor que 11 caracteres e sua respectiva mensagem
    //criar cenário com email inválido e sua respectiva mensagem
    //criar cenário com telefone inválido e sua respectiva mensagem
    //criar cenário com senha menor que 8 caracteres e sua respectiva mensagem
    //criar cenário de senha e repetir senha diferentes e sua respectiva mensagem
    //criar cenário que cadastra e vai apra login

    //esse teste que não reconhece a mensagem de erro do yup
          //existe um nos mesmo moldes no inde.test.tsx
    it('must show mandatory field message' , async () => {
  
        const { getByPlaceholderText, findByText } = render(mockCadastro);
      
        const campoNome = getByPlaceholderText('Ex: João das Neves');
        const campoCPF = getByPlaceholderText('Ex: 000.000.000-00');
        
        fireEvent.changeText(campoNome, ' ');
        fireEvent.press(campoCPF);

        const mensagemErro = await findByText('Nome é obrigatório');
        expect(mensagemErro).toBeTruthy();
    });
});