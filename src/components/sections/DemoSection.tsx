import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ChevronRight, Pill, Activity, Shield, TrendingUp, Atom } from "lucide-react";
import { toast } from "sonner";
import MoleculeViewer from "@/components/MoleculeViewer";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const demoMolecules = [
  {
    name: "Metformin",
    formula: "C₄H₁₁N₅",
    applications: ["Type 2 Diabetes", "PCOS", "Anti-aging Research"],
    safetyScore: 92,
    marketPotential: "High",
  },
  {
    name: "Aspirin",
    formula: "C₉H₈O₄",
    applications: ["Pain Relief", "Cardiovascular Protection", "Cancer Prevention"],
    safetyScore: 88,
    marketPotential: "Very High",
  },
  {
    name: "Ivermectin",
    formula: "C₄₈H₇₄O₁₄",
    applications: ["Parasitic Infections", "Rosacea", "Antiviral Research"],
    safetyScore: 85,
    marketPotential: "Medium",
  },
];

export default function DemoSection() {
  const [selectedMolecule, setSelectedMolecule] = useState(demoMolecules[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showImpactChart, setShowImpactChart] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    toast.info(`Analyzing ${selectedMolecule.name}...`);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      toast.success(`Analysis complete for ${selectedMolecule.name}!`);
      setShowImpactChart(true);
    }, 2000);
  };

  const impactData = [
    {
      name: "Health Impact",
      value: selectedMolecule.safetyScore,
    },
    {
      name: "Atmosphere Impact",
      value: Math.max(0, 100 - selectedMolecule.safetyScore),
    },
  ];

  const impactColors = ["#22c55e", "#0ea5e9"];

  return (
    <section
      className="py-32 bg-gradient-to-b from-muted/30 to-background overflow-hidden relative"
      id="demo"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/30 mb-6">
            <Play className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-semibold">Interactive Demo</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See It In <span className="text-gradient-blue">Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our demo data and experience the power of AI-driven molecule analysis.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Molecule Selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">Select a Molecule</h3>
            {demoMolecules.map((molecule) => (
              <button
                key={molecule.name}
                onClick={() => setSelectedMolecule(molecule)}
                className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                  selectedMolecule.name === molecule.name
                    ? "glass-strong border-2 border-cyan-500/50"
                    : "glass hover:bg-card/80"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                      <Atom className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">{molecule.name}</div>
                      <div className="text-sm text-muted-foreground">{molecule.formula}</div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      selectedMolecule.name === molecule.name ? "rotate-90 text-cyan-500" : ""
                    }`}
                  />
                </div>
              </button>
            ))}

            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white py-6 rounded-xl"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Run Analysis
                </>
              )}
            </Button>

            {/* Health & Atmosphere impact pie chart (below Run Analysis button) */}
            {showImpactChart && (
              <div className="mt-6 p-4 rounded-xl bg-card/50 border border-cyan-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-cyan-100">
                    Health & Atmosphere Impact
                  </span>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={impactData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={4}
                        stroke="transparent"
                        isAnimationActive
                        label={({ name, value }) => `${name}: ${value.toFixed(0)}%`}
                        labelLine={false}
                      >
                        {impactData.map((entry, index) => (
                          <Cell
                            key={entry.name}
                            fill={impactColors[index % impactColors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#020817",
                          borderRadius: 8,
                          border: "1px solid rgba(34,211,238,0.4)",
                          padding: "6px 10px",
                        }}
                        formatter={(value: number, name: string) => [
                          `${value.toFixed(0)}%`,
                          name,
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </motion.div>

          {/* Analysis Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-strong rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                <Atom className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{selectedMolecule.name}</h3>
                <p className="text-muted-foreground">{selectedMolecule.formula}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-card/50">
                <div className="flex items-center gap-2 text-emerald-500 mb-2">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">Safety Score</span>
                </div>
                <div className="text-2xl font-bold">{selectedMolecule.safetyScore}%</div>
                <div className="w-full h-2 rounded-full bg-muted mt-2">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                    style={{ width: `${selectedMolecule.safetyScore}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-card/50">
                <div className="flex items-center gap-2 text-blue-500 mb-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Market Potential</span>
                </div>
                <div className="text-2xl font-bold">{selectedMolecule.marketPotential}</div>
              </div>
            </div>

          {/* Applications */}
            <div>
              <div className="flex items-center gap-2 text-purple-500 mb-3">
                <Pill className="w-4 h-4" />
                <span className="text-sm font-medium">Pharmaceutical Applications</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedMolecule.applications.map((app) => (
                  <span
                    key={app}
                    className="px-3 py-1 rounded-full text-sm bg-purple-500/10 text-purple-400 border border-purple-500/20"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>

            {/* 3D Molecule Viewer */}
            <div className="mt-6 rounded-xl overflow-hidden border border-border/50 bg-background">
              <MoleculeViewer moleculeName={selectedMolecule.name.toLowerCase()} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
