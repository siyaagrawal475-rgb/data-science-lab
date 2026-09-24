'use client';

import React, { useState } from 'react';
import {
  Layers,
  Bot,
  User,
  Send,
} from 'lucide-react';
import katex from 'katex';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  latex?: string;
  timestamp: string;
  category?: string;
}

const LOCAL_KNOWLEDGE_BASE: { keywords: string[]; answer: string; latex?: string; unitNumber: number }[] = [
  {
    keywords: ['tukey', 'outlier', 'fence', 'iqr', 'quartile'],
    unitNumber: 1,
    answer:
      'Tukey Fences identify outliers based on the Interquartile Range (IQR = Q3 - Q1). The Lower Fence is Q1 - 1.5×IQR, and the Upper Fence is Q3 + 1.5×IQR. Any observation beyond these fences is flagged as an outlier.',
    latex: '\\text{Lower} = Q_1 - 1.5 \\cdot \\text{IQR}, \\quad \\text{Upper} = Q_3 + 1.5 \\cdot \\text{IQR}',
  },
  {
    keywords: ['bessel', 'variance', 'standard deviation', 'n-1', 'degree of freedom'],
    unitNumber: 1,
    answer:
      'Bessel correction replaces N with n-1 in the sample variance denominator. Because the sample mean is used instead of the true population mean, dividing by n underestimates variance. Dividing by (n-1) yields an unbiased estimator.',
    latex: 's^2 = \\frac{1}{n-1}\\sum_{i=1}^n (x_i - \\bar{x})^2',
  },
  {
    keywords: ['dot product', 'inner product', 'cosine similarity', 'angle', 'orthogonal'],
    unitNumber: 2,
    answer:
      'The dot product of two vectors u and v is the sum of their pairwise coordinate products. Geometrically, it equals ||u|| ||v|| cos(θ). If u · v = 0 for non-zero vectors, they are strictly orthogonal (at 90 degrees).',
    latex: '\\mathbf{u} \\cdot \\mathbf{v} = \\sum_{i=1}^n u_i v_i = \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|\\cos(\\theta)',
  },
  {
    keywords: ['projection', 'proj', 'orthogonal component', 'gram-schmidt'],
    unitNumber: 2,
    answer:
      'The orthogonal projection of vector u onto vector v decomposes u into a component parallel to v and an orthogonal residual component.',
    latex: '\\text{proj}_{\\mathbf{v}}(\\mathbf{u}) = \\left(\\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\mathbf{v} \\cdot \\mathbf{v}}\\right) \\mathbf{v}',
  },
  {
    keywords: ['matrix', 'determinant', 'inverse', 'singular', 'det'],
    unitNumber: 3,
    answer:
      'The determinant represents the geometric volume/area scaling factor of a linear transformation. A matrix is invertible if and only if det(A) ≠ 0. If det(A) = 0, the matrix collapses space and is singular.',
    latex: 'A^{-1} = \\frac{1}{\\det(A)} \\text{adj}(A), \\quad \\det(A) \\neq 0',
  },
  {
    keywords: ['eigenvalue', 'eigenvector', 'characteristic equation'],
    unitNumber: 3,
    answer:
      'An eigenvector v of transformation A is a non-zero vector whose direction remains unchanged, scaled purely by scalar eigenvalue λ. We solve det(A - λI) = 0.',
    latex: 'A\\mathbf{v} = \\lambda \\mathbf{v} \\iff \\det(A - \\lambda I) = 0',
  },
  {
    keywords: ['bayes', 'prior', 'posterior', 'likelihood', 'conditional'],
    unitNumber: 4,
    answer:
      'Bayes Theorem computes the posterior probability of a hypothesis A given observed evidence B by updating the prior probability P(A) with likelihood P(B|A).',
    latex: 'P(A|B) = \\frac{P(B|A) P(A)}{P(B)} = \\frac{P(B|A)P(A)}{P(B|A)P(A) + P(B|\\neg A)P(\\neg A)}',
  },
  {
    keywords: ['p-value', 'hypothesis', 'null', 'significance', 'z-score', 'alpha'],
    unitNumber: 4,
    answer:
      'The p-value is the probability of obtaining test results at least as extreme as observed, assuming the null hypothesis H0 is true. If p ≤ α, we reject H0.',
    latex: 'z = \\frac{\\bar{x} - \\mu_0}{\\sigma / \\sqrt{n}}',
  },
  {
    keywords: ['regression', 'ols', 'least squares', 'slope', 'intercept', 'rss'],
    unitNumber: 5,
    answer:
      'Ordinary Least Squares (OLS) fits a linear equation y = β0 + β1 x by minimizing the residual sum of squares (RSS). The slope is β1 = r(sy / sx) and intercept β0 = ȳ - β1 x̄.',
    latex: '\\beta_1 = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum (x_i - \\bar{x})^2}, \\quad \\beta_0 = \\bar{y} - \\beta_1 \\bar{x}',
  },
  {
    keywords: ['gradient descent', 'learning rate', 'cost function', 'alpha', 'convergence'],
    unitNumber: 5,
    answer:
      'Gradient Descent optimizes parameters by taking steps proportional to the negative gradient of the loss function J(θ). The step size is controlled by learning rate α.',
    latex: '\\theta_j := \\theta_j - \\alpha \\frac{\\partial J(\\theta)}{\\partial \\theta_j}',
  },
  {
    keywords: ['precision', 'recall', 'f1', 'confusion matrix', 'accuracy'],
    unitNumber: 6,
    answer:
      'Precision measures how many predicted positives were truly positive: TP / (TP + FP). Recall measures how many actual positives were caught: TP / (TP + FN). F1 is the harmonic mean of both.',
    latex: 'F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}',
  },
  {
    keywords: ['sigmoid', 'logistic', 'log odds', 'logit'],
    unitNumber: 6,
    answer:
      'The Sigmoid function squashes any real-valued number into a valid probability range between 0 and 1, providing the activation for logistic regression.',
    latex: '\\sigma(z) = \\frac{1}{1 + e^{-z}}',
  },
];

export default function TutorPage() {
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');
  const [inputQuery, setInputQuery] = useState('');
  const msgCounterRef = React.useRef(0);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'tutor',
      text: 'Hello! I am your offline Data Science Mathematical Assistant. Ask me questions about exploratory data analysis, vector algebra, matrix transformations, probability theory, OLS regression, or classification metrics.',
      timestamp: 'Just now',
    },
  ]);

  const renderKatex = (latex: string) => {
    try {
      return { __html: katex.renderToString(latex, { throwOnError: false }) };
    } catch {
      return { __html: latex };
    }
  };

  const handleSend = (textToSend?: string) => {
    const q = (textToSend || inputQuery).trim();
    if (!q) return;

    msgCounterRef.current += 1;
    const nowStamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: `usr-${msgCounterRef.current}`,
      sender: 'user',
      text: q,
      timestamp: nowStamp,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');

    // Query match against local knowledge base
    const lowerQ = q.toLowerCase();
    let bestMatch = LOCAL_KNOWLEDGE_BASE.find((item) => {
      if (selectedUnit !== 'all' && item.unitNumber !== selectedUnit) return false;
      return item.keywords.some((kw) => lowerQ.includes(kw));
    });

    if (!bestMatch) {
      bestMatch = LOCAL_KNOWLEDGE_BASE.find((item) => item.keywords.some((kw) => lowerQ.includes(kw)));
    }

    setTimeout(() => {
      msgCounterRef.current += 1;
      let reply: ChatMessage;
      if (bestMatch) {
        reply = {
          id: `tut-${msgCounterRef.current}`,
          sender: 'tutor',
          text: bestMatch.answer,
          latex: bestMatch.latex,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      } else {
        reply = {
          id: `tut-${msgCounterRef.current}`,
          sender: 'tutor',
          text: `I've analyzed your question on "${q}". Based on the core curriculum, you can explore the dedicated interactive modules in Units 1–6 or try asking specifically about "Tukey fences", "dot product", "eigenvalues", "Bayes theorem", "OLS regression", or "precision vs recall".`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }
      setMessages((prev) => [...prev, reply]);
    }, 300);
  };

  const quickPrompts = [
    'How do Tukey outlier fences work?',
    'What is the difference between L1 and L2 norm?',
    'Explain Bayes Theorem and priors',
    'How is OLS slope calculated?',
    'What is the formula for F1-score?',
    'Explain eigenvalues and eigenvectors',
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <PageHeader
        title="AI Mathematical Tutor & Solver"
        description="Offline mathematical query assistance, formula derivations, step-by-step reasoning, and conceptual clarifications across Units 1–6."
        breadcrumbs={[{ label: 'Tutor' }]}
        actions={
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-300 dark:border-emerald-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Local Knowledge Engine Active
            </span>
          </div>
        }
      />

      {/* Unit Scope Selector */}
      <div className="flex items-center justify-between gap-4 p-3 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs text-xs">
        <div className="flex items-center gap-2 text-[#64748B] dark:text-[#B8C4D1]">
          <Layers className="w-4 h-4 text-[#416B9E] dark:text-[#91B9E8]" />
          <span className="font-semibold">Context Scope:</span>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => setSelectedUnit('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedUnit === 'all'
                ? 'bg-[#172033] dark:bg-[#202D3B] text-white shadow-xs'
                : 'text-[#64748B] dark:text-[#B8C4D1] hover:text-[#172033] dark:hover:text-white'
            }`}
          >
            All Units
          </button>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => setSelectedUnit(num)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedUnit === num
                  ? 'bg-[#172033] dark:bg-[#202D3B] text-white shadow-xs'
                  : 'text-[#64748B] dark:text-[#B8C4D1] hover:text-[#172033] dark:hover:text-white'
              }`}
            >
              Unit {num}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Conversation Window */}
      <div className="bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs flex flex-col h-[520px] overflow-hidden">
        {/* Messages Feed */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white ${
                  m.sender === 'user'
                    ? 'bg-[#416B9E]'
                    : 'bg-[#172033] dark:bg-[#202D3B] border border-transparent dark:border-[#2E3B4A]'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-[#91B9E8]" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-4 space-y-2 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#E5EFFB] dark:bg-[#1E2D3E] text-[#172033] dark:text-[#F1F5F9] rounded-tr-xs'
                    : 'bg-[#F8FAFC] dark:bg-[#101923] border border-[#E2E8F0] dark:border-[#2E3B4A] text-[#172033] dark:text-[#F1F5F9] rounded-tl-xs'
                }`}
              >
                <p>{m.text}</p>
                {m.latex && (
                  <div
                    className="p-2.5 bg-white dark:bg-[#151F2B] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] overflow-x-auto text-center"
                    dangerouslySetInnerHTML={renderKatex(m.latex)}
                  />
                )}
                <div className="text-[10px] text-[#94A3B8] dark:text-[#7F8B99] text-right font-mono">
                  {m.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="p-3 bg-[#F8FAFC] dark:bg-[#101923] border-t border-[#E2E8F0] dark:border-[#2E3B4A] overflow-x-auto flex items-center gap-2">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              className="whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#1B2735] border border-[#E2E8F0] dark:border-[#2E3B4A] text-[#475569] dark:text-[#CBD5E1] hover:border-[#91B9E8] hover:text-[#172033] dark:hover:text-white transition-colors cursor-pointer shadow-2xs"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-white dark:bg-[#151F2B] border-t border-[#E2E8F0] dark:border-[#2E3B4A] flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask a question about formulas, definitions, or algorithms..."
            className="flex-1 bg-[#F8FAFC] dark:bg-[#101923] text-xs sm:text-sm text-[#0F172A] dark:text-[#F1F5F9] border border-[#E2E8F0] dark:border-[#2E3B4A] rounded-xl px-4 py-2.5 focus:border-[#91B9E8] focus:outline-none transition-colors"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            rightIcon={<Send className="w-4 h-4" />}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
