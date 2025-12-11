import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Play, ChevronRight, BarChart3, Target, Brain } from "lucide-react";
import { Particles } from "@/components/ui/particles";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { supabase } from "@/integrations/supabase/client";

export default function Hero() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const resolvedTheme = theme === 'system' ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : theme;
  const [mounted, setMounted] = useState(false);
  const [moleculeInput, setMoleculeInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      const checkAuth = async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          setIsAuthenticated(!!session);
        } catch (err) {
          console.error('Failed to check auth:', err);
          setIsAuthenticated(false);
        } finally {
          setIsCheckingAuth(false);
        }
      };
      checkAuth();
    }
  }, [mounted]);

  const handleStartAnalysis = (molecule?: string) => {
    // Prefer explicit molecule argument, then current input, otherwise use a sensible default
    const target = ((molecule ?? moleculeInput.trim()) || "Metformin").trim();

    navigate(`/analysis?molecule=${encodeURIComponent(target)}`);
  };

  const handleQuickSearch = () => {
    if (moleculeInput.trim()) {
      handleStartAnalysis(moleculeInput.trim());
    }
  };

  const molecules = [
    "Metformin", "Aspirin", "Ivermectin", "Dexamethasone", 
    "Statins", "Losartan", "Metoprolol", "Atorvastatin"
  ]

  const stats = [
    { value: "10x", label: "Faster Analysis", icon: Zap },
    { value: "95%", label: "Accuracy Rate", icon: Target },
    { value: "50K+", label: "Molecules", icon: Brain },
    { value: "24/7", label: "AI Processing", icon: BarChart3 }
  ]

  // Add keyframe animations to the document head
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      .animate-float { animation: float 6s ease-in-out infinite; }
      .animate-gradient-x { 
        background-size: 200% 100%;
        animation: gradient-x 15s ease infinite; 
      }
      @keyframes gradient-x {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .animate-spin-slow {
        animation: spin-slow 20s linear infinite;
      }
      @keyframes spin-slow-reverse {
        from { transform: rotate(0deg); }
        to { transform: rotate(-360deg); }
      }
      .animate-spin-slow-reverse {
        animation: spin-slow-reverse 25s linear infinite;
      }
      @keyframes gradient {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 3s ease infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden flex items-center justify-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-10 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl" />

      {/* Grid pattern */}
      <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Animated border */}
      <div className="absolute inset-0 -z-5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 animate-gradient-x" />
      </div>

      {/* Enhanced Particles */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={200}
        staticity={60}
        color={resolvedTheme === 'dark' ? '#ffffff' : '#000000'}
        refresh
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-cyan-500/10 border border-primary/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-medium bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                  Revolutionizing Drug Discovery
                </span>
              </div>
            </motion.div>

            {/* Main heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="block text-foreground">Discover Hidden</span>
                <span className="block bg-gradient-to-r from-primary via-cyan-400 to-purple-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  Opportunities
                </span>
                <span className="block text-foreground">in Molecules</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Enter any molecule name and unlock comprehensive market insights, clinical trials, patent analysis, and strategic opportunities—powered by Agentic AI.
              </p>
            </div>

            {/* Quick search */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  type="text"
                  placeholder="Enter molecule name (e.g., Metformin, Aspirin...)"
                  value={moleculeInput}
                  onChange={(e) => setMoleculeInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleQuickSearch()}
                  className="h-14 pl-6 pr-4 text-lg rounded-xl bg-background/50 backdrop-blur-sm border-2 border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 shadow-lg flex-1"
                />
                <Button
                  onClick={handleQuickSearch}
                  disabled={isCheckingAuth || !moleculeInput.trim()}
                  className="h-12 sm:h-14 w-full sm:w-auto bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-400 shadow-lg shadow-primary/25"
                >
                  {isCheckingAuth ? '...' : 'Analyze'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>

              {/* Quick molecules */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">Try:</span>
                {molecules.map((mol) => (
                  <button
                    key={mol}
                    onClick={() => {
                      setMoleculeInput(mol)
                      setTimeout(() => handleStartAnalysis(mol), 100)
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-full bg-primary/5 hover:bg-primary/10 border border-primary/20 text-primary transition-all hover:scale-105"
                  >
                    {mol}
                    <ChevronRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-2xl bg-background/30 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all hover:scale-105">
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            {/* Main visualization container */}
            <div className="relative h-[500px] w-full">
              {/* Background card */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5 rounded-3xl border border-primary/20 backdrop-blur-xl shadow-2xl" />
              
              {/* Floating elements */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-primary/20 to-cyan-400/20 rounded-2xl rotate-12 animate-float" />
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl -rotate-12 animate-float" style={{ animationDelay: '1s' }} />
              
              {/* Central molecule visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  {/* Outer ring */}
                  <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-spin-slow">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full" />
                  </div>
                  
                  {/* Inner structure */}
                  <div className="absolute inset-10 border border-cyan-400/30 rounded-full animate-spin-slow-reverse">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full" />
                  </div>
                  
                  {/* Central node */}
                  <div className="absolute inset-20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl shadow-primary/25">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Floating data points */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-8 h-8 bg-background/80 backdrop-blur-sm border border-primary/20 rounded-lg flex items-center justify-center shadow-lg"
                      style={{
                        top: `${Math.sin(i * Math.PI / 4) * 100 + 100}px`,
                        left: `${Math.cos(i * Math.PI / 4) * 100 + 100}px`,
                      }}
                    >
                      <div className="text-xs font-bold text-primary">
                        {['MK', 'PT', 'CT', 'IN', 'TR', 'WP', 'AI', 'ML'][i]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Animated connection lines */}
              <svg className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                {[...Array(4)].map((_, i) => (
                  <motion.path
                    key={i}
                    d={`M 100,100 Q ${100 + Math.cos(i * Math.PI / 2) * 80},${100 + Math.sin(i * Math.PI / 2) * 80} ${100 + Math.cos(i * Math.PI / 2 + 0.5) * 150},${100 + Math.sin(i * Math.PI / 2 + 0.5) * 150}`}
                    stroke="url(#gradient)"
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: i * 0.5 }}
                  />
                ))}
              </svg>
            </div>

            {/* Info cards */}
            <div className="absolute -bottom-6 -left-6 w-64 p-4 bg-background/80 backdrop-blur-xl rounded-2xl border border-border shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Real-time Analysis</div>
                  <div className="text-xs text-muted-foreground">Results in under 60 seconds</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-64 p-4 bg-background/80 backdrop-blur-xl rounded-2xl border border-border shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Comprehensive Data</div>
                  <div className="text-xs text-muted-foreground">10+ data sources analyzed</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span>Trusted by researchers from leading institutions</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => handleStartAnalysis()}
              disabled={isCheckingAuth}
              className="h-14 px-10 text-lg bg-gradient-to-r from-primary via-primary to-cyan-600 hover:from-primary/90 hover:via-primary/80 hover:to-cyan-500 shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105"
            >
              <Sparkles className="mr-3 w-5 h-5" />
              {isCheckingAuth ? 'Loading...' : 'Start Free Analysis'}
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 border-2 hover:border-primary/50 hover:bg-primary/5 group"
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="mr-2 w-4 h-4" />
              Watch Demo
            </Button>
          </div>
          
          {null}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="text-xs text-muted-foreground mb-2">Scroll to explore</div>
        <div className="w-6 h-10 border-2 border-border rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}