
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LuauModule, GenerationResult } from '../types';
import { 
  Copy, Terminal, Shield, User, Share2, Info, ChevronRight, 
  FileCode, BrainCircuit, CheckCircle2, AlertCircle, 
  ShieldAlert, BookOpen, GraduationCap, ListChecks, 
  Sparkles, History
} from 'lucide-react';

interface BentoGridProps {
  data: GenerationResult;
  onQuestionClick: (q: string) => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ data, onQuestionClick }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'server': return <Shield className="w-5 h-5 text-red-400" />;
      case 'client': return <User className="w-5 h-5 text-blue-400" />;
      case 'shared': return <Share2 className="w-5 h-5 text-purple-400" />;
      default: return <FileCode className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-4 animate-in fade-in duration-700">
      <div className="bento-grid">
        
        {/* GUARDIAN ALERT - Only shows if model detects danger */}
        {data.guardianAlert && (
          <div className="col-span-12 glass border-red-500/50 bg-red-950/20 p-6 rounded-3xl flex items-start gap-4 animate-bounce-slow">
            <div className="p-3 bg-red-500 rounded-2xl">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-black text-red-400 uppercase tracking-tighter">Guardian Mode Intervention</h3>
              <p className="text-zinc-300 text-sm mt-1">{data.guardianAlert}</p>
            </div>
          </div>
        )}

        {/* Surgical UI: What Changed? */}
        <div className="col-span-12 lg:col-span-7 glass p-6 rounded-3xl border-emerald-500/20 bg-gradient-to-br from-emerald-900/10 to-transparent">
          <div className="flex items-center gap-3 mb-4">
            <History className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-bold text-white uppercase tracking-tighter">Surgical Summary: What Changed?</h3>
          </div>
          <div className="prose prose-invert prose-sm max-w-none text-zinc-300">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.whatChanged}</ReactMarkdown>
          </div>
        </div>

        {/* CLARIFYING QUESTIONS - For vague prompts */}
        {data.clarifyingQuestions && data.clarifyingQuestions.length > 0 && (
          <div className="col-span-12 lg:col-span-5 glass p-6 rounded-3xl border-amber-500/30">
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-6 h-6 text-amber-400" />
              <h3 className="text-lg font-bold text-white uppercase tracking-tighter">Clarifying Points</h3>
            </div>
            <div className="space-y-2">
              {data.clarifyingQuestions.map((q, i) => (
                <button 
                  key={i}
                  onClick={() => onQuestionClick(q)}
                  className="w-full text-left p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-800 transition-all text-xs font-mono text-zinc-400 flex items-center justify-between group"
                >
                  <span>{q}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ARCHITECTURAL PLAN */}
        <div className="col-span-12 lg:col-span-8 glass p-6 rounded-3xl border-purple-500/30">
          <div className="flex items-center gap-3 mb-4">
            <BrainCircuit className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-bold text-white uppercase tracking-tighter">System Blueprint (plan.md)</h3>
          </div>
          <div className="bg-zinc-950/40 p-5 rounded-2xl border border-zinc-800/50 max-h-[400px] overflow-auto scrollbar-thin">
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.plan}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* PRE-FLIGHT VERIFICATION */}
        <div className="col-span-12 lg:col-span-4 glass p-6 rounded-3xl border-blue-500/30 bg-blue-900/5">
          <div className="flex items-center gap-3 mb-4">
            <ListChecks className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-bold text-white uppercase tracking-tighter">Pre-Flight Checks</h3>
          </div>
          <ul className="space-y-3">
            {data.preFlightCheck.map((check, i) => (
              <li key={i} className="flex items-start gap-3 text-[11px] text-zinc-400 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{check}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* EDUCATIONAL DEEP DIVE */}
        <div className="col-span-12 glass p-8 rounded-3xl border-zinc-800 bg-gradient-to-r from-zinc-900/50 to-transparent">
          <div className="flex items-center gap-4 mb-6">
            <GraduationCap className="w-10 h-10 text-purple-400" />
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">Engineering Mentorship</h3>
              <p className="text-xs font-mono text-zinc-500 mt-1 uppercase tracking-widest">ELI5 + Technical Analysis</p>
            </div>
          </div>
          <div className="prose prose-invert prose-sm max-w-none text-zinc-400">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.educationalDeepDive}</ReactMarkdown>
          </div>
        </div>

        {/* MODULE CARDS */}
        {data.modules.map((module, idx) => (
          <div 
            key={idx} 
            className={`col-span-12 ${module.type === 'server' || module.type === 'client' ? 'md:col-span-6' : 'md:col-span-4'} glass rounded-3xl overflow-hidden flex flex-col transition-all hover:shadow-2xl hover:shadow-blue-500/5 group border-zinc-800/50`}
          >
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-zinc-700 transition-colors">
                  {getIcon(module.type)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-200">{module.title}</h4>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">{module.filename}</p>
                </div>
              </div>
              <button 
                onClick={() => copyToClipboard(module.code, idx)}
                className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 transition-colors relative"
              >
                {copiedIndex === idx ? <span className="text-emerald-400 text-[10px] absolute -top-8 right-0 font-mono bg-zinc-900 px-2 py-1 rounded border border-zinc-800">COPIED!</span> : null}
                <Copy className={`w-4 h-4 ${copiedIndex === idx ? 'text-emerald-400' : ''}`} />
              </button>
            </div>
            
            <div className="p-4 bg-zinc-950/80 flex-grow max-h-[500px] overflow-auto scrollbar-thin">
              <pre className="text-[12px] font-mono text-zinc-300 leading-relaxed">
                <code>{module.code}</code>
              </pre>
            </div>

            <div className="p-4 bg-zinc-900/30 text-[11px] text-zinc-500 italic border-t border-zinc-800 flex items-start gap-2">
               <BookOpen className="w-3 h-3 mt-0.5 flex-shrink-0 text-zinc-600" />
               <span>{module.description}</span>
            </div>
          </div>
        ))}
        
        {/* QUICK START / ONBOARDING */}
        {data.quickStart && (
          <div className="col-span-12 glass p-6 rounded-3xl border-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">Next Steps / Quick Start</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.quickStart.map((step, i) => (
                <div key={i} className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 text-[11px] font-mono text-zinc-400">
                  <span className="text-blue-500 mr-2">0{i+1}.</span> {step}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
