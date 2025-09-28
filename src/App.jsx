import React, { useEffect, useMemo, useRef, useState } from 'react';
import LogoBoussole from './components/LogoBoussole.jsx';
import Accordion from './components/Accordion.jsx';
import AccordionItem from './components/AccordionItem.jsx';
import CompassGame from './components/CompassGame.jsx';

const STEP_METADATA = {
  N: { title: 'N – Nommer', color: 'blue-600' },
  E: { title: 'E – Explorer', color: 'green-600' },
  S: { title: 'S – Sélectionner', color: 'orange-600' },
  O: { title: 'O – Organiser', color: 'purple-600' },
};

function Slogan() {
  return (
    <p className="mt-3 text-center text-base sm:text-lg text-slate-600 dark:text-slate-300">
      Re‑boussolez votre cadre parental — clarifiez, choisissez et organisez.
    </p>
  );
}

export default function App() {
  const [activeStep, setActiveStep] = useState(null); // null | 'N' | 'E' | 'S' | 'O'
  const [notes, setNotes] = useState({ N: '', E: '', S: '', O: '' });
  const [openId, setOpenId] = useState('N');
  const [view, setView] = useState('main'); // 'main' | 'game'
  const [dark, setDark] = useState(false);

  const storageKey = useMemo(() => 'boussole-parentale', []);
  const fileInputRef = useRef(null);
  const [copyOk, setCopyOk] = useState(false);

  function loadFromLocalStorage() {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        if (parsed.notes) setNotes({ ...{ N: '', E: '', S: '', O: '' }, ...parsed.notes });
        if (parsed.activeStep === 'N' || parsed.activeStep === 'E' || parsed.activeStep === 'S' || parsed.activeStep === 'O') {
          setActiveStep(parsed.activeStep);
        }
      }
    } catch (_) {
      // ignore
    }
  }

  function saveToLocalStorage(nextNotes, nextActiveStep) {
    try {
      const payload = {
        notes: nextNotes ?? notes,
        activeStep: nextActiveStep ?? activeStep,
      };
      window.localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch (_) {
      // ignore
    }
  }

  useEffect(() => {
    loadFromLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    saveToLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes, activeStep]);

  // Thème sombre persistant
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('theme');
      if (raw === 'dark') {
        setDark(true);
        document.documentElement.classList.add('dark');
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      window.localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  function handleValidate(step) {
    setActiveStep(step);
    saveToLocalStorage(notes, step);
    // auto‑avance
    const order = ['N', 'E', 'S', 'O'];
    const idx = order.indexOf(step);
    const next = order[(idx + 1) % order.length];
    setOpenId(next);
  }

  function handleExport() {
    try {
      const payload = { notes, activeStep };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'boussole-parentale.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (_) {
      // ignore
    }
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  async function handleImportChange(e) {
    try {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (parsed && typeof parsed === 'object') {
        if (parsed.notes && typeof parsed.notes === 'object') {
          setNotes({ N: parsed.notes.N || '', E: parsed.notes.E || '', S: parsed.notes.S || '', O: parsed.notes.O || '' });
        }
        if (parsed.activeStep === 'N' || parsed.activeStep === 'E' || parsed.activeStep === 'S' || parsed.activeStep === 'O' || parsed.activeStep === null) {
          setActiveStep(parsed.activeStep);
        }
      }
    } catch (_) {
      // ignore
    } finally {
      if (e?.target) e.target.value = '';
    }
  }

  function handleReset() {
    try {
      setNotes({ N: '', E: '', S: '', O: '' });
      setActiveStep(null);
      window.localStorage.removeItem(storageKey);
    } catch (_) {
      // ignore
    }
  }

  async function handleCopySummary() {
    try {
      const lines = [
        '# Boussole Parentale',
        '',
        `N – Nommer:\n${notes.N || '—'}`,
        '',
        `E – Explorer:\n${notes.E || '—'}`,
        '',
        `S – Sélectionner:\n${notes.S || '—'}`,
        '',
        `O – Organiser:\n${notes.O || '—'}`,
      ];
      const text = lines.join('\n');
      await navigator.clipboard.writeText(text);
      setCopyOk(true);
      setTimeout(() => setCopyOk(false), 1500);
    } catch (_) {}
  }

  return (
    <div className="flex min-h-screen items-start sm:items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoBoussole activeStep={activeStep} />
            <div className="hidden sm:block">
              <Slogan />
            </div>
          </div>
          <button type="button" onClick={() => setView((v) => (v === 'main' ? 'game' : 'main'))} className="btn glass focus-visible:ring-slate-600">
            {view === 'main' ? 'Mini‑jeu' : 'Retour'}
          </button>
        </div>

        {view === 'main' ? (
          <div className="mt-8 space-y-3">
            <Accordion defaultOpenId="N" openId={openId} onOpenIdChange={setOpenId}>
              {(['N', 'E', 'S', 'O']).map((step) => (
                <AccordionItem
                  key={step}
                  id={step}
                  title={STEP_METADATA[step].title}
                  color={STEP_METADATA[step].color}
                  value={notes[step]}
                  onChange={(v) => setNotes((prev) => ({ ...prev, [step]: v }))}
                  onValidate={() => handleValidate(step)}
                />
              ))}
            </Accordion>
          </div>
        ) : (
          <div className="mt-6">
            <CompassGame />
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <button type="button" onClick={() => setDark((v) => !v)} className="btn glass focus-visible:ring-slate-600">
            {dark ? 'Mode clair' : 'Mode sombre'}
          </button>
          <button type="button" onClick={handleCopySummary} className="btn glass focus-visible:ring-slate-600">
            {copyOk ? 'Copié ✔' : 'Copier le résumé'}
          </button>
          <button type="button" onClick={handleExport} className="btn glass focus-visible:ring-slate-600">
            Exporter
          </button>
          <button type="button" onClick={handleImportClick} className="btn glass focus-visible:ring-slate-600">
            Importer
          </button>
          <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImportChange} />
          <button type="button" onClick={handleReset} className="btn glass focus-visible:ring-red-600 text-red-700 hover:bg-white/70">
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
}

