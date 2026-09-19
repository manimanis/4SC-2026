/**
 * assets/apps/seance04.js
 * Logique Vue 3 pour la Séance 4 : Modularité 1 (Les Fonctions)
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
        { title: "Situation & Démonstration interactive", shortTitle: "Situation & Labo 2D", duration: "10 min" },
        { title: "Notions clés & Normes des fonctions", shortTitle: "Fonctions Arithmétiques", duration: "15 min" },
        { title: "Algorithme & Programme Python", shortTitle: "Algo & Programme", duration: "25 min" },
        { title: "Bilan & Auto-évaluation (Questions flash & Quiz)", shortTitle: "Bilan & Quiz", duration: "5 min" }
      ],

      // Entrées interactives du simulateur (Phase 1)
      simA: 17,
      simB: 51,

      // Profils prédéfinis
      presets: [
        { name: "Premier : 17 & 51", a: 17, b: 51 },
        { name: "Composé : 28 & 42", a: 28, b: 42 },
        { name: "Premier : 97 & 13", a: 97, b: 13 },
        { name: "Grand : 1234 & 56", a: 1234, b: 56 }
      ],

      // Questions orales réactives (Phase 1)
      oralQuestions: [
        {
          id: 1,
          question: "Pourquoi est_premier, pgcd et somme_chiffres sont-elles des fonctions ?",
          algoAns: "Chacune calcule et retourne un résultat unique de type simple (Booléen ou Entier).",
          pyAns: "Définies avec 'def' et terminées par 'return resultat'.",
          isOpen: false
        },
        {
          id: 2,
          question: "Quelle différence entre paramètre formel et paramètre effectif ?",
          algoAns: "Formel = variable fictive dans l'en-tête de la fonction. Effectif = valeur/variable réelle fournie à l'appel.",
          pyAns: "Ex: def pgcd(a, b): (formels) -> res = pgcd(x, y) (effectifs).",
          isOpen: false
        },
        {
          id: 3,
          question: "Où déclare-t-on les variables internes d'une fonction ?",
          algoAns: "Dans le T.D.O.L. (Tableau de Déclaration des Objets Locaux) propre à la fonction.",
          pyAns: "Variables locales créées à l'exécution et détruites dès la sortie de la fonction.",
          isOpen: false
        }
      ],

      // Questions flash (Phase 3)
      flashQuestions: [
        {
          expr: "Une fonction peut-elle retourner deux résultats distincts ?",
          resAlgo: "Non. Une fonction retourne un seul résultat de type simple.",
          resPy: "Pour modifier plusieurs variables, on utilise une procédure.",
          type: "Règle officielle",
          isOpen: false
        },
        {
          expr: "Quelle syntaxe d'en-tête algorithmique pour tester la primalité ?",
          resAlgo: "Fonction est_premier (n: Entier) : Booléen",
          resPy: "def est_premier(n):",
          type: "En-tête & Typage",
          isOpen: false
        },
        {
          expr: "Qu'impose la concordance des paramètres ?",
          resAlgo: "Même nombre, même ordre, types compatibles entre effectifs et formels.",
          resPy: "Erreur TypeError ou calcul erroné si types incompatibles.",
          type: "Appel de module",
          isOpen: false
        },
        {
          expr: "Peut-on utiliser l'instruction 'break' dans une fonction de recherche ?",
          resAlgo: "Non. L'instruction break est formellement interdite par l'inspection.",
          resPy: "Utiliser une condition de continuation dans une boucle while.",
          type: "Norme 2024-2025",
          isOpen: false
        }
      ],

      // Auto-évaluation / Quiz (Phase 3)
      quizQuestions: [
        {
          question: "Selon les conventions 2024-2025, quel type de résultat une fonction peut-elle retourner ?",
          options: [
            "Un seul résultat de type simple (Entier, Réel, Booléen, Caractère, Chaîne)",
            "Plusieurs tableaux simultanément",
            "Aucun résultat",
            "Uniquement des entiers"
          ],
          correct: 0,
          explanation: "Convention officielle : Une fonction retourne obligatoirement un seul résultat de type simple."
        },
        {
          question: "Quelle est la syntaxe algorithmique correcte de l'en-tête d'une fonction ?",
          options: [
            "Fonction Nom (pf1: type1, ...) : Type_résultat",
            "Procédure Nom (pf1: type1) -> Type_résultat",
            "Module Nom (Type_résultat)",
            "Fonction Nom -> pf1"
          ],
          correct: 0,
          explanation: "La syntaxe officielle est 'Fonction Nom (pf1: type1, ...) : Type_résultat'."
        },
        {
          question: "Comment appelle-t-on les paramètres figurant dans l'en-tête de déclaration de la fonction ?",
          options: [
            "Paramètres formels",
            "Paramètres effectifs",
            "Paramètres globaux",
            "Arguments constants"
          ],
          correct: 0,
          explanation: "Les paramètres formels sont les variables symboliques déclarées dans l'en-tête du sous-programme."
        },
        {
          question: "Que sont les paramètres effectifs (ou arguments) ?",
          options: [
            "Les valeurs ou variables réelles transmises lors de l'appel de la fonction",
            "Les variables déclarées dans le T.D.O.L.",
            "Le résultat retourné",
            "Les types de données acceptés"
          ],
          correct: 0,
          explanation: "Les paramètres effectifs sont les expressions/valeurs passées à la fonction au moment de l'appel."
        },
        {
          question: "Où déclare-t-on les objets utilisés exclusivement à l'intérieur d'une fonction ?",
          options: [
            "Dans le T.D.O.L. (Tableau de Déclaration des Objets Locaux) de la fonction",
            "Dans le T.D.O.G. du programme principal",
            "Dans la liste des paramètres effectifs",
            "Ils ne se déclarent jamais"
          ],
          correct: 0,
          explanation: "Chaque sous-programme possède son propre T.D.O.L. répertoriant ses objets locaux."
        },
        {
          question: "En Python, quelle instruction permet d'achever une fonction en renvoyant sa valeur ?",
          options: [
            "return",
            "Retourner",
            "send",
            "output"
          ],
          correct: 0,
          explanation: "Le mot-clé Python est 'return'."
        },
        {
          question: "Dans l'algorithme d'Euclide pour le PGCD, quelle est l'opération de base ?",
          options: [
            "Remplacer a par b et b par le reste (a Mod b) jusqu'à ce que b = 0",
            "Additionner a et b",
            "Multiplier a par b",
            "Calculer la racine carrée de a"
          ],
          correct: 0,
          explanation: "Par divisions euclidiennes successives : tant que b ≠ 0, r = a Mod b, a = b, b = r."
        },
        {
          question: "Pour tester si N est premier sans break en Python, quelle structure applique-t-on ?",
          options: [
            "Une boucle while avec condition composée (i * i <= n et premier)",
            "Une boucle for avec break",
            "Une instruction match..case",
            "Un simple if sans boucle"
          ],
          correct: 0,
          explanation: "L'instruction break étant interdite, on utilise une boucle while avec indicateur booléen."
        },
        {
          question: "Que se passe-t-il si l'on tente d'accéder à une variable locale en dehors de sa fonction ?",
          options: [
            "Une erreur (NameError en Python) car la variable est inaccessible hors de sa portée",
            "Elle prend la valeur 0",
            "Elle devient automatiquement globale",
            "Elle est sauvegardée dans le T.D.O.G."
          ],
          correct: 0,
          explanation: "La durée de vie et la visibilité d'une variable locale sont restreintes à l'exécution de sa fonction."
        },
        {
          question: "Comment effectue-t-on l'appel d'une fonction retournant un entier dans le programme principal ?",
          options: [
            "val ← Nom_fonction(x, y)",
            "Nom_fonction(x, y)",
            "Lire(Nom_fonction)",
            "Écrire_nl ← Nom_fonction"
          ],
          correct: 0,
          explanation: "Une fonction s'appelle toujours au sein d'une affectation, d'une condition ou d'une écriture."
        }
      ]
    };
  },

  computed: {
    // Calcul de primalité
    isAPrime() {
      const n = Math.abs(parseInt(this.simA)) || 0;
      if (n < 2) return false;
      let i = 2;
      while (i * i <= n) {
        if (n % i === 0) return false;
        i++;
      }
      return true;
    },

    // Calcul du PGCD
    calcPGCD() {
      let a = Math.abs(parseInt(this.simA)) || 0;
      let b = Math.abs(parseInt(this.simB)) || 0;
      while (b !== 0) {
        const r = a % b;
        a = b;
        b = r;
      }
      return a;
    },

    // Somme des chiffres de A
    sumDigitsA() {
      let n = Math.abs(parseInt(this.simA)) || 0;
      let s = 0;
      while (n > 0) {
        s += n % 10;
        n = Math.floor(n / 10);
      }
      return s;
    },

    // Sortie de terminal simulée
    terminalOutput() {
      return `>>> est_premier(${this.simA}) -> ${this.isAPrime ? 'True' : 'False'}\n>>> pgcd(${this.simA}, ${this.simB}) -> ${this.calcPGCD}\n>>> somme_chiffres(${this.simA}) -> ${this.sumDigitsA}`;
    },

    // Score du quiz
    quizScore() {
      return this.quizQuestions.reduce((acc, q) => acc + (q.selected === q.correct ? 1 : 0), 0);
    },

    quizAnsweredCount() {
      return this.quizQuestions.filter(q => q.selected !== undefined).length;
    }
  },

  methods: {
    // Gestion des phases et synchronisation URL
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

    // Fermeture du dropdown Bootstrap au clic
    closeDropdown() {
      const dropdownToggle = document.getElementById('menuFonctions');
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
      this.simA = pr.a;
      this.simB = pr.b;
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
      const code = `# Définition des fonctions
def est_premier(n):
    if n < 2:
        return False
    i = 2
    premier = True
    while i * i <= n and premier:
        if n % i == 0:
            premier = False
        i = i + 1
    return premier

def pgcd(a, b):
    while b != 0:
        r = a % b
        a = b
        b = r
    return a

def somme_chiffres(n):
    s = 0
    temp = n
    while temp > 0:
        s = s + (temp % 10)
        temp = temp // 10
    return s

# Programme Principal
a = int(input("Donner A : "))
b = int(input("Donner B : "))

print("A est premier ? :", est_premier(a))
print("PGCD(A, B) =", pgcd(a, b))
print("Somme des chiffres de A =", somme_chiffres(a))`;

      navigator.clipboard.writeText(code).then(() => {
        this.copyStatus = 'Copié !';
        setTimeout(() => { this.copyStatus = 'Copier le script Python'; }, 2000);
      });
    },

    // Initialisation du hash URL au chargement
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
