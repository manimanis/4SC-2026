# Les Conventions Algorithmiques (2024-2025)

**Ministère de l'Éducation**  
**Direction Générale des Programmes et de la Formation Continue**  
**Année scolaire :** 2024 / 2025  

Dans le but de développer le raisonnement et la capacité de résolution des problèmes chez l’apprenant, le domaine « **Pensée computationnelle et programmation** » met l’accent sur l’algorithmique. L’écriture d’un algorithme doit respecter les conventions citées dans ce document.

---

## A. La forme générale d’un algorithme

```text
ALGORITHME Nom
DEBUT
    Traitements
FIN
```

### Déclaration des objets

| Objet | Type / Nature |
| :--- | :--- |
| *Nom_objet* | *Type_objet* |

---

## B. Les syntaxes des structures algorithmiques

### 1. Les opérations élémentaires simples

#### a. L’opération d’entrée
```text
Lire (Objet)
```

#### b. L’opération de sortie
```text
Écrire ("Message", Objet, Expression)
Écrire_nl ("Message", Objet, Expression)
```

#### c. L’opération d’affectation
```text
Objet ← Expression
```
> **N.B. :** `Objet` est de type simple.

---

### 2. Les types de données simples
* **Entier**
* **Réel**
* **Booléen**
* **Caractère**
* **Chaîne de caractères**

---

### 3. Les structures de données
* **Tableau** (à une ou à deux dimensions)
* **Enregistrement**
* **Fichier**

---

### 4. Les déclarations

#### a. Les objets de type de donnée simple
| Objet | Type / Nature |
| :--- | :--- |
| `Nom_objet` | `Type_objet` |

#### b. Les tableaux
| Catégorie | Objet | Type / Nature |
| :--- | :--- | :--- |
| **Tableau à une dimension** | `Nom_tableau` | `Tableau de N Type_élément` |
| **Tableau à deux dimensions** | `Nom_tableau` | `Tableau de N lignes * M colonnes Type_élément` |

#### c. L’enregistrement
| Objet | Type / Nature |
| :--- | :--- |
| `Nom_enregistrement` | **Enregistrement**<br>&nbsp;&nbsp;`Nom_champ1 : Type_champ1`<br>&nbsp;&nbsp;`Nom_champ2 : Type_champ2`<br>&nbsp;&nbsp;`...`<br>**Fin** |

#### d. Les fichiers
| Catégorie | Objet | Type / Nature |
| :--- | :--- | :--- |
| **Fichier texte** | `Nom_fichier` | `Fichier Texte` |
| **Fichier de données** | `Nom_fichier` | `Fichier de Type_élément` |

#### e. Les nouveaux types utilisateurs
| Catégorie | Nouveau type |
| :--- | :--- |
| **Tableau à une dimension** | `Nom_type = Tableau de N Type_élément` |
| **Tableau à deux dimensions** | `Nom_type = Tableau de N lignes * M colonnes Type_élément` |
| **Enregistrement** | `Nom_type = Enregistrement`<br>&nbsp;&nbsp;`Nom_champ1 : Type_champ1`<br>&nbsp;&nbsp;`Nom_champ2 : Type_champ2`<br>&nbsp;&nbsp;`...`<br>`Fin` |
| **Fichier de données** | `Nom_type = Fichier de Type_élément` |

---

### 💡 Recommandations :
* L’écriture de l’algorithme doit respecter **l’indentation**.
* La nomenclature des objets doit être **significative**.
* Les éléments d’un tableau doivent être de **même type**.
* L’indice du premier élément d’une chaîne de caractères est **0**.
* Les indices des éléments d’un tableau sont de **type scalaire**.
* Pour accéder à un caractère d’une chaîne `Ch`, on utilise la notation **`Ch[i]`** avec $0 \le i < \text{long}(Ch)$.
* Pour accéder à un élément d’un tableau `T` de $n$ éléments, on utilise la notation **`T[i]`**.
* Pour accéder à un élément d’un tableau `M` à deux dimensions (L, C), on utilise la notation **`M[i, j]`**.
* Pour accéder à un champ d’un enregistrement `E`, on utilise la notation **`E.Nom_champ`**.
* L’affectation d’un enregistrement `e2` dans un autre enregistrement `e1` (de même type) peut se faire soit champs par champs soit en totalité (**`e1 ← e2`**).

---

### 5. Les structures de contrôle conditionnelles

#### a. La structure de contrôle conditionnelle simple
```text
Si Condition Alors
    Traitement
FinSi
```

#### b. La structure de contrôle conditionnelle complète
```text
Si Condition Alors
    Traitement1
Sinon
    Traitement2
FinSi
```

#### c. La structure de contrôle conditionnelle généralisée
```text
Si Condition1 Alors
    Traitement1
Sinon Si Condition2 Alors
    Traitement2
Sinon Si Condition3 Alors
    Traitement3
...
Sinon Si ConditionN-1 Alors
    TraitementN-1
[Sinon
    TraitementN]
FinSi
```

#### d. La structure de contrôle conditionnelle à choix multiples
```text
Selon <Sélecteur>
    Valeur1_1[, Valeur1_2, ...] : Traitement1
    Valeur2_1 .. Valeur2_2 : Traitement2
    ...
    [Sinon TraitementN]
Fin Selon
```
> **N.B. :** Le sélecteur doit être de type scalaire.

---

### 6. Les structures de contrôle itératives

#### a. La structure de contrôle itérative complète
```text
Pour Compteur de Début à Fin [Pas = valeur_pas] Faire
    Traitement
Fin Pour
```
> **N.B. :**
> * La valeur du pas peut être positive ou négative. Par défaut, elle est égale à 1.
> * Éviter de modifier la valeur du compteur de la structure itérative complète au niveau du traitement.

#### b. Les structures de contrôle itératives à condition d'arrêt

##### La structure Tant que
```text
Tant que Condition Faire
    Traitement
Fin Tant que
```

##### La structure Répéter
```text
Répéter
    Traitement
Jusqu'à Condition
```

---

### 7. Les modules

#### a. Les Fonctions

##### La déclaration
```text
Fonction Nom_fonction (pf1: type1, pf2: type2, ... , pfn : typen) : Type_résultat
DEBUT
    Traitement
    Retourner Résultat
FIN
```

##### L’appel
```text
Objet ← Nom_fonction (pe1, pe2, …, pen)
```

#### b. Les Procédures

##### La déclaration
```text
Procédure Nom_procédure (pf1: type1, pf2: type2, ... , pfn: typen)
DEBUT
    Traitement
FIN
```

##### L’appel
```text
Nom_procédure (pe1, pe2, … , pen)
```

##### Le mode de passage
Si le mode de passage est par adresse (par adresse), on ajoutera le symbole **`@`** avant le nom du paramètre.

> **N.B. :** Une fonction retourne un seul résultat de type simple (entier, réel, booléen, caractère, chaîne).

---

### 8. Les opérateurs arithmétiques et logiques

| Opérateurs arithmétiques | | Opérateurs de comparaison | |
| :--- | :---: | :--- | :---: |
| **Opération** | **Opérateur** | **Opération** | **Opérateur** |
| Somme | `+` | Égal | `=` |
| Soustraction | `-` | Différent | `≠` |
| Multiplication | `*` | Strictement supérieur | `>` |
| Division | `/` | Supérieur ou égal | `≥` |
| Division entière | `Div` | Strictement inférieur | `<` |
| Reste de la division entière | `Mod` | Inférieur ou égal | `≤` |
| | | Appartient (*entier, caractère*) | `∈` |

| Opérateurs Logiques | **Opérateur** |
| :--- | :---: |
| Négation | `Non` |
| Conjonction | `Et` |
| Disjonction | `Ou` |

> **N.B. :**
> * Pour représenter un ensemble de valeurs de même type, on utilise la notation `{v1, v2, ... vn}`.
> * Pour représenter un intervalle de valeurs de même type, on utilise la notation `[vi .. vf]`.

---

### 9. Les fonctions prédéfinies

#### a. Les fonctions sur les types numériques
| Algorithmique | Rôle |
| :--- | :--- |
| `Arrondi (x)` | Retourne l’entier le plus proche de la valeur de x. |
| `RacineCarré (x)` | Retourne la racine carrée d’un nombre x positif. |
| `Aléa (vi, vf)` | Retourne un entier aléatoire de l’intervalle [vi, vf]. |
| `Ent (x)` | Retourne la partie entière de x. |
| `Abs (x)` | Retourne la valeur absolue de x. |

#### b. Les fonctions sur le type caractère
| Algorithmique | Rôle |
| :--- | :--- |
| `Ord (c)` | Retourne le code ASCII du caractère c. |
| `Chr (d)` | Retourne le caractère dont le code ASCII est d. |

#### c. Les fonctions sur le type chaînes de caractères
| Algorithmique | Rôle |
| :--- | :--- |
| `Long (ch)` | Retourne le nombre de caractères de la chaîne ch. |
| `Pos (ch1, ch2)` | Retourne la première position de la chaîne ch1 dans la chaîne ch2, sinon elle retourne -1. |
| `Convch (x)` | Retourne la conversion d’un nombre x en une chaîne de caractères. |
| `Estnum (ch)` | Retourne Vrai si la chaîne ch est convertible en une valeur numérique, elle retourne Faux sinon. |
| `Valeur (ch)` | Retourne la conversion d'une chaîne ch en une valeur numérique, si c’est possible. |
| `Sous_chaine (ch, d, f)` | Retourne une partie de la chaîne ch à partir de la position d jusqu’à la position f (f exclue). |
| `Effacer (ch, d, f)` | Retourne une sous chaîne de ch après la suppression des caractères de la position d à la position f (f exclue). |
| `Majus (ch)` | Retourne l’équivalent de la chaîne ch en majuscule. |

> **N.B. :** On utilise l’opérateur `+` pour concaténer des chaînes et/ou des caractères.

---

## 10. Les fonctions et les procédures prédéfinies sur les fichiers

### a. Les fichiers de données
| Algorithmique | Rôle |
| :--- | :--- |
| `Ouvrir ("Chemin\Nom_physique", Nom_logique, "Mode")` | Ouverture d’un fichier.<br>• Mode d’ouverture :<br>&nbsp;&nbsp;o `"rb"` : Lecture (pointer au début)<br>&nbsp;&nbsp;o `"wb"` : Écriture (création)<br>&nbsp;&nbsp;o `"ab"` : Ajout à la fin du fichier |
| `Lire (Nom_logique, Objet)` | Lecture d’un objet à partir d’un fichier |
| `Ecrire (Nom_logique, Objet)` | Écriture d’un objet dans un fichier |
| `Fin_fichier (Nom_logique)` | Retourne Vrai si le pointeur est à la fin du fichier sinon elle retourne Faux |
| `Fermer (Nom_logique)` | Fermeture d’un fichier |

### b. Les fichiers textes
| Algorithmique | Rôle |
| :--- | :--- |
| `Ouvrir ("Chemin\Nom_physique", Nom_logique, "Mode")` | Ouverture d’un fichier.<br>• Mode d’ouverture :<br>&nbsp;&nbsp;o `"r"` : Lecture<br>&nbsp;&nbsp;o `"w"` : Écriture (création)<br>&nbsp;&nbsp;o `"a"` : Ajout à la fin du fichier |
| `Lire (Nom_logique, ch)` | Lecture de la totalité d’un fichier |
| `Lire_ligne (Nom_logique, ch)` | Lecture d’une ligne depuis un fichier texte |
| `Ecrire (Nom_logique, ch)` | Écriture de la chaîne ch dans un fichier texte |
| `Ecrire_nl (Nom_logique, ch)` | Écriture de la chaîne ch dans un fichier texte et retour à une nouvelle ligne |
| `Fin_fichier (Nom_logique)` | Retourne Vrai si le pointeur est à la fin du fichier sinon elle retourne Faux |
| `Fermer (Nom_logique)` | Fermeture d’un fichier |
