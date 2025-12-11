import { motion } from "framer-motion";
import { FileText, Globe, Search, Atom, Users } from "lucide-react";
import { GlowingCard } from "@/components/ui/glowing-card";

const features = [
  {
    title: "AI-Powered Report Generation",
    description:
      "Transform raw data into actionable insights with our intelligent report generator. Automated agents analyze complex datasets to deliver comprehensive summaries and strategic recommendations in seconds.",
    icon: FileText,
    gradient: "from-purple-500 to-pink-500",
    glowColor: "purple" as const,
  },
  {
    title: "Real-Time Insight Monitoring",
    description:
      "Stay ahead with live analytics that track critical trends and anomalies as they emerge. Intelligent monitoring agents continuously evaluate incoming data streams to deliver timely alerts.",
    icon: Globe,
    gradient: "from-blue-500 to-cyan-500",
    glowColor: "blue" as const,
  },
  {
    title: "Intelligent Data Extraction",
    description:
      "Automatically extract relevant data from documents, spreadsheets, APIs, and reports. Our AI agents parse unstructured information with precision to deliver clean, structured datasets.",
    icon: Search,
    gradient: "from-emerald-500 to-teal-500",
    glowColor: "emerald" as const,
  },
  {
    title: "3D Molecule Visualization",
    description:
      "Explore molecular structures in stunning 3D detail. Interactive visualization helps researchers understand complex molecular interactions and properties at a glance.",
    icon: Atom,
    gradient: "from-orange-500 to-pink-500",
    glowColor: "orange" as const,
  },
  {
    title: "Seamless Workflow Integration",
    description:
      "Integrate effortlessly with your existing tools, databases, and pipelines. Automated connectors synchronize data across platforms to streamline operations.",
    icon: Users,
    gradient: "from-purple-500 to-blue-500",
    glowColor: "purple" as const,
  },
];

export default function KeyFeatures() {
  return (
    <section
      className="py-32 bg-gradient-to-b from-background to-muted/30 overflow-hidden relative"
      id="features"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-emerald-500/30 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-semibold">Powerful Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need for{" "}
            <span className="text-gradient-emerald">Drug Discovery</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform provides comprehensive tools for molecule analysis,
            research, and strategic decision-making.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={index === 4 ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <GlowingCard glowColor={feature.glowColor} className="h-full">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </GlowingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
