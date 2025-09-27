import React, { useEffect, useMemo, useState } from 'react';
import LogoBoussole from './components/LogoBoussole.jsx';
import CompassGame from './components/CompassGame.jsx';
import Accordion from './components/Accordion.jsx';
import AccordionItem from './components/AccordionItem.jsx';

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

        <div className="mt-10">
          <CompassGame />
        </div>
      </div>
    </div>
  );
}

