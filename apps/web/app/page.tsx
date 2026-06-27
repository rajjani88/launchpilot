"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Check, 
  Sparkles, 
  Cpu, 
  Search, 
  BarChart3, 
  Rocket, 
  ShieldAlert, 
  CheckCircle,
  Menu,
  X,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth, UserButton } from "@clerk/nextjs";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { isSignedIn } = useAuth();

  return (
    <div className="dark bg-zinc-950 text-zinc-50 min-h-screen font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-indigo-900/10 via-purple-900/5 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] left-[50%] -translate-x-[50%] w-[800px] h-[400px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-lg shadow-indigo-500/20">
              <Rocket className="h-5 w-5 text-white animate-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-200 via-indigo-100 to-white bg-clip-text text-transparent">
              LaunchPilot
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">
              Pricing
            </a>
            <a href="http://localhost:3002" target="_blank" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">
              Docs
            </a>
          </nav>

          {/* Authentication Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isSignedIn ? (
              <>
                <Button variant="ghost" asChild className="hover:text-white">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="hover:text-white">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-md shadow-indigo-600/20">
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-zinc-400 hover:text-white transition-colors"
            >
              How It Works
            </a>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a 
              href="http://localhost:3002" 
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Docs
            </a>
            <hr className="border-zinc-800 my-2" />
             <div className="flex flex-col gap-3">
              {isSignedIn ? (
                <Button variant="outline" asChild className="w-full justify-center">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full justify-center">
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-500 justify-center">
                    <Link href="/sign-up">Get Started Free</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="container mx-auto max-w-5xl px-4 pt-16 pb-20 text-center relative">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 px-3 py-1 text-xs text-indigo-400 font-medium mb-6">
          <Sparkles className="h-3 w-3" />
          AI-Powered Pre-Launch Verification
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
          Verify your mobile app.<br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Before the App Store does.
          </span>
        </h1>

        <p className="text-zinc-400 text-base sm:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
          Analyze store guidelines, ASO visibility, and design layout issues using advanced AI. Avoid rejections, optimize keywords, and ship with 100% confidence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Button size="lg" asChild className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 font-semibold rounded-xl h-12 px-6">
            <Link href="/dashboard">
              Start Free Audit <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 font-semibold rounded-xl h-12 px-6">
            <a href="http://localhost:3002" target="_blank">
              Read Developer Docs
            </a>
          </Button>
        </div>

        {/* INTERACTIVE DASHBOARD PREVIEW */}
        <div className="mt-16 rounded-2xl border border-zinc-800 bg-zinc-900/20 p-2 backdrop-blur-sm shadow-2xl relative group">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-50 blur-xl group-hover:opacity-80 transition-opacity pointer-events-none" />
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden text-left shadow-inner">
            
            {/* Header bar of mock UI */}
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 bg-zinc-950/80">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/70" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <div className="h-3 w-3 rounded-full bg-green-500/70" />
                <span className="text-xs text-zinc-500 ml-4 font-mono">launchpilot_dashboard.app</span>
              </div>
              <div className="flex h-5 w-40 items-center justify-center rounded bg-zinc-900 text-[10px] text-zinc-500 font-medium">
                Audit Report: Wingman AI v1.2
              </div>
            </div>

            {/* Content of mock UI */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800 p-6 gap-6">
              
              {/* Col 1: Health score */}
              <div className="flex flex-col items-center justify-center py-4 text-center">
                <div className="relative flex items-center justify-center h-32 w-32 rounded-full border-4 border-zinc-800 bg-zinc-950">
                  <div className="absolute inset-2 rounded-full border border-indigo-500/20" />
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-extrabold text-indigo-400">94</span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Health Score</span>
                  </div>
                  {/* Glowing border slice */}
                  <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" fill="transparent" stroke="url(#gradient)" strokeWidth="4" strokeDasharray="290" strokeDashoffset="40" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#c084fc" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="mt-4 flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs text-emerald-400 font-medium">
                  <CheckCircle className="h-3 w-3" /> Ready for submission
                </div>
              </div>

              {/* Col 2: Policy checklist */}
              <div className="flex flex-col justify-center py-2 space-y-3">
                <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Store Policy Checks</span>
                
                <div className="flex items-start gap-2 text-sm text-zinc-300">
                  <CheckCircle className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-xs">Privacy Policy URL</p>
                    <p className="text-[10px] text-zinc-500">Valid privacy policy linked in app metadata.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-sm text-zinc-300">
                  <ShieldAlert className="h-4 w-4 text-amber-400 mt-0.5 shrink-0 animate-pulse" />
                  <div>
                    <p className="font-semibold text-xs text-amber-400">Missing Subscriptions webhook</p>
                    <p className="text-[10px] text-zinc-500">Stripe backend missing a setup verification.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-sm text-zinc-300">
                  <CheckCircle className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-xs">In-App Purchase Guideline 3.1.1</p>
                    <p className="text-[10px] text-zinc-500">Restore Purchase button visible in setup.</p>
                  </div>
                </div>
              </div>

              {/* Col 3: ASO & competitor benchmarks */}
              <div className="flex flex-col justify-center py-2 space-y-4">
                <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">ASO Insights</span>
                
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-medium">Title Keyword Density</span>
                    <span className="text-indigo-400 font-semibold">Good (4.2%)</span>
                  </div>
                  <div className="h-1.5 w-full rounded bg-zinc-800">
                    <div className="h-full w-[80%] rounded bg-indigo-500" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-medium">Description Readability</span>
                    <span className="text-purple-400 font-semibold">Excellent</span>
                  </div>
                  <div className="h-1.5 w-full rounded bg-zinc-800">
                    <div className="h-full w-[95%] rounded bg-purple-500" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-zinc-800">
                  <span className="text-zinc-500">Competitor Score Overlap</span>
                  <span className="text-emerald-400 font-medium">+12% higher</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section id="features" className="border-t border-zinc-900 bg-zinc-950 px-4 py-20 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Engineered for Mobile Developers
            </h2>
            <p className="text-zinc-400 mt-4 leading-relaxed">
              LaunchPilot combines deep-scanning LLMs with platform-specific rules to audit your app across three critical areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            
            <Card className="border-zinc-800/80 bg-zinc-900/30 backdrop-blur-sm shadow-xl hover:border-indigo-500/30 hover:bg-zinc-900/50 transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100">AI Store Compliance</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Scan your app descriptions, metadata, screenshots, and guidelines to spot potential App Store or Google Play rejection pitfalls automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="border-zinc-800/80 bg-zinc-900/30 backdrop-blur-sm shadow-xl hover:border-purple-500/30 hover:bg-zinc-900/50 transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100">ASO Keyword Architect</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Analyze search volume and keyword density. Get immediate layout suggestions to boost organic ranking visibility and discoverability in the stores.
                </p>
              </CardContent>
            </Card>

            <Card className="border-zinc-800/80 bg-zinc-900/30 backdrop-blur-sm shadow-xl hover:border-pink-500/30 hover:bg-zinc-900/50 transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center border border-pink-500/20">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100">UI/UX Layout Audit</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Upload screenshot mockups and receive visual checks for layout spacing, text size contrast, and alignment to ensure a premium user flow.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="border-t border-zinc-900 bg-zinc-950/50 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Simple 3-Step Verification
            </h2>
            <p className="text-zinc-400 mt-4 leading-relaxed">
              Scan, fix, and ship. Get actionable intelligence for your pre-launch builds in under 5 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 relative">
            <div className="absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 -translate-y-1/2 hidden md:block z-0 pointer-events-none" />
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-zinc-900 border border-zinc-800 font-extrabold text-lg text-indigo-400 flex items-center justify-center shadow-lg">
                1
              </div>
              <h3 className="text-base font-bold text-zinc-200 mt-6">Create & Add App</h3>
              <p className="text-zinc-400 text-sm mt-3 px-4 leading-relaxed">
                Define your project and app metadata, and link your store layout details.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-zinc-900 border border-zinc-800 font-extrabold text-lg text-purple-400 flex items-center justify-center shadow-lg">
                2
              </div>
              <h3 className="text-base font-bold text-zinc-200 mt-6">AI Deep-Scan</h3>
              <p className="text-zinc-400 text-sm mt-3 px-4 leading-relaxed">
                Our model pipelines run real-time checks matching recent rules and standards.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-zinc-900 border border-zinc-800 font-extrabold text-lg text-pink-400 flex items-center justify-center shadow-lg">
                3
              </div>
              <h3 className="text-base font-bold text-zinc-200 mt-6">Download Actionable Report</h3>
              <p className="text-zinc-400 text-sm mt-3 px-4 leading-relaxed">
                Review specific design and metadata recommendations to launch successfully.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="border-t border-zinc-900 bg-zinc-950 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Simple, transparent pricing
            </h2>
            <p className="text-zinc-400 mt-4 leading-relaxed">
              Start verifying for free, then scale up as your development pipeline grows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-16">
            
            {/* Free Tier */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/10 p-8 backdrop-blur-sm flex flex-col justify-between hover:border-zinc-700/50 transition-colors">
              <div>
                <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Starter</span>
                <div className="flex items-baseline mt-4">
                  <span className="text-4xl font-extrabold text-zinc-100">$0</span>
                  <span className="text-zinc-500 text-sm ml-2">/ month</span>
                </div>
                <p className="text-zinc-400 text-sm mt-4 leading-relaxed">
                  Perfect for independent developers preparing a single mobile app launch.
                </p>
                <hr className="border-zinc-800/80 my-6" />
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-indigo-400 shrink-0" /> 1 App Project
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-indigo-400 shrink-0" /> 3 AI Audits per month
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-indigo-400 shrink-0" /> Standard keyword suggestions
                  </li>
                </ul>
              </div>
              <Button variant="outline" asChild className="w-full border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-200 font-semibold rounded-xl h-11 mt-8">
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </div>

            {/* Pro Tier */}
            <div className="rounded-2xl border-2 border-indigo-600 bg-zinc-900/30 p-8 backdrop-blur-sm flex flex-col justify-between relative shadow-indigo-600/5 shadow-2xl">
              <div className="absolute top-0 right-8 -translate-y-1/2 rounded-full bg-indigo-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                Most Popular
              </div>
              <div>
                <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider">Developer Pro</span>
                <div className="flex items-baseline mt-4">
                  <span className="text-4xl font-extrabold text-zinc-100">$49</span>
                  <span className="text-zinc-500 text-sm ml-2">/ month</span>
                </div>
                <p className="text-zinc-400 text-sm mt-4 leading-relaxed">
                  For active developers shipping multiple builds and updating ASO frequently.
                </p>
                <hr className="border-zinc-800/80 my-6" />
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-indigo-400 shrink-0" /> Unlimited Projects
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-indigo-400 shrink-0" /> Real-time BullMQ background queues
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-indigo-400 shrink-0" /> Advanced policy compliance & layout checks
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-indigo-400 shrink-0" /> Competitor ASO monitoring
                  </li>
                </ul>
              </div>
              <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl h-11 mt-8 shadow-lg shadow-indigo-600/20">
                <Link href="/dashboard">Upgrade to Pro</Link>
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-12 px-4 text-zinc-500 text-sm">
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-400">LaunchPilot</span>
            <span>© {new Date().getFullYear()}. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="http://localhost:3002" target="_blank" className="hover:text-zinc-300 transition-colors">Documentation</a>
            <a href="#features" className="hover:text-zinc-300 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-zinc-300 transition-colors">Pricing</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

