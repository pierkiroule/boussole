// React import not needed for JSX in React 17+

export default function ChapterIntro({ chapter, onStartAttack }) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
      <div className="text-center">
        <div className="text-6xl mb-4">{chapter.emoji}</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{chapter.title}</h1>
        <h2 className="text-xl text-gray-600 mb-6">{chapter.subtitle}</h2>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {chapter.intro}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-blue-800 mb-2">🎯 Objectif du chapitre</h3>
          <p className="text-blue-700">{chapter.objective}</p>
        </div>

        <button
          onClick={onStartAttack}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg"
        >
          ⚔️ Commencer l'Attaque
        </button>
      </div>
    </div>
  );
}