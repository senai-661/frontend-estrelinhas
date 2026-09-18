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

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.message || data.error || `Erro do servidor (${response.status})`);
        }

        const auth = data.auth ?? data.autenticado ?? data.success ?? false;
        const token = data.token ?? data.accessToken ?? '';
        const usuario = data.usuario ?? data.user ?? data.usuarioLogado ?? {
            nome: data.nome,
            email: data.email,
            id_usuario: data.id_usuario ?? data.idUsuario ?? data.id,
            id_aluno: data.id_aluno ?? data.idAluno,
            role: data.role,
        };

        if (!auth) {
            throw new Error(data.message || data.error || 'Email ou senha incorretos');
        }

        if (!token) {
            throw new Error('Resposta do servidor sem token de autenticação.');
        }

        console.log('Dados do usuário:', usuario);

        this.persistToken(token, usuario, auth);

        return auth;

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
        usuario: Record<string, any> | null,
        isAuth: boolean
    ) {
        localStorage.setItem('token', token);

        const safeUsuario = usuario ?? {};
        const nome = safeUsuario.nome ?? localStorage.getItem('nome') ?? '';
        const email = safeUsuario.email ?? localStorage.getItem('email') ?? '';
        const id = safeUsuario.id_usuario ?? safeUsuario.id_aluno ?? localStorage.getItem('idUsuario') ?? '';
        const role = safeUsuario.role ?? localStorage.getItem('role') ?? 'aluno';

        localStorage.setItem('nome', nome);
        localStorage.setItem('idUsuario', id ? id.toString() : '');
        localStorage.setItem('email', email);
        localStorage.setItem('role', role);
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