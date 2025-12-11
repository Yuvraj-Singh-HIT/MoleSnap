import { motion } from "framer-motion";
import { Beaker, TrendingUp, FileText } from "lucide-react";

const audiences = [
  {
    title: "R&D Teams",
    description:
      "Accelerate drug discovery by rapidly evaluating repurposing opportunities with comprehensive data insights.",
    icon: Beaker,
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    title: "Business Development",
    description:
      "Identify strategic partnerships and licensing opportunities with market and clinical data at your fingertips.",
    icon: TrendingUp,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    title: "Strategy Teams",
    description:
      "Make data-driven decisions on portfolio investments and product launches with competitive intelligence.",
    icon: FileText,
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
  },
];

export default function WhoIsItFor() {
  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-blob opacity-70" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000 opacity-70" />
      <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-4000 opacity-70" />

      <div className="max-w-7xl mx-auto relative z-10">
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
            <span className="text-sm font-semibold">Built for Professionals</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Who Is It <span className="text-gradient-emerald">For?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            MoleSnap empowers professionals across the pharmaceutical value chain with actionable
            intelligence.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${audience.bgGradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="relative p-8 rounded-3xl glass hover:bg-card/80 transition-all duration-500 h-full flex flex-col">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${audience.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                >
                  <audience.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4">{audience.title}</h3>
                <p className="text-muted-foreground flex-1">{audience.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
