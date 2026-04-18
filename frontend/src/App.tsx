import { useMemo, useState } from "react";

const API_BASE_URL = "http://localhost:8080";

type Company = {
  id?: number;
  orgNumber: string;
  name: string;
};

type NegotiationCase = {
  id: number;
  title: string;
  negotiationYear: number;
  status: string;
  company?: Company;
};

type AnalysisResult = {
  economyScore: number;
  productivityScore: number;
  outlookScore: number;
  competitivenessScore: number;
  recommendation: string;
};

type CreateCaseForm = {
  title: string;
  negotiationYear: string;
  orgNumber: string;
};

const initialForm: CreateCaseForm = {
  title: "Lokale forhandlinger 2026",
  negotiationYear: "2026",
  orgNumber: "123456789",
};

function scoreLabel(score: number) {
  if (score >= 8) return "Sterk";
  if (score >= 6) return "Moderat";
  return "Svak";
}

function recommendationLabel(value: string) {
  switch (value) {
    case "HIGH_INCREASE":
      return "Sterkt grunnlag for høyere krav";
    case "MODERATE_INCREASE":
      return "Moderat grunnlag for lønnskrav";
    case "LOW_INCREASE":
      return "Forsiktig krav anbefales";
    default:
      return value;
  }
}

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export default function App() {
  const [form, setForm] = useState<CreateCaseForm>(initialForm);
  const [cases, setCases] = useState<NegotiationCase[]>([]);
  const [selectedCase, setSelectedCase] = useState<NegotiationCase | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loadingCases, setLoadingCases] = useState(false);
  const [creatingCase, setCreatingCase] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draftText, setDraftText] = useState(
    "Foreløpig utkast til lønnskrav kommer her etter analyse."
  );

  const averageScore = useMemo(() => {
    if (!analysis) return 0;
    const total =
      analysis.economyScore +
      analysis.productivityScore +
      analysis.outlookScore +
      analysis.competitivenessScore;
    return Math.round((total / 4) * 10);
  }, [analysis]);

  async function loadCases() {
    try {
      setLoadingCases(true);
      setError(null);
      const data = await fetchJson<NegotiationCase[]>(`${API_BASE_URL}/api/cases`);
      setCases(data);
      if (data.length > 0 && !selectedCase) {
        setSelectedCase(data[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke hente saker.");
    } finally {
      setLoadingCases(false);
    }
  }

  async function createCase() {
    try {
      setCreatingCase(true);
      setError(null);

      const payload = {
        title: form.title,
        negotiationYear: Number(form.negotiationYear),
        orgNumber: form.orgNumber,
      };

      const created = await fetchJson<NegotiationCase>(`${API_BASE_URL}/api/cases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      setCases((prev) => [created, ...prev]);
      setSelectedCase(created);
      setAnalysis(null);
      setDraftText(
        `Foreløpig utkast for ${created.company?.name ?? "selskapet"}. Kjør analyse for å generere anbefalt begrunnelse.`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke opprette sak.");
    } finally {
      setCreatingCase(false);
    }
  }

  async function runAnalysis(caseId: number) {
    try {
      setAnalyzing(true);
      setError(null);

      const result = await fetchJson<AnalysisResult>(
        `${API_BASE_URL}/api/cases/${caseId}/analyze`
      );

      setAnalysis(result);

      const recommendation = recommendationLabel(result.recommendation);
      setDraftText(
        `Forslag til lønnskrav\n\nBasert på samlet vurdering av økonomi, produktivitet, fremtidsutsikter og konkurranseevne vurderes det å foreligge ${recommendation.toLowerCase()}. Utkastet bør suppleres med lokal innsikt, lønnsdata og prioriteringer fra forhandlingsutvalget.`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke kjøre analyse.");
    } finally {
      setAnalyzing(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Lønnskrav AI</h1>
              <p className="text-sm text-slate-500">
                En beslutningsstøtte-applikasjon for tillitsvalgte som gjør selskapsdata om til dokumenterte og begrunnede lønnskrav.
              </p>
            </div>

            <button
              onClick={loadCases}
              disabled={loadingCases}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100 disabled:opacity-50"
            >
              {loadingCases ? "Henter..." : "Hent saker"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Opprett ny forhandlingssak</h2>
            <p className="mt-2 text-sm text-slate-500">
              Lag en sak og kjør analyse mot backend-en din.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Tittel</label>
                <input
                  className="w-full rounded-xl border border-slate-300 px-3 py-2"
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Forhandlingsår</label>
                <input
                  className="w-full rounded-xl border border-slate-300 px-3 py-2"
                  value={form.negotiationYear}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      negotiationYear: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Organisasjonsnummer</label>
                <input
                  className="w-full rounded-xl border border-slate-300 px-3 py-2"
                  value={form.orgNumber}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, orgNumber: e.target.value }))
                  }
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={createCase}
                  disabled={creatingCase}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {creatingCase ? "Oppretter..." : "Opprett sak"}
                </button>

                <button
                  onClick={loadCases}
                  disabled={loadingCases}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100 disabled:opacity-50"
                >
                  Hent saker
                </button>
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Saker</h2>
            <p className="mt-2 text-sm text-slate-500">
              Velg en sak og kjør analyse.
            </p>

            <div className="mt-6 space-y-3">
              {cases.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                  Ingen saker ennå.
                </div>
              ) : (
                cases.map((item) => {
                  const active = selectedCase?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedCase(item);
                        setAnalysis(null);
                      }}
                      className={`w-full rounded-xl border p-4 text-left ${
                        active
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs">#{item.id}</div>
                      </div>
                      <div
                        className={`mt-2 text-sm ${
                          active ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        {item.company?.name ?? "Ukjent selskap"} · {item.negotiationYear}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Valgt sak</h2>

            {selectedCase ? (
              <div className="mt-4 space-y-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">Tittel</div>
                  <div className="mt-1 font-medium">{selectedCase.title}</div>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">Selskap</div>
                  <div className="mt-1 font-medium">
                    {selectedCase.company?.name ?? "Ukjent"}
                  </div>
                </div>

                <button
                  onClick={() => runAnalysis(selectedCase.id)}
                  disabled={analyzing}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {analyzing ? "Analyserer..." : "Kjør analyse"}
                </button>
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                Ingen sak valgt.
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Analyse</h2>

            {analysis ? (
              <div className="mt-4 space-y-4">
                <div className="rounded-xl bg-slate-900 p-4 text-white">
                  <div className="text-sm text-slate-300">Anbefaling</div>
                  <div className="mt-1 text-xl font-semibold">
                    {recommendationLabel(analysis.recommendation)}
                  </div>
                  <div className="mt-2 text-sm text-slate-300">
                    Gjennomsnittlig score: {averageScore / 10}/10
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    ["Økonomi", analysis.economyScore],
                    ["Produktivitet", analysis.productivityScore],
                    ["Fremtidsutsikter", analysis.outlookScore],
                    ["Konkurranseevne", analysis.competitivenessScore],
                  ].map(([label, value]) => (
                    <div key={String(label)} className="rounded-xl border border-slate-200 p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{label}</div>
                        <div className="text-sm text-slate-500">
                          {scoreLabel(Number(value))}
                        </div>
                      </div>
                      <div className="mt-2 text-2xl font-semibold">{String(value)}/10</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                Ingen analyse kjørt ennå.
              </div>
            )}
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Utkast til begrunnelse</h2>
          <p className="mt-2 text-sm text-slate-500">
            Dette kan senere bygges ut med AI, men bør alltid være sporbar og forklarbar.
          </p>

          <textarea
            className="mt-4 min-h-[220px] w-full rounded-xl border border-slate-300 p-3"
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
          />
        </section>
      </main>
    </div>
  );
}