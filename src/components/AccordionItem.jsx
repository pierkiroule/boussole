import React from 'react';

const colorTextClass = (color) => {
  switch (color) {
    case 'blue-600':
      return 'text-blue-600';
    case 'green-600':
      return 'text-green-600';
    case 'orange-600':
      return 'text-orange-600';
    case 'purple-600':
      return 'text-purple-600';
    default:
      return 'text-slate-700';
  }
};

const colorRingClass = (color) => {
  switch (color) {
    case 'blue-600':
      return 'focus-visible:ring-blue-600';
    case 'green-600':
      return 'focus-visible:ring-green-600';
    case 'orange-600':
      return 'focus-visible:ring-orange-600';
    case 'purple-600':
      return 'focus-visible:ring-purple-600';
    default:
      return 'focus-visible:ring-slate-600';
  }
};

export default function AccordionItem({ id, title, color, value, onChange, onValidate, isOpen, onToggle }) {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <button
        type="button"
        aria-expanded={Boolean(isOpen)}
        onClick={onToggle}
        className={`w-full px-4 py-3 flex items-center justify-between font-semibold ${colorTextClass(color)}`}
      >
        <span>{title}</span>
        <svg
          className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
        </svg>
      </button>

      <div className={`transition-all duration-500 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}> 
        <div className="px-4 pb-4 pt-1">
          <textarea
            className="textarea"
            placeholder="Écrivez vos notes ici..."
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
          />
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={onValidate}
              className={`btn glass ${colorRingClass(color)} text-slate-700 hover:bg-white/60`}
            >
              Valider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

