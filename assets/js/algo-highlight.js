/**
 * algo-highlight.js
 * Définition du langage 'algo' (Pseudo-code scolaire tunisien - Conventions Officielles 2024-2025)
 * pour la bibliothèque Highlight.js.
 *
 * Fonctionnalités :
 * - Support intégral des mots-clés en français avec caractères accentués (Écrire, Écrire_nl, Procédure, Jusqu'à, Répéter, etc.)
 * - Gestion précise de l'apostrophe dans "Jusqu'à" pour éviter toute collision avec les chaînes littérales
 * - Primitives prédéfinies officielles (RacineCarré, Aléa, Pos, Sous_chaine, Effacer, Estnum, Majus, Ord, Chr, etc.)
 * - Types de données scolaires (entier, réel, booléen, caractère, chaîne, Tableau, Enregistrement, Fichier)
 * - Opérateurs mathématiques, logiques et affectation (←, ≠, ≤, ≥, ∈, Div, Mod, Et, Ou, Non, @, ..)
 */
(function() {
  function registerAlgo(hljs) {
    if (!hljs) return;

    hljs.registerLanguage('algo', function(hljs) {
      return {
        name: 'Algorithme',
        aliases: ['algo', 'pseudocode', 'algorithm'],
        case_insensitive: true,
        keywords: {
          $pattern: /[\w\u00C0-\u024F_']+|Jusqu'à|jusqu'à|JUSQU'À/,
          keyword: [
            'ALGORITHME', 'DEBUT', 'FIN', 'Fin', 'Début', 'debut',
            'Fonction', 'Procédure', 'Procedure', 'Retourner',
            'Si', 'Alors', 'Sinon', 'FinSi', 'Fin Si',
            'Pour', 'de', 'à', 'a', 'Pas', 'Faire', 'Fin Pour', 'FinPour',
            'Tant que', 'Tantque', 'Tant', 'que', 'Fin Tant que', 'FinTantque',
            'Répéter', 'Repeter',
            'Selon', 'Fin Selon', 'FinSelon',
            'Lire', 'Lire_ligne', 'Écrire', 'Ecrire', 'Écrire_nl', 'Ecrire_nl'
          ],
          type: [
            'Entier', 'entier', 'Réel', 'réel', 'reel', 'Reel',
            'Booléen', 'booléen', 'booleen', 'Booleen',
            'Caractère', 'caractère', 'caractere', 'Caractere',
            'Chaîne', 'chaîne', 'chaine', 'Chaine', 'Chaîne de caractères',
            'Tableau', 'tableau', 'Tableau de', 'tableau de',
            'Enregistrement', 'enregistrement',
            'Fichier', 'fichier', 'Fichier Texte', 'Texte', 'texte'
          ],
          built_in: [
            // Fonctions numériques et mathématiques
            'Arrondi', 'RacineCarré', 'RacineCarre', 'Aléa', 'Alea', 'Ent', 'Abs',
            // Fonctions caractères
            'Ord', 'Chr',
            // Fonctions et procédures sur les chaînes
            'Long', 'Pos', 'Convch', 'Estnum', 'Valeur', 'Sous_chaine', 'Effacer', 'Majus',
            // Primitives fichiers
            'Ouvrir', 'Fermer', 'Fin_fichier'
          ],
          literal: [
            'Vrai', 'vrai', 'Faux', 'faux', 'True', 'False'
          ]
        },
        contains: [
          // Commentaires d'une ligne
          hljs.C_LINE_COMMENT_MODE,
          // Règle spécifique pour Jusqu'à avant la détection des guillemets simples (apostrophe)
          {
            className: 'keyword',
            match: /(?:^|\b)(?:Jusqu'à|jusqu'à|Jusqu'a|jusqu'a|JUSQU'À|JUSQU'A)(?=[\s\(]|$)/i
          },
          // Chaînes entre guillemets doubles
          hljs.QUOTE_STRING_MODE,
          // Chaînes entre guillemets simples
          hljs.APOS_STRING_MODE,
          // Nombres
          hljs.C_NUMBER_MODE,
          // Opérateurs d'affectation, de comparaison, logiques et arithmétiques
          {
            className: 'operator',
            match: /←|≠|≤|≥|∈|\bDiv\b|\bMod\b|\bEt\b|\bOu\b|\bNon\b|@|\.\.|\+|\-|\*|\/|=|<|>/i
          }
        ]
      };
    });
  }

  // Détection d'environnement navigateur ou Node.js
  if (typeof window !== 'undefined' && window.hljs) {
    registerAlgo(window.hljs);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = registerAlgo;
  }
})();
