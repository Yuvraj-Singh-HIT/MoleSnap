import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GridBackground } from "@/components/ui/glowing-card";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-28 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-background to-teal-500/5" />
      
      {/* Animated floating elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <GridBackground
            title={
              <div className="flex items-center justify-center gap-3">
                <Sparkles className="w-6 h-6 text-emerald-500 animate-pulse" />
                <span>Ready to Transform Your Research?</span>
                <Sparkles className="w-6 h-6 text-emerald-500 animate-pulse" />
              </div>
            }
            description="Join thousands of leading researchers and organizations already using MoleSnap to accelerate their discovery process and make data-driven decisions."
            className="w-full"
          >
            <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg rounded-full border-2 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300"
              >
                Schedule a Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-sm">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-sm">14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-sm">Enterprise-grade security</span>
              </div>
            </div>
          </GridBackground>
        </motion.div>
      </div>
    </section>
  );
}
