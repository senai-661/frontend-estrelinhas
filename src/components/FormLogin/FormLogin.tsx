import { type JSX, useState } from 'react';
import estilo from './FormLogin.module.css';
import AuthRequests from '../../fetch/AuthRequests';

function LoginForm(): JSX.Element {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errorMensagem, setErrorMensagem] = useState<string | null>(null);

    interface LoginData {
        email: string;
        senha: string;
    }

    interface FormEvent {
        preventDefault: () => void;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMensagem(null);

        const login: LoginData = { email: email.trim(), senha: senha.trim() };

        if (!login.email || !login.senha) {
            setErrorMensagem('Informe e-mail e senha para continuar.');
            return;
        }

        try {
            if (await AuthRequests.login(login)) {
                window.location.href = '/';
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro ao fazer login.';
            console.error(`Erro ao tentar fazer login: ${message}`);
            setErrorMensagem(message || 'Erro ao fazer login, verifique se usuário e/ou senha estão corretos.');
        }
    };

    return (
        
        <section className={estilo['login-form-container']}>

           
            <form action="POST" className={estilo['login-form']} onSubmit={handleSubmit}>

               
                <h2 className={estilo['login-header']}>LOGIN</h2>

               
                <div className={estilo['form-group']}>
                    <label>
                        E-mail
                        <input
                            type="email" 
                            placeholder='Informe o seu email' 
                            className={estilo['input-email-login']} 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}  
                            required 
                        />
                    </label>
                </div>

              
                <div className={estilo['form-group']}>
                    <label>
                        Senha
                        <input
                            type="password" 
                            placeholder='Informe sua senha' 
                            className={estilo['input-password-login']} 
                            value={senha}  
                            onChange={(e) => setSenha(e.target.value)} 
                            required  
                        />
                    </label>
                </div>

                
                {errorMensagem && (
                    <p
                        role="alert"
                        style={{
                            marginTop: '1rem',
                            color: '#d93025',
                            fontSize: '0.9rem',
                            minHeight: '1.2rem',
                            textAlign: 'center'
                        }}
                    >
                        {errorMensagem}
                    </p>
                )}

                <input
                    type="submit" 
                    value="Entrar" 
                    className={estilo['login-button']} 
                />
            </form>
        </section>
    );
}


export default LoginForm;