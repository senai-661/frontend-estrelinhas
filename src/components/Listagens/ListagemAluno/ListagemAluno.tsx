import { type JSX } from "react";
import { useState, useEffect } from "react";
import AlunoRequests from "../../../fetch/AlunoRequests";
import type {AlunoDTO} from "../../../dto/AlunoDTO";
import { useNavigate } from "react-router-dom";

function ListagemAlunos(): JSX.Element {
    const [alunos, setAlunos] = useState<AlunoDTO[]>([]);
    const [busca, setBusca] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const buscarAlunos = async () => {
            try {
                const listaDeAlunos = await AlunoRequests.obterListaDeAlunos();
                setAlunos(listaDeAlunos);
            } catch (error) {
                console.error(`Erro ao buscar alunos. ${error}`);
                alert("Erro ao criar a listagem de alunos.");
            }
        };
        buscarAlunos();
    }, []);

    const alunosFiltrados = alunos.filter((a) =>
`${a.nome} ${a.sobrenome} ${a.email} ${a.celular} ${a.codAluno}`
            .toLowerCase()
            .includes(busca.toLowerCase())
    );

    const totalPages = Math.ceil(alunosFiltrados.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentAlunos = alunosFiltrados.slice(indexOfFirstRow, indexOfLastRow);

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
                <h1 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0 }}>ALUNOS</h1>
                <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '4px' }}>
                    Gerencie os alunos cadastrados na academia
                </p>
            </div>

            {/* Barra de ações */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', marginTop: '16px' }}>
                <button
                    onClick={() => navigate("/cadastro/aluno")}
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
                    Novo Aluno
                </button>

                <input
                    type="text"
                    value={busca}
                    onChange={handleBusca}
                    placeholder="Buscar por nome, e-mail ou RA..."
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
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>RA</th>
                            <th style={thStyle}>Nome</th>
                            <th style={thStyle}>E-mail</th>
                            <th style={thStyle}>Telefone</th>
                            <th style={thStyle}>Status</th>
                            <th style={{ ...thStyle, textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAlunos.length > 0 ? (
                            currentAlunos.map((aluno, index) => (
                                <tr
                                    key={aluno.idAluno ?? index}
                                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fff8f5')}
                                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#fff')}
                                >
                                    <td style={tdStyle}>#{aluno.idAluno ?? '—'}</td>
                                    <td style={tdStyle}>{aluno.codAluno ?? aluno.idAluno ?? '—'}</td>
                                    <td style={{ ...tdStyle, fontWeight: 500 }}>
                                        {aluno.nome} {aluno.sobrenome}
                                    </td>
                                    <td style={tdStyle}>{aluno.email}</td>
                                    <td style={tdStyle}>{aluno.celular ?? '—'}</td>
                                    <td style={tdStyle}>
                                        <span style={{
                                            backgroundColor: aluno.statusAluno?.toUpperCase() === 'ATIVO' ? '#dcfce7' : '#fee2e2',
                                            color: aluno.statusAluno?.toUpperCase() === 'ATIVO' ? '#16a34a' : '#ef4444',
                                            padding: '3px 12px',
                                            borderRadius: '999px',
                                            fontSize: '0.78rem',
                                            fontWeight: 600,
                                        }}>
                                            {aluno.statusAluno?.toUpperCase() === 'ATIVO' ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </td>
                                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                            <button
                                                onClick={() => {
                                                    if (!aluno.idAluno) {
                                                        alert("ID do aluno não encontrado.");
                                                        return;
                                                    }
                                                    navigate(`/detalhes/aluno/${aluno.idAluno}`);
                                                }}
                                                style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #bfdbfe', backgroundColor: '#eff6ff', color: '#3b82f6', fontSize: '0.8rem', cursor: 'pointer' }}
                                            >
                                                Detalhes
                                            </button>
                                            <button
                                                onClick={() => aluno.idAluno && navigate(`/atualizar/aluno/${aluno.idAluno}`)}
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
                                <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                                    Nenhum aluno encontrado
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
                        {alunosFiltrados.length > 0
                            ? `${indexOfFirstRow + 1}–${Math.min(indexOfLastRow, alunosFiltrados.length)}`
                            : 0}
                    </strong>{' '}
                    de <strong>{alunosFiltrados.length}</strong> resultados
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

export default ListagemAlunos;