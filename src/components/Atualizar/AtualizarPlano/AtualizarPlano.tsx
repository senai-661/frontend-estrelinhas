import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlanoRequests from "../../../fetch/PlanoRequests";


export default function PAtualizarPlano() {
  const { id_plano } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tipo_plano: "",
    duracao_dias: "",
    valor: "",
    descricao: "",
    status_plano: "ATIVO", // ajusta valores
  });
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!id_plano || !/^\d+$/.test(id_plano) || Number(id_plano) < 1) {
      setErro("Identificador de plano inválido");
      setLoading(false);
      return;
    }

    PlanoRequests.obterPlanoPorId(id_plano)
      .then((plano) => {
        if (!plano) throw new Error("Plano não encontrado");
        setForm({
          tipo_plano: plano.tipo_plano,
          duracao_dias: String(plano.duracao_dias),
          valor: String(plano.valor),
          descricao: plano.descricao ?? "",
          status_plano: plano.status_plano ?? "ATIVO",
        });
      })
      .catch(() => setErro("Não foi possível carregar o plano"))
      .finally(() => setLoading(false));
  }, [id_plano]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    setErro("");
    try {
      const atualizado = await PlanoRequests.atualizarPlano(Number(id_plano), {
        cod_plano: Number(id_plano),
        ...form,
        duracao_dias: Number(form.duracao_dias),
        valor: Number(form.valor),
      });
      if (!atualizado) throw new Error("Não foi possível atualizar o plano");
      navigate("/lista/planos");
    } catch {
      setErro("Não foi possível salvar o plano. Verifique os dados e tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f3f4f6] px-4 py-8 sm:px-8">
        <p className="mx-auto max-w-[1032px]">Carregando plano...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f4f6] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-[1032px]">
        <div className="mb-6 flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => navigate("/lista/planos")}
            className="font-semibold text-[#ff7300] hover:text-[#e86500]"
          >
            Planos
          </button>
          <span className="text-gray-400">/</span>
          <span className="font-medium text-gray-700">
            P{String(id_plano).padStart(6, "0")}
          </span>
        </div>

        <div className="mb-4 flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-900">
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5 shrink-0">
            <path d="m13.5 3.5 3 3M4 16l3.5-.7L16.3 6.5a1.4 1.4 0 0 0-2-2L5.5 13.3 4 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span><strong>Modo de edição:</strong> clique nos campos abaixo para alterar os dados do plano.</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:flex-row">
          <aside className="flex w-full shrink-0 flex-col items-center gap-4 rounded-2xl border border-[#f0f0f0] bg-white p-6 lg:w-64">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ff7300] text-base font-bold text-white">
              P{String(id_plano).padStart(6, "0")}
            </div>

            <h1 className="text-center text-base font-bold text-black">
              {form.tipo_plano || "Plano"}
            </h1>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                form.status_plano === "ATIVO"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  form.status_plano === "ATIVO" ? "bg-green-500" : "bg-red-500"
                }`}
              />
              {form.status_plano}
            </span>

            <div className="my-2 w-full border-t border-gray-100" />

            <div className="flex w-full flex-col gap-2">
              <button
                type="submit"
                disabled={salvando}
                className="w-full rounded-[10px] bg-[#ff7300] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#e86500] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {salvando ? "Salvando..." : "Salvar alterações"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full rounded-[10px] border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-black hover:bg-gray-50"
              >
                Voltar
              </button>
            </div>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <section className="rounded-2xl border border-[#f0f0f0] bg-white p-6">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-7 w-7 rounded-lg bg-[#ff7300]" aria-hidden="true" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-black">
                  Informações do plano
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex min-h-[64px] gap-3 rounded-xl bg-[#f8f8f8] p-3">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">Código do plano</span>
                    <span className="mt-1 block text-sm font-semibold text-black">
                      P{String(id_plano).padStart(6, "0")}
                    </span>
                  </div>
                </div>

                <label className="flex min-h-[64px] cursor-text gap-3 rounded-xl border border-transparent bg-[#f8f8f8] p-3 transition-colors hover:border-orange-300 hover:bg-white focus-within:border-[#ff7300] focus-within:bg-white">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">Tipo do plano</span>
                    <input
                      name="tipo_plano"
                      value={form.tipo_plano}
                      onChange={handleChange}
                      className="mt-1 w-full bg-transparent text-sm font-semibold text-black outline-none focus-visible:ring-1 focus-visible:ring-[#ff7300]"
                      required
                    />
                  </span>
                </label>

                <label className="flex min-h-[64px] cursor-text gap-3 rounded-xl border border-transparent bg-[#f8f8f8] p-3 transition-colors hover:border-orange-300 hover:bg-white focus-within:border-[#ff7300] focus-within:bg-white">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">Duração (dias)</span>
                    <input
                      type="number"
                      min={1}
                      name="duracao_dias"
                      value={form.duracao_dias}
                      onChange={handleChange}
                      className="mt-1 w-full bg-transparent text-sm font-semibold text-black outline-none focus-visible:ring-1 focus-visible:ring-[#ff7300]"
                      required
                    />
                  </span>
                </label>

                <label className="flex min-h-[64px] cursor-pointer gap-3 rounded-xl border border-transparent bg-[#f8f8f8] p-3 transition-colors hover:border-orange-300 hover:bg-white focus-within:border-[#ff7300] focus-within:bg-white">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">Status</span>
                    <select
                      name="status_plano"
                      value={form.status_plano}
                      onChange={handleChange}
                      className="mt-1 w-full bg-transparent text-sm font-semibold text-black outline-none focus-visible:ring-1 focus-visible:ring-[#ff7300]"
                    >
                      <option value="ATIVO">ATIVO</option>
                      <option value="INATIVO">INATIVO</option>
                    </select>
                  </span>
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-[#f0f0f0] bg-white p-6">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-7 w-7 rounded-lg bg-[#ff7300]" aria-hidden="true" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-black">
                  Valor e descrição
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex min-h-[84px] cursor-text gap-3 rounded-xl border border-transparent bg-[#f8f8f8] p-3 transition-colors hover:border-orange-300 hover:bg-white focus-within:border-[#ff7300] focus-within:bg-white">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">Valor (R$)</span>
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      name="valor"
                      value={form.valor}
                      onChange={handleChange}
                      className="mt-1 w-full bg-transparent text-sm font-semibold text-black outline-none focus-visible:ring-1 focus-visible:ring-[#ff7300]"
                      required
                    />
                  </span>
                </label>

                <label className="flex min-h-[84px] cursor-text gap-3 rounded-xl border border-transparent bg-[#f8f8f8] p-3 transition-colors hover:border-orange-300 hover:bg-white focus-within:border-[#ff7300] focus-within:bg-white">
                  <span className="h-8 w-8 shrink-0 rounded-lg border border-gray-100 bg-white" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wide text-gray-500">Descrição</span>
                    <textarea
                      name="descricao"
                      value={form.descricao}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 w-full resize-y bg-transparent text-sm font-semibold text-black outline-none focus-visible:ring-1 focus-visible:ring-[#ff7300]"
                    />
                  </span>
                </label>
              </div>
            </section>

            {erro && (
              <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {erro}
              </p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}