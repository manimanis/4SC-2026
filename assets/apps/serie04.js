/**
 * assets/apps/serie04.js
 * Simulateur de recherche dichotomique pour la Série N°4 (Exercice 5)
 * Vue 3 - Bac 2026
 */
document.addEventListener("DOMContentLoaded", function () {
  const el = document.getElementById("ex5-app");
  if (!el || typeof Vue === 'undefined') return;

  const { createApp } = Vue;

  createApp({
    data() {
      return {
        min: 0,
        max: 127,
        prop: 63,
        attempts: 1,
        maxAttempts: 7,
        history: [],
        gameOver: false,
        won: false
      };
    },
    computed: {
      intervalSize() {
        if (this.min > this.max) return 0;
        return this.max - this.min + 1;
      },
      minPercent() {
        return (this.min / 127) * 100;
      },
      maxPercent() {
        return (this.max / 127) * 100;
      },
      propPercent() {
        return (this.prop / 127) * 100;
      },
      rangeWidthPercent() {
        return Math.max(0, ((this.max - this.min) / 127) * 100);
      },
      attemptsPercent() {
        return (this.attempts / this.maxAttempts) * 100;
      }
    },
    methods: {
      startNewGame() {
        this.min = 0;
        this.max = 127;
        this.prop = Math.floor((this.min + this.max) / 2);
        this.attempts = 1;
        this.history = [];
        this.gameOver = false;
        this.won = false;
      },
      respond(sign) {
        if (this.gameOver) return;

        const prevMin = this.min;
        const prevMax = this.max;
        const prevSize = this.intervalSize;

        let eliminated = 0;
        if (sign === '=') {
          eliminated = prevSize - 1;
        } else if (sign === '+') {
          eliminated = Math.max(0, this.prop - prevMin + 1);
        } else if (sign === '-') {
          eliminated = Math.max(0, prevMax - this.prop + 1);
        }

        this.history.unshift({
          essai: this.attempts,
          min: prevMin,
          max: prevMax,
          prop: this.prop,
          sign: sign,
          eliminated: eliminated
        });

        if (sign === '=') {
          this.won = true;
          this.gameOver = true;
        } else if (sign === '+') {
          this.min = this.prop + 1;
          this.attempts++;
          this.prop = Math.floor((this.min + this.max) / 2);
        } else if (sign === '-') {
          this.max = this.prop - 1;
          this.attempts++;
          this.prop = Math.floor((this.min + this.max) / 2);
        }

        if (this.min > this.max) {
          this.gameOver = true;
        } else if (this.attempts > this.maxAttempts && !this.won) {
          this.gameOver = true;
        }
      }
    },
    mounted() {
      this.startNewGame();
    }
  }).mount("#ex5-app");
});
