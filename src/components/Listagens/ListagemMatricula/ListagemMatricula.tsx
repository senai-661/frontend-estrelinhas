import { useState, useEffect, type JSX } from "react";
import MatriculaRequests from "../../../fetch/MatriculaRequests";
import type { MatriculaDTO } from "../../../dto/MatriculaDTO";
import { useNavigate } from "react-router-dom";

function ListagemMatriculas(): JSX.Element {
    const [matriculas, setMatriculas] = useState<MatriculaDTO[]>([]);
    const [busca, setBusca] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const buscarMatriculas = async () => {
            try {
                const lista = await MatriculaRequests.obterListaDeMatriculas();
            
                setMatriculas(Array.isArray(lista) ? lista : []);
            } catch (error) {
                console.error(`Erro ao buscar matrículas. ${error}`);
                alert("Erro ao criar a listagem de matrículas.");
            }
        };
        buscarMatriculas();
    }, []);

    const matriculasFiltradas = matriculas.filter((m) =>
        `${m.cod_matricula} ${m.status_matricula} ${m.forma_pagamento}`
            .toLowerCase()
            .includes(busca.toLowerCase())
    );

    const totalPages = Math.ceil(matriculasFiltradas.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentMatriculas = matriculasFiltradas.slice(indexOfFirstRow, indexOfLastRow);

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

    const formatarData = (data: string | Date) =>
        new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

    return (
        <main style={{ minHeight: '88vh', backgroundColor: '#fff', padding: '40px' }}>

            {/* Cabeçalho */}
            <div style={{ marginBottom: '8px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0 }}>MATRÍCULAS</h1>
                <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '4px' }}>
                    Gerencie as matrículas cadastradas na academia
                </p>
            </div>

            {/* Barra de ações */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', marginTop: '16px' }}>
                <button
                    onClick={() => navigate("/cadastro/matricula")}
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
                    Nova Matrícula
                </button>

                <input
                    type="text"
                    value={busca}
                    onChange={handleBusca}
                    placeholder="Buscar por código, status ou pagamento..."
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
                            <th style={thStyle}>Cód. Matrícula</th>
                            <th style={thStyle}>Vigência</th>
                            <th style={thStyle}>Valor Final</th>
                            <th style={thStyle}>Forma Pgto.</th>
                            <th style={thStyle}>Status</th>
                            <th style={{ ...thStyle, textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentMatriculas.length > 0 ? (
                            currentMatriculas.map((matricula, index) => {
                                const codigoExibicao = indexOfFirstRow + index + 1;

                                return (
                                <tr
                                    key={matricula.cod_matricula ?? index}
                                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fff8f5')}
                                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#fff')}
                                >
                                    <td style={tdStyle}>{codigoExibicao}</td>
                                    <td style={tdStyle}>
                                        {formatarData(matricula.data_inicio)} → {formatarData(matricula.data_fim)}
                                    </td>
                                    <td style={{ ...tdStyle, fontWeight: 700 }}>
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(matricula.valor_final)}
                                    </td>
                                    <td style={tdStyle}>{matricula.forma_pagamento ?? '—'}</td>
                                    <td style={tdStyle}>
                                        <span style={{
                                            backgroundColor: (matricula.status_matricula?.toUpperCase() === 'ATIVA' || matricula.status_matricula?.toUpperCase() === 'ATIVO') ? '#dcfce7' : '#fee2e2',
                                            color: (matricula.status_matricula?.toUpperCase() === 'ATIVA' || matricula.status_matricula?.toUpperCase() === 'ATIVO') ? '#16a34a' : '#ef4444',
                                            padding: '3px 12px',
                                            borderRadius: '999px',
                                            fontSize: '0.78rem',
                                            fontWeight: 600,
                                        }}>
                                            {matricula.status_matricula ?? '—'}
                                        </span>
                                    </td>
                                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                            <button
                                                onClick={() => navigate(`/detalhes/matricula/${matricula.cod_matricula}`)}
                                                style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #bfdbfe', backgroundColor: '#eff6ff', color: '#3b82f6', fontSize: '0.8rem', cursor: 'pointer' }}
                                            >
                                                Detalhes
                                            </button>
                                            <button
                                                onClick={() => navigate(`/atualizar/matricula/${matricula.cod_matricula}`)}
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
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                                    Nenhuma matrícula encontrada
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
                        {matriculasFiltradas.length > 0
                            ? `${indexOfFirstRow + 1}–${Math.min(indexOfLastRow, matriculasFiltradas.length)}`
                            : 0}
                    </strong>{' '}
                    de <strong>{matriculasFiltradas.length}</strong> resultados
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

export default ListagemMatriculas;