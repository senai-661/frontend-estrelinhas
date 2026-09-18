import { useState, type JSX } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import AuthRequests from "../../fetch/AuthRequests";

function Navegacao(): JSX.Element {
    const [isAuthenticated] = useState(() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');
        return !!(isAuth && token && AuthRequests.checkTokenExpiry());
    });

    const role = localStorage.getItem('role');
    const isProfessor = role?.toLowerCase() === 'admin';
    const navigate = useNavigate();
    const nome = localStorage.getItem('nome') || 'Usuário';
    const email = localStorage.getItem('email') || '';
    const foto = localStorage.getItem('foto') || null;

    return (
        <header style={{
            backgroundColor: '#F97316',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            fontFamily: "'Segoe UI', sans-serif"
        }}>
            {/* Logo */}
            <span style={{ color: 'white', fontWeight: '800', fontSize: '1.5rem', fontStyle: 'italic', letterSpacing: '-0.5px' }}>
                GymPro
            </span>

            {/* Nav Links */}
            <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <a href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Home</a>

                {isAuthenticated && isProfessor && (
                    <>
                        <a href="/lista/alunos" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Alunos</a>
                        <a href="/lista/matriculas" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Matrículas</a>
                        <a href="/lista/planos" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Planos</a>
                    </>
                )}
            </nav>

            {/* Usuário / Botões */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {isAuthenticated ? (
                    <>
                        {/* Nome e email */}
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ color: 'white', fontWeight: '600', fontSize: '0.95rem' }}>{nome}</div>
                            {email && (
                                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.75rem' }}>{email}</div>
                            )}
                        </div>

                        {/* Foto de perfil */}
                        {foto ? (
                            <img
                                src={foto}
                                alt="Perfil"
                                style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid white' }}
                            />
                        ) : (
                            <div style={{
                                width: '38px', height: '38px', borderRadius: '50%',
                                backgroundColor: 'rgba(255,255,255,0.3)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'white', fontWeight: '700', fontSize: '1rem',
                                border: '2px solid white'
                            }}>
                                {nome.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <button
                            onClick={AuthRequests.removeToken}
                            style={{ backgroundColor: 'white', color: '#F97316', border: 'none', borderRadius: '6px', padding: '8px 20px', fontWeight: '600', cursor: 'pointer' }}
                        >
                            Sair
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => navigate('/login')}
                            style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid white', borderRadius: '6px', padding: '8px 20px', fontWeight: '600', cursor: 'pointer' }}
                        >
                            Entrar
                        </button>
                        <button
                            style={{ backgroundColor: 'white', color: '#F97316', border: 'none', borderRadius: '6px', padding: '8px 20px', fontWeight: '600', cursor: 'pointer' }}
                        >
                            Cadastre-se
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Navegacao;