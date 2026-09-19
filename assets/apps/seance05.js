/**
 * assets/apps/seance05.js
 * Logique Vue 3 pour la Séance 5 : Modularité 2 (Les Procédures & Modes de passage)
 * Conventions Officielles 2024-2025
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      currentPhase: 1,
      copyStatus: 'Copier le script Python',

      // 4 Phases pédagogiques correspondant exactement à la maquette
      phases: [
        { title: "Situation & Démonstration interactive", shortTitle: "Situation & Mémoire", duration: "10 min" },
        { title: "Modes de passage & Portée des identificateurs", shortTitle: "Modes de passage", duration: "15 min" },
        { title: "Algorithme & Programme Python", shortTitle: "Algo & Programme", duration: "25 min" },
        { title: "Bilan & Auto-évaluation (Questions flash & Quiz)", shortTitle: "Bilan & Quiz", duration: "5 min" }
      ],

      // Entrées interactives du simulateur (Phase 1)
      simX: 12,
      simY: 85,
      modePassage: 'adresse', // 'adresse' (@) ou 'valeur'

      // Profils de test
      presets: [
        { name: "Cas standard : 12 & 85", x: 12, y: 85 },
        { name: "Chiffres : 5 & 99", x: 5, y: 99 },
        { name: "Centaines : 100 & 200", x: 100, y: 200 },
        { name: "Négatif : -7 & 42", x: -7, y: 42 }
      ],

      // Questions orales (Phase 1)
      oralQuestions: [
        {
          id: 1,
          question: "Pourquoi Permuter est-elle une procédure et non une fonction ?",
          algoAns: "Elle doit modifier deux variables simultanément (x et y) et ne renvoie pas une valeur calculée unique.",
          pyAns: "Une fonction ne retourne qu'une seule valeur simple selon la convention officielle.",
          isOpen: false
        },
        {
          id: 2,
          question: "Que signifie le symbole '@' devant un paramètre formel ?",
          algoAns: "Passage par adresse : le paramètre formel modifie directement la case mémoire du paramètre effectif.",
          pyAns: "En Python pour les types simples, on modifie via le mot-clé global ou en retournant les valeurs.",
          isOpen: false
        },
        {
          id: 3,
          question: "Quelle condition sur le paramètre effectif lors d'un passage par adresse ?",
          algoAns: "Le paramètre effectif DOIT obligatoirement être une variable (jamais une valeur constante ni une expression).",
          pyAns: "Ex: Permuter(x, y) est valide ; Permuter(10, 20) ou Permuter(x + 1, y) est interdit et impossible.",
          isOpen: false
        }
      ],

      // Questions flash (Phase 3)
      flashQuestions: [
        {
          expr: "Peut-on appeler une procédure dans une affectation (res ← Permuter(a, b)) ?",
          resAlgo: "Non. Une procédure constitue une instruction autonome d'appel.",
          resPy: "Une procédure ne renvoie pas d'expression évaluable.",
          type: "Syntaxe d'appel",
          isOpen: false
        },
        {
          expr: "Que vaut la variable appelante après un passage par valeur modifiée dans le sous-programme ?",
          resAlgo: "Sa valeur reste intacte et inchangée (seule la copie locale a été modifiée).",
          resPy: "Les types simples int/float étant immuables, l'appelant n'est pas affecté.",
          type: "Passage par valeur",
          isOpen: false
        },
        {
          expr: "Où déclare-t-on la variable intermédiaire 'aux' de permutation ?",
          resAlgo: "Dans le T.D.O.L. de la procédure Permuter.",
          resPy: "Variable locale créée au sein de la fonction def permuter():.",
          type: "T.D.O.L.",
          isOpen: false
        },
        {
          expr: "Comment formaliser en Python une procédure modifiant deux variables globales ?",
          resAlgo: "Procédure Permuter(@a: Entier, @b: Entier)",
          resPy: "global x, y au début du module (selon la convention d'inspection 2024).",
          type: "Python & Global",
          isOpen: false
        }
      ],

      // Quiz interactif (10 questions ciblées)
      quizQuestions: [
        {
          question: "Quelle est la caractéristique fondamentale d'une procédure par rapport à une fonction ?",
          options: [
            "Elle exécute un traitement sans renvoyer directement une valeur via un mot-clé de retour de type",
            "Elle ne peut contenir aucune boucle",
            "Elle ne peut jamais modifier de variables",
            "Elle s'exécute uniquement dans une condition Si"
          ],
          correct: 0,
          explanation: "Une procédure réalise des actions (saisie, permutation, affichage) sans retourner un résultat unique."
        },
        {
          question: "En algorithmique officielle 2024-2025, quel symbole indique un passage par adresse ?",
          options: [
            "Le symbole @ placé avant le nom du paramètre (@a: Entier)",
            "Le mot-clé var",
            "Le symbole &",
            "Une étoile (*)"
          ],
          correct: 0,
          explanation: "Convention 2024-2025 section 7.b : 'Si le mode de passage est par adresse, on ajoutera le symbole @ avant le nom du paramètre'."
        },
        {
          question: "Lors d'un passage par valeur d'une variable 'x', que reçoit le sous-programme ?",
          options: [
            "Une copie isolée de la valeur de x",
            "L'adresse mémoire directe de x",
            "La variable x globale",
            "Un pointeur nul"
          ],
          correct: 0,
          explanation: "En passage par valeur, une copie distincte est transmise. Les modifications locales restent sans effet sur l'original."
        },
        {
          question: "Pourquoi l'instruction 'Permuter(5, 12)' est-elle syntaxiquement erronée pour une procédure Permuter(@a, @b) ?",
          options: [
            "Car un paramètre transmis par variable (@) exige impérativement une variable réelle, et non une valeur constante",
            "Car les nombres doivent être négatifs",
            "Car les procédures refusent les entiers",
            "Car il faut obligatoirement trois paramètres"
          ],
          correct: 0,
          explanation: "On ne peut pas modifier l'adresse d'une constante (5 ou 12). Seule une variable déclarée peut être passée par adresse."
        },
        {
          question: "Quelle est la portée d'une variable déclarée dans le T.D.O.L. d'une procédure ?",
          options: [
            "Strictement locale : accessible uniquement à l'intérieur de cette procédure",
            "Globale à tout le programme",
            "Accessible dans le programme principal uniquement",
            "Partagée avec toutes les autres procédures"
          ],
          correct: 0,
          explanation: "Une variable locale n'existe que pendant l'exécution du sous-programme où elle est déclarée."
        },
        {
          question: "Comment appelle-t-on le phénomène où une variable locale porte le même nom qu'une variable globale ?",
          options: [
            "Le masquage (shadowing) : la variable locale masque la variable globale dans le sous-programme",
            "La compilation croisée",
            "Une surcharge de syntaxe",
            "La concaténation"
          ],
          correct: 0,
          explanation: "Dans le sous-programme, la variable locale prévaut et masque la variable globale de même identificateur."
        },
        {
          question: "En Python, selon la convention d'inspection tunisienne 2024-2025, comment une procédure sans return modifie-t-elle des variables scalaires globales ?",
          options: [
            "En déclarant les variables avec le mot-clé global à l'intérieur du module",
            "En écrivant @ devant le nom des variables",
            "En utilisant le mot-clé pointer",
            "C'est strictement impossible"
          ],
          correct: 0,
          explanation: "Convention section 7.d : 'Toute variable déclarée au sein d'un module précédée par le mot-clé global a une portée globale'."
        },
        {
          question: "Dans le cas des tableaux (numpy) et des dictionnaires en Python, quel est le mode de passage par défaut ?",
          options: [
            "Par adresse (référence directe sur l'objet mutable)",
            "Par valeur avec copie intégrale",
            "Par chaîne de caractères",
            "Par constante protégée"
          ],
          correct: 0,
          explanation: "Convention section 7.c : 'En Python, les paramètres de type dictionnaire, tableau (numpy) et fichier sont, par défaut, passés par adresse'."
        },
        {
          question: "Quelle est la syntaxe d'appel algorithmique correcte pour une procédure d'affichage 'Afficher Couple' ?",
          options: [
            "AfficherCouple(a, b)",
            "res ← AfficherCouple(a, b)",
            "Écrire(AfficherCouple(a, b))",
            "Lire(AfficherCouple)"
          ],
          correct: 0,
          explanation: "Une procédure s'appelle comme une instruction indépendante : 'Nom_procedure(pe1, pe2)'."
        },
        {
          question: "Où sont déclarées les variables partagées par l'ensemble du programme principal ?",
          options: [
            "Dans le T.D.O.G. (Tableau de Déclaration des Objets Globaux)",
            "Dans le T.D.O.L. de la première procédure",
            "Dans l'en-tête de la fonction",
            "Dans la console terminale"
          ],
          correct: 0,
          explanation: "Le T.D.O.G. répertorie tous les objets de portée globale du programme principal."
        }
      ]
    };
  },

  computed: {
    // État après appel de la procédure de permutation selon le mode choisi
    finalX() {
      return this.modePassage === 'variable' ? this.simY : this.simX;
    },

    finalY() {
      return this.modePassage === 'variable' ? this.simX : this.simY;
    },

    isSwapped() {
      return this.modePassage === 'adresse';
    },

    terminalOutput() {
      if (this.modePassage === 'adresse') {
        return `>>> # Mode PASSAGE PAR ADRESSE (@x, @y)\n>>> x_init = ${this.simX}, y_init = ${this.simY}\n>>> permuter(x, y) # Modifie directement x et y\n>>> x = ${this.finalX}, y = ${this.finalY} (Permutation RÉUSSIE dans l'appelant)`;
      } else {
        return `>>> # Mode PASSAGE PAR VALEUR (x, y)\n>>> x_init = ${this.simX}, y_init = ${this.simY}\n>>> permuter_valeur(x, y) # Seules les copies locales permutent\n>>> x = ${this.finalX}, y = ${this.finalY} (ÉCHEC : variables de l'appelant INCHANGÉES)`;
      }
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
      const dropdownToggle = document.getElementById('menuProcedures');
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

    setPreset(pr) {
      this.simX = pr.x;
      this.simY = pr.y;
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
      const code = `# Définition des procédures
def saisie_intervalle(borne_min, borne_max):
    val = 0
    while not (borne_min <= val <= borne_max):
        val = int(input(f"Donner un entier entre {borne_min} et {borne_max} : "))
    return val

def permuter():
    global x, y
    aux = x
    x = y
    y = aux

def afficher_couple(msg, a, b):
    print(msg, "-> X =", a, "| Y =", b)

# Programme Principal
x = saisie_intervalle(1, 100)
y = saisie_intervalle(1, 100)

afficher_couple("Avant permutation", x, y)
permuter()
afficher_couple("Après permutation", x, y)`;

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
