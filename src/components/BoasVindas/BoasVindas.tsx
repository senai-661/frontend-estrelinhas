import { type JSX } from "react";
import { useNavigate } from "react-router-dom";

function BoasVindas(): JSX.Element {
    const navigate = useNavigate();

    return (
        <main style={{
            minHeight: '88vh',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '40px 20px'
        }}>
            <div>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '16px', color: '#111' }}>
                    TRANSFORME SEU <span style={{ color: '#f97316' }}>CORPO</span> E <span style={{ color: '#f97316' }}>MENTE</span>
                </h1>
                <p style={{ fontSize: '1rem', color: '#555', maxWidth: '500px', margin: '0 auto 32px', lineHeight: 1.7 }}>
                    A melhor academia da cidade está esperando por você.
                    Equipamentos de última geração, professores qualificados e um ambiente motivador.
                </p>
                <button
                    onClick={() => navigate('/login')}
                    style={{
                        backgroundColor: '#f97316',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '14px 36px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    Comece agora
                </button>
            </div>
        </main>
    );
}

export default BoasVindas;