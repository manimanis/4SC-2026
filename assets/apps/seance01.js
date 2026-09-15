/**
 * assets/apps/seance01.js
 * Logique applicative JavaScript (Vue 3) pour seance01.html
 * Séance 1 : Types scalaires, fonctions prédéfinies arithmétiques & TDO standard
 * Conforme aux programmes et conventions officielles 2024-2025
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      currentPhase: 1,
      isMenuOpen: false,

      // Phases d'apprentissage
      phases: [
        { title: "Accroche & Réactivation (Situation-problème)", shortTitle: "Phase 1 : Accroche", duration: "10 min" },
        { title: "Synthèse des correspondances Algo ↔ Python", shortTitle: "Phase 2 : Normes Algo/Python", duration: "15 min" },
        { title: "Élaboration de l'Algorithme & TDO standard", shortTitle: "Phase 3 : Algo & TDO", duration: "20 min" },
        { title: "Implémentation sur machine, Débogage & Laboratoire", shortTitle: "Phase 4 : Machine & Débogage", duration: "20 min" },
        { title: "Bilan & Auto-évaluation (Contrôle oral & Quiz)", shortTitle: "Phase 5 : Bilan & Quiz", duration: "5 min" }
      ],

      // État des questions orales de la phase 1
      oralQuestions: [
        {
          id: 1,
          question: "Comment exprimer le quotient et le reste d'une division entière ?",
          algoAns: "Quotient : Div (ex: 14 Div 3 = 4) | Reste : Mod (ex: 14 Mod 3 = 2)",
          pyAns: "Quotient : // (ex: 14 // 3 == 4) | Reste : % (ex: 14 % 3 == 2)",
          isOpen: false
        },
        {
          id: 2,
          question: "Comment extraire une racine carrée ou générer un entier aléatoire sans réécrire l'algorithme ?",
          algoAns: "On utilise les fonctions prédéfinies : RacineCarré(x) et Aléa(vi, vf).",
          pyAns: "On importe depuis la bibliothèque standard : from math import sqrt et from random import randint.",
          isOpen: false
        },
        {
          id: 3,
          question: "Quelle est la différence fondamentale entre la division réelle (/) et la division entière (Div / //) ?",
          algoAns: "a / b produit toujours un Réel (ex: 14 / 3 ≈ 4.666...), alors que a Div b produit un Entier (la part entière du quotient sans virgule).",
          pyAns: "14 / 3 donne un float (4.666666666666667), alors que 14 // 3 donne un int (4).",
          isOpen: false
        }
      ],

      // État des questions flash de la phase 5 (clôture)
      flashQuestions: [
        {
          expr: "14 Div 3",
          resAlgo: "4",
          resPy: "14 // 3 -> 4",
          type: "Entier",
          isOpen: false
        },
        {
          expr: "14 Mod 3",
          resAlgo: "2",
          resPy: "14 % 3 -> 2",
          type: "Entier",
          isOpen: false
        },
        {
          expr: "RacineCarré(49)",
          resAlgo: "7.0",
          resPy: "sqrt(49) -> 7.0",
          type: "Réel",
          isOpen: false
        },
        {
          expr: "Arrondi(7.6) vs Ent(7.6)",
          resAlgo: "Arrondi(7.6) = 8 | Ent(7.6) = 7",
          resPy: "round(7.6) -> 8 | int(7.6) -> 7",
          type: "Entier",
          isOpen: false
        },
        {
          expr: "Abs(-15.4)",
          resAlgo: "15.4",
          resPy: "abs(-15.4) -> 15.4",
          type: "Réel",
          isOpen: false
        },
        {
          expr: "7 Mod 2 = 0",
          resAlgo: "Faux",
          resPy: "7 % 2 == 0 -> False",
          type: "Booléen",
          isOpen: false
        }
      ],

      // Simulateur de laboratoire (Phase 4)
      simPoint: {
        x: 3,
        y: 4
      },
      simAnimation: false,
      copyStatus: 'Copier le script Python',

      // Auto-évaluation / Quiz (Phase 5)
      quizActiveCount: 10,
      quizQuestions: [],
      quizScore: 0,
      allQuestions: [
        {
          question: "En algorithmique selon la norme 2024-2025, quel opérateur calcule le reste de la division entière ?",
          options: [
            "Div",
            "Mod",
            "%",
            "Reste()"
          ],
          correct: 1,
          explanation: "En algorithmique tunisienne, 'Mod' désigne l'opérateur du reste de la division entière, alors que 'Div' désigne le quotient entier."
        },
        {
          question: "Quel est l'équivalent en Python de l'opération algorithmique : r ← a Mod b ?",
          options: [
            "r = a mod b",
            "r = a // b",
            "r = a % b",
            "r = a.mod(b)"
          ],
          correct: 2,
          explanation: "En Python, l'opérateur modulo est '%' (pour le reste) et l'opérateur de quotient entier est '//'."
        },
        {
          question: "Quelle est la valeur de l'expression algorithmique : 17 Div 5 ?",
          options: [
            "3.4",
            "3",
            "2",
            "1"
          ],
          correct: 1,
          explanation: "17 = 5 * 3 + 2. Le quotient entier (Div) est 3, le reste (Mod) est 2."
        },
        {
          question: "Quelle instruction Python est indispensable avant d'utiliser la fonction sqrt(x) ?",
          options: [
            "import math.sqrt",
            "from math import sqrt",
            "include <math.h>",
            "load sqrt"
          ],
          correct: 1,
          explanation: "En Python, la fonction racine carrée réside dans le module 'math' et s'importe usuellement par 'from math import sqrt'."
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
          explanation: "Aléa(vi, vf) retourne un entier aléatoire dans l'intervalle [vi, vf], bornes vi et vf comprises."
        },
        {
          question: "Quel module Python fournit la fonction randint(a, b) conforme à Aléa(a, b) ?",
          options: [
            "math",
            "random",
            "numpy",
            "os"
          ],
          correct: 1,
          explanation: "randint(a, b) provient du module 'random' (from random import randint). Il inclut bien les deux bornes a et b."
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
          explanation: "Arrondi(x) retourne l'entier le plus proche (ici 9 car 8.75 ≥ 8.5), alors que Ent(x) tronque et retourne la partie entière (8)."
        },
        {
          question: "Quelle est la syntaxe Python pour obtenir la partie entière tronquée d'un réel x ?",
          options: [
            "ent(x)",
            "trunc(x)",
            "int(x)",
            "integer(x)"
          ],
          correct: 2,
          explanation: "En Python, la conversion explicite int(x) pour un réel positif ou négatif extrait sa partie entière en tronquant les décimales."
        },
        {
          question: "En algorithmique, où doit-on obligatoirement déclarer les variables d'un algorithme principal ?",
          options: [
            "Dans le TDOL (Tableau de Déclaration des Objets Locaux)",
            "Dans le TDO (Tableau de Déclaration des Objets)",
            "Au moment de leur première affectation sans tableau",
            "Dans les commentaires"
          ],
          correct: 1,
          explanation: "Dans un algorithme non modulaire (ou dans le programme principal), les variables sont recensées dans le TDO (Tableau de Déclaration des Objets)."
        },
        {
          question: "Quelle est la nature du typage des variables en langage Python ?",
          options: [
            "Typage statique obligatoire (déclaration avant affectation)",
            "Typage dynamique (le type est automatiquement déduit de la valeur affectée)",
            "Pas de typage : toutes les variables sont des chaînes",
            "Typage binaire fixé à la compilation"
          ],
          correct: 1,
          explanation: "En Python, les variables ne sont pas déclarées préalablement : leur type est assigné dynamiquement lors de l'affectation."
        },
        {
          question: "Quel opérateur de comparaison traduit l'égalité algorithmique '=' en Python ?",
          options: [
            "=",
            "==",
            "===",
            ":="
          ],
          correct: 1,
          explanation: "En Python, le test d'égalité s'écrit avec un double signe '==' ; le signe '=' simple étant réservé à l'affectation."
        },
        {
          question: "Que vaut l'expression booléenne (18 Mod 2 = 0) en algorithmique ?",
          options: [
            "0",
            "1",
            "Vrai",
            "Faux"
          ],
          correct: 2,
          explanation: "18 Mod 2 donne 0. La comparaison 0 = 0 est vérifiée, l'expression retourne la valeur Booléenne 'Vrai'."
        },
        {
          question: "Quel est le résultat de l'exécution de : abs(-12.8) en Python ?",
          options: [
            "-12.8",
            "12",
            "12.8",
            "13"
          ],
          correct: 2,
          explanation: "La fonction prédéfinie abs(x) retourne la valeur absolue de x (la distance à zéro), soit 12.8 pour -12.8."
        },
        {
          question: "Que se passe-t-il si un élève écrit 'Round(d)' au lieu de 'round(d)' en Python ?",
          options: [
            "Python convertit automatiquement en minuscules sans erreur",
            "Une erreur d'exécution 'NameError: name 'Round' is not defined' est levée car Python est sensible à la casse",
            "Le résultat est arrondi à deux décimales au lieu d'une",
            "Le programme affiche un avertissement sans planter"
          ],
          correct: 1,
          explanation: "Python est strictement sensible à la casse (case-sensitive) : les identificateurs 'round' et 'Round' sont distincts."
        },
        {
          question: "Dans le TDO de l'algorithme DistancePoint, quel est le type de la variable 'est_pair' ?",
          options: [
            "Entier",
            "Réel",
            "Booléen",
            "Chaîne de caractères"
          ],
          correct: 2,
          explanation: "'est_pair' stocke le résultat de l'évaluation d'une condition (d_arrondi Mod 2 = 0). C'est donc un Booléen (Vrai ou Faux)."
        },
        {
          question: "Si x = -3 et y = 4, quelle est la distance d = RacineCarré(x * x + y * y) ?",
          options: [
            "7.0",
            "5.0",
            "1.0",
            "25.0"
          ],
          correct: 1,
          explanation: "(-3)² + 4² = 9 + 16 = 25. RacineCarré(25) = 5.0 (triplet pythagoricien 3, 4, 5)."
        }
      ]
    };
  },

  computed: {
    // Calculs de la simulation en temps réel
    simSumSq() {
      return (this.simPoint.x * this.simPoint.x) + (this.simPoint.y * this.simPoint.y);
    },
    simDist() {
      return Math.sqrt(this.simSumSq);
    },
    simDistRounded() {
      return Math.round(this.simDist);
    },
    simIsEven() {
      return (this.simDistRounded % 2) === 0;
    },
    // Coordonnées pour le repère SVG (dimensions 320x320, centre (160, 160), échelle 12px par unité)
    svgPoint() {
      const centerX = 160;
      const centerY = 160;
      const scale = 13; // 10 unités = 130px
      return {
        cx: centerX + (this.simPoint.x * scale),
        cy: centerY - (this.simPoint.y * scale) // Axe Y inversé en SVG
      };
    }
  },

  mounted() {
    this.initQuiz();
    this.highlightAll();
  },

  methods: {
    setPhase(p) {
      this.currentPhase = p;
      this.isMenuOpen = false;
      this.$nextTick(() => {
        this.highlightAll();
        window.scrollTo({ top: 120, behavior: 'smooth' });
      });
    },

    nextPhase() {
      if (this.currentPhase < this.phases.length) {
        this.setPhase(this.currentPhase + 1);
      }
    },

    prevPhase() {
      if (this.currentPhase > 1) {
        this.setPhase(this.currentPhase - 1);
      }
    },

    toggleViewMode() {
      const nextMode = this.currentPhase === 'all' ? 1 : 'all';
      this.setPhase(nextMode);
    },

    toggleOral(item) {
      item.isOpen = !item.isOpen;
    },

    toggleFlash(item) {
      item.isOpen = !item.isOpen;
    },

    // Tirage d'un nouveau point aléatoire dans [-10, 10]
    randomizePoint() {
      this.simAnimation = true;
      this.simPoint.x = Math.floor(Math.random() * 21) - 10;
      this.simPoint.y = Math.floor(Math.random() * 21) - 10;
      setTimeout(() => {
        this.simAnimation = false;
      }, 400);
    },

    // Copie du code Python dans le presse-papier
    copyPythonCode() {
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
      // Mélange de la banque de questions (Fisher-Yates)
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
      if (q.showAnswer) return; // Déjà répondu

      q.selected = oIdx;
      q.showAnswer = true;
      if (oIdx === q.correct) {
        this.quizScore++;
      }
    },

    // Déclenchement de la coloration syntaxique Highlight.js
    highlightAll() {
      if (window.hljs) {
        document.querySelectorAll('pre code').forEach((block) => {
          window.hljs.highlightElement(block);
        });
      }
    }
  }
}).mount('#app');
