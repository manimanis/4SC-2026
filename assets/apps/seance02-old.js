/**
 * assets/apps/seance02.js
 * Logique applicative JavaScript pour seance02.html
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      currentPhase: 1,
      isMenuOpen: false,
      phases: [
        { title: "Mise en situation & Rappel au lot d'échantillons", shortTitle: "Phase 1 : Mise en situation", duration: "5 min" },
        { title: "Structuration des données (TDNT & TDOG)", shortTitle: "Phase 2 : TDNT & TDOG", duration: "15 min" },
        { title: "Activité modulaire 3 : Procédures de saisie et nettoyage", shortTitle: "Phase 3 : Procédures", duration: "20 min" },
        { title: "Synthèse et intégration algorithmique", shortTitle: "Phase 4 : Orchestration", duration: "20 min" },
        { title: "Simulateur interactif de traitement du lot", shortTitle: "Simulateur Interactif", duration: "Atelier" },
        { title: "Auto-évaluation & Acquis", shortTitle: "Auto-évaluation", duration: "Quiz" }
      ],
      batch: [
        { code: '@CH-94B', conc: 24.5, cleaned: false },
        { code: '@AC-12D', conc: 8.2, cleaned: false },
        { code: '@BA-78K', conc: 45.0, cleaned: false },
        { code: 'FL-33M', conc: 55.4, cleaned: true },
        { code: '@ZN-50E', conc: 32.1, cleaned: false }
      ],
      isCleaned: false,
      reportGenerated: false,
      allQuestions: [
        {
          question: "Dans quel tableau déclare-t-on le type utilisateur 'TabCodes = Tableau de 50 chaîne' ?",
          options: [
            "Dans le TDOG (Objets Globaux)",
            "Dans le TDNT (Nouveaux Types)",
            "Dans le TDOL (Objets Locaux)",
            "Directement dans le programme principal"
          ],
          correct: 1,
          explanation: "Tout nouveau type personnalisé (comme un tableau dimensionné ou un enregistrement) se déclare rigoureusement dans le TDNT (Tableau de Déclaration des Nouveaux Types)."
        },
        {
          question: "En algorithmique 2024, quel symbole indique qu'un paramètre formel est passé par adresse ?",
          options: [
            "Le mot-clé VAR",
            "Le symbole @ placé avant le nom du paramètre",
            "Le symbole & comme en C",
            "Aucun symbole, c'est automatique"
          ],
          correct: 1,
          explanation: "Les conventions officielles 2024-2025 spécifient : 'Si le mode de passage est par adresse (par adresse), on ajoutera le symbole @ avant le nom du paramètre' (ex: @T : TabCodes)."
        },
        {
          question: "Que fait l'instruction algorithmique 'T[i] ← Effacer(T[i], 0, 1)' ?",
          options: [
            "Elle remplace le caractère d'indice 0 par un espace",
            "Elle supprime le caractère situé à la position 0 (indice 1 exclu)",
            "Elle vide complètement la chaîne T[i]",
            "Elle efface la case T[i] du tableau"
          ],
          correct: 1,
          explanation: "Effacer(ch, d, f) retourne une sous-chaîne après suppression des caractères de la position d à f exclu. Effacer(T[i], 0, 1) retire donc exactement le premier caractère."
        },
        {
          question: "En Python, comment doit-on déclarer et manipuler un tableau d'après les conventions du baccalauréat ?",
          options: [
            "Avec les listes Python standards T = []",
            "Avec la fonction array de la bibliothèque numpy",
            "Avec les dictionnaires dict()",
            "Avec un tuple immuable"
          ],
          correct: 1,
          explanation: "Conventions 2024 : 'On utilisera la bibliothèque numpy pour implémenter les tableaux (1D et 2D)'. L'importation se fait via 'from numpy import array'."
        },
        {
          question: "Quelle structure de contrôle est la plus adaptée pour répéter la saisie d'un entier N jusqu'à ce qu'il soit compris entre 5 et 50 ?",
          options: [
            "Pour i de 5 à 50 Faire",
            "Répéter ... Jusqu'à (N ≥ 5) Et (N ≤ 50)",
            "Selon (N)",
            "Si (N ≥ 5) Alors"
          ],
          correct: 1,
          explanation: "La structure à condition d'arrêt 'Répéter ... Jusqu'à' permet de contraindre l'utilisateur à saisir une valeur valide avec au moins une saisie initiale."
        },
        {
          question: "Quelle est la différence fondamentale entre une Procédure et une Fonction ?",
          options: [
            "Une fonction ne peut avoir de paramètres",
            "Une fonction retourne obligatoirement un résultat de type simple, contrairement à une procédure",
            "Une procédure s'exécute plus rapidement qu'une fonction",
            "Une fonction ne s'utilise qu'en Python"
          ],
          correct: 1,
          explanation: "Une fonction retourne un seul résultat de type simple via 'Retourner'. Une procédure effectue des actions ou modifie des paramètres par adresse sans valeur de retour directe."
        },
        {
          question: "Pourquoi le paramètre formel @N doit-il être précédé de '@' dans la procédure Saisir_Lot(@T, @N) ?",
          options: [
            "Pour indiquer qu'il s'agit d'un nombre réel",
            "Parce que sa valeur saisie dans la procédure doit être transmise à la variable appelante (passage par adresse)",
            "Pour réserver de la mémoire supplémentaire",
            "C'est optionnel et purement décoratif"
          ],
          correct: 1,
          explanation: "En passant N par adresse (@N), la modification effectuée lors de la lecture (Lire(N)) est répercutée directement sur la variable du programme principal."
        },
        {
          question: "Comment accède-t-on au 4e élément d'un tableau unidimensionnel T de taille N ?",
          options: [
            "T[4]",
            "T[3] (puisque le premier indice est 0)",
            "T.get(4)",
            "T(4)"
          ],
          correct: 1,
          explanation: "Selon les conventions 2024, les indices d'un tableau débutent à 0 : le 1er élément est T[0], le 2e est T[1], le 3e est T[2] et le 4e est T[3]."
        },
        {
          question: "Pour un tableau T déclaré de taille 50 éléments, quel est l'intervalle d'indices valides ?",
          options: [
            "De 1 à 50",
            "De 0 à 49 inclus",
            "De 0 à 50 inclus",
            "De 1 à 49"
          ],
          correct: 1,
          explanation: "Pour un tableau de taille N = 50, les indices valides vont de 0 à N - 1, soit de 0 à 49."
        },
        {
          question: "Peut-on insérer simultanément des réels et des chaînes de caractères dans un même tableau T en algorithmique ?",
          options: [
            "Oui, si la taille est inférieure à 10",
            "Non, tous les éléments d'un tableau doivent obligatoirement être de même type",
            "Oui, avec le type générique Object",
            "Oui, en utilisant la primitive Convch"
          ],
          correct: 1,
          explanation: "Un tableau est une structure de données homogène : tous ses éléments partagent strictement le même type scalaire ou composite."
        },
        {
          question: "Selon les conventions d'implémentation 2024, comment traduit-on 'T[i] ← Effacer(T[i], 0, 1)' en Python ?",
          options: [
            "del T[i][0]",
            "T[i] = T[i][1:] (ou T[i][:0] + T[i][1:])",
            "T[i].remove(0)",
            "T[i].pop(0)"
          ],
          correct: 1,
          explanation: "Les chaînes étant immuables en Python, Effacer(ch, d, f) se traduit par la concaténation de tranches ch = ch[:d] + ch[f:]. Pour d=0 et f=1, on obtient ch[1:]."
        },
        {
          question: "Comment déclare-t-on le tableau T_cod dans le TDOG sachant que son type TabCodes a été défini dans le TDNT ?",
          options: [
            "Objet : T_cod | Type / Nature : TabCodes",
            "Objet : TabCodes | Type / Nature : T_cod",
            "Objet : T_cod | Type / Nature : Tableau de 50 chaîne",
            "Objet : T_cod | Type / Nature : Variable globale"
          ],
          correct: 0,
          explanation: "Une fois le nouveau type défini dans le TDNT (TabCodes = Tableau de 50 chaîne), on déclare l'objet dans le TDOG avec la nature 'TabCodes'."
        },
        {
          question: "En Python, que se passe-t-il lorsqu'un tableau numpy est passé en argument à une fonction ?",
          options: [
            "Il est dupliqué en mémoire",
            "Il est passé par adresse d'objet (les modifications directes dans le tableau persistent)",
            "Python génère une exception TypeError",
            "Il devient automatiquement en lecture seule"
          ],
          correct: 1,
          explanation: "Les tableaux numpy sont des objets mutables passés par adresse d'objet : toute modification de leurs cases à l'intérieur de la fonction modifie directement le tableau appelant."
        },
        {
          question: "Quelle est la boucle appropriée pour parcourir et traiter chaque élément d'un tableau T de N éléments ?",
          options: [
            "Pour i de 0 à N - 1 Faire ... Fin Pour",
            "Pour i de 1 à N Faire ... Fin Pour",
            "Tant que N > 0 Faire ... Fin Tant que",
            "Répéter ... Jusqu'à i = N"
          ],
          correct: 0,
          explanation: "L'indexation allant de 0 à N - 1, la boucle complète 'Pour i de 0 à N - 1 Faire' est la forme standard et recommandée."
        },
        {
          question: "Comment initialise-t-on un tableau numpy de 50 réels à 0.0 conformément aux conventions 2024 ?",
          options: [
            "array([float()] * 50)",
            "zeros(50)",
            "np.empty(50)",
            "[0.0] * 50"
          ],
          correct: 0,
          explanation: "La syntaxe officielle préconisée est array([float()] * 50) après 'from numpy import array'."
        },
        {
          question: "Comment initialise-t-on un tableau numpy de 50 chaînes de caractères de longueur max 20 en Python ?",
          options: [
            "array([''] * 50, dtype='U20')",
            "array(str, 50)",
            "array([''] * 50)",
            "list([''] * 50)"
          ],
          correct: 0,
          explanation: "Conventions 2024 : 'array([''] * 50, dtype='U20')' avec la spécification du type unicode de longueur maximale U20."
        },
        {
          question: "Dans quel tableau déclare-t-on le compteur 'i' utilisé dans la boucle Pour d'une procédure ?",
          options: [
            "Dans le TDOG",
            "Dans le TDNT",
            "Dans le TDOL de la procédure (Objet : i, Type : entier)",
            "Il n'a pas besoin d'être déclaré"
          ],
          correct: 2,
          explanation: "Toute variable locale à un sous-programme, y compris les compteurs de boucle, doit impérativement être déclarée dans le TDOL associé."
        },
        {
          question: "Pourquoi la recommandation officielle déconseille-t-elle 'Écrire(T)' pour afficher un tableau complet ?",
          options: [
            "Parce que le tableau ne peut pas être affiché",
            "Parce que l'affichage doit se faire élément par élément via une boucle Pour",
            "Parce que cela provoque un dépassement de capacité",
            "Parce que T est un mot réservé"
          ],
          correct: 1,
          explanation: "Recommandation didactique : l'affichage d'un tableau s'effectue élément par élément (ex: Écrire_nl(T[i])) pour maîtriser le formatage et l'indexation."
        },
        {
          question: "Quelle est la notation correcte pour accéder à l'élément de la ligne i et de la colonne j d'une matrice M ?",
          options: [
            "M[i, j]",
            "M[i][j]",
            "M(i, j)",
            "M{i, j}"
          ],
          correct: 0,
          explanation: "Selon les conventions 2024 : 'Pour accéder à un élément d'un tableau M à deux dimensions (L, C), on utilise la notation M[i, j]'."
        },
        {
          question: "Comment se déclare un type matrice de 10 lignes et 20 colonnes d'entiers dans le TDNT ?",
          options: [
            "Mat = Tableau de 10 lignes * 20 colonnes entier",
            "Mat = Tableau[10, 20] de entier",
            "Mat = Matrice(10, 20) entier",
            "Mat = Array(10, 20)"
          ],
          correct: 0,
          explanation: "La syntaxe officielle est : 'Nom_type = Tableau de N lignes * M colonnes Type_élément'."
        },
        {
          question: "Comment sont délimités les blocs d'instructions d'une procédure ou d'un algorithme ?",
          options: [
            "Par des accolades { }",
            "Par les mots-clés DEBUT et FIN",
            "Uniquement par l'indentation",
            "Par Begin et End"
          ],
          correct: 1,
          explanation: "Tout corps d'algorithme, de fonction ou de procédure est rigoureusement encadré par les délimiteurs 'DEBUT' et 'FIN'."
        },
        {
          question: "Si T_cod[0] contient la chaîne \"CH-94B\", que renvoie l'expression Long(T_cod[0]) ?",
          options: [
            "6",
            "7",
            "50 (taille du tableau)",
            "0"
          ],
          correct: 0,
          explanation: "\"CH-94B\" comporte 6 caractères : 'C', 'H', '-', '9', '4', 'B'. Long(T_cod[0]) retourne donc 6."
        }
      ],
      questions: []
    };
  },
  created() {
    this.initQuiz();
  },
  computed: {
    quizScore() {
      return this.questions.filter(q => q.showAnswer && q.selected === q.correct).length;
    }
  },
  methods: {
    readPhaseFromUrl() {
      const hash = (window.location.hash || '').toLowerCase();
      if (hash.includes('all')) return 'all';
      const matchHash = hash.match(/\d+/);
      if (matchHash) {
        const num = parseInt(matchHash[0], 10);
        if (num >= 1 && num <= this.phases.length) return num;
      }

      try {
        const params = new URLSearchParams(window.location.search);
        const qp = params.get('phase');
        if (qp) {
          if (qp.toLowerCase() === 'all') return 'all';
          const num = parseInt(qp, 10);
          if (num >= 1 && num <= this.phases.length) return num;
        }
      } catch (e) { }

      return 1;
    },
    syncUrl(p) {
      const hash = p === 'all' ? '#phase-all' : '#phase-' + p;
      try {
        if (window.history && window.history.pushState) {
          window.history.pushState({ phase: p }, '', hash);
        } else {
          window.location.hash = hash;
        }
      } catch (e) {
        window.location.hash = hash;
      }
    },
    setPhase(p, updateUrl = true) {
      this.currentPhase = p;
      this.isMenuOpen = false;
      if (updateUrl) {
        this.syncUrl(p);
      }
      window.scrollTo({ top: 220, behavior: 'smooth' });
      this.$nextTick(() => {
        if (window.hljs) {
          hljs.highlightAll();
        }
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
    loadSampleBatch() {
      this.batch = [
        { code: '@CH-94B', conc: 24.5, cleaned: false },
        { code: '@AC-12D', conc: 8.2, cleaned: false },
        { code: '@BA-78K', conc: 45.0, cleaned: false },
        { code: 'FL-33M', conc: 55.4, cleaned: true },
        { code: '@ZN-50E', conc: 32.1, cleaned: false }
      ];
      this.isCleaned = false;
      this.reportGenerated = false;
    },
    cleanBatch() {
      // Procédure Nettoyer_Codes simulée
      for (let i = 0; i < this.batch.length; i++) {
        let code = this.batch[i].code;
        if (code.length > 0 && code[0] === '@') {
          // Effacer(code, 0, 1)
          this.batch[i].code = code.substring(1);
        }
        this.batch[i].cleaned = true;
      }
      this.isCleaned = true;
    },
    generateReport() {
      this.reportGenerated = true;
    },
    initQuiz() {
      // Tirage aléatoire (Fisher-Yates) de 10 questions parmi la banque
      const pool = this.allQuestions.map(q => ({
        ...q,
        selected: null,
        showAnswer: false
      }));
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      this.questions = pool.slice(0, 10);
    },
    selectOption(qIdx, oIdx) {
      const q = this.questions[qIdx];
      q.selected = oIdx;
      q.showAnswer = true;
    },
    copyCode(id) {
      const text = document.getElementById(id).innerText;
      navigator.clipboard.writeText(text).then(() => {
        alert('Code copié dans le presse-papier !');
      });
    }
  },
  mounted() {
    const initialPhase = this.readPhaseFromUrl();
    if (initialPhase !== 1) {
      this.currentPhase = initialPhase;
    }

    window.addEventListener('popstate', () => {
      const p = this.readPhaseFromUrl();
      this.setPhase(p, false);
    });
    window.addEventListener('hashchange', () => {
      const p = this.readPhaseFromUrl();
      this.setPhase(p, false);
    });

    if (window.hljs) {
      hljs.highlightAll();
    }
  }
}).mount('#app');
