/**
 * assets/apps/serie03.js
 * Logique applicative JavaScript (Vue 3) pour les simulations de la Série N°3 : Structures itératives
 * Informatique 4e Année Scientifique (Bac 2026)
 * Conforme aux conventions officielles tunisiennes 2024-2025
 */

document.addEventListener("DOMContentLoaded", function () {
  if (typeof Vue === "undefined") {
    console.error("Vue 3 n'est pas chargé sur la page.");
    return;
  }

  const { createApp } = Vue;

  const helperFocus = (el) => {
    setTimeout(() => {
      const inputs = el.querySelectorAll('input[type="text"]');
      if (inputs.length) {
        inputs[inputs.length - 1].focus();
        inputs[inputs.length - 1].select?.();
      }
    }, 60);
  };

  // =========================================================================
  // 1. EXERCICE 3 : Moyenne arithmétique de n nombres (#moyenne-arithmetique)
  // =========================================================================
  if (document.getElementById("moyenne-arithmetique")) {
    createApp({
      data() {
        return {
          step: -1,
          nvals: [],
          t: [],
          n: 0
        };
      },
      computed: {
        moy() {
          const valid = this.t.map(v => parseFloat(v)).filter(v => !isNaN(v));
          if (!valid.length) return 0;
          const sum = valid.reduce((acc, cur) => acc + cur, 0);
          const res = sum / valid.length;
          return Number.isInteger(res) ? res : Number(res.toFixed(2));
        }
      },
      methods: {
        nextStep() {
          this.step = 0;
          this.nvals = [''];
          helperFocus(this.$el);
        },
        validate(idx) {
          if (this.step === 0) {
            const v = parseInt(this.nvals[idx], 10);
            if (isNaN(v) || v < 2 || v > 10) {
              alert("Veuillez saisir un entier n compris entre 2 et 10.");
              return;
            }
            this.n = v;
            this.nvals[idx] = v;
            this.step = 1;
            this.t = [''];
            helperFocus(this.$el);
          } else if (this.step === 1) {
            const raw = String(this.t[idx]).trim();
            const val = parseFloat(raw);
            if (isNaN(val)) {
              alert("Veuillez saisir un nombre valide.");
              return;
            }
            this.t[idx] = val;
            if (this.t.length < this.n) {
              this.t.push('');
              helperFocus(this.$el);
            } else {
              this.step = 2;
            }
          }
        },
        reset() {
          this.step = -1;
          this.nvals = [];
          this.t = [];
          this.n = 0;
        }
      }
    }).mount("#moyenne-arithmetique");
  }

  // =========================================================================
  // 2. EXERCICE 4 : Recherche de la meilleure note (#meilleure-note)
  // =========================================================================
  if (document.getElementById("meilleure-note")) {
    createApp({
      data() {
        return {
          step: -1,
          nvals: [],
          tvals: [],
          tidx: [],
          n: 0
        };
      },
      computed: {
        max() {
          const notes = this.tvals.map(v => parseFloat(v)).filter(v => !isNaN(v));
          if (!notes.length) return 0;
          return Math.max(...notes);
        }
      },
      methods: {
        nextStep() {
          this.step = 0;
          this.nvals = [''];
          helperFocus(this.$el);
        },
        validate(idx) {
          if (this.step === 0) {
            const v = parseInt(this.nvals[idx], 10);
            if (isNaN(v) || v < 3 || v > 30) {
              alert("Le nombre d'élèves n doit être compris entre 3 et 30.");
              return;
            }
            this.n = v;
            this.nvals[idx] = v;
            this.step = 1;
            this.tvals = [''];
            this.tidx = [0];
            helperFocus(this.$el);
          } else if (this.step === 1) {
            const raw = String(this.tvals[idx]).trim();
            const val = parseFloat(raw);
            if (isNaN(val) || val < 0 || val > 20) {
              alert("Veuillez saisir une note valide entre 0 et 20.");
              return;
            }
            this.tvals[idx] = val;
            if (this.tvals.length < this.n) {
              this.tvals.push('');
              this.tidx.push(this.tvals.length - 1);
              helperFocus(this.$el);
            } else {
              this.step = 2;
            }
          }
        },
        reset() {
          this.step = -1;
          this.nvals = [];
          this.tvals = [];
          this.tidx = [];
          this.n = 0;
        }
      }
    }).mount("#meilleure-note");
  }

  // =========================================================================
  // 3. EXERCICE 5 : Moyenne arithmétique avec condition d'arrêt (#moyenne-arithmetique-2)
  // =========================================================================
  if (document.getElementById("moyenne-arithmetique-2")) {
    createApp({
      data() {
        return {
          step: -1,
          t: []
        };
      },
      computed: {
        moy() {
          // La dernière valeur est 0 (valeur sentinelle d'arrêt)
          const all = this.t.map(v => parseFloat(v)).filter(v => !isNaN(v));
          // On exclut le 0 de terminaison
          const valid = all.filter((val, i) => !(i === all.length - 1 && val === 0));
          if (!valid.length) return 0;
          const sum = valid.reduce((acc, cur) => acc + cur, 0);
          const res = sum / valid.length;
          return Number.isInteger(res) ? res : Number(res.toFixed(2));
        }
      },
      methods: {
        nextStep() {
          this.step = 0;
          this.t = [''];
          helperFocus(this.$el);
        },
        validate(idx) {
          const raw = String(this.t[idx]).trim();
          const val = parseFloat(raw);
          if (isNaN(val)) {
            alert("Veuillez saisir un nombre valide (ou 0 pour terminer).");
            return;
          }
          this.t[idx] = val;
          if (val === 0) {
            this.step = 1;
          } else {
            this.t.push('');
            helperFocus(this.$el);
          }
        },
        reset() {
          this.step = -1;
          this.t = [];
        }
      }
    }).mount("#moyenne-arithmetique-2");
  }

  // =========================================================================
  // 4. EXERCICE 7 : Test de primalité d'un nombre (#nombre-premier)
  // =========================================================================
  if (document.getElementById("nombre-premier")) {
    createApp({
      data() {
        return {
          step: -1,
          nvals: [],
          n: 0
        };
      },
      computed: {
        premier() {
          const num = this.n;
          if (num < 2) return false;
          if (num === 2 || num === 3) return true;
          if (num % 2 === 0 || num % 3 === 0) return false;
          for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
          }
          return true;
        }
      },
      methods: {
        nextStep() {
          this.step = 0;
          this.nvals = [''];
          helperFocus(this.$el);
        },
        validate(idx) {
          const v = parseInt(this.nvals[idx], 10);
          if (isNaN(v) || v < 0) {
            alert("Veuillez entrer un entier n >= 0.");
            return;
          }
          this.n = v;
          this.nvals[idx] = v;
          this.step = 1;
        },
        reset() {
          this.step = -1;
          this.nvals = [];
          this.n = 0;
        }
      }
    }).mount("#nombre-premier");
  }

  // =========================================================================
  // 5. EXERCICE 8 : Identification des chiffres d'un nombre (#chiffres-nombre)
  // =========================================================================
  if (document.getElementById("chiffres-nombre")) {
    createApp({
      data() {
        return {
          step: -1,
          nvals: [],
          n: 0
        };
      },
      computed: {
        chiffres() {
          const digits = [...new Set(String(this.n).split(''))].filter(c => c >= '0' && c <= '9');
          digits.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
          return digits.join(', ');
        }
      },
      methods: {
        nextStep() {
          this.step = 0;
          this.nvals = [''];
          helperFocus(this.$el);
        },
        validate(idx) {
          const v = parseInt(this.nvals[idx], 10);
          if (isNaN(v) || v <= 0) {
            alert("Veuillez donner un nombre entier n > 0.");
            return;
          }
          this.n = v;
          this.nvals[idx] = v;
          this.step = 1;
        },
        reset() {
          this.step = -1;
          this.nvals = [];
          this.n = 0;
        }
      }
    }).mount("#chiffres-nombre");
  }

  // =========================================================================
  // 6. EXERCICE 9 : Lettres communes et spécifiques (#lettres-communes)
  // =========================================================================
  if (document.getElementById("lettres-communes")) {
    createApp({
      data() {
        return {
          step: -1,
          mots1: [],
          mots2: [],
          mot1: '',
          mot2: ''
        };
      },
      computed: {
        common() {
          const set1 = new Set(this.mot1.toUpperCase().split(''));
          const set2 = new Set(this.mot2.toUpperCase().split(''));
          return [...set1].filter(c => set2.has(c) && c >= 'A' && c <= 'Z').sort();
        },
        spec1() {
          const set1 = new Set(this.mot1.toUpperCase().split(''));
          const set2 = new Set(this.mot2.toUpperCase().split(''));
          return [...set1].filter(c => !set2.has(c) && c >= 'A' && c <= 'Z').sort();
        },
        spec2() {
          const set1 = new Set(this.mot1.toUpperCase().split(''));
          const set2 = new Set(this.mot2.toUpperCase().split(''));
          return [...set2].filter(c => !set1.has(c) && c >= 'A' && c <= 'Z').sort();
        }
      },
      methods: {
        nextStep() {
          this.step = 0;
          this.mots1 = [''];
          helperFocus(this.$el);
        },
        validate(idx) {
          if (this.step === 0) {
            const w = String(this.mots1[idx] || '').trim();
            if (!w) {
              alert("Veuillez saisir un premier mot.");
              return;
            }
            this.mot1 = w;
            this.mots1[idx] = w;
            this.step = 1;
            this.mots2 = [''];
            helperFocus(this.$el);
          } else if (this.step === 1) {
            const w = String(this.mots2[idx] || '').trim();
            if (!w) {
              alert("Veuillez saisir un second mot.");
              return;
            }
            this.mot2 = w;
            this.mots2[idx] = w;
            this.step = 2;
          }
        },
        reset() {
          this.step = -1;
          this.mots1 = [];
          this.mots2 = [];
          this.mot1 = '';
          this.mot2 = '';
        }
      }
    }).mount("#lettres-communes");
  }

  // =========================================================================
  // 7. EXERCICE 10 : Détection du monovocalisme (#detection-monovocalisme)
  // =========================================================================
  if (document.getElementById("detection-monovocalisme")) {
    createApp({
      data() {
        return {
          step: -1,
          chs: [],
          chVal: ''
        };
      },
      computed: {
        voyellesTrouvees() {
          const voyellesRef = new Set(['A', 'E', 'I', 'O', 'U', 'Y']);
          const clean = this.chVal.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          const trouvees = new Set();
          for (const char of clean) {
            if (voyellesRef.has(char)) {
              trouvees.add(char);
            }
          }
          return [...trouvees];
        },
        isMono() {
          return this.voyellesTrouvees.length === 1;
        },
        voyelle() {
          return this.isMono ? this.voyellesTrouvees[0] : '';
        }
      },
      methods: {
        nextStep() {
          this.step = 0;
          this.chs = [''];
          helperFocus(this.$el);
        },
        validate(idx) {
          const str = String(this.chs[idx] || '').trim();
          if (!str) {
            alert("Veuillez entrer une phrase ou un mot.");
            return;
          }
          this.chVal = str;
          this.chs[idx] = str;
          this.step = 1;
        },
        reset() {
          this.step = -1;
          this.chs = [];
          this.chVal = '';
        }
      }
    }).mount("#detection-monovocalisme");
  }

  // =========================================================================
  // 8. EXERCICE 11 : Conversion en base 16 (#conversion-hexa)
  // =========================================================================
  if (document.getElementById("conversion-hexa")) {
    createApp({
      data() {
        return {
          step: -1,
          nvals: [],
          n: 0
        };
      },
      computed: {
        nhexa() {
          return Number(this.n).toString(16).toUpperCase();
        }
      },
      methods: {
        nextStep() {
          this.step = 0;
          this.nvals = [''];
          helperFocus(this.$el);
        },
        validate(idx) {
          const v = parseInt(this.nvals[idx], 10);
          if (isNaN(v) || v < 0 || v > 65535) {
            alert("Veuillez saisir un nombre n compris entre 0 et 65535.");
            return;
          }
          this.n = v;
          this.nvals[idx] = v;
          this.step = 1;
        },
        reset() {
          this.step = -1;
          this.nvals = [];
          this.n = 0;
        }
      }
    }).mount("#conversion-hexa");
  }

  // =========================================================================
  // 9. EXERCICE 12 : Test d'anagramme (#test-anagramme)
  // =========================================================================
  if (document.getElementById("test-anagramme")) {
    createApp({
      data() {
        return {
          step: -1,
          mots1: [],
          mots2: [],
          mot1: '',
          mot2: ''
        };
      },
      computed: {
        anagramme() {
          const clean = (s) => s.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Z]/g, "").split('').sort().join('');
          const a = clean(this.mot1);
          const b = clean(this.mot2);
          return a.length > 0 && a === b;
        }
      },
      methods: {
        nextStep() {
          this.step = 0;
          this.mots1 = [''];
          helperFocus(this.$el);
        },
        validate(idx) {
          if (this.step === 0) {
            const w = String(this.mots1[idx] || '').trim();
            if (!w) {
              alert("Veuillez entrer le premier mot.");
              return;
            }
            this.mot1 = w;
            this.mots1[idx] = w;
            this.step = 1;
            this.mots2 = [''];
            helperFocus(this.$el);
          } else if (this.step === 1) {
            const w = String(this.mots2[idx] || '').trim();
            if (!w) {
              alert("Veuillez entrer le second mot.");
              return;
            }
            this.mot2 = w;
            this.mots2[idx] = w;
            this.step = 2;
          }
        },
        reset() {
          this.step = -1;
          this.mots1 = [];
          this.mots2 = [];
          this.mot1 = '';
          this.mot2 = '';
        }
      }
    }).mount("#test-anagramme");
  }

  // =========================================================================
  // 10. EXERCICE 14 : Validation suite de dominos (#suite-dominos)
  // =========================================================================
  if (document.getElementById("suite-dominos")) {
    createApp({
      data() {
        return {
          step: -1,
          nvals: [],
          dvals: [],
          didx: [],
          n: 0,
          d: []
        };
      },
      computed: {
        valide() {
          if (this.d.length < 4 || this.d.length % 2 !== 0) return false;
          // Domino k est (d[2*k], d[2*k+1]).
          // Le raccord avec domino k+1 compare d[2*k+1] avec d[2*(k+1)]
          const nbDominos = this.d.length / 2;
          for (let k = 0; k < nbDominos - 1; k++) {
            if (this.d[2 * k + 1] !== this.d[2 * (k + 1)]) {
              return false;
            }
          }
          return true;
        }
      },
      methods: {
        nextStep() {
          this.step = 0;
          this.nvals = [''];
          helperFocus(this.$el);
        },
        validate(idx) {
          if (this.step === 0) {
            const v = parseInt(this.nvals[idx], 10);
            if (isNaN(v) || v < 4 || v > 56 || v % 2 !== 0) {
              alert("La taille n doit être un nombre pair compris entre 4 et 56.");
              return;
            }
            this.n = v;
            this.nvals[idx] = v;
            this.step = 1;
            this.dvals = [''];
            this.didx = [0];
            helperFocus(this.$el);
          } else if (this.step === 1) {
            const v = parseInt(this.dvals[idx], 10);
            if (isNaN(v) || v < 0 || v > 6) {
              alert("Chaque demi-domino doit avoir une valeur entre 0 et 6.");
              return;
            }
            this.dvals[idx] = v;
            if (this.dvals.length < this.n) {
              this.dvals.push('');
              this.didx.push(this.dvals.length - 1);
              helperFocus(this.$el);
            } else {
              this.d = this.dvals.map(Number);
              this.step = 2;
            }
          }
        },
        reset() {
          this.step = -1;
          this.nvals = [];
          this.dvals = [];
          this.didx = [];
          this.d = [];
          this.n = 0;
        }
      }
    }).mount("#suite-dominos");
  }

  // =========================================================================
  // 11. EXERCICE 15 : Points d'équilibre (#point-equilibre)
  // =========================================================================
  if (document.getElementById("point-equilibre")) {
    createApp({
      data() {
        return {
          step: -1,
          nvals: [],
          tvals: [],
          tidx: [],
          n: 0
        };
      },
      computed: {
        points() {
          const arr = this.tvals.map(Number);
          const eqPoints = [];
          const n = arr.length;
          for (let k = 1; k < n - 1; k++) {
            let s1 = 0;
            for (let i = 0; i < k; i++) s1 += arr[i];
            let s2 = 0;
            for (let j = k + 1; j < n; j++) s2 += arr[j];
            if (s1 === s2) {
              eqPoints.push(k);
            }
          }
          return eqPoints;
        }
      },
      methods: {
        nextStep() {
          this.step = 0;
          this.nvals = [''];
          helperFocus(this.$el);
        },
        validate(idx) {
          if (this.step === 0) {
            const v = parseInt(this.nvals[idx], 10);
            if (isNaN(v) || v < 3 || v > 20) {
              alert("La taille n doit être comprise entre 3 et 20.");
              return;
            }
            this.n = v;
            this.nvals[idx] = v;
            this.step = 1;
            this.tvals = [''];
            this.tidx = [0];
            helperFocus(this.$el);
          } else if (this.step === 1) {
            const raw = String(this.tvals[idx]).trim();
            const val = parseFloat(raw);
            if (isNaN(val)) {
              alert("Veuillez saisir un nombre valide.");
              return;
            }
            this.tvals[idx] = val;
            if (this.tvals.length < this.n) {
              this.tvals.push('');
              this.tidx.push(this.tvals.length - 1);
              helperFocus(this.$el);
            } else {
              this.step = 2;
            }
          }
        },
        reset() {
          this.step = -1;
          this.nvals = [];
          this.tvals = [];
          this.tidx = [];
          this.n = 0;
        }
      }
    }).mount("#point-equilibre");
  }
});
