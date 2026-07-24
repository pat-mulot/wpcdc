# Utils

## Recalculer le classement des scores
depuis `public/` :
```bash
wp wpcdc recalc-ranks
```
Renumérote tous les posts `score` de 1 à N par ordre de `total_score`
décroissant. Sans risque, pas de suppression de données.
