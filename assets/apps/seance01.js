/**
 * assets/apps/seance01.js
 * Logique applicative JavaScript (Vue 3) pour seance01.html
 * Séance 1 : Structures de données (Types numériques & textuels)
 * Séquence pédagogique en deux problèmes consécutifs :
 *   - Problème 1 : Types numériques, fonctions arithmétiques & repère 2D (Phases 1 à 4)
 *   - Problème 2 : Types textuels, primitives de chaînes & analyseur indicé (Phases 1 à 4)
 * Conforme aux conventions officielles tunisiennes 2024-2025 (Bac 2026)
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      currentProblem: 1, // 1 ou 2
      currentPhase: 1,   // 1, 2, 3, 4 ou 'all'
      isMenuOpen: false,

      // ==========================================
      // PHASES PÉDAGOGIQUES PAR PROBLÈME
      // ==========================================
      phasesP1: [
        { title: "Situation & Labo 2D (Distance euclidienne)", shortTitle: "Situation & Labo 2D", duration: "10 min" },
        { title: "Fonctions Prédéfinies Arithmétiques", shortTitle: "Fonctions Arithmétiques", duration: "15 min" },
        { title: "Bilan & Auto-évaluation (Questions flash & Quiz arithmétique)", shortTitle: "Bilan & Quiz", duration: "5 min" }
      ],

      phasesP2: [
        { title: "Situation & Labo Chaîne (Code d'inscription)", shortTitle: "Situation & Labo Chaîne", duration: "10 min" },
        { title: "Fonctions Prédéfinies Textuelles", shortTitle: "Primitives Chaînes", duration: "15 min" },
        { title: "Bilan & Auto-évaluation (Questions flash & Quiz textuel)", shortTitle: "Bilan & Quiz", duration: "5 min" }
      ],

      // ==========================================
      // PROBLÈME 1 : ARITHMÉTIQUE & SCALAIRES
      // ==========================================
      oralQuestionsP1: [
        {
          id: 1,
          question: "Comment exprimer le quotient et le reste d'une division entière ?",
          algoAns: "Quotient : div (ex: 14 div 3 = 4) | Reste : mod (ex: 14 mod 3 = 2)",
          pyAns: "Quotient : // (ex: 14 // 3 == 4) | Reste : % (ex: 14 % 3 == 2)",
          isOpen: false
        },
        {
          id: 2,
          question: "Comment extraire une racine carrée ou générer un entier aléatoire ?",
          algoAns: "On utilise les fonctions prédéfinies : Racine(x) et Aléa(vi, vf).",
          pyAns: "On importe depuis la bibliothèque standard : from math import sqrt et from random import randint.",
          isOpen: false
        },
        {
          id: 3,
          question: "Quelle est la différence fondamentale entre la division réelle (/) et la division entière (div) ?",
          algoAns: "a / b produit toujours un Réel (ex: 14 / 3 ≈ 4.666...), alors que a div b produit un Entier (part entière sans virgule).",
          pyAns: "14 / 3 donne un float (4.666666666666667), alors que 14 // 3 donne un int (4).",
          isOpen: false
        }
      ],

      flashQuestionsP1: [
        { expr: "14 Div 3", resAlgo: "4", resPy: "14 // 3 -> 4", type: "Entier (Quotient)", isOpen: false },
        { expr: "14 Mod 3", resAlgo: "2", resPy: "14 % 3 -> 2", type: "Entier (Reste)", isOpen: false },
        { expr: "Racine(49)", resAlgo: "7.0", resPy: "sqrt(49) -> 7.0", type: "Réel", isOpen: false },
        { expr: "Arrondi(7.6) vs Ent(7.6)", resAlgo: "Arrondi(7.6) = 8 | Ent(7.6) = 7", resPy: "round(7.6) -> 8 | int(7.6) -> 7", type: "Entiers", isOpen: false },
        { expr: "Abs(-15.4)", resAlgo: "15.4", resPy: "abs(-15.4) -> 15.4", type: "Réel", isOpen: false },
        { expr: "7 Mod 2 = 0", resAlgo: "Faux", resPy: "7 % 2 == 0 -> False", type: "Booléen", isOpen: false }
      ],

      simPoint: { x: 3, y: 4 },
      simAnimation: false,
      copyStatusMath: 'Copier le script Python (Distance)',

      quizP1Count: 5,
      quizP1Questions: [],
      quizP1Score: 0,
      allQuestionsP1: [
        {
          question: "En algorithmique selon la norme 2024-2025, quel opérateur calcule le reste de la division entière ?",
          options: ["Div", "Mod", "%", "Reste()"],
          correct: 1,
          explanation: "'Mod' désigne l'opérateur du reste de la division entière, et 'Div' désigne le quotient entier."
        },
        {
          question: "Quel est l'équivalent en Python de l'opération algorithmique : r ← a Mod b ?",
          options: ["r = a mod b", "r = a // b", "r = a % b", "r = a.mod(b)"],
          correct: 2,
          explanation: "En Python, l'opérateur modulo est '%' (reste) et le quotient entier est '//'."
        },
        {
          question: "Quelle est la valeur de l'expression algorithmique : 17 Div 5 ?",
          options: ["3.4", "3", "2", "1"],
          correct: 1,
          explanation: "17 = 5 * 3 + 2. Le quotient entier (Div) est 3, le reste (Mod) est 2."
        },
        {
          question: "Quelle instruction Python est indispensable avant d'utiliser la fonction sqrt(x) ?",
          options: ["import math.sqrt", "from math import sqrt", "include <math.h>", "load sqrt"],
          correct: 1,
          explanation: "La fonction racine carrée réside dans le module 'math' et s'importe par 'from math import sqrt'."
        },
        {
          question: "Que retourne la fonction algorithmique Aléa(-5, 5) ?",
          options: [
            "Un nombre réel aléatoire entre -5 et 5",
            "Un entier aléatoire appartenant à l'intervalle [-5, 5] (bornes incluses)",
            "Un entier aléatoire entre -5 et 4 (5 exclu)",
            "Une chaîne de caractères aléatoire"
          ],
          correct: 1,
          explanation: "Aléa(vi, vf) retourne un entier aléatoire dans [vi, vf], bornes comprises."
        },
        {
          question: "Quelle est la différence entre Arrondi(x) et Ent(x) pour x = 8.75 ?",
          options: [
            "Arrondi(8.75) = 8 et Ent(8.75) = 8",
            "Arrondi(8.75) = 9 et Ent(8.75) = 8",
            "Arrondi(8.75) = 8.7 et Ent(8.75) = 9",
            "Arrondi(8.75) = 9 et Ent(8.75) = 9"
          ],
          correct: 1,
          explanation: "Arrondi(x) retourne l'entier le plus proche (9), alors que Ent(x) tronque et retourne la partie entière (8)."
        },
        {
          question: "Quel opérateur de comparaison traduit l'égalité algorithmique '=' en Python ?",
          options: ["=", "==", "===", ":="],
          correct: 1,
          explanation: "En Python, l'égalité se teste avec '==', le signe '=' étant réservé à l'affectation."
        },
        {
          question: "Quel est le résultat de : abs(-12.8) en Python ?",
          options: ["-12.8", "12", "12.8", "13"],
          correct: 2,
          explanation: "abs(x) renvoie la valeur absolue |x|, soit 12.8."
        }
      ],

      // ==========================================
      // PROBLÈME 2 : TEXTUEL & CHAÎNES
      // ==========================================
      oralQuestionsP2: [
        {
          id: 1,
          question: "Comment localiser le séparateur '-' dans une chaîne ?",
          algoAns: "On utilise Pos(ch1, ch2) : p ← Pos('-', code). Elle renvoie la 1ère position trouvée ou -1 si absent.",
          pyAns: "On utilise la méthode .find() : p = code.find('-'). Elle retourne l'indice ou -1 si absent.",
          isOpen: false
        },
        {
          id: 2,
          question: "Comment extraire une portion de chaîne et quelle est la règle de la borne de fin ?",
          algoAns: "On utilise Sous_chaine(ch, d, f). La position finale f est STRICTEMENT EXCLUE (indices extraits de d à f - 1).",
          pyAns: "On utilise le slicing ch[d:f], où l'indice f est exclu.",
          isOpen: false
        },
        {
          id: 3,
          question: "Quel est l'indice du premier caractère d'une chaîne selon les conventions officielles 2024-2025 ?",
          algoAns: "L'indice du 1er caractère est obligatoirement 0 (0 ≤ i < Long(Ch)).",
          pyAns: "En Python, l'indiçage démarre toujours à 0 (ch[0]).",
          isOpen: false
        }
      ],

      flashQuestionsP2: [
        { expr: 'Si ch = "bac", indices & Pos("x", ch) ?', resAlgo: 'ch[0]="b", ch[2]="c" | Pos("x", ch) = -1', resPy: 'ch[0]=="b" | ch.find("x") == -1', type: "Indice & Recherche", isOpen: false },
        { expr: 'Sous_chaine("informatique", 2, 5)', resAlgo: '"for"', resPy: '"informatique"[2:5] -> "for"', type: "Extraction (borne 5 exclue)", isOpen: false },
        { expr: 'Estnum("2026") vs Estnum("2026a")', resAlgo: 'Vrai pour "2026" | Faux pour "2026a"', resPy: '"2026".isdecimal() -> True | "2026a".isdecimal() -> False', type: "Test numérique", isOpen: false },
        { expr: 'Ord("A") et Chr(65)', resAlgo: 'Ord("A") = 65 | Chr(65) = "A"', resPy: 'ord("A") -> 65 | chr(65) -> "A"', type: "Code ASCII & Caractère", isOpen: false },
        { expr: 'Effacer("bac-2026", 0, 4)', resAlgo: '"2026"', resPy: 'ch[:0] + ch[4:] -> "2026"', type: "Suppression de tranche", isOpen: false },
        { expr: 'Valeur("2026") + 1', resAlgo: "2027", resPy: 'int("2026") + 1 -> 2027', type: "Conversion & calcul", isOpen: false }
      ],

      simInputCode: 'info-2026',
      exampleCodes: ['info-2026', 'bac-2025', 'sc-2024', 'math-2023', 'tech-2027', 'erreur-abc'],
      copyStatusText: 'Copier le script Python (Chaînes)',

      quizP2Count: 5,
      quizP2Questions: [],
      quizP2Score: 0,
      allQuestionsP2: [
        {
          question: "Selon les conventions officielles 2024-2025, quel est l'indice du premier caractère d'une chaîne Ch ?",
          options: ["1 (ancienne convention)", "0 (l'indexation démarre obligatoirement à 0)", "-1", "N'importe quel entier"],
          correct: 1,
          explanation: "La norme 2024-2025 stipule : 'L’indice du premier élément d’une chaîne de caractères est 0'."
        },
        {
          question: "Que retourne la primitive algorithmique Pos('-', 'info-2026') ?",
          options: ["4 (indices : 'i'=0, 'n'=1, 'f'=2, 'o'=3, '-'=4)", "5 (en comptant à 1)", "Vrai", "-1"],
          correct: 0,
          explanation: "En base 0 : 'i'(0), 'n'(1), 'f'(2), 'o'(3) et le tiret '-' est à l'indice 4."
        },
        {
          question: "Quelle valeur renvoie Pos(ch1, ch2) si la sous-chaîne ch1 n'existe pas dans ch2 ?",
          options: ["0", "-1", "Faux", "Une chaîne vide ''"],
          correct: 1,
          explanation: "Pos retourne la première position de ch1 dans ch2, sinon elle retourne impérativement -1."
        },
        {
          question: "Quel est l'équivalent Python officiel de Pos(ch1, ch2) ?",
          options: ["ch2.index(ch1)", "ch2.find(ch1)", "pos(ch1, ch2)", "ch1 in ch2"],
          correct: 1,
          explanation: "En Python, la méthode ch2.find(ch1) renvoie l'indice trouvé ou -1 si absent, conforme au contrat de Pos."
        },
        {
          question: "Quelle est la valeur de Sous_chaine('informatique', 2, 5) ?",
          options: ["'for'", "'form'", "'nfo'", "'info'"],
          correct: 0,
          explanation: "Indices : 'i'(0), 'n'(1), 'f'(2), 'o'(3), 'r'(4), 'm'(5). De 2 à 5 exclu extrait les indices 2, 3 et 4, soit 'for'."
        },
        {
          question: "Comment traduit-on Sous_chaine(ch, 0, p) en Python par slicing ?",
          options: ["ch[0:p]", "ch[0..p]", "ch.substring(0, p)", "ch[0:p+1]"],
          correct: 0,
          explanation: "Le slicing ch[0:p] extrait du caractère 0 jusqu'à p - 1, ce qui équivaut à Sous_chaine(ch, 0, p)."
        },
        {
          question: "Quelle méthode Python officielle traduit la primitive Estnum(ch) ?",
          options: ["ch.isdecimal()", "ch.isdigit()", "ch.isnumber()", "isnum(ch)"],
          correct: 0,
          explanation: "Selon les conventions 2024-2025, la traduction officielle de Estnum(ch) est ch.isdecimal()."
        },
        {
          question: "Que retourne l'expression 'info-2026'.upper() en Python ?",
          options: ["'INFO-2026'", "'Info-2026'", "'INFO'", "Une erreur d'exécution"],
          correct: 0,
          explanation: ".upper() convertit les lettres alphabétiques en majuscules : 'INFO-2026'."
        }
      ]
    };
  },

  computed: {
    // Phases actives en fonction du problème courant
    currentPhasesList() {
      return this.currentProblem === 1 ? this.phasesP1 : this.phasesP2;
    },
    currentProblemTitle() {
      return this.currentProblem === 1
        ? "Problème 1 : Types numériques, fonctions arithmétiques & repère 2D"
        : "Problème 2 : Types textuels, primitives de chaînes & analyseur indicé";
    },
    currentProblemSubtitle() {
      return this.currentProblem === 1
        ? "Partie 1 : Types numériques & Arithmétique"
        : "Partie 2 : Types textuels & Chaînes de caractères";
    },
    currentPhaseTitle() {
      if (this.currentPhase === 'all') {
        return "Vue complète (Toutes les phases du problème)";
      }
      return this.currentPhasesList[this.currentPhase - 1] ? this.currentPhasesList[this.currentPhase - 1].title : '';
    },
    viewModeButtonText() {
      return this.currentPhase === 'all'
        ? 'Mode pas-à-pas'
        : 'Tout afficher (Problème ' + this.currentProblem + ')';
    },
    phaseChipText() {
      return 'P' + this.currentProblem + '-' + (this.currentPhase === 'all' ? 'All' : this.currentPhase + '/' + this.currentPhasesList.length);
    },

    // Calculs en direct du simulateur cartésien 2D (Problème 1)
    simDistance() {
      return Math.sqrt(this.simPoint.x * this.simPoint.x + this.simPoint.y * this.simPoint.y);
    },
    simRounded() {
      return Math.round(this.simDistance);
    },
    simIsEven() {
      return (this.simRounded % 2 === 0);
    },
    svgX() {
      return 150 + this.simPoint.x * 12;
    },
    svgY() {
      return 150 - this.simPoint.y * 12;
    },

    // Calculs en direct de l'analyseur indicé de chaînes (Problème 2)
    cleanInput() {
      return this.simInputCode ? this.simInputCode.trim() : '';
    },
    charList() {
      return this.cleanInput.split('').map((c, i) => ({
        char: c,
        index: i
      }));
    },
    sepIndex() {
      return this.cleanInput.indexOf('-');
    },
    hasSep() {
      return this.sepIndex !== -1;
    },
    prefixeExtrait() {
      if (!this.hasSep) return this.cleanInput;
      return this.cleanInput.substring(0, this.sepIndex);
    },
    suffixeExtrait() {
      if (!this.hasSep) return '';
      return this.cleanInput.substring(this.sepIndex + 1);
    },
    isSuffixNumeric() {
      if (!this.suffixeExtrait) return false;
      return /^\d+$/.test(this.suffixeExtrait);
    },
    parsedYear() {
      if (!this.isSuffixNumeric) return null;
      return parseInt(this.suffixeExtrait, 10);
    },
    nextYear() {
      if (this.parsedYear === null) return null;
      return this.parsedYear + 1;
    },
    nouveauCode() {
      const majPrefix = this.prefixeExtrait.toUpperCase();
      if (!this.hasSep) return majPrefix;
      if (!this.isSuffixNumeric) return majPrefix + '-' + this.suffixeExtrait;
      return majPrefix + '-' + this.nextYear;
    }
  },

  mounted() {
    this.initQuiz1();
    this.initQuiz2();
    this.highlightAll();

    // Lecture du hash d'URL initial si présent
    if (this.readUrl()) {
      this.$nextTick(() => {
        this.highlightAll();
      });
    } else {
      this.updateUrl(true);
    }

    // Écoute des boutons Précédent / Suivant du navigateur
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
    // Mise à jour de l'URL avec le problème et la phase actifs
    updateUrl(replace = false) {
      const hash = this.currentPhase === 'all'
        ? `#p${this.currentProblem}-all`
        : `#p${this.currentProblem}-phase${this.currentPhase}`;

      if (window.location.hash !== hash) {
        if (replace) {
          history.replaceState(null, '', hash);
        } else {
          history.pushState(null, '', hash);
        }
      }
    },

    // Lecture de l'état (problème et phase) depuis le hash de l'URL
    readUrl() {
      const hash = window.location.hash.trim().toLowerCase();
      if (!hash) return false;

      // Formats acceptés : #p1-phase2, #p1-2, #p1-all, #p2-phase3, etc.
      const match = hash.match(/^#p([12])-(?:phase-?)?([1-4]|all)/i);
      if (match) {
        const prob = parseInt(match[1], 10);
        let phase = match[2] === 'all' ? 'all' : parseInt(match[2], 10);
        this.currentProblem = prob;
        const maxPhases = prob === 1 ? this.phasesP1.length : this.phasesP2.length;
        if (phase !== 'all' && phase > maxPhases) {
          phase = maxPhases;
        }
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

    // Sélecteur de problème
    setProblem(probNum, phaseNum = 1) {
      this.currentProblem = probNum;
      this.currentPhase = phaseNum;
      this.isMenuOpen = false;
      this.closeDropdowns();
      this.updateUrl();
      this.$nextTick(() => {
        this.highlightAll();
        window.scrollTo({ top: 180, behavior: 'smooth' });
      });
    },

    // Sélecteur de phase pour le problème actif
    setPhase(phaseNum) {
      this.currentPhase = phaseNum;
      this.isMenuOpen = false;
      this.closeDropdowns();
      this.updateUrl();
      this.$nextTick(() => {
        this.highlightAll();
        window.scrollTo({ top: 220, behavior: 'smooth' });
      });
    },

    // Navigation séquentielle globale (P1 puis P2)
    nextPhase() {
      if (this.currentPhase === 'all') {
        if (this.currentProblem === 1) {
          this.setProblem(2, 1);
        }
        return;
      }

      const maxPhases = this.currentPhasesList.length;
      if (this.currentPhase < maxPhases) {
        this.setPhase(this.currentPhase + 1);
      } else if (this.currentPhase === maxPhases && this.currentProblem === 1) {
        // Fin du problème 1 -> passage séquentiel au problème 2 !
        this.setProblem(2, 1);
      }
    },

    prevPhase() {
      if (this.currentPhase === 'all') {
        if (this.currentProblem === 2) {
          this.setProblem(1, 1);
        }
        return;
      }

      if (this.currentPhase > 1) {
        this.setPhase(this.currentPhase - 1);
      } else if (this.currentPhase === 1 && this.currentProblem === 2) {
        // Début du problème 2 -> retour vers la dernière phase du problème 1
        this.setProblem(1, this.phasesP1.length);
      }
    },

    toggleViewMode() {
      if (this.currentPhase === 'all') {
        this.currentPhase = 1;
      } else {
        this.currentPhase = 'all';
      }
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

    randomizePoint() {
      this.simAnimation = true;
      this.simPoint.x = Math.floor(Math.random() * 21) - 10;
      this.simPoint.y = Math.floor(Math.random() * 21) - 10;
      setTimeout(() => {
        this.simAnimation = false;
      }, 400);
    },

    copyPythonCodeMath() {
      const code = `from math import sqrt
from random import randint

# Tirage aléatoire des coordonnées entre -10 et 10
x = randint(-10, 10)
y = randint(-10, 10)

# Traitement arithmétique
d = sqrt(x * x + y * y)
d_arrondi = round(d)
est_pair = (d_arrondi % 2 == 0)

# Affichage des résultats
print("Coordonnées : (", x, ",", y, ")")
print("Distance réelle :", d)
print("Distance arrondie :", d_arrondi)
print("Distance paire ? :", est_pair)`;

      this.executeClipboardCopy(code, 'copyStatusMath', 'Copier le script Python (Distance)');
    },

    copyPythonCodeText() {
      const code = `# Saisie du code
code = input("Donner le code (ex: info-2026) : ")

# Position du tiret et découpage
p = code.find('-')
prefixe = code[0:p]
suffixe = code[p + 1:]

# Vérification que le suffixe est numérique
valide = suffixe.isdecimal()

if valide:
    # Préfixe en majuscules et incrémentation de l'année
    annee = int(suffixe)
    nouvelle_annee = annee + 1
    nouveau_code = prefixe.upper() + "-" + str(nouvelle_annee)
    print("Nouveau code :", nouveau_code)
else:
    print("Erreur : le suffixe n'est pas numérique !")`;

      this.executeClipboardCopy(code, 'copyStatusText', 'Copier le script Python (Chaînes)');
    },

    executeClipboardCopy(text, statusProp, defaultText) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          this[statusProp] = 'Copié avec succès !';
          setTimeout(() => {
            this[statusProp] = defaultText;
          }, 2500);
        });
      } else {
        alert("Code copié dans le presse-papier !");
      }
    },

    initQuiz1() {
      const shuffled = [...this.allQuestionsP1].sort(() => 0.5 - Math.random());
      this.quizP1Questions = shuffled.slice(0, this.quizP1Count).map(q => ({
        ...q,
        selected: null,
        showAnswer: false
      }));
      this.quizP1Score = 0;
    },

    selectQuizOption1(qIdx, oIdx) {
      const q = this.quizP1Questions[qIdx];
      if (q.showAnswer) return;

      q.selected = oIdx;
      q.showAnswer = true;
      if (oIdx === q.correct) {
        this.quizP1Score++;
      }
    },

    initQuiz2() {
      const shuffled = [...this.allQuestionsP2].sort(() => 0.5 - Math.random());
      this.quizP2Questions = shuffled.slice(0, this.quizP2Count).map(q => ({
        ...q,
        selected: null,
        showAnswer: false
      }));
      this.quizP2Score = 0;
    },

    selectQuizOption2(qIdx, oIdx) {
      const q = this.quizP2Questions[qIdx];
      if (q.showAnswer) return;

      q.selected = oIdx;
      q.showAnswer = true;
      if (oIdx === q.correct) {
        this.quizP2Score++;
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
