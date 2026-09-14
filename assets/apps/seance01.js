/**
 * assets/apps/seance01.js
 * Logique applicative JavaScript pour seance01.html
 */

const { createApp } = Vue;

    createApp({
      data() {
        return {
          currentPhase: 1,
          isMenuOpen: false,
          phases: [
            { title: "Mise en situation & Analyse de l'identifiant flacon", shortTitle: "Phase 1 : Mise en situation", duration: "10 min" },
            { title: "Activité modulaire 1 – Validation textuelle (Valide_Code)", shortTitle: "Phase 2 : Valide_Code", duration: "25 min" },
            { title: "Activité modulaire 2 – Calcul de clé numérique (Cle_Controle)", shortTitle: "Phase 3 : Cle_Controle", duration: "15 min" },
            { title: "Formalisation & Appel principal (Labo_Echantillons)", shortTitle: "Phase 4 : Formalisation", duration: "10 min" },
            { title: "Simulateur d'Automate d'Analyse (Laboratoire)", shortTitle: "Simulateur Automate", duration: "Atelier" },
            { title: "Auto-évaluation & Acquis", shortTitle: "Auto-évaluation", duration: "Quiz" }
          ],
          testCode: '@CH-94B',
          allQuestions: [
            {
              question: "Selon les conventions algorithmiques officielles 2024-2025, quel est l'indice du premier caractère d'une chaîne Ch ?",
              options: [
                "1 (comme dans les anciennes versions)",
                "0 (l'indexation démarre à 0)",
                "-1",
                "Indéfini"
              ],
              correct: 1,
              explanation: "L'indice du premier caractère d'une chaîne de caractères Ch est obligatoirement 0 (notation Ch[i] avec 0 ≤ i < Long(Ch))."
            },
            {
              question: "Que retourne la primitive Pos('-', '@CH-94B') selon les conventions algorithmiques 2024 ?",
              options: [
                "3 (L'indice débute à 0 : @ est à 0, C à 1, H à 2, - à 3)",
                "4 (L'indice débute à 1)",
                "Vrai",
                "-1"
              ],
              correct: 0,
              explanation: "Le caractère '@' est à l'indice 0, 'C' à 1, 'H' à 2 et '-' est à l'indice 3."
            },
            {
              question: "Que retourne la primitive Pos(ch1, ch2) si la chaîne ch1 n'est pas présente dans ch2 ?",
              options: [
                "0",
                "Faux",
                "-1",
                "Une chaîne vide \"\""
              ],
              correct: 2,
              explanation: "La spécification officielle indique : 'Retourne la première position de la chaîne ch1 dans la chaîne ch2, sinon elle retourne -1'."
            },
            {
              question: "Quelle est la particularité fondamentale de la primitive Sous_chaine(ch, d, f) ?",
              options: [
                "Elle inclut obligatoirement le caractère à la position finale f",
                "Le caractère à la position finale f est exclu (de d à f - 1)",
                "Elle modifie directement la chaîne ch d'origine en mémoire",
                "Elle supprime les caractères de d à f"
              ],
              correct: 1,
              explanation: "Sous_chaine(ch, d, f) retourne une portion de chaîne de la position d à la position f (f exclue), ce qui correspond à ch[d:f] en Python."
            },
            {
              question: "Si ch = \"@CH-94B\", quelle est la valeur retournée par Sous_chaine(ch, 4, 6) ?",
              options: [
                "\"-94\"",
                "\"94B\"",
                "\"4B\"",
                "\"94\""
              ],
              correct: 3,
              explanation: "L'indice 4 correspond à '9', l'indice 5 à '4', et l'indice 6 ('B') est exclu. Le résultat est donc \"94\"."
            },
            {
              question: "À quoi sert la primitive Estnum(ch) avant d'invoquer Valeur(ch) ?",
              options: [
                "À vérifier que la chaîne ne contient que des chiffres pour éviter une erreur d'exécution",
                "À compter le nombre de chiffres présents dans la chaîne",
                "À convertir la chaîne en majuscules",
                "À générer une clé de sécurité aléatoire"
              ],
              correct: 0,
              explanation: "Estnum(ch) retourne Vrai si la chaîne ch est convertible en une valeur numérique et Faux sinon, sécurisant l'appel à Valeur(ch)."
            },
            {
              question: "En Python, comment traduit-on officiellement la primitive Estnum(ch) pour une chaîne de chiffres ?",
              options: [
                "isnum(ch)",
                "ch.isdecimal() (ou ch.isdigit())",
                "int(ch) == True",
                "ch.isnumeric_value()"
              ],
              correct: 1,
              explanation: "Selon les conventions d'implémentation 2024, Estnum(ch) pour des entiers positifs se traduit par ch.isdecimal() ou ch.isdigit()."
            },
            {
              question: "Quelle fonction prédéfinie retourne le code ASCII d'un caractère c en pseudo-code ?",
              options: [
                "Asc(c)",
                "Chr(c)",
                "Ord(c)",
                "Code(c)"
              ],
              correct: 2,
              explanation: "Ord(c) retourne le code ASCII du caractère c (ex: Ord('A') = 65). Sa réciproque est Chr(d)."
            },
            {
              question: "Que retourne l'expression algorithmique Chr(66) ?",
              options: [
                "Le caractère 'B'",
                "L'entier 66",
                "La chaîne '66'",
                "Faux"
              ],
              correct: 0,
              explanation: "Chr(d) retourne le caractère dont le code ASCII est d. Puisque 65 est 'A', 66 est le caractère 'B'."
            },
            {
              question: "Parmi ces instructions Python, laquelle traduit rigoureusement 'Ent(RacineCarré(x))' selon les conventions 2024 ?",
              options: [
                "floor(sqrt(x))",
                "int(sqrt(x)) avec 'from math import sqrt'",
                "int(math.sqrt(x)) sans import préalable",
                "x ** 0.5"
              ],
              correct: 1,
              explanation: "Les conventions 2024 imposent l'importation 'from math import sqrt', l'appel direct sqrt(x), et Ent(x) correspond à int(x)."
            },
            {
              question: "Combien de valeurs une 'Fonction' peut-elle retourner selon les conventions pédagogiques 2024 ?",
              options: [
                "Un seul résultat de type simple (entier, réel, booléen, caractère, chaîne)",
                "Plusieurs résultats sous forme de tuple",
                "Aucun résultat direct (comme une procédure)",
                "Deux résultats obligatoirement"
              ],
              correct: 0,
              explanation: "Règle officielle : 'Une fonction retourne un seul résultat de type simple (entier, réel, booléen, caractère, chaîne)'."
            },
            {
              question: "Quelle est la syntaxe normalisée pour terminer une fonction et renvoyer son résultat en pseudo-code ?",
              options: [
                "Renvoyer Resultat",
                "Sortie(Resultat)",
                "Retourner Resultat",
                "Nom_Fonction ← Resultat"
              ],
              correct: 2,
              explanation: "La syntaxe officielle 2024 est 'Retourner Résultat' (traduit par 'return resultat' en Python)."
            },
            {
              question: "Que produit l'expression algorithmique 'Aléa(10, 99)' ?",
              options: [
                "Un réel aléatoire entre 10.0 et 99.0",
                "Un entier aléatoire de l'intervalle fermé [10, 99]",
                "Un entier entre 10 inclus et 99 exclu",
                "Un booléen aléatoire"
              ],
              correct: 1,
              explanation: "Aléa(vi, vf) retourne un entier aléatoire de l'intervalle fermé [vi, vf]. En Python : randint(10, 99) après 'from random import randint'."
            },
            {
              question: "Quelle est la différence entre les primitives Arrondi(x) et Ent(x) pour x = 5.8 ?",
              options: [
                "Arrondi(5.8) vaut 6 et Ent(5.8) vaut 5",
                "Arrondi(5.8) vaut 5 et Ent(5.8) vaut 6",
                "Les deux retournent toujours 5",
                "Arrondi retourne un réel et Ent un entier"
              ],
              correct: 0,
              explanation: "Arrondi(x) retourne l'entier le plus proche (6 pour 5.8), alors que Ent(x) extrait la partie entière tronquée (5 pour 5.8)."
            },
            {
              question: "Quel est le rôle de la primitive Convch(x) ?",
              options: [
                "Convertir une chaîne en nombre entier",
                "Calculer la taille d'une chaîne",
                "Convertir une chaîne en majuscules",
                "Convertir un nombre x en une chaîne de caractères"
              ],
              correct: 3,
              explanation: "Convch(x) convertit une valeur numérique en chaîne de caractères (équivalent de str(x) en Python)."
            },
            {
              question: "Quel est le symbole officiel d'affectation en algorithmique tunisienne ?",
              options: [
                ":=",
                "← (flèche vers la gauche)",
                "==",
                "="
              ],
              correct: 1,
              explanation: "L'affectation s'écrit obligatoirement avec la flèche orientée vers la gauche : Objet ← Expression."
            },
            {
              question: "Quel symbole algorithmique représente l'inégalité ('différent de') dans les conventions 2024 ?",
              options: [
                "<>",
                "!=",
                "≠",
                "~="
              ],
              correct: 2,
              explanation: "En pseudo-code tunisien officiel, on écrit le symbole mathématique '≠' (qui sera transcrit par '!=' en Python)."
            },
            {
              question: "Comment s'écrivent les opérateurs logiques dans les algorithmes tunisiens ?",
              options: [
                "Non, Et, Ou (avec une majuscule initiale)",
                "NOT, AND, OR",
                "!, &&, ||",
                "non, et, sinon"
              ],
              correct: 0,
              explanation: "Les conventions officielles 2024 stipulent les opérateurs logiques avec majuscule : 'Non', 'Et', 'Ou'."
            },
            {
              question: "Où déclare-t-on les objets internes utilisés exclusivement dans une fonction ?",
              options: [
                "Dans le TDOG (Objets Globaux)",
                "Dans le TDNT (Nouveaux Types)",
                "Dans le TDOL (Objets Locaux)",
                "Nulle part, la déclaration locale est facultative"
              ],
              correct: 2,
              explanation: "Le TDOL (Tableau de Déclaration des Objets Locaux) est dédié aux variables internes propres à un sous-programme."
            },
            {
              question: "Quel opérateur permet de concaténer deux chaînes de caractères en algorithmique ?",
              options: [
                "&",
                "+",
                "Concat()",
                "||"
              ],
              correct: 1,
              explanation: "Note officielle : 'On utilise l'opérateur + pour concaténer des chaînes et/ou des caractères'."
            },
            {
              question: "Que retourne la primitive Abs(x) pour x = -42.5 ?",
              options: [
                "42.5",
                "-42.5",
                "42",
                "Vrai"
              ],
              correct: 0,
              explanation: "Abs(x) retourne la valeur absolue de x. Pour x = -42.5, Abs(-42.5) retourne 42.5."
            },
            {
              question: "Quelle instruction algorithmique affiche des données puis effectue un saut de ligne automatique ?",
              options: [
                "Écrire (...)",
                "Afficher_nl (...)",
                "Écrire_nl (...)",
                "Sortie (...)"
              ],
              correct: 2,
              explanation: "Écrire_nl (...) affiche les messages ou variables puis retourne à la ligne, correspondant à print() par défaut en Python."
            }
          ],
          questions: []
        };
      },
      created() {
        this.initQuiz();
      },
      computed: {
        simulationResult() {
          const raw = this.testCode || '';
          const ch = raw.toUpperCase();
          const L = ch.length;
          const p = ch.indexOf('-');

          const hasMinLength = L >= 6;
          const startsWithAt = ch.length > 0 && ch[0] === '@';
          const hasDash = p > 1 && (p + 3 < L);

          let numPart = '';
          let isNumValid = false;
          let letter = '';
          let letterCode = 0;
          let isLetterValid = false;
          let numValue = 0;
          let ecart = 0;
          let derive = 0;
          let base = 0;
          let secu = 42;
          let key = '';

          if (hasDash) {
            numPart = ch.substring(p + 1, p + 3);
            isNumValid = numPart.length === 2 && /^\d+$/.test(numPart);
            letter = ch.charAt(p + 3);
            letterCode = letter ? letter.charCodeAt(0) : 0;
            isLetterValid = letterCode >= 65 && letterCode <= 90; // A-Z
          }

          const isValid = hasMinLength && startsWithAt && hasDash && isNumValid && isLetterValid;

          if (isValid) {
            numValue = parseInt(numPart, 10);
            ecart = Math.abs(numValue - 50);
            derive = Math.sqrt(ecart);
            base = Math.round(derive * 10);
            secu = (numValue * 7) % 90 + 10; // Pseudo-aléatoire stable pour l'affichage
            key = (base * 100 + secu).toString();
          }

          return {
            hasMinLength,
            startsWithAt,
            dashPos: p,
            hasDash,
            numPart,
            isNumValid,
            letter,
            letterCode,
            isLetterValid,
            isValid,
            numValue,
            ecart,
            derive,
            base,
            secu,
            key
          };
        },
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
          } catch (e) {}

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
