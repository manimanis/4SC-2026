/**
 * assets/apps/index.js
 * Logique applicative JavaScript pour index.html
 */

const { createApp } = Vue;

  createApp({
    data() {
      return {
        searchQuery: '',
        filterCategory: 'all',
        functionsList: [
          { algo: 'Majus(ch)', python: 'ch.upper()', category: 'chaine', role: 'Retourne la chaîne ch en majuscules' },
          { algo: 'Long(ch)', python: 'len(ch)', category: 'chaine', role: 'Retourne le nombre de caractères de la chaîne' },
          { algo: 'Pos(ch1, ch2)', python: 'ch2.find(ch1)', category: 'chaine', role: 'Retourne la 1ère position de ch1 dans ch2, ou -1 sinon' },
          { algo: 'Sous_chaine(ch, d, f)', python: 'ch[d:f]', category: 'chaine', role: 'Sous-chaîne de d à f (position finale f exclue)' },
          { algo: 'Effacer(ch, d, f)', python: 'ch = ch[:d] + ch[f:]', category: 'chaine', role: 'Supprime les caractères de d à f (f exclu)' },
          { algo: 'Estnum(ch)', python: 'ch.isdecimal()', category: 'chaine', role: 'Retourne Vrai si ch est convertible en entier positif' },
          { algo: 'Valeur(ch)', python: 'int(ch) | float(ch)', category: 'chaine', role: 'Convertit une chaîne en valeur numérique' },
          { algo: 'Convch(x)', python: 'str(x)', category: 'chaine', role: 'Convertit un nombre x en chaîne de caractères' },
          { algo: 'Ord(c)', python: 'ord(c)', category: 'chaine', role: 'Retourne le code ASCII du caractère c' },
          { algo: 'Chr(d)', python: 'chr(d)', category: 'chaine', role: 'Retourne le caractère correspondant au code ASCII d' },
          { algo: 'Arrondi(x)', python: 'round(x)', category: 'num', role: 'Retourne l’entier le plus proche de la valeur de x' },
          { algo: 'Ent(x)', python: 'int(x)', category: 'num', role: 'Retourne la partie entière de x' },
          { algo: 'RacineCarré(x)', python: 'sqrt(x)', category: 'num', role: 'Racine carrée (nécessite from math import sqrt)' },
          { algo: 'Aléa(vi, vf)', python: 'randint(vi, vf)', category: 'num', role: 'Entier aléatoire [vi, vf] (from random import randint)' },
          { algo: 'Abs(x)', python: 'abs(x)', category: 'num', role: 'Retourne la valeur absolue |x|' }
        ]
      };
    },
    computed: {
      filteredFunctions() {
        const q = this.searchQuery.toLowerCase().trim();
        return this.functionsList.filter(fn => {
          const matchesCategory = this.filterCategory === 'all' || fn.category === this.filterCategory;
          const matchesQuery = !q || 
            fn.algo.toLowerCase().includes(q) || 
            fn.python.toLowerCase().includes(q) || 
            fn.role.toLowerCase().includes(q);
          return matchesCategory && matchesQuery;
        });
      }
    }
  }).mount('#app');
