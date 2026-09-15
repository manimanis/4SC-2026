/**
 * assets/apps/seance02.js
 * Logique applicative JavaScript (Vue 3) pour seance02.html
 * Séance 2 : Types caractère & chaîne de caractères, fonctions prédéfinies textuelles & TDO
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
        { title: "Accroche & Situation-problème (Code d'inscription)", shortTitle: "Phase 1 : Accroche", duration: "10 min" },
        { title: "Tableau de correspondance Algo ↔ Python (Primitives textuelles)", shortTitle: "Phase 2 : Normes Textes", duration: "15 min" },
        { title: "Conception algorithmique & TDO (ALGORITHME MajCode)", shortTitle: "Phase 3 : Algo & TDO", duration: "20 min" },
        { title: "Traduction machine, Points de vigilance & Simulateur", shortTitle: "Phase 4 : Machine & Débogage", duration: "20 min" },
        { title: "Bilan & Synthèse d'ancrage (Contrôle oral & Quiz)", shortTitle: "Phase 5 : Bilan & Quiz", duration: "5 min" }
      ],

      // Questions orales de réactivation (Phase 1)
      oralQuestions: [
        {
          id: 1,
          question: "Comment localiser le séparateur '-' dans la chaîne ?",
          algoAns: "On utilise la primitive Pos(ch1, ch2) : p ← Pos('-', code). Elle renvoie la première position (ou -1 si absent).",
          pyAns: "On utilise la méthode .find() : p = code.find('-'). Elle retourne l'indice du premier tiret trouvé ou -1.",
          isOpen: false
        },
        {
          id: 2,
          question: "Comment extraire une portion de chaîne sans recourir à une boucle de parcours ?",
          algoAns: "On utilise Sous_chaine(ch, d, f) : prefixe ← Sous_chaine(code, 0, p) et suffixe ← Sous_chaine(code, p + 1, Long(code)).",
          pyAns: "On utilise le découpage par slicing : code[0:p] et code[p + 1:len(code)] (ou code[p + 1:]).",
          isOpen: false
        },
        {
          id: 3,
          question: "Pourquoi l'indice commence-t-il à 0 et comment la borne de fin est-elle traitée ?",
          algoAns: "Selon les conventions officielles 2024-2025, le premier caractère est à l'indice 0 (0 ≤ i < Long(Ch)). Dans Sous_chaine(ch, d, f), la position de fin f est toujours EXCLUE.",
          pyAns: "En Python, l'indexation est strictement en base 0, et dans le slicing [d:f], l'élément à l'indice f est exclu (l'intervalle extrait est [d, f - 1]).",
          isOpen: false
        }
      ],

      // Simulateur interactif de traitement de code (Phase 4)
      simInputCode: 'info-2026',
      copyStatus: 'Copier le script Python',

      // Exemples prédéfinis pour le simulateur
      exampleCodes: ['info-2026', 'bac-2025', 'sc-2024', 'math-2023', 'tech-2027', 'erreur-abc'],

      // Questions flash de clôture (Phase 5)
      flashQuestions: [
        {
          expr: 'Si ch = "bac", que renvoient ch[0] et ch.find("x") ?',
          resAlgo: 'ch[0] -> "b" | Pos("x", ch) -> -1',
          resPy: 'ch[0] == "b" | ch.find("x") == -1',
          type: "Indice & Recherche",
          isOpen: false
        },
        {
          expr: 'Sous_chaine("informatique", 2, 5)',
          resAlgo: '"for"',
          resPy: '"informatique"[2:5] -> "for"',
          type: "Extraction (borne fin 5 exclue : indices 2, 3, 4)",
          isOpen: false
        },
        {
          expr: 'Estnum("2026") vs Estnum("2026a")',
          resAlgo: 'Vrai pour "2026" | Faux pour "2026a"',
          resPy: '"2026".isdecimal() -> True | "2026a".isdecimal() -> False',
          type: "Test numérique",
          isOpen: false
        },
        {
          expr: 'Ord("A") et Chr(65)',
          resAlgo: 'Ord("A") = 65 | Chr(65) = "A"',
          resPy: 'ord("A") -> 65 | chr(65) -> "A"',
          type: "Code ASCII & Caractère",
          isOpen: false
        },
        {
          expr: 'Effacer("bac-2026", 0, 4)',
          resAlgo: '"2026"',
          resPy: 'ch[:0] + ch[4:] -> "2026"',
          type: "Suppression de sous-chaîne",
          isOpen: false
        },
        {
          expr: 'Valeur("2026") + 1',
          resAlgo: '2027',
          resPy: 'int("2026") + 1 -> 2027',
          type: "Conversion numérique & calcul",
          isOpen: false
        }
      ],

      // Auto-évaluation / Quiz (Phase 5)
      quizActiveCount: 10,
      quizQuestions: [],
      quizScore: 0,
      allQuestions: [
        {
          question: "Selon les conventions algorithmiques officielles 2024-2025, quel est l'indice du premier caractère d'une chaîne Ch ?",
          options: [
            "1 (comme dans les anciennes normes)",
            "0 (l'indexation démarre obligatoirement à 0)",
            "-1",
            "N'importe quel entier"
          ],
          correct: 1,
          explanation: "La norme officielle 2024-2025 stipule : 'L’indice du premier élément d’une chaîne de caractères est 0'. On accède aux éléments par Ch[i] avec 0 ≤ i < Long(Ch)."
        },
        {
          question: "Que retourne la primitive algorithmique Pos('-', 'info-2026') ?",
          options: [
            "4 (indices : 'i'=0, 'n'=1, 'f'=2, 'o'=3, '-'=4)",
            "5 (en commençant à compter à 1)",
            "Vrai",
            "-1"
          ],
          correct: 0,
          explanation: "L'indice de 'i' est 0, 'n' est 1, 'f' est 2, 'o' est 3 et le tiret '-' est à l'indice 4."
        },
        {
          question: "Quelle valeur renvoie Pos(ch1, ch2) si la sous-chaîne ch1 n'existe pas dans ch2 ?",
          options: [
            "0",
            "-1",
            "Faux",
            "Une chaîne vide ''"
          ],
          correct: 1,
          explanation: "Conformément à la convention officielle : Pos retourne la première position de ch1 dans ch2, sinon elle retourne -1."
        },
        {
          question: "Quel est l'équivalent Python officiel de la primitive Pos(ch1, ch2) ?",
          options: [
            "ch2.index(ch1)",
            "ch2.find(ch1)",
            "pos(ch1, ch2)",
            "ch1 in ch2"
          ],
          correct: 1,
          explanation: "En Python, la méthode ch2.find(ch1) renvoie l'indice trouvé ou -1 si absent, ce qui correspond exactement au contrat algorithmique de Pos."
        },
        {
          question: "Que renvoie la primitive Sous_chaine(ch, d, f) concernant la borne finale f ?",
          options: [
            "Elle inclut obligatoirement le caractère à l'indice f",
            "Le caractère à la position finale f est exclu (extraction de d à f - 1)",
            "Elle modifie la chaîne ch en supprimant les caractères",
            "Elle inverse les caractères entre d et f"
          ],
          correct: 1,
          explanation: "La règle officielle stipule que Sous_chaine(ch, d, f) retourne une partie de la chaîne de la position d à la position f (f exclue)."
        },
        {
          question: "Quelle est la valeur de Sous_chaine('informatique', 2, 5) ?",
          options: [
            "'for'",
            "'form'",
            "'nfo'",
            "'info'"
          ],
          correct: 0,
          explanation: "Indices : 'i'(0), 'n'(1), 'f'(2), 'o'(3), 'r'(4), 'm'(5). De 2 à 5 exclu extrait les indices 2, 3 et 4, soit 'for'."
        },
        {
          question: "Comment traduit-on Sous_chaine(ch, 0, p) en Python par découpage (slicing) ?",
          options: [
            "ch[0:p]",
            "ch[0..p]",
            "ch.substring(0, p)",
            "ch[0:p+1]"
          ],
          correct: 0,
          explanation: "En Python, le slicing ch[0:p] extrait du caractère à l'indice 0 jusqu'à l'indice p - 1, ce qui équivaut fidèlement à Sous_chaine(ch, 0, p)."
        },
        {
          question: "Quelle méthode Python officielle permet de vérifier si une chaîne ne comporte que des chiffres ?",
          options: [
            "ch.isdecimal()",
            "ch.isdigit() (toléré mais non recommandé)",
            "ch.isnumber()",
            "isnum(ch)"
          ],
          correct: 0,
          explanation: "Selon les conventions d'implémentation 2024-2025, la traduction officielle de Estnum(ch) est ch.isdecimal()."
        },
        {
          question: "Quelle fonction permet de convertir un entier en chaîne de caractères en algorithmique et en Python ?",
          options: [
            "Convch(x) en algorithmique et str(x) en Python",
            "Str(x) en algorithmique et string(x) en Python",
            "Valeur(x) en algorithmique et to_string(x) en Python",
            "Chr(x) en algorithmique et char(x) en Python"
          ],
          correct: 0,
          explanation: "La conversion d'une valeur numérique vers une chaîne se fait par Convch(x) en algorithmique et str(x) en Python."
        },
        {
          question: "Que retourne la primitive Effacer('bac-2026', 0, 4) ?",
          options: [
            "'2026'",
            "'bac'",
            "'-2026'",
            "'bac-'"
          ],
          correct: 0,
          explanation: "Effacer supprime les caractères de l'indice 0 à 4 exclu (soit 'b'(0), 'a'(1), 'c'(2), '-'(3)). Il reste donc '2026'."
        },
        {
          question: "Comment traduit-on Effacer(ch, d, f) en Python ?",
          options: [
            "ch = ch[:d] + ch[f:]",
            "ch.remove(d, f)",
            "del ch[d:f]",
            "ch.replace(d, f)"
          ],
          correct: 0,
          explanation: "Les chaînes Python étant immuables, on recrée la chaîne en concaténant la partie avant d et la partie après f : ch[:d] + ch[f:]."
        },
        {
          question: "En Python, quel est le type de donnée utilisé pour représenter à la fois un caractère unique et une chaîne ?",
          options: [
            "Le type str pour les deux",
            "char pour un caractère et str pour une chaîne",
            "character et string",
            "byte et text"
          ],
          correct: 0,
          explanation: "En Python, il n'existe pas de type caractère distinct : un caractère est simplement une chaîne de longueur 1 de type 'str'."
        },
        {
          question: "Que renvoient les fonctions Ord('A') et Chr(65) selon les conventions 2024-2025 ?",
          options: [
            "Ord('A') renvoie 65 et Chr(65) renvoie 'A'",
            "Ord('A') renvoie 97 et Chr(65) renvoie 'B'",
            "Ord('A') renvoie 'A' et Chr(65) renvoie 65",
            "Ord('A') renvoie 1 et Chr(65) renvoie 'a'"
          ],
          correct: 0,
          explanation: "Ord retourne le code ASCII d'un caractère ('A' -> 65), et Chr retourne le caractère associé au code ASCII (65 -> 'A')."
        },
        {
          question: "Dans le TDO de l'algorithme MajCode, quel est le type des variables code et nouveau_code ?",
          options: [
            "Chaîne de caractères",
            "Caractère",
            "Texte",
            "String"
          ],
          correct: 0,
          explanation: "Selon la norme officielle, la désignation formelle dans le TDO est 'Chaîne de caractères'."
        },
        {
          question: "Que retourne la méthode 'info-2026'.upper() en Python ?",
          options: [
            "'INFO-2026'",
            "'Info-2026'",
            "'INFO'",
            "Une erreur car il y a des chiffres"
          ],
          correct: 0,
          explanation: ".upper() convertit tous les caractères alphabétiques en majuscules sans modifier les tirets ou les chiffres : 'INFO-2026'."
        },
        {
          question: "Pourquoi l'instruction 'annee = int(suffixe)' peut-elle provoquer une erreur si suffixe = '2026a' ?",
          options: [
            "Car int() lève une exception ValueError s'il y a des lettres ; d'où l'importance de tester avec isdecimal() avant",
            "Car int() ne supporte que 3 chiffres au maximum",
            "Car '2026a' doit être converti avec float()",
            "Il n'y a pas d'erreur, Python ignore la lettre 'a'"
          ],
          correct: 0,
          explanation: "La fonction int() échoue sur des chaînes non numériques. Tester avec isdecimal() (ou Estnum en algo) sécurise la conversion."
        }
      ]
    };
  },

  computed: {
    // Calculs en temps réel pour le simulateur de chaîne
    cleanInput() {
      return this.simInputCode ? this.simInputCode.trim() : '';
    },
    // Décomposition en caractères avec indices
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

    setExample(code) {
      this.simInputCode = code;
    },

    copyPythonCode() {
      const code = `# Saisie du code initial
code = input("Donner le code (ex: info-2026) : ")

# Recherche du séparateur et extraction
p = code.find("-")
prefixe = code[0:p]
suffixe = code[p + 1:len(code)]

# Vérification et conversions
valide = suffixe.isdecimal()
annee = int(suffixe)
nouvelle_annee = annee + 1

# Formatage final
nouveau_code = prefixe.upper() + "-" + str(nouvelle_annee)

# Affichage
print("Suffixe numérique valide :", valide)
print("Nouveau code :", nouveau_code)`;

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
