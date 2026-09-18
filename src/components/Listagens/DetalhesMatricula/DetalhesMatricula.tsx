import { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import MatriculaRequests from "../../../fetch/MatriculaRequests";

interface DetalhesMatriculaProps {
    idMatricula: number;
}

function DetalhesMatricula({ idMatricula }: DetalhesMatriculaProps): JSX.Element {
    const [matricula, setMatricula] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!idMatricula || isNaN(idMatricula)) {
            setError("ID da matrícula inválido.");
            setLoading(false);
            return;
        }

        async function buscarDados() {
            setLoading(true);
            setError(null);
            try {
                const dados = await MatriculaRequests.obterMatriculaPorId(idMatricula);
                if (dados) {
                    setMatricula(dados);
                } else {
                    setError("Matrícula não encontrada.");
                }
            } catch (err) {
                console.error("Erro ao carregar detalhes da matrícula:", err);
                setError("Ocorreu um erro ao buscar as informações da matrícula.");
            } finally {
                setLoading(false);
            }
        }

        buscarDados();
    }, [idMatricula]);

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

    if (error || !matricula) {
        return (
            <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
                <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "40px", maxWidth: "400px", width: "100%", textAlign: "center" }}>
                    <h2 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#000000", marginBottom: "8px" }}>Erro ao carregar matrícula</h2>
                    <p style={{ fontSize: "0.875rem", color: "#999999", marginBottom: "24px" }}>{error || "Erro desconhecido."}</p>
                    <button
                        onClick={() => navigate("/lista/matriculas")}
                        style={{ padding: "10px 24px", backgroundColor: "#ff7300", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", fontSize: "0.875rem" }}
                    >
                        Voltar para a lista
                    </button>
                </div>
            </div>
        );
    }

    const formatarData = (data: string | Date) => {
        try {
            const d = new Date(data);
            if (isNaN(d.getTime())) return "Não informado";
            return d.toLocaleDateString("pt-BR", { timeZone: "UTC" });
        } catch {
            return "Não informado";
        }
    };

    const formatarValor = (valor: number) => {
        return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "32px 16px" }}>
            <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto" }}>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", marginBottom: "24px" }}>
                    <button
                        onClick={() => navigate("/lista/matriculas")}
                        style={{ color: "#ff7300", fontWeight: "600", background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem" }}
                    >
                        Matrículas
                    </button>
                    <span style={{ color: "#999999" }}>/</span>
                    <span style={{ color: "#666666", fontWeight: "500" }}>Matrícula #{matricula.cod_matricula}</span>
                </div>

                <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>

                    <div style={{ width: "256px", flexShrink: 0, backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #f0f0f0", padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                        <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#ff7300", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontSize: "1.5rem", fontWeight: "bold" }}>
                            #{matricula.cod_matricula}
                        </div>

                        <div style={{ textAlign: "center" }}>
                            <h2 style={{ fontSize: "1rem", fontWeight: "bold", color: "#000000", margin: 0 }}>Matrícula #{matricula.cod_matricula}</h2>
                        </div>

                        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "999px", fontSize: "0.75rem", fontWeight: "600", backgroundColor: matricula.status_matricula?.toUpperCase() === "ATIVA" ? "#f0fdf4" : "#fef2f2", color: matricula.status_matricula?.toUpperCase() === "ATIVA" ? "#15803d" : "#b91c1c" }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: matricula.status_matricula?.toUpperCase() === "ATIVA" ? "#22c55e" : "#ef4444" }} />
                            {matricula.status_matricula}
                        </span>

                        <div style={{ width: "100%", borderTop: "1px solid #f0f0f0", marginTop: "8px" }} />

                        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px" }}>
                            <button
                                onClick={() => navigate(`/atualizar/matricula/${matricula.cod_matricula}`)}
                                style={{ width: "100%", backgroundColor: "#ff7300", color: "#ffffff", border: "none", borderRadius: "10px", padding: "10px", fontWeight: "bold", cursor: "pointer", fontSize: "0.875rem" }}
                            >
                                Editar Matrícula
                            </button>
                            <button
                                onClick={() => navigate("/lista/matriculas")}
                                style={{ width: "100%", backgroundColor: "#ffffff", color: "#000000", border: "1px solid #e0e0e0", borderRadius: "10px", padding: "10px", fontWeight: "bold", cursor: "pointer", fontSize: "0.875rem" }}
                            >
                                Voltar
                            </button>
                        </div>
                    </div>

                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px", minWidth: "280px" }}>

                        <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #f0f0f0", padding: "24px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                                <div style={{ width: "28px", height: "28px", borderRadius: "8px", backgroundColor: "#ff7300", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <i className="pi pi-id-card" style={{ color: "#ffffff", fontSize: "0.75rem" }} />
                                </div>
                                <h3 style={{ fontSize: "0.875rem", fontWeight: "bold", color: "#000000", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Dados da Matrícula</h3>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                <Campo label="ID da Matrícula" valor={String(matricula.cod_matricula)} icone="pi-hashtag" />
                                <Campo label="Status" valor={matricula.status_matricula ?? "—"} icone="pi-info-circle" />
                                <Campo label="ID do Aluno" valor={String(matricula.id_aluno)} icone="pi-user" />
                                <Campo label="ID do Plano" valor={String(matricula.id_plano)} icone="pi-book" />
                            </div>
                        </div>

                        <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #f0f0f0", padding: "24px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                                <div style={{ width: "28px", height: "28px", borderRadius: "8px", backgroundColor: "#ff7300", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <i className="pi pi-calendar" style={{ color: "#ffffff", fontSize: "0.75rem" }} />
                                </div>
                                <h3 style={{ fontSize: "0.875rem", fontWeight: "bold", color: "#000000", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Período e Pagamento</h3>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                <Campo label="Data de Início" valor={formatarData(matricula.data_inicio)} icone="pi-calendar" />
                                <Campo label="Data de Término" valor={formatarData(matricula.data_fim)} icone="pi-calendar" />
                                <Campo label="Forma de Pagamento" valor={matricula.forma_pagamento ?? "Não informado"} icone="pi-credit-card" />
                                <Campo label="Valor Final" valor={formatarValor(matricula.valor_final)} icone="pi-dollar" />
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

export default DetalhesMatricula;