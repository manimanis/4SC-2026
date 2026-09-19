/**
 * assets/apps/seance06.js
 * Logique Vue 3 pour la Séance 6 : Tableaux 1D (numpy, parcours indicé & modules types)
 * Conventions Officielles 2024-2025
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      currentPhase: 1,
      copyStatus: 'Copier le script Python',

      // 4 Phases conformes à la maquette
      phases: [
        { title: "Situation & Labo 1D (Tableau à une dimension)", shortTitle: "Situation & Labo 1D", duration: "10 min" },
        { title: "Déclaration & Parcours indicé", shortTitle: "Déclaration & Parcours", duration: "15 min" },
        { title: "Algorithme & Programme Python", shortTitle: "Algo & Programme", duration: "25 min" },
        { title: "Bilan & Auto-évaluation (Questions flash & Quiz)", shortTitle: "Bilan & Quiz", duration: "5 min" }
      ],

      // Simulateur interactif Tableau 1D (Phase 1)
      simN: 6,
      simTab: [14, 8, 19, 12, 16, 7],

      // Profils prédéfinis
      presets: [
        { name: "Notes : [14, 8, 19, 12, 16, 7]", n: 6, tab: [14, 8, 19, 12, 16, 7] },
        { name: "Températures : [18, 22, 25, 20, 19]", n: 5, tab: [18, 22, 25, 20, 19] },
        { name: "Positifs : [5, 12, 8, 42, 33, 9, 15]", n: 7, tab: [5, 12, 8, 42, 33, 9, 15] },
        { name: "Court : [10, 25, 50]", n: 3, tab: [10, 25, 50] }
      ],

      // Questions orales (Phase 1)
      oralQuestions: [
        {
          id: 1,
          question: "Pourquoi les éléments d'un tableau doivent-ils être de même type ?",
          algoAns: "Un tableau est une structure de données statique et homogène (tous les éléments ont le même type simple).",
          pyAns: "Implémenté via numpy array qui garantit l'homogénéité en mémoire.",
          isOpen: false
        },
        {
          id: 2,
          question: "Pourquoi l'instruction 'print(T)' est-elle formellement interdite en Python ?",
          algoAns: "La convention officielle exige d'afficher le tableau élément par élément via une boucle indicée.",
          pyAns: "Pour forcer l'usage du parcours indicé 'for i in range(n): print(T[i])'.",
          isOpen: false
        },
        {
          id: 3,
          question: "Pourquoi le module Remplir utilise-t-il le passage par adresse (@t) et le type 'Tab' ?",
          algoAns: "Le type 'Tab' est déclaré dans le T.D.N.T. Le symbole '@' indique un passage par adresse car les cases du tableau sont modifiées.",
          pyAns: "En Python, un array numpy est un objet mutable automatiquement passé par adresse (référence).",
          isOpen: false
        }
      ],

      // Questions flash (Phase 4)
      flashQuestions: [
        {
          expr: "Quel est l'indice du premier et du dernier élément d'un tableau de N éléments ?",
          resAlgo: "Premier indice : 0. Dernier indice : N - 1.",
          resPy: "T[0] et T[n - 1] (parcours 'for i in range(n):').",
          type: "Indiçage base 0",
          isOpen: false
        },
        {
          expr: "Comment déclarer le type et l'objet tableau en algorithmique pour 10 entiers ?",
          resAlgo: "T.D.N.T. : Tab = Tableau de 10 Entier | T.D.O.G. : t : Tab",
          resPy: "from numpy import array; t = array([0] * 10)",
          type: "Déclaration T.D.N.T. & numpy",
          isOpen: false
        },
        {
          expr: "Dans le T.D.O.L. de la procédure Remplir, quel objet déclare-t-on ?",
          resAlgo: "i : Entier (compteur de la boucle Pour).",
          resPy: "Variable locale 'i' générée par la boucle for.",
          type: "T.D.O.L.",
          isOpen: false
        },
        {
          expr: "Pourquoi la fonction Moyenne retourne-t-elle un Réel ?",
          resAlgo: "La division arithmétique (somme / n) produit généralement une valeur non entière.",
          resPy: "En Python, l'opérateur '/' retourne un flottant (float).",
          type: "Typage du résultat",
          isOpen: false
        }
      ],

      // Quiz interactif de 10 questions
      quizQuestions: [
        {
          question: "Selon les conventions officielles 2024-2025, quelle bibliothèque Python doit être utilisée pour implémenter les tableaux ?",
          options: [
            "numpy (via 'from numpy import array')",
            "math",
            "pandas",
            "random"
          ],
          correct: 0,
          explanation: "Convention section 3 & 4.b : Les tableaux 1D et 2D sont impérativement implémentés avec la bibliothèque numpy."
        },
        {
          question: "Dans le cadre de la modularité, comment déclare-t-on un type tableau pour les modules ?",
          options: [
            "Dans le T.D.N.T. : Tab = Tableau de N Entier (puis @t: Tab dans l'entête)",
            "Dans le T.D.O.L. comme variable locale",
            "Directement dans l'entête sans T.D.N.T.",
            "En utilisant le mot-clé global"
          ],
          correct: 0,
          explanation: "Convention T.D.N.T. : Le nouveau type utilisateur est déclaré dans le Tableau de Déclaration des Nouveaux Types ('Tab = Tableau de N Entier'), puis réutilisé pour typer les paramètres formels (@t: Tab)."
        },
        {
          question: "En Tunisie (Programme 4SC), quel est l'indice du premier élément d'un tableau ?",
          options: [
            "0",
            "1",
            "-1",
            "N"
          ],
          correct: 0,
          explanation: "Convention section B.4 : L'accès indicé aux structures de données s'effectue en base 0 (de 0 à N - 1)."
        },
        {
          question: "Quelle est la règle officielle concernant l'affichage d'un tableau T en Python ?",
          options: [
            "L'affichage doit obligatoirement se faire élément par élément via une boucle, l'instruction print(T) étant interdite",
            "L'instruction print(T) est obligatoire",
            "Les tableaux ne s'affichent jamais",
            "Il faut convertir T en chaîne avec str(T)"
          ],
          correct: 0,
          explanation: "Convention section 1.b Remarques : 'L'affichage d'un tableau T en Python doit se faire élément par élément et non pas avec l'instruction print(T)'."
        },
        {
          question: "En Python, comment les tableaux numpy sont-ils transmis aux fonctions et procédures ?",
          options: [
            "Par adresse (référence sur le tableau en mémoire), sans mot-clé particulier",
            "Par valeur avec duplication complète",
            "Via le mot-clé global obligatoire",
            "Uniquement en lecture seule"
          ],
          correct: 0,
          explanation: "Convention section 7.c : 'En Python, les paramètres de type dictionnaire, tableau (numpy) et fichier sont, par défaut, passés par adresse'."
        },
        {
          question: "Comment traduit-on en Python la boucle de parcours 'Pour i de 0 à n - 1 Faire' ?",
          options: [
            "for i in range(n):",
            "for i in range(1, n):",
            "for i in range(0, n - 1):",
            "while i < n - 1:"
          ],
          correct: 0,
          explanation: "La borne finale de range étant exclue, 'range(n)' génère exactement les entiers de 0 à n - 1."
        },
        {
          question: "Quelle instruction Python déclare un tableau statique T de 15 réels initialisés à 0.0 ?",
          options: [
            "T = array([0.0] * 15) ou T = array([float()] * 15)",
            "T = list(15)",
            "T = [0] * 15",
            "T = array(15)"
          ],
          correct: 0,
          explanation: "Convention section 4.b : 'T = array([float()] * 15)' ou 'T = array([0.0] * 15)'."
        },
        {
          question: "Dans l'entête 'Procédure Remplir(@t: Tab, n: Entier)', que signifie le symbole '@' ?",
          options: [
            "Un passage par adresse, car les éléments du tableau sont modifiés",
            "Un passage par valeur avec copie",
            "Une variable globale",
            "Un nouveau type"
          ],
          correct: 0,
          explanation: "En algorithmique, le symbole '@' indique un passage par adresse : les modifications apportées aux cases du tableau affectent directement la variable de l'appelant."
        },
        {
          question: "Que se passe-t-il si l'on tente d'accéder à T[n] dans un tableau de taille n ?",
          options: [
            "Une erreur d'indice hors limites (IndexError en Python)",
            "La valeur 0 est renvoyée",
            "Le tableau s'agrandit automatiquement",
            "Le premier élément est écrasé"
          ],
          correct: 0,
          explanation: "Les indices valides s'étendent de 0 à n - 1. L'indice n est en dehors de la mémoire allouée au tableau."
        },
        {
          question: "Quel module parmi les suivants calcule la moyenne des éléments d'un tableau ?",
          options: [
            "Une fonction qui calcule la somme des éléments et retourne 'somme / n'",
            "Une procédure sans paramètres",
            "Une boucle Tant que infinie",
            "L'instruction print(moyenne)"
          ],
          correct: 0,
          explanation: "Le calcul de moyenne retourne une valeur numérique unique (Réel) : c'est le rôle typique d'une fonction."
        }
      ]
    };
  },

  computed: {
    // Calcul de la somme
    calcSum() {
      return this.simTab.slice(0, this.simN).reduce((acc, v) => acc + (parseInt(v) || 0), 0);
    },

    // Calcul de la moyenne
    calcMean() {
      if (this.simN === 0) return 0;
      return (this.calcSum / this.simN).toFixed(2);
    },

    // Recherche du maximum
    calcMax() {
      const slice = this.simTab.slice(0, this.simN).map(v => parseInt(v) || 0);
      return slice.length > 0 ? Math.max(...slice) : 0;
    },

    // Recherche du minimum
    calcMin() {
      const slice = this.simTab.slice(0, this.simN).map(v => parseInt(v) || 0);
      return slice.length > 0 ? Math.min(...slice) : 0;
    },

    // Console terminale simulée (affichage élément par élément obligatoire)
    terminalOutput() {
      const lines = [];
      lines.push(`>>> # Affichage élément par élément (Conventions 2024-2025)`);
      lines.push(`>>> n = ${this.simN}`);
      for (let i = 0; i < this.simN; i++) {
        lines.push(`T[${i}] = ${this.simTab[i] || 0}`);
      }
      lines.push(`>>> Somme = ${this.calcSum}`);
      lines.push(`>>> Moyenne = ${this.calcMean}`);
      lines.push(`>>> Max = ${this.calcMax} | Min = ${this.calcMin}`);
      return lines.join('\n');
    },

    quizScore() {
      return this.quizQuestions.reduce((acc, q) => acc + (q.selected === q.correct ? 1 : 0), 0);
    }
  },

  methods: {
    setPhase(p) {
      this.currentPhase = p;
      if (p === 'all') {
        window.location.hash = '#all';
      } else {
        window.location.hash = '#phase' + p;
      }
      this.closeDropdown();
      this.$nextTick(() => {
        if (window.hljs) {
          document.querySelectorAll('pre code').forEach((el) => {
            window.hljs.highlightElement(el);
          });
        }
      });
    },

    closeDropdown() {
      const dropdownToggle = document.getElementById('menuTableaux');
      if (dropdownToggle && window.bootstrap?.Dropdown) {
        const dd = window.bootstrap.Dropdown.getInstance(dropdownToggle);
        if (dd) dd.hide();
      }
      const navContent = document.getElementById('navContent');
      if (navContent && navContent.classList.contains('show') && window.bootstrap?.Collapse) {
        const col = window.bootstrap.Collapse.getInstance(navContent);
        if (col) col.hide();
      }
    },

    prevPhase() {
      if (typeof this.currentPhase === 'number' && this.currentPhase > 1) {
        this.setPhase(this.currentPhase - 1);
      }
    },

    nextPhase() {
      if (typeof this.currentPhase === 'number' && this.currentPhase < this.phases.length) {
        this.setPhase(this.currentPhase + 1);
      }
    },

    toggleViewMode() {
      this.setPhase(this.currentPhase === 'all' ? 1 : 'all');
    },

    updateN(newN) {
      this.simN = Math.max(3, Math.min(10, parseInt(newN) || 3));
      while (this.simTab.length < this.simN) {
        this.simTab.push(Math.floor(Math.random() * 50) + 1);
      }
    },

    updateCell(idx, val) {
      this.simTab[idx] = parseInt(val) || 0;
    },

    setPreset(pr) {
      this.simN = pr.n;
      this.simTab = [...pr.tab];
    },

    generateRandomValues() {
      const arr = [];
      for (let i = 0; i < this.simN; i++) {
        arr.push(Math.floor(Math.random() * 40) + 1);
      }
      this.simTab = arr;
    },

    toggleOral(q) {
      q.isOpen = !q.isOpen;
    },

    toggleFlash(q) {
      q.isOpen = !q.isOpen;
    },

    selectQuizOption(qIdx, oIdx) {
      const q = this.quizQuestions[qIdx];
      if (q.showAnswer) return;
      q.selected = oIdx;
      q.showAnswer = true;
    },

    resetQuiz() {
      this.quizQuestions.forEach(q => {
        delete q.selected;
        delete q.showAnswer;
      });
    },

    copyPythonCode() {
      const code = `from numpy import array

# 1. Module de saisie de la taille N (contrôle sans break)
def saisie_taille(borne_min, borne_max):
    taille = 0
    while not (borne_min <= taille <= borne_max):
        taille = int(input(f"Donner la taille du tableau ({borne_min} à {borne_max}) : "))
    return taille

# 2. Module de remplissage (t est passé par adresse natif)
def remplir_tab(t, n):
    for i in range(n):
        t[i] = int(input(f"Donner l'élément t[{i}] : "))

# 3. Module d'affichage (élément par élément, pas de print(t) brut)
def afficher_tab(t, n):
    print("Contenu du tableau :")
    for i in range(n):
        print(f"t[{i}] = {t[i]}")

# 4. Fonction calculant la moyenne (retourne un réel float)
def calculer_moyenne(t, n):
    somme = 0
    for i in range(n):
        somme = somme + t[i]
    return somme / n

# --- Programme Principal ---
# Déclaration statique du tableau t de 10 entiers
t = array([0] * 10)

n = saisie_taille(3, 10)
remplir_tab(t, n)
afficher_tab(t, n)

moy = calculer_moyenne(t, n)
print(f"Moyenne des éléments = {moy:.2f}")`;

      navigator.clipboard.writeText(code).then(() => {
        this.copyStatus = 'Copié !';
        setTimeout(() => { this.copyStatus = 'Copier le script Python'; }, 2000);
      });
    },

    initFromHash() {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#all') {
        this.currentPhase = 'all';
      } else if (hash === '#phase1') {
        this.currentPhase = 1;
      } else if (hash === '#phase2') {
        this.currentPhase = 2;
      } else if (hash === '#phase3') {
        this.currentPhase = 3;
      } else if (hash === '#phase4') {
        this.currentPhase = 4;
      }
    }
  },

  mounted() {
    this.initFromHash();
    window.addEventListener('hashchange', () => {
      this.initFromHash();
    });
    this.$nextTick(() => {
      if (window.hljs) {
        document.querySelectorAll('pre code').forEach((el) => {
          window.hljs.highlightElement(el);
        });
      }
    });
  }
}).mount('#app');
