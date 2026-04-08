import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  FolderDown, 
  Package, 
  Paintbrush, 
  Code2, 
  Rocket, 
  Copy, 
  Check, 
  AlertCircle,
  Info
} from 'lucide-react';

// Composant pour afficher un bloc de code avec bouton de copie
const CodeBlock = ({ code, language = "bash" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback si l'API clipboard échoue (ex: iframe sans permissions)
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error("Échec de la copie", e);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="relative group mt-3 mb-4 rounded-lg overflow-hidden bg-slate-900 border border-slate-700">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <span className="text-xs font-mono text-slate-400">{language}</span>
        <button 
          onClick={handleCopy}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs bg-slate-700/50 px-2 py-1 rounded"
          title="Copier le code"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          {copied ? 'Copié !' : 'Copier'}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-slate-50">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default function App() {
  const [projectName, setProjectName] = useState('mon-projet');

  // Sécuriser le nom du projet (pas d'espaces, caractères spéciaux basiques)
  const safeProjectName = projectName.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-') || 'mon-projet';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-200">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-6 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
              <Rocket size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 leading-tight">React Launchpad</h1>
              <p className="text-sm text-slate-500">Guide de démarrage universel pour vos projets</p>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0 flex items-center gap-3 bg-slate-100 p-2 rounded-lg border border-slate-200">
            <label htmlFor="project-name" className="text-sm font-medium text-slate-600 ml-2">
              Nom du projet :
            </label>
            <input
              id="project-name"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="px-3 py-1.5 rounded-md border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-48 font-mono"
              placeholder="mon-projet"
            />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Prérequis */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl mb-12 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-900 text-lg mb-2">Prérequis indispensable : Node.js</h3>
              <p className="text-amber-800 text-sm mb-3">
                Assurez-vous d'avoir Node.js installé sur votre ordinateur. Vous pouvez vérifier en tapant cette commande dans votre terminal :
              </p>
              <CodeBlock code="node -v" language="bash" />
              <p className="text-amber-800 text-sm mt-2">
                Si cela affiche une erreur, téléchargez-le sur le <a href="https://nodejs.org/" target="_blank" rel="noreferrer" className="underline font-semibold hover:text-amber-900">site officiel de Node.js</a> et installez-le.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline des étapes */}
        <div className="space-y-12">

          {/* ÉTAPE 1 */}
          <section className="relative">
            <div className="absolute top-0 left-6 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true"></div>
            <div className="relative flex items-start gap-6">
              <div className="bg-blue-100 text-blue-600 rounded-full p-3 ring-8 ring-slate-50 relative z-10">
                <Terminal size={24} />
              </div>
              <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-2">1. Créer le squelette du projet</h2>
                <p className="text-slate-600 mb-4">
                  Ouvrez VS Code, puis ouvrez un nouveau terminal intégré (<kbd className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300 text-xs">Ctrl</kbd> + <kbd className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300 text-xs">`</kbd> ou via le menu <strong>Terminal &gt; Nouveau terminal</strong>).
                </p>
                <p className="text-slate-600 mb-4">
                  Placez-vous dans le dossier où vous souhaitez ranger votre projet et tapez la commande suivante :
                </p>
                <CodeBlock code={`npm create vite@latest ${safeProjectName} -- --template react`} language="bash" />
                
                <p className="text-slate-600 mt-6 mb-2">
                  Une fois la création terminée, rentrez dans le dossier de votre nouveau projet :
                </p>
                <CodeBlock code={`cd ${safeProjectName}`} language="bash" />
              </div>
            </div>
          </section>

          {/* ÉTAPE 2 */}
          <section className="relative">
            <div className="absolute top-0 left-6 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true"></div>
            <div className="relative flex items-start gap-6">
              <div className="bg-blue-100 text-blue-600 rounded-full p-3 ring-8 ring-slate-50 relative z-10">
                <Package size={24} />
              </div>
              <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-2">2. Installer les dépendances</h2>
                <p className="text-slate-600 mb-4">
                  Maintenant que vous êtes dans le dossier de votre projet, installez les paquets de base de React et Vite :
                </p>
                <CodeBlock code="npm install" language="bash" />

                <div className="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <div className="flex gap-2 items-start text-blue-800 mb-2">
                    <Info size={20} className="shrink-0 mt-0.5 text-blue-600" />
                    <h3 className="font-semibold">Dépendances spécifiques à votre projet</h3>
                  </div>
                  <p className="text-blue-700 text-sm mb-4 ml-7">
                    Selon le projet que vous lancez, vous aurez besoin de paquets supplémentaires (icônes, base de données, etc.). Regardez la documentation de votre projet pour savoir quoi installer. 
                    <br/><br/>
                    <em>Exemple générique d'installation de paquets courants (Tailwind, Lucide, Router...) :</em>
                  </p>
                  <div className="ml-7">
                    <CodeBlock code="npm install tailwindcss postcss autoprefixer lucide-react react-router-dom" language="bash" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ÉTAPE 3 */}
          <section className="relative">
            <div className="absolute top-0 left-6 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true"></div>
            <div className="relative flex items-start gap-6">
              <div className="bg-blue-100 text-blue-600 rounded-full p-3 ring-8 ring-slate-50 relative z-10">
                <Paintbrush size={24} />
              </div>
              <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-slate-900">3. Configurer le design (Ex: Tailwind CSS)</h2>
                  <span className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded-full font-medium border border-slate-200">Optionnel mais recommandé</span>
                </div>
                <p className="text-slate-600 mb-4">
                  Si votre projet utilise Tailwind CSS, initialisez-le en tapant :
                </p>
                <CodeBlock code="npx tailwindcss init -p" language="bash" />
                
                <div className="mt-3 mb-6 bg-red-50 border border-red-100 rounded-xl p-4 text-sm shadow-sm">
                  <div className="flex gap-2 items-start text-red-800">
                    <AlertCircle size={20} className="shrink-0 mt-0.5 text-red-600" />
                    <div className="w-full overflow-hidden">
                      <h4 className="font-bold text-base">Erreur "could not determine executable" ?</h4>
                      <p className="mt-1 text-red-700">
                        Si le terminal affiche <code className="bg-red-100/80 border border-red-200 px-1.5 py-0.5 rounded text-red-900 font-mono text-xs">npm error could not determine executable to run</code>, c'est que Tailwind n'a pas été trouvé. Exécutez d'abord cette commande pour l'installer localement :
                      </p>
                      <div className="my-2 -mx-1">
                        <CodeBlock code="npm install -D tailwindcss postcss autoprefixer" language="bash" />
                      </div>
                      <p className="text-red-700 mt-2">
                        Puis relancez sereinement <code className="bg-red-100/80 border border-red-200 px-1.5 py-0.5 rounded text-red-900 font-mono text-xs">npx tailwindcss init -p</code>.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 mt-6 mb-2">
                  Dans VS Code, ouvrez le fichier <code className="bg-slate-100 px-1 rounded text-pink-600 text-sm">tailwind.config.js</code> qui vient d'apparaître, et remplacez son contenu par la configuration demandée par votre projet (Voici la configuration standard) :
                </p>
                <CodeBlock code={`/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`} language="javascript" />

                <p className="text-slate-600 mt-6 mb-2">
                  Ensuite, ouvrez <code className="bg-slate-100 px-1 rounded text-pink-600 text-sm">src/index.css</code>, effacez tout, et collez ces directives :
                </p>
                <CodeBlock code={`@tailwind base;\n@tailwind components;\n@tailwind utilities;`} language="css" />
              </div>
            </div>
          </section>

          {/* ÉTAPE 4 */}
          <section className="relative">
            <div className="absolute top-0 left-6 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true"></div>
            <div className="relative flex items-start gap-6">
              <div className="bg-blue-100 text-blue-600 rounded-full p-3 ring-8 ring-slate-50 relative z-10">
                <Code2 size={24} />
              </div>
              <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-2">4. Intégrer votre code source</h2>
                <p className="text-slate-600 mb-4">
                  Il est temps d'importer le code de votre application.
                </p>
                <ul className="space-y-3 text-slate-600 list-disc list-inside">
                  <li>Dans le dossier <code className="bg-slate-100 px-1 rounded text-slate-800 text-sm">src</code>, ouvrez le fichier <code className="bg-slate-100 px-1 rounded text-pink-600 font-bold text-sm">App.jsx</code>.</li>
                  <li>Effacez absolument tout son contenu par défaut.</li>
                  <li>Collez l'intégralité du code de l'application que vous souhaitez lancer.</li>
                </ul>
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg">
                  <FolderDown size={16} />
                  <span><strong>Astuce de nettoyage :</strong> Vous pouvez supprimer le fichier <code className="bg-slate-200 px-1 rounded">src/App.css</code> et vider le dossier <code className="bg-slate-200 px-1 rounded">src/assets</code> s'ils ne sont pas utilisés.</span>
                </div>
              </div>
            </div>
          </section>

          {/* ÉTAPE 5 */}
          <section className="relative">
            <div className="relative flex items-start gap-6">
              <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white rounded-full p-3 ring-8 ring-slate-50 relative z-10 shadow-lg shadow-emerald-200">
                <Rocket size={24} />
              </div>
              <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-slate-200/50 border border-emerald-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10"></div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">5. Lancer l'application ! 🚀</h2>
                <p className="text-slate-600 mb-4 text-lg">
                  La magie opère maintenant. Dans votre terminal, tapez la commande de démarrage :
                </p>
                <CodeBlock code="npm run dev" language="bash" />
                
                <div className="mt-6 text-slate-600">
                  <p className="mb-2">Le terminal va vous afficher une adresse locale (généralement <code className="text-emerald-600 font-bold bg-emerald-50 px-1 py-0.5 rounded">http://localhost:5173/</code>).</p>
                  <p>Maintenez la touche <kbd className="bg-slate-100 border border-slate-300 rounded px-2 py-1 text-sm shadow-sm">Ctrl</kbd> (ou <kbd className="bg-slate-100 border border-slate-300 rounded px-2 py-1 text-sm shadow-sm">Cmd ⌘</kbd> sur Mac) et cliquez sur ce lien. Votre navigateur va s'ouvrir sur votre application toute neuve !</p>
                </div>

                <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-500">
                  <strong className="text-slate-700">Le saviez-vous ?</strong> Si vous faites des modifications dans votre code sur VS Code et que vous sauvegardez, la page web se mettra à jour instantanément sans même avoir besoin de rafraîchir. C'est la magie du <em>Hot Module Replacement (HMR)</em> de Vite !
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
      
      <footer className="text-center py-8 text-slate-400 text-sm border-t border-slate-200 mt-12 bg-white">
        React Launchpad - Guide généré pour faciliter vos déploiements locaux.
      </footer>
    </div>
  );
}