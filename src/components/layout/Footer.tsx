import { useState } from "react";
import { Link } from "react-router-dom";
import { FlaskConical, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const scientistQuotes = [
  {
    text: "The important thing is to never stop questioning.",
    author: "Albert Einstein",
  },
  {
    text: "Chance favors the prepared mind.",
    author: "Louis Pasteur",
  },
  {
    text: "Science is simply the word we use to describe a method of organizing our curiosity.",
    author: "Tim Minchin",
  },
  {
    text: "In science there are no shortcuts to truth.",
    author: "Louis de Broglie",
  },
  {
    text: "Research is creating new knowledge.",
    author: "Neil Armstrong",
  },
  {
    text: "The good thing about science is that it's true whether or not you believe in it.",
    author: "Neil deGrasse Tyson",
  },
];

const molecularSnapshots = [
  {
    molecule: "Metformin",
    formula: "CHN",
    repurposingScore: "92 / 100",
    indications: "18",
    therapyAreas: "Across 4 therapy areas",
    evidenceCount: "126",
  },
  {
    molecule: "Aspirin",
    formula: "CHO",
    repurposingScore: "88 / 100",
    indications: "24",
    therapyAreas: "Pain, cardiology, oncology",
    evidenceCount: "210",
  },
  {
    molecule: "Atorvastatin",
    formula: "CHFNO",
    repurposingScore: "85 / 100",
    indications: "12",
    therapyAreas: "Cardio-metabolic focus",
    evidenceCount: "163",
  },
  {
    molecule: "Dapagliflozin",
    formula: "CHO",
    repurposingScore: "90 / 100",
    indications: "9",
    therapyAreas: "Renal & heart failure",
    evidenceCount: "98",
  },
];

export default function Footer() {
  const [showAbstract, setShowAbstract] = useState(false);
  const currentYear = new Date().getFullYear();

  const today = new Date();
  const dayName = today.toLocaleDateString(undefined, { weekday: "long" });
  const quoteIndex = today.getDate() % scientistQuotes.length;
  const todaysQuote = scientistQuotes[quoteIndex];
  const snapshotIndex = today.getDate() % molecularSnapshots.length;
  const snapshot = molecularSnapshots[snapshotIndex];

  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-primary/10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 border-t border-border/50 pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <Link to="/" className="flex items-center gap-3 group mb-6">
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <FlaskConical className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-gradient-emerald">
                    MoleSnap
                  </span>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs text-emerald-500 font-medium">AI-Powered Research</span>
                  </div>
                </div>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-6">
                Accelerating molecule repurposing with agentic AI and deep market intelligence.
                Transforming drug discovery through artificial intelligence.
              </p>

              {/* Daily scientist quote */}
              <div className="mt-6 p-4 rounded-2xl bg-card/60 border border-border/60">
                <p className="text-sm italic text-muted-foreground mb-2">
                  "{todaysQuote.text}"
                </p>
                <p className="text-xs font-medium text-emerald-500">
                  — {todaysQuote.author}
                </p>
              </div>
            </div>

            {/* Molecular summary table */}
            <div className="lg:col-span-8">
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Molecular Snapshot
              </h4>
              <div className="relative rounded-3xl border border-primary/20 bg-gradient-to-br from-background/40 via-primary/5 to-cyan-900/20 shadow-[0_0_40px_rgba(16,185,129,0.25)] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_0_0,rgba(45,212,191,0.25),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(56,189,248,0.25),transparent_55%)] opacity-70" />

                <div className="relative p-6 md:p-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-xs md:text-sm">
                    <div className="group rounded-2xl border border-emerald-500/30 bg-black/20 backdrop-blur-xl p-3 md:p-4 shadow-lg shadow-emerald-500/20 transform group-hover:-translate-y-1 transition-all duration-300">
                      <p className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-emerald-300/80 mb-1">
                        Focus Molecule
                      </p>
                      <p className="text-sm md:text-base font-semibold text-emerald-100">
                        {snapshot.molecule}
                      </p>
                      <p className="text-[11px] text-emerald-200/80 mt-1">{snapshot.formula}</p>
                    </div>

                    <div className="group rounded-2xl border border-cyan-500/30 bg-black/20 backdrop-blur-xl p-3 md:p-4 shadow-lg shadow-cyan-500/20 transform group-hover:-translate-y-1 transition-all duration-300">
                      <p className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-cyan-300/80 mb-1">
                        Repurposing Score
                      </p>
                      <p className="text-sm md:text-base font-semibold text-cyan-100">
                        {snapshot.repurposingScore}
                      </p>
                      <p className="text-[11px] text-cyan-200/80 mt-1">AI-estimated potential</p>
                    </div>

                    <div className="group rounded-2xl border border-violet-500/30 bg-black/20 backdrop-blur-xl p-3 md:p-4 shadow-lg shadow-violet-500/20 transform group-hover:-translate-y-1 transition-all duration-300">
                      <p className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-violet-300/80 mb-1">
                        Indications Mapped
                      </p>
                      <p className="text-sm md:text-base font-semibold text-violet-100">
                        {snapshot.indications}
                      </p>
                      <p className="text-[11px] text-violet-200/80 mt-1">{snapshot.therapyAreas}</p>
                    </div>

                    <div className="group rounded-2xl border border-amber-500/30 bg-black/20 backdrop-blur-xl p-3 md:p-4 shadow-lg shadow-amber-500/20 transform group-hover:-translate-y-1 transition-all duration-300">
                      <p className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-amber-300/80 mb-1">
                        Evidence Density
                      </p>
                      <p className="text-sm md:text-base font-semibold text-amber-100">
                        {snapshot.evidenceCount}
                      </p>
                      <p className="text-[11px] text-amber-200/80 mt-1">Trials & publications</p>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-6 text-[11px] md:text-xs text-muted-foreground/80">
                    <p>
                      <span className="font-semibold text-emerald-300">{dayName}&apos;s</span> molecular snapshot
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Abstract section */}
          {showAbstract && (
            <div className="mt-8 rounded-3xl border border-emerald-500/30 bg-card/70 backdrop-blur-xl p-6 md:p-8 space-y-3 text-sm md:text-base text-muted-foreground">
              <h4 className="text-base md:text-lg font-semibold text-emerald-300 mb-2">
                Abstract
              </h4>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Understanding how complex therapeutic molecules evolve across data sources is essential for designing
                  controlled, AI-driven analysis workflows and building reliable repurposing signals.
                </li>
                <li>
                  This project identifies key molecular and market "intermediates" by tracing early-stage evidence across
                  clinical trials, patents, publications, and trade data for candidate molecules.
                </li>
                <li>
                  Structured pipelines combine retrieval, clustering and reasoning agents to validate intermediate
                  signals, similar to how synthetic chemists confirm reaction intermediates before full nanomaterial
                  formation.
                </li>
                <li>
                  Fully consolidated molecule profiles are then characterized through interactive dashboards that surface
                  repurposing scores, indication breadth, therapeutic area coverage and evidence density.
                </li>
                <li>
                  By clarifying the mechanistic origins of each repurposing opportunity, MoleSnap provides a
                  robust framework for rational molecule selection, portfolio design, and targeted follow‑up research.
                </li>
              </ul>
            </div>
          )}

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50 gap-4">
            <p className="text-sm text-muted-foreground">
              {currentYear} MoleSnap. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-emerald-400/60 text-emerald-200 hover:bg-emerald-500/10 hover:text-emerald-100"
                onClick={() => setShowAbstract((prev) => !prev)}
              >
                {showAbstract ? "Hide Abstract" : "View Abstract"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
