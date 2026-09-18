/**
 * Classe para lidar com autenticação
 */
class AuthRequests {

    private serverUrl: string;
    private endpointLogin: string;
    
    /**
     * Construtor das rotas e do endereço do servidor
     */
    constructor() {
        // endereço do servidor
        this.serverUrl = 'http://localhost:3333';
        // rota do servidor
        this.endpointLogin = '/api/login';
    }

    /**
     * Realiza a autenticação no servidor
     * @param login - email e senha
     * @returns true caso sucesso, false caso erro
     */
   async login(login: { email: string, senha: string }) {       
    try {
        const response = await fetch(`${this.serverUrl}${this.endpointLogin}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();

        if (!data.auth) {
            throw new Error(data.message || 'Email ou senha incorretos');
        }

        console.log('Dados do usuário:', data.usuario); 
                                                                            
        this.persistToken(data.token, data.usuario, data.auth);

        return data.auth;

    } catch (error) {
        console.error('Erro: ', error);
        throw error;
    }
}

    /**
     * Persiste o token no localStorage
     */
    persistToken(
        token: string, 
        usuario: any, 
        isAuth: boolean
    ) {
        localStorage.setItem('token', token);
        localStorage.setItem('nome', usuario.nome);

        // suporta id_usuario ou id_aluno
        const id = usuario.id_usuario || usuario.id_aluno;
        localStorage.setItem('idUsuario', id ? id.toString() : '');

        localStorage.setItem('email', usuario.email);

        // fallback caso não tenha role
        localStorage.setItem('role', usuario.role || 'aluno');

        localStorage.setItem('isAuth', isAuth.toString());
    }

    /**
     * Remove as informações do localStorage
     */
    removeToken() {
        const keys = [
            'token',
            'nome',
            'idUsuario',
            'email',
            'role',
            'isAuth'
        ];

        keys.forEach(key => localStorage.removeItem(key));

        window.location.href = `/login`;
    }

    /**
     * Verifica a validade do token
     * @returns true caso token válido, false caso token inválido
     */
    checkTokenExpiry() {
        const token = localStorage.getItem('token');
        
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const expiry = payload.exp;
                const now = Math.floor(Date.now() / 1000);

                if (expiry < now) {
                    this.removeToken();
                    return false;
                }

                return true;
            } catch (error) {
                console.error('Token inválido');
                this.removeToken();
                return false;
            }
        }

        return false;
    }
}

export default new AuthRequests();