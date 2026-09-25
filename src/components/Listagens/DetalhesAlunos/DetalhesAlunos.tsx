import { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import AlunoRequests from "../../../fetch/AlunoRequests";
import type {AlunoDTO} from "../../../dto/AlunoDTO";

interface DetalhesAlunoProps {
    id_aluno: number;
}

function DetalhesAluno({ id_aluno }: DetalhesAlunoProps): JSX.Element {
    const [aluno, setAluno] = useState<AlunoDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id_aluno || isNaN(id_aluno)) {
            setError("ID do aluno inválido.");
            setLoading(false);
            return;
        }

        async function buscarDados() {
            setLoading(true);
            setError(null);
            try {
                const dados = await AlunoRequests.obterAlunoPorId(id_aluno);
                if (dados) {
                    setAluno(dados);
                } else {
                    setError("Aluno não encontrado.");
                }
            } catch (err) {
                console.error("Erro ao carregar detalhes do aluno:", err);
                setError("Ocorreu um erro ao buscar as informações do aluno.");
            } finally {
                setLoading(false);
            }
        }

        buscarDados();
    }, [id_aluno]);

    if (loading) {
        return (
            <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 16px" }}>
                <div style={{ width: "100%", maxWidth: "900px" }}>
                    <div style={{ display: "flex", gap: "24px" }}>
                        <div style={{ width: "256px", backgroundColor: "#ffffff", borderRadius: "16px", height: "320px", flexShrink: 0 }} />
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
                            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", height: "176px" }} />
                            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", height: "176px" }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !aluno) {
        return (
            <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
                <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "40px", maxWidth: "400px", width: "100%", textAlign: "center" }}>
                    <h2 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#000000", marginBottom: "8px" }}>Erro ao carregar aluno</h2>
                    <p style={{ fontSize: "0.875rem", color: "#999999", marginBottom: "24px" }}>{error || "Erro desconhecido."}</p>
                    <button
                        onClick={() => navigate("/lista/alunos")}
                        style={{ padding: "10px 24px", backgroundColor: "#ff7300", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", fontSize: "0.875rem" }}
                    >
                        Voltar para a lista
                    </button>
                </div>
            </div>
        );
    }

    const formatarData = (data: Date | string | undefined) => {
        if (!data) return "Não informado";
        try {
            const d = new Date(data);
            if (isNaN(d.getTime())) return "Não informado";
            return d.toLocaleDateString("pt-BR");
        } catch {
            return "Não informado";
        }
    };

    const iniciais = `${aluno.nome?.charAt(0) ?? ""}${aluno.sobrenome?.charAt(0) ?? ""}`.toUpperCase();

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "32px 16px" }}>
            <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto" }}>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", marginBottom: "24px" }}>
                    <button
                        onClick={() => navigate("/lista/alunos")}
                        style={{ color: "#ff7300", fontWeight: "600", background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem" }}
                    >
                        Alunos
                    </button>
                    <span style={{ color: "#999999" }}>/</span>
                    <span style={{ color: "#666666", fontWeight: "500" }}>{aluno.nome} {aluno.sobrenome}</span>
                </div>

                <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>

                    {/* Coluna esquerda */}
                    <div style={{ width: "256px", flexShrink: 0, backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #f0f0f0", padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                        <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#ff7300", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontSize: "1.5rem", fontWeight: "bold" }}>
                            {iniciais}
                        </div>

                        <div style={{ textAlign: "center" }}>
                            <h2 style={{ fontSize: "1rem", fontWeight: "bold", color: "#000000", margin: 0 }}>{aluno.nome} {aluno.sobrenome}</h2>
                        </div>

                        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "999px", fontSize: "0.75rem", fontWeight: "600", backgroundColor: aluno.statusAluno === "ATIVO" ? "#f0fdf4" : "#fef2f2", color: aluno.statusAluno === "ATIVO" ? "#15803d" : "#b91c1c" }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: aluno.statusAluno === "ATIVO" ? "#22c55e" : "#ef4444" }} />
                            {aluno.statusAluno === "ATIVO" ? "Ativo" : "Inativo"}
                        </span>

                        <div style={{ width: "100%", borderTop: "1px solid #f0f0f0", marginTop: "8px" }} />

                        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px" }}>
                            <button
                                onClick={() => navigate(`/atualizar/aluno/${aluno.idAluno}`)}
                                style={{ width: "100%", backgroundColor: "#ff7300", color: "#ffffff", border: "none", borderRadius: "10px", padding: "10px", fontWeight: "bold", cursor: "pointer", fontSize: "0.875rem" }}
                            >
                                Editar Aluno
                            </button>
                            <button
                                onClick={() => navigate("/lista/alunos")}
                                style={{ width: "100%", backgroundColor: "#ffffff", color: "#000000", border: "1px solid #e0e0e0", borderRadius: "10px", padding: "10px", fontWeight: "bold", cursor: "pointer", fontSize: "0.875rem" }}
                            >
                                Voltar
                            </button>
                        </div>
                    </div>

                    {/* Coluna direita */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px", minWidth: "280px" }}>

                        {/* Dados Cadastrais */}
                        <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #f0f0f0", padding: "24px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                                <div style={{ width: "28px", height: "28px", borderRadius: "8px", backgroundColor: "#ff7300", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <i className="pi pi-id-card" style={{ color: "#ffffff", fontSize: "0.75rem" }} />
                                </div>
                                <h3 style={{ fontSize: "0.875rem", fontWeight: "bold", color: "#000000", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Dados Cadastrais</h3>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                <Campo label="ID do Sistema" valor={String(aluno.idAluno ?? "—")} icone="pi-hashtag" />
                                <Campo label="Data de Nascimento" valor={formatarData(aluno.dataNascimento)} icone="pi-calendar" />
                            </div>
                        </div>

                        {/* Plano Atual */}
                        <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #f0f0f0", padding: "24px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                                <div style={{ width: "28px", height: "28px", borderRadius: "8px", backgroundColor: "#ff7300", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <i className="pi pi-credit-card" style={{ color: "#ffffff", fontSize: "0.75rem" }} />
                                </div>
                                <h3 style={{ fontSize: "0.875rem", fontWeight: "bold", color: "#000000", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Plano Atual</h3>
                            </div>

                            {aluno.tipoPlano ? (
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                    <Campo label="Plano" valor={aluno.tipoPlano} icone="pi-tag" />
                                    <Campo label="Código da Matrícula" valor={aluno.codMatricula ?? "—"} icone="pi-hashtag" />
                                    <Campo label="Início" valor={formatarData(aluno.dataInicio)} icone="pi-calendar" />
                                    <Campo label="Vencimento" valor={formatarData(aluno.dataFim)} icone="pi-calendar-times" />
                                    <Campo label="Valor" valor={aluno.valorFinal ? `R$ ${Number(aluno.valorFinal).toFixed(2)}` : "—"} icone="pi-dollar" />
                                    <Campo label="Forma de Pagamento" valor={aluno.formaPagamento ?? "—"} icone="pi-wallet" />
                                </div>
                            ) : (
                                <div style={{ padding: "16px", borderRadius: "10px", backgroundColor: "#f9f9f9", textAlign: "center" }}>
                                    <span style={{ fontSize: "0.875rem", color: "#999999" }}>Nenhum plano ativo no momento.</span>
                                </div>
                            )}
                        </div>

                        {/* Contato e Localização */}
                        <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #f0f0f0", padding: "24px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                                <div style={{ width: "28px", height: "28px", borderRadius: "8px", backgroundColor: "#ff7300", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <i className="pi pi-map-marker" style={{ color: "#ffffff", fontSize: "0.75rem" }} />
                                </div>
                                <h3 style={{ fontSize: "0.875rem", fontWeight: "bold", color: "#000000", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Contato e Localização</h3>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                <Campo label="E-mail" valor={aluno.email ?? "Não informado"} icone="pi-envelope" />
                                <Campo label="Celular / Telefone" valor={aluno.celular ?? "Não informado"} icone="pi-phone" />
                                <div style={{ gridColumn: "1 / -1" }}>
                                    <Campo label="Endereço Residencial" valor={aluno.endereco ?? "Não informado"} icone="pi-home" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

interface CampoProps {
    label: string;
    valor: string;
    icone: string;
}

function Campo({ label, valor, icone }: CampoProps) {
    return (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "12px", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#ffffff", border: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <i className={`pi ${icone}`} style={{ color: "#ff7300", fontSize: "0.875rem" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.7rem", color: "#999999", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
                <span style={{ fontSize: "0.875rem", fontWeight: "600", color: "#000000", marginTop: "2px" }}>{valor}</span>
            </div>
        </div>
    );
}

export default DetalhesAluno;