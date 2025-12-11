import { motion } from "framer-motion";
import { Brain, Network, Globe, Cpu, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    title: "Smart Inquiry",
    description:
      "Simply enter a molecule name or ask questions about portfolio opportunities. Our AI understands context and intent instantly.",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
    borderColor: "border-l-blue-500",
  },
  {
    title: "Agent Orchestration",
    description:
      "Master Agent instantly delegates to specialized sub-agents for market, clinical, patent, and trade analysis.",
    icon: Network,
    color: "from-purple-500 to-pink-500",
    borderColor: "border-l-purple-500",
  },
  {
    title: "Deep Data Retrieval",
    description:
      "Workers simultaneously search across 15+ sources including clinical trials, patent databases, and global trade data.",
    icon: Globe,
    color: "from-cyan-500 to-teal-500",
    borderColor: "border-l-cyan-500",
  },
  {
    title: "AI Synthesis",
    description:
      "Our AI cross-references, validates, and synthesizes data points into actionable strategic insights.",
    icon: Cpu,
    color: "from-emerald-500 to-teal-500",
    borderColor: "border-l-emerald-500",
  },
  {
    title: "Strategic Output",
    description:
      "Receive interactive dashboards, detailed PDF reports, and executive summaries with actionable recommendations.",
    icon: FileText,
    color: "from-orange-500 to-pink-500",
    borderColor: "border-l-orange-500",
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <section
      className="py-32 bg-gradient-to-b from-muted/30 to-background overflow-hidden relative"
      id="how-it-works"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 mb-6">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-sm font-semibold">Simple Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How <span className="text-gradient-purple">It Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From query to insight in seconds. Our agentic AI handles the complexity so you
            can focus on making strategic decisions.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-6 rounded-2xl glass border-l-4 ${step.borderColor} hover:bg-card/80 transition-all duration-300 group ${
                index === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Step number */}
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-card to-muted flex items-center justify-center text-sm font-bold border border-border">
                {index + 1}
              </div>

              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <step.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-full"
            onClick={() => navigate("/analysis")}
          >
            Start Your Analysis
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
