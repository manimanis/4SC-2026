/**
 * assets/apps/seance02.js
 * Logique applicative JavaScript (Vue 3) pour seance02.html
 * Séance 2 : Structures conditionnelles, choix multiples (Selon / match-case) & TDO
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
        { title: "Situation & Simulateur interactif (Tarif d'accès)", shortTitle: "Situation & Simulateur", duration: "15 min" },
        { title: "Structures conditionnelles & Opérateurs", shortTitle: "Conditions & Opérateurs", duration: "15 min" },
        { title: "Algorithme & Programme TarifAcces", shortTitle: "Algo & Programme", duration: "25 min" },
        { title: "Bilan & Auto-évaluation (Questions flash & Quiz)", shortTitle: "Bilan & Quiz", duration: "5 min" }
      ],

      // Questions orales de réactivation (Phase 1)
      oralQuestions: [
        {
          id: 1,
          question: "Quelle structure convient le mieux pour évaluer les tranches d'âge continues ?",
          algoAns: "La structure conditionnelle généralisée : Si age < 12 Alors ... Sinon Si (age ≥ 12) Et (age ≤ 17) Alors ... Sinon Si age ≥ 60 Alors ... Sinon ... FinSi.",
          pyAns: "L'instruction if en cascade avec elif et else : if age < 12: ... elif 12 <= age <= 17: ... elif age >= 60: ... else: ...",
          isOpen: false
        },
        {
          id: 2,
          question: "Quelle structure est la plus adaptée pour tester les valeurs discrètes d'un caractère ?",
          algoAns: "La structure à choix multiple Selon : Selon formule \"P\", \"p\" : supplement ← 5 ... Sinon valide ← Faux Fin Selon.",
          pyAns: "L'instruction match-case (Python 3.10+) : match formule: case \"P\" | \"p\": supplement = 5 ... case _: valide = False.",
          isOpen: false
        },
        {
          id: 3,
          question: "Comment regrouper et évaluer des conditions logiques en algorithmique et en Python ?",
          algoAns: "On utilise les opérateurs logiques normatifs : Et (conjonction), Ou (disjonction) et Non (négation). Exemple : (age ≥ 12) Et (age ≤ 17).",
          pyAns: "On utilise les mots-clés en minuscules : and, or, not, ou l'encadrement chaîné direct : 12 <= age <= 17.",
          isOpen: false
        }
      ],

      // Simulateur interactif de tarification (Phase 1)
      simAge: 15,
      simFormule: 'M',
      copyStatus: 'Copier le script Python',

      // Profils prédéfinis pour le simulateur
      presets: [
        { name: "Enfant Piscine", age: 8, formule: 'P', desc: "8 ans, formule Piscine (gratuité enfant)" },
        { name: "Junior Muscu", age: 15, formule: 'M', desc: "15 ans, formule Musculation (50% de remise)" },
        { name: "Adulte Total", age: 28, formule: 'T', desc: "28 ans, formule Totale (tarif plein)" },
        { name: "Senior Muscu", age: 65, formule: 'm', desc: "65 ans, formule Musculation (20% senior)" },
        { name: "Formule Invalide", age: 22, formule: 'Z', desc: "Code non répertorié (déclenche case _)" }
      ],

      // Questions flash de clôture (Phase 4)
      flashQuestions: [
        {
          expr: 'Pourquoi case "P", "p": est-il incorrect en Python ?',
          resAlgo: 'En algo : "P", "p" : traitement',
          resPy: 'En Python match-case, on DOIT utiliser le pipe | : case "P" | "p":',
          type: "Syntaxe match-case",
          isOpen: false
        },
        {
          expr: 'Peut-on utiliser un réel (float) comme sélecteur dans un Selon ?',
          resAlgo: 'NON : Le sélecteur doit être un type scalaire (entier ou caractère)',
          resPy: 'En Python match accepte tout type, mais la norme algorithmique impose un type scalaire',
          type: "Types scalaires admissibles",
          isOpen: false
        },
        {
          expr: 'Que représente le tiret du bas _ dans case _: ?',
          resAlgo: 'Équivalent au bloc Sinon du Selon',
          resPy: 'Le motif générique (wildcard) qui intercepte toute valeur non filtrée',
          type: "Cas par défaut",
          isOpen: false
        },
        {
          expr: 'Différence entre if...if... et if...elif... ?',
          resAlgo: 'Plusieurs Si indépendants vs une seule structure généralisée Si...Sinon Si',
          resPy: 'Avec if successifs, tous les blocs sont testés ; avec elif, l\'évaluation s\'arrête dès la 1ère condition vraie',
          type: "Contrôle de flux conditionnel",
          isOpen: false
        },
        {
          expr: 'Que vaut l\'expression : (5 > 3) and not (2 == 4) ?',
          resAlgo: '(5 > 3) Et Non (2 = 4) -> Vrai Et Vrai = Vrai',
          resPy: 'True and not False -> True and True -> True',
          type: "Évaluation logique",
          isOpen: false
        },
        {
          expr: 'Dans le TDO, quel est le type de formule et de prix_net ?',
          resAlgo: 'formule : Caractère | prix_net : Réel',
          resPy: 'formule -> str | prix_net -> float',
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
          question: "Selon les conventions officielles 2024-2025, quel type de donnée est autorisé comme sélecteur d'une structure Selon ?",
          options: [
            "Uniquement un type scalaire (Entier ou Caractère)",
            "N'importe quel type, y compris Réel et Chaîne de caractères",
            "Uniquement les Booléens",
            "Uniquement les Tableaux"
          ],
          correct: 0,
          explanation: "La règle officielle stipule explicitement : 'Le sélecteur doit être de type scalaire (entier ou caractère)'."
        },
        {
          question: "En Python (version 3.10+), quel opérateur permet de regrouper plusieurs motifs alternatifs dans une clause case ?",
          options: [
            "La virgule ,",
            "L'opérateur pipe |",
            "Le mot-clé or",
            "Le point-virgule ;"
          ],
          correct: 1,
          explanation: "Dans l'instruction match-case, l'alternative entre plusieurs valeurs s'écrit obligatoirement avec la barre verticale '|' (ex: case 'P' | 'p':). La virgule créerait un motif de tuple."
        },
        {
          question: "Dans une structure match-case en Python, que signifie la clause 'case _:' ?",
          options: [
            "Une variable temporaire non définie",
            "La clause par défaut équivalente au 'Sinon' de la structure 'Selon'",
            "Une boucle d'attente infinie",
            "Une condition obligatoire en première position"
          ],
          correct: 1,
          explanation: "Le tiret de soulignement '_' sert de motif générique (wildcard) qui capture toute valeur non interceptée auparavant, correspondant au bloc 'Sinon' algorithmique."
        },
        {
          question: "Quel opérateur algorithmique correspond au test d'égalité logique, et quel est son équivalent Python ?",
          options: [
            "= en algorithmique et == en Python",
            "== en algorithmique et = en Python",
            "← en algorithmique et == en Python",
            "= pour les deux"
          ],
          correct: 0,
          explanation: "En algorithmique, l'égalité se note '=' (l'affectation étant '←'). En Python, le test d'égalité se note impérativement '==' (le signe '=' étant réservé à l'affectation)."
        },
        {
          question: "Quelle est la syntaxe correcte pour traduire l'opérateur algorithmique de différence (≠) en Python ?",
          options: [
            "<>",
            "!=",
            "=/=",
            "not ="
          ],
          correct: 1,
          explanation: "L'opérateur de comparaison '≠' se traduit rigoureusement par '!=' en Python."
        },
        {
          question: "Dans l'algorithme TarifAcces, pourquoi la variable prix_net est-elle déclarée de type Réel dans le TDO ?",
          options: [
            "Car l'âge peut être un nombre à virgule",
            "Car le calcul de la réduction applique des coefficients multiplicatifs réels (0.5 et 0.8)",
            "Car le tarif de base 20 DT est obligatoirement un nombre décimal",
            "Car les entiers sont interdits dans les opérations de multiplication"
          ],
          correct: 1,
          explanation: "Le calcul de la remise fait intervenir des multiplications par 0.5 (réduction 50%) ou 0.8 (réduction 20%), ce qui produit des valeurs décimales de type Réel (float)."
        },
        {
          question: "Comment se traduit l'expression algorithmique '(age ≥ 12) Et (age ≤ 17)' de manière élégante en Python ?",
          options: [
            "12 <= age <= 17 (ou age >= 12 and age <= 17)",
            "12 <= age Et age <= 17",
            "age in [12..17]",
            "between(age, 12, 17)"
          ],
          correct: 0,
          explanation: "Python autorise les comparaisons enchaînées directes '12 <= age <= 17', ce qui est strictement équivalent à 'age >= 12 and age <= 17'."
        },
        {
          question: "Quelle est la conséquence si l'on oublie d'indenter le bloc de code situé sous un 'elif' en Python ?",
          options: [
            "Le programme s'exécute quand même normalement",
            "Python génère une erreur d'indentation (IndentationError)",
            "L'instruction elif est ignorée",
            "Le résultat retourné est systématiquement False"
          ],
          correct: 1,
          explanation: "En Python, l'indentation définit la structure des blocs de contrôle. Une absence d'indentation entraîne immédiatement une erreur de syntaxe 'IndentationError'."
        },
        {
          question: "Soit l'expression : valide = Non (formule = 'X'). Si formule vaut 'P', que vaut valide ?",
          options: [
            "Vrai (True)",
            "Faux (False)",
            "Une erreur car 'X' est indéfini",
            "0"
          ],
          correct: 0,
          explanation: "formule = 'X' est Faux, donc Non(Faux) donne Vrai."
        },
        {
          question: "Dans une structure 'Si C1 Alors ... Sinon Si C2 Alors ... FinSi', si C1 est Vraie, la condition C2 est-elle évaluée ?",
          options: [
            "Non, l'exécution quitte la structure dès qu'une branche Alors est exécutée",
            "Oui, toutes les conditions d'un Sinon Si sont toujours évaluées",
            "Seulement si C2 est entre parenthèses",
            "Oui, mais son traitement n'est pas appliqué"
          ],
          correct: 0,
          explanation: "Dans une structure conditionnelle généralisée, dès qu'une condition s'avère vraie, son bloc d'instructions est exécuté et toutes les branches 'Sinon Si' suivantes sont ignorées."
        },
        {
          question: "Quelle est la valeur de prix_net pour un client de 10 ans ayant choisi la formule 'P' (supplément 5 DT) ?",
          options: [
            "0.0 DT (gratuit pour les moins de 12 ans)",
            "25.0 DT (plein tarif)",
            "12.5 DT (50% de remise)",
            "5.0 DT"
          ],
          correct: 0,
          explanation: "La règle stipule que l'accès est gratuit pour les moins de 12 ans (age < 12), donc prix_net = 0."
        },
        {
          question: "Quel opérateur logique en Python correspond à la disjonction 'Ou' en algorithmique ?",
          options: [
            "||",
            "or",
            "OR",
            "ou"
          ],
          correct: 1,
          explanation: "L'opérateur logique de disjonction en Python s'écrit obligatoirement en minuscules : 'or'."
        },
        {
          question: "Que se passe-t-il si un client saisit la formule 'B' (qui n'existe pas) dans l'algorithme ?",
          options: [
            "Le bloc Sinon du Selon est exécuté, passant valide à Faux et affichant 'Formule invalide !'",
            "Le programme plante avec une erreur d'indice",
            "Le tarif est fixé arbitrairement à 0 DT",
            "Le supplément prend la valeur 20 DT par défaut"
          ],
          correct: 0,
          explanation: "La clause Sinon du Selon capture toute formule non répertoriée ('P', 'M', 'T') et positionne valide ← Faux, ce qui déclenche le message d'erreur."
        },
        {
          question: "Dans le TDO, quel est le type de la variable 'valide' ?",
          options: [
            "Booléen",
            "Entier",
            "Caractère",
            "Condition"
          ],
          correct: 0,
          explanation: "La variable 'valide' stocke une valeur de vérité (Vrai ou Faux), son type officiel est donc 'Booléen'."
        },
        {
          question: "En algorithmique, comment se note l'opérateur d'appartenance d'un caractère à un ensemble ?",
          options: [
            "∈ (ou in en Python)",
            "appartient",
            "dans",
            ":="
          ],
          correct: 0,
          explanation: "Selon la norme officielle 2024-2025, l'appartenance pour un entier ou un caractère se note '∈' en algorithmique et 'in' en Python."
        }
      ]
    };
  },

  computed: {
    formuleClean() {
      return this.simFormule ? this.simFormule.trim() : '';
    },
    formuleUpper() {
      return this.formuleClean.toUpperCase();
    },
    isFormuleValid() {
      return ['P', 'M', 'T'].includes(this.formuleUpper);
    },
    supplement() {
      switch (this.formuleUpper) {
        case 'P': return 5;
        case 'M': return 10;
        case 'T': return 15;
        default: return 0;
      }
    },
    formuleNom() {
      switch (this.formuleUpper) {
        case 'P': return 'Piscine (+5 DT)';
        case 'M': return 'Musculation (+10 DT)';
        case 'T': return 'Accès Total (+15 DT)';
        default: return 'Code non reconnu (Invalide)';
      }
    },
    prixBrut() {
      return 20 + this.supplement;
    },
    ageVal() {
      const a = parseInt(this.simAge, 10);
      return isNaN(a) ? 0 : Math.max(0, a);
    },
    ageBranch() {
      if (this.ageVal < 12) return 'child';
      if (this.ageVal >= 12 && this.ageVal <= 17) return 'junior';
      if (this.ageVal >= 60) return 'senior';
      return 'adult';
    },
    reductionLabel() {
      switch (this.ageBranch) {
        case 'child': return 'Gratuit (100% de réduction)';
        case 'junior': return 'Réduction Junior : -50%';
        case 'senior': return 'Réduction Senior : -20%';
        default: return 'Tarif standard (aucune réduction)';
      }
    },
    reductionBadgeClass() {
      switch (this.ageBranch) {
        case 'child': return 'bg-success';
        case 'junior': return 'bg-info text-dark';
        case 'senior': return 'bg-warning text-dark';
        default: return 'bg-secondary';
      }
    },
    prixNet() {
      if (!this.isFormuleValid) return null;
      if (this.ageVal < 12) return 0.0;
      if (this.ageVal >= 12 && this.ageVal <= 17) return this.prixBrut * 0.5;
      if (this.ageVal >= 60) return this.prixBrut * 0.8;
      return parseFloat(this.prixBrut);
    },
    prixNetFormatted() {
      if (this.prixNet === null) return 'N/A';
      return this.prixNet.toFixed(1) + ' DT';
    },
    terminalOutput() {
      let out = `Donner l'âge du client : ${this.ageVal}\nDonner le code de formule (P, M ou T) : ${this.simFormule}\n`;
      if (!this.isFormuleValid) {
        out += `Formule invalide !`;
      } else {
        out += `Montant net à payer : ${this.prixNet.toFixed(1)} DT`;
      }
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

    setPreset(p) {
      this.simAge = p.age;
      this.simFormule = p.formule;
    },

    copyPythonCode() {
      const code = `# Entrées
age = int(input("Donner l'âge du client : "))
formule = input("Donner le code de formule (P, M ou T) : ")

# Structure à choix multiples (match / case)
supplement = 0
valide = True
match formule:
    case "P" | "p":
        supplement = 5
    case "M" | "m":
        supplement = 10
    case "T" | "t":
        supplement = 15
    case _:
        valide = False

# Traitement conditionnel imbriqué et généralisé
if not valide:
    print("Formule invalide !")
else:
    prix_brut = 20 + supplement
    if age < 12:
        prix_net = 0.0
    elif 12 <= age <= 17:
        prix_net = prix_brut * 0.5
    elif age >= 60:
        prix_net = prix_brut * 0.8
    else:
        prix_net = float(prix_brut)
    print("Montant net à payer :", prix_net, "DT")`;

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
