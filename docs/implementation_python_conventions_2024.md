# Implémentation en Python des Conventions Algorithmiques (2024-2025)

**Ministère de l'Éducation**  
**Direction Générale des Programmes et de la Formation Continue**  
**Année scolaire :** 2024 / 2025  

Le langage de programmation choisi pour implémenter les solutions algorithmiques est le langage de programmation **Python**.

---

## A. Introduction générale

* Python est un langage de programmation **sensible à la casse**.
* Dans un code Python, il est recommandé d'ajouter des commentaires :
  * Commentaire sur une seule ligne : débuter la ligne par le symbole `#`.
  * Commentaire sur plusieurs lignes : délimiter les lignes du commentaire par `'''`.

---

## B. Les syntaxes des structures algorithmiques

### 1. Les opérations élémentaires simples

#### a. L’opération d’entrée
| En algorithmique | En Python |
| :--- | :--- |
| `Lire (Objet)` | `Objet = input()` <br> `Objet = input('message')` |

> **N.B. :** Par défaut, la valeur saisie par `input()` est de type chaîne de caractères (`str`).

#### b. L’opération de sortie
| En algorithmique | En Python |
| :--- | :--- |
| `Écrire ("Message", Objet, Expression)` | `print ("Message", Objet, Expression)` |
| `Écrire_nl ("Message", Objet, Expression)` | `print ("Message", Objet, Expression, "\n")` |

> **Remarques :**
> * `Objet` est de type variable simple (entier, réel, booléen, caractère et chaîne de caractères).
> * `"\n"` permet d'ajouter un retour à la ligne.
> * L'affichage d'un tableau `T` en Python doit se faire **élément par élément** et non pas avec l'instruction `print(T)`.

#### c. L’opération d’affectation
| En algorithmique | En Python |
| :--- | :--- |
| `Objet ← Expression` | `Objet = Expression` |

> **Remarque :** `Objet` est une variable de type simple (`entier`, `réel`, `booléen`, `caractère` et `chaîne de caractères`).

---

### 2. Les types de données simples

| En algorithmique | En Python |
| :--- | :--- |
| **Entier** | `int` |
| **Réel** | `float` |
| **Booléen** | `bool` |
| **Caractère** | `str` |
| **Chaîne de caractères** | `str` |

#### Exemples de conversions entre les types simples en Python :
| Conversion | Syntaxe | Exemple |
| :--- | :--- | :--- |
| De `str` vers `int` | `int(ch)` | `x = int("3")` *(x reçoit l’entier 3)* |
| De `str` vers `float` | `float(ch)` | `x = float("3.2")` *(x reçoit le réel 3.2)* |
| De `str` vers `bool` | `bool(ch)` | `x = bool("0")` *(x reçoit True)* |
| De `int` vers `str` | `str(int)` | `x = str(3)` *(x reçoit le caractère "3")*<br>`x = str(123)` *(x reçoit la chaîne "123")* |

---

### 3. Les structures de données

| En algorithmique | En Python |
| :--- | :--- |
| **Tableau (1D et 2D)** | Implémenté avec la bibliothèque `numpy` *(voir 4.b)* |
| **Enregistrement** | Implémenté sous forme de dictionnaire `dict` *(voir 4.c)* |
| **Fichier** | Manipulé via les fonctions de gestion de fichiers `open()` *(voir 4.d et 10)* |

---

### 4. Les déclarations

#### a. Les objets de type de donnée simple
* **En algorithmique :**
  | Objet | Type / Nature |
  | :--- | :--- |
  | `Nom_objet` | `Type_objet` |
* **En Python :** Une variable **n’a pas besoin d’être déclarée** avec un type particulier : c’est au moment où on lui attribue une valeur qu’elle sera créée. Ainsi, son type sera défini en fonction du type de la valeur qui lui a été attribuée. L’identificateur d’une variable est **sensible à la casse**.

#### b. Les tableaux (`numpy`)
* On utilisera la bibliothèque **`numpy`** pour implémenter les tableaux.
* Un tableau de la bibliothèque `numpy` est :
  * **Homogène** : constitué d’éléments de même type.
  * **Statique** : sa taille est fixée lors de la création.
* La déclaration d’un tableau se fait en deux étapes :
  1. **Importation :**
     ```python
     from numpy import array
     # ou from numpy import *
     # ou import numpy as alias
     ```
  2. **Déclaration du tableau :**
     * **Tableau 1D :** `T = array ([Type_élément] * N)` ou `T = array ([valeur_initiale] * N)`
     * **Tableau 2D :** `T = array ([[Type_élément] * Colonnes] * Lignes)` ou `T = array ([[valeur_initiale] * Colonnes] * Lignes)`

> **Remarque :** Spécification explicite du type : `Nom_tableau = array ([Valeur_initiale] * N, dtype=Type_élément)`

##### Exemples de déclarations de tableaux en Python :
| Déclaration | Explication |
| :--- | :--- |
| `T = array ([5] * 10)` | Tableau `T` de 10 entiers initialisés à `5`. |
| `T = array ([float ()] * 10)` | Tableau `T` de 10 réels initialisés à `0.0`. |
| `T = array ([str] * 10)` | Tableau `T` de 10 chaînes de caractères. |
| `T = array ([str()] * 10)` | Tableau `T` de 10 caractères initialisés à la chaîne vide `""`. |
| `T = array ([''] * 10, dtype = 'U20')` | Tableau `T` de 10 chaînes vide (max 20 caractères par élément). |
| `T = array ([[int ()] * 10] * 30)` | Tableau `T` de 30 lignes × 10 colonnes d’entiers. |

#### c. L’enregistrement (`dict`)
* **En algorithmique :**
  ```text
  Nom_enregistrement Enregistrement
      Nom_champ1 : Type_champ1
      Nom_champ2 : Type_champ2
      ...
  Fin
  ```
* **En Python :**
  ```python
  Nom_enregistrement = dict (
      Nom_champ1 = Type_champ1,
      Nom_champ2 = Type_champ2,
      ...
  )
  ```
> **Remarque :** Pour accéder à un champ d’un enregistrement en Python : `Nom_Enregistrement['Nom_Champ']`.

#### d. Les fichiers
La déclaration d’un objet de type fichier se fait lors de sa création à l'aide de la fonction **`open()`** *(détaillée en section 10)*.

---

### 5. Les structures de contrôle conditionnelles

| En algorithmique | En Python |
| :--- | :--- |
| `Si Condition Alors`<br>`    Traitement`<br>`FinSi` | ```python<br>if Condition :<br>    Traitement<br>``` |
| `Si Condition Alors`<br>`    Traitement1`<br>`Sinon`<br>`    Traitement2`<br>`FinSi` | ```python<br>if Condition :<br>    Traitement1<br>else :<br>    Traitement2<br>``` |
| `Si Condition1 Alors`<br>`    Traitement1`<br>`Sinon Si Condition2 Alors`<br>`    Traitement2`<br>`...`<br>`[Sinon TraitementN]`<br>`FinSi` | ```python<br>if Condition1 :<br>    Traitement1<br>elif Condition2 :<br>    Traitement2<br>...<br>else :<br>    TraitementN<br>``` |
| `Selon <Sélecteur>`<br>`    Valeur1_1[, Valeur1_2, ...] : Traitement1`<br>`    Valeur2_1 .. Valeur2_2 : Traitement2`<br>`    ...`<br>`    [Sinon TraitementN]`<br>`Fin Selon` | *(À partir de Python 3.10)* :<br>```python<br>match Sélecteur :<br>    case Valeur1_1 | Valeur1_2 :<br>        Traitement1<br>    case Valeur2_1 | Valeur2_2 :<br>        Traitement2<br>    case Sélecteur if V3_1 <= Sélecteur <= V3_2 :<br>        Traitement3<br>    case _ :<br>        TraitementN<br>```<br>**N.B. :** Le sélecteur doit être de type scalaire. |

---

### 6. Les structures de contrôle itératives

#### a. La structure de contrôle itérative complète
* **En algorithmique :**
  ```text
  Pour compteur de Début à Fin [Pas = valeur_pas] Faire
      Traitement
  Fin Pour
  ```
* **En Python :**
  ```python
  for compteur in range (Début, Fin+1, Pas) :
      Traitement
  ```
> **N.B. :**
> * La valeur finale du compteur (`Fin+1`) est exclue de la boucle `range`.
> * La valeur du pas peut être positive ou négative. Par défaut, elle est égale à 1.
> * **Ne pas utiliser l'instruction `break`** pour forcer l'arrêt de la boucle `for`.

#### b. Les structures de contrôle itératives à condition d'arrêt
* **En algorithmique :** `Tant que Condition Faire ... Fin Tant que` / `Répéter ... Jusqu'à Condition`
* **En Python :**
  ```python
  while Condition :
      Traitement
  ```
> **Remarque :** **Ne pas utiliser l'instruction `break`** pour forcer l'arrêt de la boucle `while`.

---

### 7. Les modules (Fonctions et Procédures)

#### a. La déclaration
Un module (fonction ou procédure) se définit en utilisant le mot-clé **`def`** :
```python
def Nom_module (pf1, pf2, ..., pfn) :
    Traitement
    [return résultat]
```
> **N.B. :** Dans un module, l'instruction `return` peut être utilisée pour retourner un seul résultat de type simple.

#### b. L’appel
* **Fonction :** `Objet = Nom_module (pe1, ..., pen)`
* **Procédure :** `Nom_module (pe1, ..., pen)`

#### c. Le mode de passage
* En algorithmique, le passage par adresse s'indique avec `@` (`@pf1`).
* En Python :
  ```python
  def Nom_module (pf1, pf2, ..., pfn) :
      Traitement
  ```
> **N.B. :** En Python, les paramètres de type **dictionnaire**, **tableau (`numpy`)** et **fichier** sont, par défaut, **passés par adresse**.

#### d. La portée des variables en Python :
* Toute variable déclarée au sein d'un module a une **portée locale**.
* Toute variable déclarée au sein d'un module précédée par le mot-clé **`global`** a une **portée globale**. Par conséquent, elle ne devra pas figurer parmi les paramètres de ce module.

---

### 💻 Exemple complet d'un programme modulaire Python

```python
from numpy import array

T1 = array([0]*10) # Déclaration du tableau T1
T2 = array([0]*15) # Déclaration du tableau T2

# Définition du module saisieTaille
def saisieTaille(bornInf, bornSup):
    taille = 0
    while taille not in range(bornInf, bornSup + 1):
        taille = int(input("Taille entre " + str(bornInf) + " et " + str(bornSup) + " : "))
    return taille

# Définition du module remplirTab
def remplirTab(T, taille):
    for i in range(taille):
        T[i] = int(input("Donner l'élément N° " + str(i) + " : "))

# Définition du module afficherTab
def afficherTab(T, taille):
    for i in range(taille):
        print(T[i])

# Le programme principal
n = saisieTaille(5, 10) # 1er appel du module saisieTaille
m = saisieTaille(3, 15) # 2ème appel du module saisieTaille

print("chargement de T1")
remplirTab(T1, n)

print("chargement de T2")
remplirTab(T2, m)

print("Affichage du tableau T1")
afficherTab(T1, n)

print("Affichage du tableau T2")
afficherTab(T2, m)
```

> **2ème variante (avec variable globale) :**
> ```python
> def saisieTaille(bornInf, bornSup):
>     global taille
>     taille = 0
>     while taille not in range(bornInf, bornSup + 1):
>         taille = int(input("Taille entre " + str(bornInf) + " et " + str(bornSup) + " : "))
> 
> # Programme principal
> saisieTaille(5, 10)
> n = taille
> ```

---

### 8. Les opérateurs arithmétiques et logiques

#### a. Opérateurs arithmétiques
| Opération | En algorithmique | En Python |
| :--- | :---: | :---: |
| Somme | `+` | `+` |
| Soustraction | `-` | `-` |
| Multiplication | `*` | `*` |
| Division | `/` | `/` |
| Division entière | `Div` | `//` |
| Reste de la division entière | `Mod` | `%` |

#### b. Opérateurs de comparaison
| Opération | En algorithmique | En Python |
| :--- | :---: | :---: |
| Égal | `=` | `==` |
| Différent | `≠` | `!=` |
| Strictement supérieur | `>` | `>` |
| Supérieur ou égal | `≥` | `>=` |
| Strictement inférieur | `<` | `<` |
| Inférieur ou égal | `≤` | `<=` |
| Appartient (*entier, caractère*) | `∈` | `in` |

#### c. Opérateurs logiques
| Opération | En algorithmique | En Python |
| :--- | :---: | :---: |
| Négation | `Non` | `not` |
| Conjonction | `Et` | `and` |
| Disjonction | `Ou` | `or` |

---

### 9. Les fonctions prédéfinies

#### a. Les fonctions sur le type numérique
| En algorithmique | En Python | Observation |
| :--- | :--- | :--- |
| `Arrondi (x)` | `round (x)` | |
| `RacineCarré (x)` | `sqrt (x)` | Nécessite `from math import sqrt` |
| `Aléa (vi, vf)` | `randint (vi, vf)` | Nécessite `from random import randint` |
| `Ent (x)` | `int (x)` | |
| `Abs (x)` | `abs (x)` | |

#### b. Les fonctions sur le type caractère
| En algorithmique | En Python |
| :--- | :--- |
| `Ord (c)` | `ord (c)` |
| `Chr (d)` | `chr (d)` |

#### c. Les fonctions sur le type chaîne de caractères
| En algorithmique | En Python |
| :--- | :--- |
| `Long (ch)` | `len (ch)` |
| `Pos (ch1, ch2)` | `ch2.find (ch1)` |
| `Convch (x)` | `str (x)` |
| `Estnum (ch)` | `ch.isdecimal()` |
| `Valeur (ch)` | `int (ch)` \| `float (ch)` |
| `Sous_chaine (ch, d, f)` | `ch[d:f]` |
| `Effacer (ch, d, f)` | `ch = ch[:d] + ch[f:]` |
| `Majus (ch)` | `ch.upper()` |

> **Remarques :**
> * Pour concaténer deux chaînes de caractères, on utilise l’opérateur `+`.
> * La fonction `isdecimal()` est appliquée sur les entiers positifs.

---

## 10. Les fonctions et les procédures prédéfinies sur les fichiers

### a. Les fichiers de données
| En algorithmique | En Python |
| :--- | :--- |
| `Ouvrir ("Chemin\Nom_physique", Nom_logique, "Mode")`<br>Modes : `"rb"`, `"wb"`, `"ab"` | `Nom_logique = open('Chemin\\Nom_physique', 'Mode')` |
| `Lire (Nom_logique, Objet)` | ```python<br>from pickle import load, dump<br>Objet = load (Nom_logique)<br>``` |
| `Ecrire (Nom_logique, Objet)` | ```python<br>from pickle import load, dump<br>dump (Objet, Nom_logique)<br>``` |
| `Fin_fichier (Nom_logique)` | ```python<br>Fin_fichier = False<br>while not (Fin_fichier) :<br>    try :<br>        x = load (Nom_logique)<br>    except :<br>        Fin_fichier = True<br>``` |
| `Fermer (Nom_logique)` | `Nom_logique.close ()` |

### b. Les fichiers textes
| En algorithmique | En Python |
| :--- | :--- |
| `Ouvrir ("Chemin\Nom_physique", Nom_logique, "Mode")`<br>Modes : `"r"`, `"w"`, `"a"` | `Nom_logique = open('Chemin\\Nom_physique', 'Mode')` |
| `Lire (Nom_logique, ch)` | `ch = Nom_logique.read()` |
| `Lire_ligne (Nom_logique, ch)` | `ch = Nom_logique.readline()` |
| `Ecrire (Nom_logique, ch)` | `Nom_logique.write(ch)` |
| `Ecrire_nl (Nom_logique, ch)` | `Nom_logique.write(ch + "\n")` |
| `Fin_fichier (Nom_logique)` | ```python<br>ch = Nom_logique.readline()<br>while ch != "" :<br>    Traitement<br>    ch = Nom_logique.readline()<br># N.B. : La fin d’un fichier texte est la chaîne vide ""<br>``` |
| `Fermer (Nom_logique)` | `Nom_logique.close ()` |

---

### ⚠️ Remarque Importante (Épreuves & Baccalauréat)
Lors de la résolution d’un problème, **il est fortement interdit d’utiliser d’autres fonctions ne figurant pas dans la liste des fonctions énumérées dans ce document**. Toutefois, les énoncés des épreuves pratiques du baccalauréat pourraient intégrer une nouvelle fonction. Dans ce cas, le rôle et la syntaxe de cette fonction seront détaillés dans l’énoncé de l’épreuve.
