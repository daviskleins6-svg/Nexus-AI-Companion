
import React, { useState, useEffect } from 'react';
import { generateLuauSystem } from './services/geminiService';
import { GenerationResult } from './types';
import { BentoGrid } from './components/BentoGrid';
import { 
  Zap, Search, Loader2, Sparkles, Cpu, Code2, 
  BrainCircuit, CheckCircle2, Terminal, Rocket,
  GraduationCap, ShieldCheck
} from 'lucide-react';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [data, setData] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleGenerate = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const activePrompt = customPrompt || prompt;
    if (!activePrompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setError(null);
    setData(null);
    setShowWelcome(false);

    const result = await generateLuauSystem(activePrompt);
    
    if (result) {
      setData(result);
    } else {
      setError("Nexus Core neural bridge unstable. Verify API credentials and try again.");
    }
    setIsGenerating(false);
  };

  const handleQuestionClick = (q: string) => {
    setPrompt(prev => `${prev}\n\n[CLARIFICATION]: ${q}`);
    handleGenerate(undefined, `${prompt}\n\n[CLARIFICATION]: ${q}`);
  };

  const onboardingOptions = [
    { title: "Combat Architecture", desc: "Raycast hitboxes & server validation.", icon: <Zap className="w-4 h-4" /> },
    { title: "Data Persistence", desc: "Secure ProfileService wrappers.", icon: <ShieldCheck className="w-4 h-4" /> },
    { title: "Knit Microservices", desc: "Client-Server framework skeleton.", icon: <Terminal className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100 flex flex-col selection:bg-purple-500/30">
      {/* Navigation */}
      <header className="border-b border-zinc-800/50 glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center nexus-glow shadow-purple-500/20 shadow-lg">
            <BrainCircuit className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-white">NEXUS-COMPANION</h1>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Engineering Partner Beta</p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
           <div className="flex items-center gap-1"><GraduationCap className="w-3 h-3" /> Mentorship: ON</div>
           <div className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Guardian: ACTIVE</div>
        </div>
      </header>

      <main className="flex-grow pb-24">
        {/* Hero Section */}
        <section className={`pt-20 px-6 text-center max-w-4xl mx-auto transition-all duration-700 ${data ? 'pt-10 pb-6' : 'pb-12'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-mono text-purple-400 uppercase tracking-widest mb-6">
            <Rocket className="w-3 h-3" /> Neural Link Established
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-zinc-400 to-zinc-600 bg-clip-text text-transparent leading-[1.1]">
            Build Robust Luau <br /> Systems, Surgically.
          </h2>
          <p className="text-zinc-500 text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Your senior architectural partner. I think in systems, mentoring you through modern Luau patterns with surgical precision.
          </p>

          <form onSubmit={handleGenerate} className="relative group max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-purple-500/20 blur-3xl group-focus-within:bg-purple-500/30 transition-all rounded-full"></div>
            <div className="relative flex items-center bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl focus-within:border-purple-500/50 focus-within:ring-4 ring-purple-500/5 transition-all">
              <div className="pl-6 text-zinc-500">
                <Search className="w-5 h-5" />
              </div>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Architect a system (e.g., 'Inventory with Knit')..."
                className="w-full bg-transparent border-none focus:ring-0 py-5 px-4 text-zinc-200 placeholder:text-zinc-600 text-lg resize-none h-[68px] scrollbar-none"
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleGenerate(); } }}
              />
              <button 
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="mr-3 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-black py-3 px-6 rounded-xl transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-purple-500/20"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Engaging...</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-5 h-5" />
                    <span>Engage</span>
                  </>
                )}
              </button>
            </div>
          </form>
          {error && <p className="mt-4 text-red-500 text-xs font-mono bg-red-500/10 inline-block px-4 py-1 rounded-full border border-red-500/20">{error}</p>}
        </section>

        {/* Dynamic Content */}
        <div className="px-4">
          {data ? (
            <BentoGrid data={data} onQuestionClick={handleQuestionClick} />
          ) : !isGenerating ? (
             <div className="max-w-4xl mx-auto mt-8">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                 {onboardingOptions.map((opt, i) => (
                   <button 
                    key={i}
                    onClick={() => { setPrompt(opt.desc); handleGenerate(undefined, opt.desc); }}
                    className="glass p-6 rounded-3xl text-left border-zinc-800/50 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all group"
                   >
                     <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all">
                       {opt.icon}
                     </div>
                     <h4 className="font-bold text-sm text-zinc-200">{opt.title}</h4>
                     <p className="text-[10px] font-mono text-zinc-500 uppercase mt-1">{opt.desc}</p>
                   </button>
                 ))}
               </div>
               
               <div className="text-center opacity-40">
                 <div className="inline-flex items-center gap-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest border border-zinc-800 px-6 py-2 rounded-full">
                   <span>Strict Luau Mode</span>
                   <div className="w-1 h-1 rounded-full bg-zinc-700"></div>
                   <span>Task Scheduler Opt</span>
                   <div className="w-1 h-1 rounded-full bg-zinc-700"></div>
                   <span>Guardian AI</span>
                 </div>
               </div>
             </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 space-y-8 animate-in zoom-in duration-500">
              <div className="relative">
                <div className="w-32 h-32 border-4 border-purple-500/10 rounded-full animate-ping absolute top-0 left-0"></div>
                <div className="w-32 h-32 border-4 border-purple-500/20 rounded-full animate-pulse flex items-center justify-center">
                  <BrainCircuit className="w-12 h-12 text-purple-500 animate-bounce" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-2xl font-black text-white uppercase tracking-tighter">Synthesizing Architecture</p>
                <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-500">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <span>Executing Plan Phase...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-900 bg-zinc-950/80 backdrop-blur-xl mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity">
            <div className="p-1.5 bg-zinc-800 rounded-lg">
              <Zap className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase">Nexus Partner Ecosystem v2.4</span>
          </div>
          <div className="flex gap-8 text-[9px] font-mono text-zinc-600 uppercase tracking-widest font-bold">
            <span className="flex items-center gap-1"><Code2 className="w-3 h-3"/> Strict typing</span>
            <span className="flex items-center gap-1"><Terminal className="w-3 h-3"/> Task scheduler</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> Guardian active</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
