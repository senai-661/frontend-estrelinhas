import { type JSX } from "react";
import { useState, useEffect } from "react";
import PlanoRequests from "../../../fetch/PlanoRequests";
import type { PlanoDTO } from "../../../dto/PlanoDTO";
import { useNavigate } from "react-router-dom";

function ListagemPlanos(): JSX.Element {
    const [planos, setPlanos] = useState<PlanoDTO[]>([]);
    const [busca, setBusca] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const buscarPlanos = async () => {
            try {
                const listaDePlanos = await PlanoRequests.obterListaDePlanos();

                console.log(listaDePlanos[0]);
                setPlanos(listaDePlanos);
            } catch (error) {
                console.error(`Erro ao buscar planos. ${error}`);
                alert("Erro ao criar a listagem de planos.");
            }
        };
        buscarPlanos();
    }, []);

    const planosFiltrados = planos.filter((p) =>
        `${p.cod_plano ?? ''} ${p.tipo_plano ?? ''} ${p.status_plano ?? ''}`
            .toLowerCase()
            .includes(busca.toLowerCase())
    );

    const totalPages = Math.ceil(planosFiltrados.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentPlanos = planosFiltrados.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleBusca = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBusca(e.target.value);
        setCurrentPage(1);
    };


    const thStyle = {
        padding: '12px 16px',
        textAlign: 'left' as const,
        fontSize: '0.78rem',
        color: '#888',
        fontWeight: 600,
        textTransform: 'uppercase' as const,
        backgroundColor: '#fafafa',
    };

    const tdStyle = {
        padding: '14px 16px',
        borderBottom: '1px solid #f0f0f0',
        fontSize: '0.9rem',
        color: '#333',
    };

    return (
        <main style={{ minHeight: '88vh', backgroundColor: '#fff', padding: '40px' }}>

            {/* Cabeçalho */}
            <div style={{ marginBottom: '8px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0 }}>PLANOS</h1>
                <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '4px' }}>
                    Gerencie os planos cadastrados na academia
                </p>
            </div>

            {/* Barra de ações */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', marginTop: '16px' }}>
                <button
                    onClick={() => navigate("/cadastro/plano")}
                    style={{
                        backgroundColor: '#f97316',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                    }}
                >
                    Novo Plano
                </button>

                <input
                    type="text"
                    value={busca}
                    onChange={handleBusca}
                    placeholder="Buscar por código, tipo ou status..."
                    style={{
                        padding: '10px 16px',
                        borderRadius: '999px',
                        border: '1px solid #e0e0e0',
                        fontSize: '0.9rem',
                        width: '280px',
                        outline: 'none',
                    }}
                />
            </div>

            {/* Tabela */}
            <div style={{ border: '1px solid #f0f0f0', borderRadius: '12px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Cód. Plano</th>
                            <th style={thStyle}>Tipo</th>
                            <th style={thStyle}>Duração (dias)</th>
                            <th style={thStyle}>Valor</th>
                            <th style={thStyle}>Status</th>
                            <th style={{ ...thStyle, textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPlanos.length > 0 ? (
                            currentPlanos.map((plano, index) => (
                                <tr
                                    key={plano.cod_plano ?? index}
                                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fff8f5')}
                                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#fff')}
                                >
                                    <td style={tdStyle}>{plano.cod_plano ?? '—'}</td>
                                    <td style={{ ...tdStyle, fontWeight: 500 }}>{plano.tipo_plano}</td>
                                    <td style={tdStyle}>{plano.duracao_dias} dias</td>
                                    <td style={{ ...tdStyle, fontWeight: 700 }}>
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(plano.valor)}
                                    </td>
                                    <td style={tdStyle}>
                                        <span style={{
                                            backgroundColor: plano.status_plano?.toUpperCase() === 'ATIVO' ? '#dcfce7' : '#fee2e2',
                                            color: plano.status_plano?.toUpperCase() === 'ATIVO' ? '#16a34a' : '#ef4444',
                                            padding: '3px 12px',
                                            borderRadius: '999px',
                                            fontSize: '0.78rem',
                                            fontWeight: 600,
                                        }}>
                                            {plano.status_plano ?? '—'}
                                        </span>
                                    </td>
                                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                            <button
                                                onClick={() => navigate(`/detalhes/plano/${plano.cod_plano}`)}
                                                style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #bfdbfe', backgroundColor: '#eff6ff', color: '#3b82f6', fontSize: '0.8rem', cursor: 'pointer' }}
                                            >
                                                Detalhes
                                            </button>
                                            <button
                                                onClick={() => navigate(`/atualizar/plano/${plano.cod_plano}`)}
                                                style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #bbf7d0', backgroundColor: '#f0fdf4', color: '#16a34a', fontSize: '0.8rem', cursor: 'pointer' }}
                                            >
                                                Atualizar
                                            </button>
                                            <button
                                                style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #fecaca', backgroundColor: '#fff1f2', color: '#ef4444', fontSize: '0.8rem', cursor: 'pointer' }}
                                            >
                                                Deletar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                                    Nenhum plano encontrado
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginação */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <p style={{ fontSize: '0.85rem', color: '#666' }}>
                    Mostrando{' '}
                    <strong>
                        {planosFiltrados.length > 0
                            ? `${indexOfFirstRow + 1}–${Math.min(indexOfLastRow, planosFiltrados.length)}`
                            : 0}
                    </strong>{' '}
                    de <strong>{planosFiltrados.length}</strong> resultados
                </p>

                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <button
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e0e0e0', background: '#fff', cursor: 'pointer' }}
                    >
                        {'<'}
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: '1px solid #e0e0e0',
                                background: currentPage === i + 1 ? '#f97316' : '#fff',
                                color: currentPage === i + 1 ? '#fff' : '#333',
                                cursor: 'pointer',
                                fontWeight: currentPage === i + 1 ? 700 : 400,
                            }}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages || totalPages === 0}
                        style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e0e0e0', background: '#fff', cursor: 'pointer' }}
                    >
                        {'>'}
                    </button>
                </div>
            </div>
        </main>
    );
}

export default ListagemPlanos;