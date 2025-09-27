import React, { useEffect, useMemo, useState } from 'react';
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
    <p className="mt-3 text-center text-base sm:text-lg text-slate-600">
      Re‑boussolez votre cadre parental — clarifiez, choisissez et organisez.
    </p>
  );
}

export default function App() {
  const [activeStep, setActiveStep] = useState(null); // null | 'N' | 'E' | 'S' | 'O'
  const [notes, setNotes] = useState({ N: '', E: '', S: '', O: '' });
  const [view, setView] = useState('main'); // 'main' | 'game'

  const storageKey = useMemo(() => 'boussole-parentale', []);

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

  function handleValidate(step) {
    setActiveStep(step);
    saveToLocalStorage(notes, step);
  }

  return (
    <div className="flex min-h-screen items-start sm:items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-4 flex justify-center gap-2">
          <button
            type="button"
            className={`btn glass ${view === 'main' ? 'ring-2 ring-slate-400' : ''}`}
            onClick={() => setView('main')}
          >
            Cadre parental
          </button>
          <button
            type="button"
            className={`btn glass ${view === 'game' ? 'ring-2 ring-slate-400' : ''}`}
            onClick={() => setView('game')}
          >
            Mini‑jeu
          </button>
        </div>

        {view === 'game' ? (
          <div className="flex justify-center">
            <CompassGame />
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <LogoBoussole activeStep={activeStep} />
              <Slogan />
            </div>

            <div className="mt-8 space-y-3">
              <Accordion defaultOpenId="N">
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
          </>
        )}
      </div>
    </div>
  );
}

