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
        // usa rota relativa para funcionar via proxy do Vite em desenvolvimento
        this.serverUrl = '';
        this.endpointLogin = '/api/login';
    }

    /**
     * Realiza a autenticação no servidor
     * @param login - email e senha
     * @returns true caso sucesso, false caso erro
     */
    async login(login: { email: string, senha: string }) {
        try {
            const url = `${this.serverUrl}${this.endpointLogin}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || 'Erro na autenticação');
            }

            const token = data.token ?? data.accessToken ?? data.jwt ?? '';
            const usuario = data.usuario ?? data.user ?? {};
            const auth = data.auth ?? data.isAuth ?? data.autenticado ?? data.authenticated ?? !!token;

            if (!token || !auth) {
                throw new Error(data.message || 'Email ou senha incorretos');
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
        usuario: any,
        isAuth: boolean
    ) {
        const safeUsuario = usuario ?? {};

        localStorage.setItem('token', token ?? '');
        localStorage.setItem('nome', safeUsuario.nome ?? safeUsuario.name ?? 'Usuário');

        const id = safeUsuario.id_usuario ?? safeUsuario.id_aluno ?? safeUsuario.id ?? safeUsuario.idUser;
        localStorage.setItem('idUsuario', id ? id.toString() : '');

        localStorage.setItem('email', safeUsuario.email ?? '');
        localStorage.setItem('role', safeUsuario.role ?? 'aluno');
        localStorage.setItem('isAuth', String(isAuth));
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
                const parts = token.split('.');
                if (parts.length < 2) {
                    throw new Error('Token sem payload');
                }

                const payload = JSON.parse(atob(parts[1]));
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