"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MoleculeViewer from "@/components/MoleculeViewer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  Atom,
  Shield,
  TrendingUp,
  Pill,
  Activity,
  AlertTriangle,
  FileText,
  FlaskConical,
  Loader2,
  RefreshCw,
  ChevronRight,
  Brain,
  Sparkles,
  Zap,
  BarChart3,
  Target,
  Database,
  Globe,
  Download,
  Share2,
  Bookmark,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface MoleculeAnalysis {
  basicInfo: {
    chemicalFormula: string;
    molecularWeight: string;
    iupacName: string;
    commonNames: string[];
    drugClass: string;
  };
  mechanismOfAction: string;
  therapeuticUses: {
    approved: string[];
    potential: string[];
  };
  pharmacokinetics: {
    absorption: string;
    distribution: string;
    metabolism: string;
    excretion: string;
    halfLife: string;
  };
  sideEffects: {
    common: string[];
    serious: string[];
    contraindications: string[];
  };
  drugInteractions: string[];
  marketAnalysis: {
    status: string;
    manufacturers: string[];
    patentStatus: string;
    globalMarketSize: string;
  };
  researchPotential: {
    ongoingTrials: string[];
    emergingApplications: string[];
  };
  safetyScore: number;
  marketPotential: string;
  summary: string;
}

export default function Analysis() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialMolecule = searchParams.get("molecule") || "";

  const [moleculeName, setMoleculeName] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [analysis, setAnalysis] = useState<MoleculeAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showImpactChart, setShowImpactChart] = useState(false);

  const handleDownloadAnalysis = () => {
    if (!analysis) return;

    const blob = new Blob([JSON.stringify({ moleculeName, analysis }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${moleculeName || "analysis"}-molesnap-analysis.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const analyzeMolecule = async (name: string) => {
    if (!name.trim()) {
      toast.error("Please enter a molecule name");
      return;
    }

    setIsLoading(true);
    setError(null);
    setMoleculeName(name);

    try {
      // Log the request for debugging
      console.log("Analyzing molecule:", name);

      const { data, error: functionError } = await supabase.functions.invoke("analyze-molecule", {
        body: { moleculeName: name },
      });

      if (functionError) {
        console.error("Function error:", functionError);
        throw new Error(functionError.message || "Failed to call analysis function");
      }

      if (!data.success) {
        console.error("Data error:", data);
        throw new Error(data.error || "Analysis failed");
      }

      setAnalysis(data.analysis);
      toast.success(`Analysis complete for ${name}`);
    } catch (err) {
      console.error("Analysis error:", err);
      const message = err instanceof Error ? err.message : "Failed to analyze molecule";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Set initial search input from URL and handle initial load
  useEffect(() => {
    if (initialMolecule) {
      setSearchInput(initialMolecule);
      if (isInitialLoad) {
        // Only analyze on initial load if there's a molecule in the URL
        console.log("Initial molecule from URL:", initialMolecule);
        analyzeMolecule(initialMolecule);
        setIsInitialLoad(false);
      }
    }
  }, [initialMolecule, isInitialLoad]);

  // Handle URL parameter changes after initial load
  useEffect(() => {
    if (!isInitialLoad && initialMolecule) {
      console.log("URL parameter changed to:", initialMolecule);
      analyzeMolecule(initialMolecule);
    }
  }, [initialMolecule, isInitialLoad]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      // Update URL with search parameter
      navigate(`/analysis?molecule=${encodeURIComponent(searchInput)}`, { replace: true });
      // The useEffect will trigger analyzeMolecule due to URL change
    } else {
      toast.error("Please enter a molecule name");
    }
  };

  const quickMolecules = [
    { name: "Metformin", color: "from-blue-500 to-cyan-500" },
    { name: "Aspirin", color: "from-emerald-500 to-green-500" },
    { name: "Ivermectin", color: "from-purple-500 to-pink-500" },
    { name: "Dexamethasone", color: "from-orange-500 to-amber-500" }
  ];

  const stats = [
    { icon: Zap, value: "10x", label: "Faster Analysis", color: "text-blue-500" },
    { icon: Target, value: "95%", label: "Accuracy", color: "text-emerald-500" },
    { icon: Database, value: "50K+", label: "Molecules", color: "text-purple-500" },
    { icon: Globe, value: "15+", label: "Data Sources", color: "text-cyan-500" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const impactData = analysis
    ? [
        {
          name: "Health Impact",
          value: analysis.safetyScore,
        },
        {
          name: "Atmosphere Impact",
          value: Math.max(0, 100 - analysis.safetyScore),
        },
      ]
    : [];

  const impactColors = ["#22c55e", "#0ea5e9"];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />
      </div>

      <Header />
      
      <main className="pt-32 pb-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Back button with animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              onClick={() => navigate("/")}
              className="mb-8 gap-2 group bg-gradient-to-r from-primary to-cyan-500 text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-transform"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </Button>
          </motion.div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-cyan-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-all duration-500" />
                <div className="relative flex items-center gap-3 p-2 rounded-2xl bg-background/50 backdrop-blur-xl border border-primary/20 shadow-2xl">
                  <Search className="w-5 h-5 text-primary ml-4" />
                  <Input
                    type="text"
                    placeholder="Enter molecule name (e.g., Metformin, Aspirin, Ivermectin...)"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-lg py-6 placeholder:text-muted-foreground/60"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-400 text-white px-8 py-6 rounded-xl font-semibold shadow-lg shadow-primary/25"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Brain className="w-5 h-5 mr-2" />
                        Analyze
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>

              {/* Quick suggestions */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  Try these molecules:
                </span>
                {quickMolecules.map((mol, index) => (
                  <motion.button
                    key={mol.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    type="button"
                    onClick={() => {
                      setSearchInput(mol.name);
                      navigate(`/analysis?molecule=${encodeURIComponent(mol.name)}`, { replace: true });
                      // Note: analyzeMolecule will be called by useEffect when URL changes
                    }}
                    className={`px-4 py-2 text-sm rounded-xl bg-gradient-to-r ${mol.color}/10 border ${mol.color.split(' ')[0].replace('from-', 'border-')}/20 hover:${mol.color}/20 transition-all hover:scale-105 backdrop-blur-sm`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {mol.name}
                  </motion.button>
                ))}
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
              >
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-2xl bg-background/30 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all hover:scale-105"
                  >
                    <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </form>
          </motion.div>

          {/* Loading State */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <div className="inline-flex flex-col items-center gap-6 p-8 rounded-3xl bg-background/50 backdrop-blur-xl border border-primary/20 shadow-2xl max-w-md">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-cyan-500 flex items-center justify-center"
                  >
                    <Atom className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="text-left">
                    <p className="font-semibold text-xl">Analyzing {moleculeName}...</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Our AI agents are gathering comprehensive data across 15+ sources
                    </p>
                  </div>
                  <motion.div
                    className="w-full h-2 rounded-full bg-muted overflow-hidden"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary via-cyan-500 to-purple-500"
                      initial={{ width: "0%" }}
                      animate={{ width: ["0%", "100%", "0%"] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error State */}
          <AnimatePresence>
            {error && !isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-20"
              >
                <div className="inline-flex flex-col items-center gap-6 p-8 rounded-3xl bg-gradient-to-br from-destructive/10 to-destructive/5 backdrop-blur-xl border border-destructive/20 shadow-2xl max-w-md">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center"
                  >
                    <AlertTriangle className="w-8 h-8 text-destructive" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-xl text-destructive">Analysis Failed</p>
                    <p className="text-sm text-muted-foreground mt-2 max-w-sm">{error}</p>
                  </div>
                  <Button
                    onClick={() => analyzeMolecule(moleculeName)}
                    variant="outline"
                    className="gap-2 hover:bg-destructive/10"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Analysis Results */}
          <AnimatePresence>
            {analysis && !isLoading && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                ref={containerRef}
                className="space-y-8"
              >
                {/* Header with 3D Viewer */}
                <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-8">
                  {/* Basic Info */}
                  <div className="rounded-3xl p-8 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5 border border-primary/20 backdrop-blur-xl shadow-2xl">
                    <div className="flex items-center gap-4 mb-8">
                      <motion.div 
                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-lg shadow-primary/25"
                        whileHover={{ rotate: 5, scale: 1.05 }}
                        transition={{ type: "spring" }}
                      >
                        <Atom className="w-7 h-7 text-white" />
                      </motion.div>
                      <div>
                        <h1 className="text-3xl font-bold">{moleculeName}</h1>
                        <p className="text-muted-foreground">{analysis.basicInfo.drugClass}</p>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <motion.div 
                        className="p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50"
                        whileHover={{ y: -5 }}
                      >
                        <div className="flex items-center gap-3 text-emerald-500 mb-4">
                          <Shield className="w-5 h-5" />
                          <span className="font-medium">Safety Score</span>
                        </div>
                        <div className="text-4xl font-bold">{analysis.safetyScore}%</div>
                        <div className="w-full h-3 rounded-full bg-muted mt-4 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${analysis.safetyScore}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </motion.div>

                      <motion.div 
                        className="p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50"
                        whileHover={{ y: -5 }}
                      >
                        <div className="flex items-center gap-3 text-blue-500 mb-4">
                          <TrendingUp className="w-5 h-5" />
                          <span className="font-medium">Market Potential</span>
                        </div>
                        <div className="text-4xl font-bold">{analysis.marketPotential}</div>
                        <p className="text-sm text-muted-foreground mt-2">
                          {analysis.marketAnalysis.globalMarketSize}
                        </p>
                      </motion.div>
                    </div>

                    {/* Basic Details */}
                    <div className="space-y-4">
                      {[
                        { label: "Formula", value: analysis.basicInfo.chemicalFormula },
                        { label: "Molecular Weight", value: analysis.basicInfo.molecularWeight },
                        { label: "Status", value: analysis.marketAnalysis.status },
                        { label: "Half-life", value: analysis.pharmacokinetics.halfLife },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex justify-between py-3 border-b border-border/50"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-medium text-foreground">{item.value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* 3D Molecule Viewer */}
                  <motion.div 
                    className="rounded-3xl p-4 min-h-[400px] bg-gradient-to-br from-background to-background/50 backdrop-blur-xl border border-primary/20 shadow-2xl"
                    variants={itemVariants}
                  >
                    <MoleculeViewer moleculeName={moleculeName} className="h-full rounded-2xl" />
                  </motion.div>
                </motion.div>

                {/* Summary */}
                <motion.div 
                  variants={itemVariants}
                  className="rounded-3xl p-8 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border border-border/50 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <FileText className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-semibold">Summary</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">{analysis.summary}</p>
                </motion.div>

                {/* Detailed Sections */}
                <motion.div 
                  variants={containerVariants}
                  className="grid md:grid-cols-2 gap-8"
                >
                  {/* Mechanism of Action */}
                  <motion.div 
                    variants={itemVariants}
                    className="rounded-3xl p-8 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 border border-purple-500/20 backdrop-blur-xl shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <FlaskConical className="w-6 h-6 text-purple-500" />
                      <h2 className="text-xl font-semibold">Mechanism of Action</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{analysis.mechanismOfAction}</p>
                  </motion.div>

                  {/* Therapeutic Uses */}
                  <motion.div 
                    variants={itemVariants}
                    className="rounded-3xl p-8 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 border border-emerald-500/20 backdrop-blur-xl shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <Pill className="w-6 h-6 text-emerald-500" />
                      <h2 className="text-xl font-semibold">Therapeutic Uses</h2>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-emerald-500 mb-3">Approved Uses</h3>
                        <div className="flex flex-wrap gap-2">
                          {analysis.therapeuticUses.approved.map((use, i) => (
                            <span
                              key={i}
                              className="px-4 py-2 rounded-xl text-sm bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            >
                              {use}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-blue-500 mb-3">Potential Uses</h3>
                        <div className="flex flex-wrap gap-2">
                          {analysis.therapeuticUses.potential.map((use, i) => (
                            <span
                              key={i}
                              className="px-4 py-2 rounded-xl text-sm bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                            >
                              {use}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Side Effects */}
                  <motion.div 
                    variants={itemVariants}
                    className="rounded-3xl p-8 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 border border-orange-500/20 backdrop-blur-xl shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <AlertTriangle className="w-6 h-6 text-orange-500" />
                      <h2 className="text-xl font-semibold">Side Effects</h2>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-orange-500 mb-3">Common</h3>
                        <ul className="space-y-2">
                          {analysis.sideEffects.common.slice(0, 5).map((effect, i) => (
                            <motion.li 
                              key={i} 
                              className="text-sm text-muted-foreground flex items-center gap-3"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <ChevronRight className="w-4 h-4 text-orange-500" />
                              {effect}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-destructive mb-3">Serious</h3>
                        <ul className="space-y-2">
                          {analysis.sideEffects.serious.slice(0, 3).map((effect, i) => (
                            <motion.li 
                              key={i} 
                              className="text-sm text-muted-foreground flex items-center gap-3"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <ChevronRight className="w-4 h-4 text-destructive" />
                              {effect}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>

                  {/* Pharmacokinetics */}
                  <motion.div 
                    variants={itemVariants}
                    className="rounded-3xl p-8 bg-gradient-to-br from-cyan-500/5 via-transparent to-sky-500/5 border border-cyan-500/20 backdrop-blur-xl shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <Activity className="w-6 h-6 text-cyan-500" />
                      <h2 className="text-xl font-semibold">Pharmacokinetics</h2>
                    </div>
                    <div className="space-y-4">
                      {[
                        { label: "Absorption", value: analysis.pharmacokinetics.absorption },
                        { label: "Distribution", value: analysis.pharmacokinetics.distribution },
                        { label: "Metabolism", value: analysis.pharmacokinetics.metabolism },
                        { label: "Excretion", value: analysis.pharmacokinetics.excretion },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex justify-between py-3 border-b border-cyan-500/20"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="text-sm text-right max-w-[60%] font-medium">{item.value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Research Potential */}
                  <motion.div 
                    variants={itemVariants}
                    className="rounded-3xl p-8 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 border border-violet-500/20 backdrop-blur-xl shadow-lg md:col-span-2"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <FileText className="w-6 h-6 text-violet-500" />
                      <h2 className="text-xl font-semibold">Research & Clinical Trials</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-sm font-medium text-violet-500 mb-4">Ongoing Trials</h3>
                        <ul className="space-y-3">
                          {analysis.researchPotential.ongoingTrials.map((trial, i) => (
                            <motion.li 
                              key={i} 
                              className="text-sm text-muted-foreground flex items-start gap-3"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <ChevronRight className="w-4 h-4 text-violet-500 mt-1 shrink-0" />
                              {trial}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-cyan-500 mb-4">Emerging Applications</h3>
                        <ul className="space-y-3">
                          {analysis.researchPotential.emergingApplications.map((app, i) => (
                            <motion.li 
                              key={i} 
                              className="text-sm text-muted-foreground flex items-start gap-3"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <ChevronRight className="w-4 h-4 text-cyan-500 mt-1 shrink-0" />
                              {app}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col items-center gap-4 pt-8"
                >
                  <div className="flex flex-wrap gap-4 justify-center w-full">
                    <Button
                      className="gap-2 bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-400"
                      onClick={handleDownloadAnalysis}
                    >
                      <Download className="w-4 h-4" />
                      Download Analysis
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-2 border-2"
                      onClick={() => setShowImpactChart((prev) => !prev)}
                    >
                      <BarChart3 className="w-4 h-4" />
                      {showImpactChart ? "Hide Graph" : "Show Graph"}
                    </Button>
                  </div>

                  {showImpactChart && impactData.length > 0 && (
                    <div className="w-full max-w-md mt-2 p-4 rounded-2xl bg-background/60 border border-cyan-500/30">
                      <div className="flex items-center gap-2 mb-3">
                        <Activity className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-medium text-cyan-100">
                          Health vs Atmosphere Impact
                        </span>
                      </div>
                      <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={impactData}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={80}
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          <AnimatePresence>
            {!analysis && !isLoading && !error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-32"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="inline-block mb-8"
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary/10 to-cyan-500/10 flex items-center justify-center">
                    <Atom className="w-16 h-16 text-muted-foreground/30" />
                  </div>
                </motion.div>
                <h2 className="text-3xl font-bold mb-4">Enter a Molecule to Analyze</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
                  Search for any pharmaceutical compound to get comprehensive AI-powered insights
                  on its properties, uses, and market potential. Our system analyzes 15+ data sources in real-time.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  {quickMolecules.map((mol) => (
                    <Button
                      key={mol.name}
                      variant="outline"
                      onClick={() => {
                        setSearchInput(mol.name);
                        navigate(`/analysis?molecule=${encodeURIComponent(mol.name)}`, { replace: true });
                      }}
                      className="gap-2 border-2 hover:bg-primary/5"
                    >
                      <Sparkles className="w-4 h-4" />
                      Analyze {mol.name}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}