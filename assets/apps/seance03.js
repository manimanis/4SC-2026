/**
 * assets/apps/seance03.js
 * Logique applicative JavaScript (Vue 3) pour seance03.html
 * Séance 3 : Structures itératives (Pour, Tant que, Répéter...Jusqu'à) & TDO
 * Conforme aux programmes et conventions officielles 2024-2025
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      currentPhase: 1,
      isMenuOpen: false,

      // Phases d'apprentissage correspondant exactement à la maquette
      phases: [
        { title: "Situation & Simulateur interactif (Analyse d'un nombre)", shortTitle: "Situation & Labo", duration: "10 min" },
        { title: "Structures itératives & Normes officielles", shortTitle: "Boucles & Normes", duration: "15 min" },
        { title: "Algorithme & Programme AnalyseNombre", shortTitle: "Algo & Programme", duration: "25 min" },
        { title: "Bilan & Auto-évaluation (Questions flash & Quiz)", shortTitle: "Bilan & Quiz", duration: "5 min" }
      ],

      // Questions orales de réactivation (Phase 1)
      oralQuestions: [
        {
          id: 1,
          question: "Pour le contrôle de saisie, pourquoi la structure Répéter ... Jusqu'à est-elle la plus adaptée ?",
          algoAns: "Car la saisie doit obligatoirement être effectuée au moins une fois avant d'en vérifier la validité (structure post-test).",
          pyAns: "En Python, on pré-initialise n à 0 et on utilise 'while not (2 < n < 100):' sans jamais employer l'instruction 'break'.",
          isOpen: false
        },
        {
          id: 2,
          question: "Pour la recherche des diviseurs de 1 à N-1, pourquoi utilise-t-on la boucle Pour ?",
          algoAns: "Car le nombre total d'itérations est déterminé et connu à l'avance (exactement n - 1 itérations de 1 à n - 1).",
          pyAns: "En Python, cela s'exprime par 'for i in range(1, n):' car la borne supérieure n est exclue, ce qui s'arrête exactement à n - 1.",
          isOpen: false
        },
        {
          id: 3,
          question: "Pour les divisions successives par 2, quelle structure s'impose ?",
          algoAns: "La boucle Tant que, car le nombre d'itérations n'est pas prévisible et dépend de la condition de parité à chaque division.",
          pyAns: "L'instruction 'while temp % 2 == 0:' avec division entière 'temp = temp // 2' et incrémentation de nb_div2.",
          isOpen: false
        }
      ],

      // Simulateur interactif (Phase 1)
      simN: 28,
      copyStatus: 'Copier le script Python',

      // Profils prédéfinis pour le simulateur
      presets: [
        { name: "Parfait : 6", n: 6, desc: "Diviseurs: 1+2+3 = 6 (Parfait), 1 division par 2" },
        { name: "Parfait : 28", n: 28, desc: "Diviseurs: 1+2+4+7+14 = 28 (Parfait), 2 divisions par 2" },
        { name: "Puissance 2 : 64", n: 64, desc: "Non parfait (somme=63), 6 divisions par 2" },
        { name: "Impair : 15", n: 15, desc: "Diviseurs: 1+3+5 = 9, 0 division par 2" },
        { name: "Nombre 12", n: 12, desc: "Diviseurs: 1+2+3+4+6 = 16, 2 divisions par 2" },
        { name: "Invalide : 105", n: 105, desc: "Hors intervalle 2..100 (invalide pour contrôle de saisie)" }
      ],

      // Questions flash de clôture (Phase 4)
      flashQuestions: [
        {
          expr: 'Pour parcourir de 10 à 0 décroissant de 2 en 2 en Python ?',
          resAlgo: 'Pour i de 10 à 0 [Pas = -2] Faire',
          resPy: 'for i in range(10, -1, -2): (borne de fin -1 exclue)',
          type: "Boucle Pour à pas négatif",
          isOpen: false
        },
        {
          expr: 'Si la condition de sortie est x > 0, quel while écrire ?',
          resAlgo: 'Jusqu\'à x > 0 (Arrêt si vrai)',
          resPy: 'while not (x > 0): ou while x <= 0: (Maintien si faux)',
          type: "Inversion de condition Répéter / While",
          isOpen: false
        },
        {
          expr: 'Pourquoi l\'instruction break est-elle strictement interdite ?',
          resAlgo: 'Inexistante en pseudo-code normatif',
          resPy: 'Elle détruit la structure logique et masque la condition d\'arrêt',
          type: "Norme officielle & Lisibilité",
          isOpen: false
        },
        {
          expr: 'Pourquoi temp = temp // 2 et non pas temp = temp / 2 ?',
          resAlgo: 'temp ← temp Div 2 (type Entier)',
          resPy: '// conserve le type int ; / renverrait un float décimal',
          type: "Division entière",
          isOpen: false
        },
        {
          expr: 'Combien d\'itérations exécute for i in range(1, n) ?',
          resAlgo: 'Pour i de 1 à n - 1 Faire',
          resPy: 'Exactement n - 1 itérations (de 1 à n - 1)',
          type: "Comptage d'itérations",
          isOpen: false
        },
        {
          expr: 'Dans le TDO, quel est le type de somme_div et est_parfait ?',
          resAlgo: 'somme_div : Entier | est_parfait : Booléen',
          resPy: 'somme_div -> int | est_parfait -> bool',
          type: "T.D.O. Standard",
          isOpen: false
        }
      ],

      // Auto-évaluation / Quiz (Phase 4)
      quizActiveCount: 10,
      quizQuestions: [],
      quizScore: 0,
      allQuestions: [
        {
          question: "Quelle est la principale différence entre la boucle 'Tant que' et la boucle 'Répéter ... Jusqu'à' ?",
          options: [
            "'Tant que' teste la condition avant l'exécution (condition de maintien), tandis que 'Répéter' teste après au moins une exécution (condition d'arrêt)",
            "'Tant que' ne s'utilise qu'avec des chaînes de caractères",
            "'Répéter' est toujours infinie",
            "Il n'y a aucune différence, ce sont des synonymes stricts"
          ],
          correct: 0,
          explanation: "La boucle 'Tant que' est à condition préalable (0 à N passages). La boucle 'Répéter...Jusqu'à' est post-test (1 à N passages) et s'arrête dès que sa condition devient Vraie."
        },
        {
          question: "Selon les directives pédagogiques officielles 2024-2025, quelle règle s'applique à l'instruction 'break' en Python ?",
          options: [
            "Son utilisation pour forcer la sortie d'une boucle for ou while est formellement interdite",
            "Elle est obligatoire dans toutes les boucles while",
            "Elle est tolérée uniquement dans les boucles for",
            "Elle remplace la condition d'arrêt du Tant que"
          ],
          correct: 0,
          explanation: "La norme officielle 2024-2025 énonce explicitement : 'L'utilisation de l'instruction break pour forcer l'arrêt de la boucle for ou while est formellement interdite'."
        },
        {
          question: "En Python, que génère l'expression 'range(1, 6)' ?",
          options: [
            "Les entiers 1, 2, 3, 4, 5 (la borne supérieure 6 est exclue)",
            "Les entiers 1, 2, 3, 4, 5, 6",
            "Les entiers 0, 1, 2, 3, 4, 5",
            "Une liste contenant uniquement le nombre 5"
          ],
          correct: 0,
          explanation: "En Python, la borne finale d'un range est TOUJOURS exclue. range(1, 6) parcourt de 1 à 5."
        },
        {
          question: "Comment transcrit-on fidèlement la structure 'Répéter ... Jusqu'à Condition' en Python sans employer break ?",
          options: [
            "Pré-initialiser les variables et écrire 'while not (Condition):'",
            "Écrire 'repeat: ... until Condition'",
            "Écrire 'while True:' avec un break",
            "Utiliser une boucle for infinie"
          ],
          correct: 0,
          explanation: "La transcription officielle consiste à pré-initialiser la variable de contrôle avec une valeur qui fausse la condition de sortie, puis à exécuter 'while not (Condition):'."
        },
        {
          question: "Que se passe-t-il si l'on modifie manuellement le compteur 'i' à l'intérieur d'une boucle 'Pour i de 1 à 10 Faire' en algorithmique ?",
          options: [
            "C'est une mauvaise pratique interdite par les conventions officielles",
            "Le pas de la boucle double automatiquement",
            "La boucle s'arrête immédiatement",
            "Le compteur devient une chaîne"
          ],
          correct: 0,
          explanation: "La recommandation officielle stipule : 'Éviter de modifier la valeur du compteur de la structure itérative complète au niveau du traitement'."
        },
        {
          question: "Pour tester si i est un diviseur strict de n en algorithmique, quelle condition utilise-t-on ?",
          options: [
            "n Mod i = 0",
            "n Div i = 0",
            "n / i == 0",
            "i Mod n = 0"
          ],
          correct: 0,
          explanation: "i divise n si et seulement si le reste de la division entière de n par i est nul : n Mod i = 0 (en Python : n % i == 0)."
        },
        {
          question: "Qu'est-ce qu'un nombre parfait en arithmétique ?",
          options: [
            "Un nombre égal à la somme de ses diviseurs stricts (diviseurs positifs autres que lui-même)",
            "Un nombre qui n'a aucun diviseur",
            "Un nombre uniquement divisible par 2",
            "Le carré d'un nombre entier"
          ],
          correct: 0,
          explanation: "Un nombre est parfait s'il est égal à la somme de ses diviseurs stricts. Exemple : 6 a pour diviseurs 1, 2, 3 et 1 + 2 + 3 = 6 ; 28 = 1 + 2 + 4 + 7 + 14."
        },
        {
          question: "Quelle fonction range Python permet de parcourir les entiers décroissants de 10 à 1 inclus ?",
          options: [
            "range(10, 0, -1)",
            "range(10, 1, -1)",
            "range(1, 10, -1)",
            "range(10, 0, 1)"
          ],
          correct: 0,
          explanation: "Pour s'arrêter à 1 inclus avec un pas négatif (-1), la borne supérieure (fin) doit être 0 (car 0 est exclu) : range(10, 0, -1)."
        },
        {
          question: "Dans l'algorithme AnalyseNombre, quel est le type de la variable temp dans le TDO ?",
          options: [
            "Entier",
            "Réel",
            "Booléen",
            "Caractère"
          ],
          correct: 0,
          explanation: "temp reçoit n (qui est un entier) et subit des divisions entières successives par 2 (Div / //) ; son type est donc Entier."
        },
        {
          question: "Que se produit-il si la condition d'une boucle 'Tant que' ne devient jamais Fausse ?",
          options: [
            "Le programme entre dans une boucle infinie et ne se termine jamais",
            "Python s'arrête automatiquement au bout de 10 secondes",
            "La variable devient nulle",
            "Le système d'exploitation redémarre"
          ],
          correct: 0,
          explanation: "Une condition de maintien qui reste indéfiniment Vraie produit une boucle infinie. Il faut toujours s'assurer qu'une instruction modifie la condition d'arrêt."
        },
        {
          question: "Quelle est la valeur de nb_div2 pour n = 12 à l'issue de la boucle Tant que ?",
          options: [
            "2 (12 // 2 = 6, puis 6 // 2 = 3 qui est impair)",
            "3",
            "1",
            "0"
          ],
          correct: 0,
          explanation: "12 est pair -> temp devient 6 (nb=1). 6 est pair -> temp devient 3 (nb=2). 3 est impair -> la boucle s'arrête. Total : 2 divisions."
        },
        {
          question: "Comment traduire en Python la condition de saisie 'Jusqu'à (n > 2) Et (n < 100)' ?",
          options: [
            "while not (2 < n < 100): ou while (n <= 2) or (n >= 100):",
            "while (n > 2) and (n < 100):",
            "until 2 < n < 100:",
            "while (2 < n < 100):"
          ],
          correct: 0,
          explanation: "La condition de sortie étant (2 < n < 100), la boucle doit continuer TANT QUE cette condition N'EST PAS satisfaite : while not (2 < n < 100):."
        },
        {
          question: "Dans une boucle 'Pour', quelle est la valeur par défaut du Pas si celui-ci n'est pas spécifié ?",
          options: [
            "1",
            "0",
            "-1",
            "2"
          ],
          correct: 0,
          explanation: "En algorithmique comme en Python, si le pas n'est pas mentionné, il est implicitement égal à 1."
        },
        {
          question: "Pourquoi utilise-t-on 'temp = temp // 2' plutôt que 'temp = temp / 2' en Python ?",
          options: [
            "Pour effectuer une division entière et conserver le type int",
            "Car l'opérateur / est interdit en Python",
            "Pour accélérer la boucle d'un facteur 10",
            "C'est exactement équivalent sans différence"
          ],
          correct: 0,
          explanation: "L'opérateur // effectue la division euclidienne (Div) et conserve un entier (int), évitant la conversion automatique en réel (float) provoquée par /."
        },
        {
          question: "Combien de diviseurs stricts possède un nombre premier P ?",
          options: [
            "Exactement 1 diviseur strict (le nombre 1)",
            "0 diviseur strict",
            "2 diviseurs stricts",
            "Une infinité"
          ],
          correct: 0,
          explanation: "Un nombre premier n'est divisible que par 1 et lui-même. Ses diviseurs stricts (excluant lui-même) se réduisent donc au seul nombre 1."
        }
      ]
    };
  },

  computed: {
    nVal() {
      const v = parseInt(this.simN, 10);
      return isNaN(v) ? 0 : v;
    },
    isValidInput() {
      return this.nVal > 2 && this.nVal < 100;
    },
    inputStatusBadge() {
      if (this.isValidInput) {
        return { text: 'Conforme (2 < N < 100)', cls: 'bg-success' };
      }
      return { text: 'Non conforme (Saisie rejetée, répétition)', cls: 'bg-danger' };
    },
    divisorsList() {
      if (this.nVal <= 1) return [];
      const res = [];
      for (let i = 1; i < this.nVal; i++) {
        if (this.nVal % i === 0) {
          res.push(i);
        }
      }
      return res;
    },
    sommeDiv() {
      return this.divisorsList.reduce((acc, d) => acc + d, 0);
    },
    isPerfect() {
      return this.nVal > 1 && this.sommeDiv === this.nVal;
    },
    divisionSteps() {
      if (this.nVal <= 0) return [];
      const steps = [];
      let cur = this.nVal;
      while (cur > 0 && cur % 2 === 0) {
        const next = Math.floor(cur / 2);
        steps.push({
          before: cur,
          after: next
        });
        cur = next;
      }
      return steps;
    },
    nbDiv2() {
      return this.divisionSteps.length;
    },
    lastOddNumber() {
      if (this.nVal <= 0) return 0;
      let cur = this.nVal;
      while (cur > 0 && cur % 2 === 0) {
        cur = Math.floor(cur / 2);
      }
      return cur;
    },
    terminalOutput() {
      let out = `Donner un entier N (2 à 100) : ${this.nVal}\n`;
      if (!this.isValidInput) {
        out += `[Boucle post-test] Saisie hors intervalle 2..100 ! Répétition de la demande...\n`;
      }
      out += `Le nombre est-il parfait ? : ${this.isPerfect ? 'True' : 'False'}\n`;
      out += `Nombre de divisions par 2 possibles : ${this.nbDiv2}`;
      return out;
    }
  },

  mounted() {
    this.initQuiz();
    this.highlightAll();

    // Lecture du hash d'URL initial si présent
    if (this.readUrl()) {
      this.$nextTick(() => {
        this.highlightAll();
      });
    } else {
      this.updateUrl(true);
    }

    // Écoute des événements d'historique du navigateur
    window.addEventListener('popstate', () => {
      this.handleHashChange();
    });
    window.addEventListener('hashchange', () => {
      this.handleHashChange();
    });

    // Fermeture automatique de tout dropdown au clic sur une option
    document.addEventListener('click', (e) => {
      if (e.target.closest('.dropdown-item')) {
        this.closeDropdowns();
      }
    });

    // Coloration syntaxique lors du basculement des onglets
    document.querySelectorAll('button[data-bs-toggle="tab"]').forEach((tabEl) => {
      tabEl.addEventListener('shown.bs.tab', () => {
        this.highlightAll();
      });
    });
  },

  methods: {
    // Mise à jour de l'URL avec la phase active
    updateUrl(replace = false) {
      const hash = this.currentPhase === 'all'
        ? '#all'
        : `#phase${this.currentPhase}`;

      if (window.location.hash !== hash) {
        if (replace) {
          history.replaceState(null, '', hash);
        } else {
          history.pushState(null, '', hash);
        }
      }
    },

    // Lecture de la phase depuis le hash de l'URL
    readUrl() {
      const hash = window.location.hash.trim().toLowerCase();
      if (!hash) return false;

      // Formats acceptés : #phase1, #phase-1, #1, #all
      const match = hash.match(/^#(?:phase-?)?([1-4]|all)/i);
      if (match) {
        const phase = match[1] === 'all' ? 'all' : parseInt(match[1], 10);
        this.currentPhase = phase;
        return true;
      }
      return false;
    },

    // Gestion du changement de hash via le navigateur (historique)
    handleHashChange() {
      if (this.readUrl()) {
        this.closeDropdowns();
        this.$nextTick(() => {
          this.highlightAll();
        });
      }
    },

    // Fermeture des dropdowns et du menu responsive
    closeDropdowns() {
      if (window.bootstrap && window.bootstrap.Dropdown) {
        document.querySelectorAll('.dropdown-toggle').forEach((el) => {
          const inst = window.bootstrap.Dropdown.getInstance(el);
          if (inst) {
            inst.hide();
          }
        });
      }
      document.querySelectorAll('.dropdown-menu.show').forEach((menu) => {
        menu.classList.remove('show');
        menu.removeAttribute('data-bs-popper');
      });
      document.querySelectorAll('.dropdown-toggle.show').forEach((toggle) => {
        toggle.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      });

      const navCollapse = document.getElementById('navContent');
      if (navCollapse && navCollapse.classList.contains('show')) {
        if (window.bootstrap && window.bootstrap.Collapse) {
          const collapseInst = window.bootstrap.Collapse.getInstance(navCollapse);
          if (collapseInst) {
            collapseInst.hide();
          }
        }
        navCollapse.classList.remove('show');
      }
    },

    setPhase(p) {
      this.currentPhase = p;
      this.isMenuOpen = false;
      this.closeDropdowns();
      this.updateUrl();
      this.$nextTick(() => {
        this.highlightAll();
        window.scrollTo({ top: 120, behavior: 'smooth' });
      });
    },

    nextPhase() {
      if (this.currentPhase === 'all') return;
      if (this.currentPhase < this.phases.length) {
        this.setPhase(this.currentPhase + 1);
      }
    },

    prevPhase() {
      if (this.currentPhase === 'all') return;
      if (this.currentPhase > 1) {
        this.setPhase(this.currentPhase - 1);
      }
    },

    toggleViewMode() {
      const nextMode = this.currentPhase === 'all' ? 1 : 'all';
      this.currentPhase = nextMode;
      this.isMenuOpen = false;
      this.closeDropdowns();
      this.updateUrl();
      this.$nextTick(() => {
        this.highlightAll();
      });
    },

    toggleOral(item) {
      item.isOpen = !item.isOpen;
    },

    toggleFlash(item) {
      item.isOpen = !item.isOpen;
    },

    setPreset(pr) {
      this.simN = pr.n;
    },

    copyPythonCode() {
      const code = `# 1. Contrôle de saisie émulant 'Répéter ... Jusqu'à' sans break
n = 0
while not (2 < n < 100):
    n = int(input("Donner un entier N (2 à 100) : "))

# 2. Somme des diviseurs avec 'for in range' (borne n incluse dans le range via n)
somme_div = 0
for i in range(1, n):
    if n % i == 0:
        somme_div = somme_div + i
est_parfait = (somme_div == n)
print("Le nombre est-il parfait ? :", est_parfait)

# 3. Divisions successives par 2 avec 'while'
temp = n
nb_div2 = 0
while temp % 2 == 0:
    temp = temp // 2
    nb_div2 = nb_div2 + 1
print("Nombre de divisions par 2 possibles :", nb_div2)`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(() => {
          this.copyStatus = 'Copié avec succès !';
          setTimeout(() => {
            this.copyStatus = 'Copier le script Python';
          }, 2500);
        });
      } else {
        alert("Code copié dans votre presse-papier !");
      }
    },

    // Initialisation et tirage aléatoire du Quiz
    initQuiz() {
      const shuffled = [...this.allQuestions].sort(() => 0.5 - Math.random());
      this.quizQuestions = shuffled.slice(0, this.quizActiveCount).map(q => ({
        ...q,
        selected: null,
        showAnswer: false
      }));
      this.quizScore = 0;
    },

    selectQuizOption(qIdx, oIdx) {
      const q = this.quizQuestions[qIdx];
      if (q.showAnswer) return;

      q.selected = oIdx;
      q.showAnswer = true;
      if (oIdx === q.correct) {
        this.quizScore++;
      }
    },

    highlightAll() {
      if (window.hljs) {
        document.querySelectorAll('pre code').forEach((block) => {
          window.hljs.highlightElement(block);
        });
      }
    }
  }
}).mount('#app');
