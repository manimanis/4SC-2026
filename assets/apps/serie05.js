/**
 * assets/apps/serie05.js
 * Simulateurs interactifs Vue 3 pour la Série N°5 : Modularité 1 (Les Fonctions)
 * Informatique 4e Année Scientifique (Bac 2026)
 * Conforme aux conventions officielles 2024-2025
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof Vue === "undefined") {
    console.warn("Vue 3 n'est pas chargé sur la page serie05.html.");
    return;
  }

  const { createApp } = Vue;

  // =========================================================================
  // 1. SIMULATEUR EXERCICE 3 : Nombres d'Armstrong (Est_Armstrong)
  // =========================================================================
  const elSimArmstrong = document.getElementById("sim-armstrong-app");
  if (elSimArmstrong) {
    createApp({
      data() {
        return {
          nInput: 153,
          presets: [
            { label: "153 (p=3)", val: 153 },
            { label: "370 (p=3)", val: 370 },
            { label: "371 (p=3)", val: 371 },
            { label: "407 (p=3)", val: 407 },
            { label: "1634 (p=4)", val: 1634 },
            { label: "125 (non-armstrong)", val: 125 },
            { label: "2026 (non-armstrong)", val: 2026 }
          ]
        };
      },
      computed: {
        num() {
          const v = parseInt(this.nInput, 10);
          return isNaN(v) || v <= 0 ? 0 : v;
        },
        analysis() {
          const n = this.num;
          if (n <= 0) {
            return {
              valid: false,
              p: 0,
              digits: [],
              sum: 0,
              isArmstrong: false,
              formula: ""
            };
          }

          // Décomposition arithmétique comme dans l'algorithme officiel :
          // 1. Compter les chiffres (Div 10)
          let temp = n;
          let p = 0;
          while (temp > 0) {
            p++;
            temp = Math.floor(temp / 10);
          }

          // 2. Extraire les chiffres et calculer la somme des puissances (Mod 10 & Div 10)
          temp = n;
          const digits = [];
          let sum = 0;
          while (temp > 0) {
            const digit = temp % 10;
            const term = Math.pow(digit, p);
            digits.unshift({ digit, term }); // unshift pour garder l'ordre visuel gauche -> droite
            sum += term;
            temp = Math.floor(temp / 10);
          }

          const formulaTerms = digits.map(d => `${d.digit}^${p} (${d.term})`).join(" + ");
          const formula = `${formulaTerms} = ${sum}`;

          return {
            valid: true,
            p,
            digits,
            sum,
            isArmstrong: sum === n,
            formula
          };
        }
      },
      methods: {
        setPreset(val) {
          this.nInput = val;
        }
      }
    }).mount("#sim-armstrong-app");
  }

  // =========================================================================
  // 2. SIMULATEUR EXERCICE 4 : Détection de Palindrome (Est_Palindrome)
  // =========================================================================
  const elSimPalindrome = document.getElementById("sim-palindrome-app");
  if (elSimPalindrome) {
    createApp({
      data() {
        return {
          wordInput: "RADAR",
          // Réservation d'un tableau statique de 100 cases mémoire
          cells: Array.from({ length: 100 }, (_, i) => ({ index: i, char: "" })),
          presets: [
            "RADAR",
            "KAYAK",
            "LAVAL",
            "12321",
            "Informatique",
            "BAC2026",
            "ETE"
          ]
        };
      },
      computed: {
        cleanWord() {
          return (this.wordInput || "").trim();
        },
        wordLength() {
          return Math.min(this.cleanWord.length, 100);
        },
        populatedCells() {
          const w = this.cleanWord;
          const len = Math.min(w.length, 100);
          for (let k = 0; k < 100; k++) {
            this.cells[k].char = k < len ? w[k] : "";
          }
          return this.cells;
        },
        trace() {
          const ch = this.cleanWord;
          const len = ch.length;
          if (len === 0) {
            return {
              steps: [],
              isPalindrome: true,
              stoppedEarly: false,
              finalI: -1,
              finalJ: -1
            };
          }

          let i = 0;
          let j = len - 1;
          const steps = [];
          let isPal = true;
          let stoppedEarly = false;

          while (i < j && isPal) {
            const charI = ch[i].toUpperCase();
            const charJ = ch[j].toUpperCase();
            const match = charI === charJ;

            steps.push({
              stepNum: steps.length + 1,
              i,
              j,
              charI: ch[i],
              charJ: ch[j],
              match,
              explanation: match
                ? `'${ch[i]}' = '${ch[j]}' : concordance symétrique, i avance et j recule.`
                : `'${ch[i]}' ≠ '${ch[j]}' : première anomalie détectée ! Arrêt immédiat sans break.`
            });

            if (!match) {
              isPal = false;
              stoppedEarly = true;
            } else {
              i++;
              j--;
            }
          }

          return {
            steps,
            isPalindrome: isPal,
            stoppedEarly,
            finalI: i,
            finalJ: j
          };
        }
      },
      methods: {
        setPreset(w) {
          this.wordInput = w;
        }
      }
    }).mount("#sim-palindrome-app");
  }

  // =========================================================================
  // 3. SIMULATEUR EXERCICE 5 : Mots Ordonnés (Est_Ordonnee)
  // =========================================================================
  const elSimOrdonnee = document.getElementById("sim-ordonnee-app");
  if (elSimOrdonnee) {
    createApp({
      data() {
        return {
          wordInput: "EFFORT",
          // Réservation d'un tableau statique de 100 cases mémoire
          cells: Array.from({ length: 100 }, (_, i) => ({ index: i, char: "" })),
          presets: [
            { word: "EFFORT", expected: true },
            { word: "CHINTZ", expected: true },
            { word: "almost", expected: true },
            { word: "BOUQUET", expected: false },
            { word: "PYTHON", expected: false },
            { word: "ABCXYZ", expected: true }
          ]
        };
      },
      computed: {
        cleanWord() {
          return (this.wordInput || "").trim();
        },
        wordLength() {
          return Math.min(this.cleanWord.length, 100);
        },
        populatedCells() {
          const w = this.cleanWord;
          const len = Math.min(w.length, 100);
          for (let k = 0; k < 100; k++) {
            this.cells[k].char = k < len ? w[k] : "";
          }
          return this.cells;
        },
        trace() {
          const ch = this.cleanWord;
          const len = ch.length;
          if (len <= 1) {
            return {
              steps: [],
              isOrdered: true,
              brokenAt: null,
              explanation: "Une chaîne de 0 ou 1 lettre est triviale et toujours ordonnée."
            };
          }

          let i = 0;
          let isOrd = true;
          const steps = [];
          let brokenAt = null;

          while (i < len - 1 && isOrd) {
            const c1 = ch[i].toUpperCase();
            const c2 = ch[i + 1].toUpperCase();
            const valid = c1 <= c2;

            steps.push({
              index: i,
              c1: ch[i],
              c2: ch[i + 1],
              valid,
              explanation: valid
                ? `'${ch[i]}' ≤ '${ch[i + 1]}' (Ordre alphabétique respecté)`
                : `'${ch[i]}' > '${ch[i + 1]}' (Rupture d'ordre détectée !)`
            });

            if (!valid) {
              isOrd = false;
              brokenAt = i;
            } else {
              i++;
            }
          }

          return {
            steps,
            isOrdered: isOrd,
            brokenAt,
            explanation: isOrd
              ? `Toutes les ${steps.length} transitions de lettres respectent l'ordre alphabétique.`
              : `Rupture détectée à l'indice ${brokenAt} ('${ch[brokenAt]}' > '${ch[brokenAt + 1]}'). La fonction s'arrête immédiatement sans inspecter la suite !`
          };
        }
      },
      methods: {
        setPreset(w) {
          this.wordInput = w;
        }
      }
    }).mount("#sim-ordonnee-app");
  }

  // =========================================================================
  // 4. SIMULATEUR EXERCICE 6 : Chiffrement de César (Chiffrer_Cesar)
  // =========================================================================
  const elSimCesar = document.getElementById("sim-cesar-app");
  if (elSimCesar) {
    createApp({
      data() {
        return {
          messageInput: "BAC 2026 : SECRET Z",
          keyInput: 3,
          showDetails: true,
          copied: false,
          presets: [
            { msg: "BAC 2026 : SECRET Z", key: 3 },
            { msg: "INFORMATIQUE", key: 13 },
            { msg: "BIENVENUE AU BAC 2026", key: 7 },
            { msg: "PYTHON ET ALGORITHMIQUE", key: 1 }
          ]
        };
      },
      computed: {
        cleanKey() {
          const k = parseInt(this.keyInput, 10);
          if (isNaN(k)) return 1;
          // Normalisation modulo 26 dans [1, 25]
          const norm = ((k % 26) + 26) % 26;
          return norm === 0 ? 26 : norm;
        },
        cipherAnalysis() {
          const msg = this.messageInput || "";
          const k = this.cleanKey;
          let ciphered = "";
          const details = [];

          for (let i = 0; i < msg.length; i++) {
            const char = msg[i];
            const code = char.charCodeAt(0);

            if (char >= "A" && char <= "Z") {
              const base = 65; // 'A'
              const rang = code - base;
              const newRang = (rang + k) % 26;
              const newChar = String.fromCharCode(base + newRang);
              ciphered += newChar;
              details.push({
                char,
                isAlpha: true,
                code,
                base: "A",
                rang,
                newRang,
                newChar
              });
            } else if (char >= "a" && char <= "z") {
              const base = 97; // 'a'
              const rang = code - base;
              const newRang = (rang + k) % 26;
              const newChar = String.fromCharCode(base + newRang);
              ciphered += newChar;
              details.push({
                char,
                isAlpha: true,
                code,
                base: "a",
                rang,
                newRang,
                newChar
              });
            } else {
              ciphered += char;
              details.push({
                char,
                isAlpha: false,
                code,
                base: "-",
                rang: "-",
                newRang: "-",
                newChar: char
              });
            }
          }

          return {
            ciphered,
            details,
            reverseKey: (26 - (k % 26)) % 26
          };
        }
      },
      methods: {
        setPreset(p) {
          this.messageInput = p.msg;
          this.keyInput = p.key;
        },
        copyCipher() {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(this.cipherAnalysis.ciphered).then(() => {
              this.copied = true;
              setTimeout(() => {
                this.copied = false;
              }, 2000);
            });
          }
        }
      }
    }).mount("#sim-cesar-app");
  }
});
