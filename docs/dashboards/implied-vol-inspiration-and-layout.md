# Dashboard IV SPY — inspiration marché & pistes de layout Overview

Document de référence (forme + idées quant). Dernière mise à jour : 2026-08-30.

## Principes de forme (Overview)

- **Éviter** la grille 2×2 symétrique (quatre panneaux égaux) — lecture « dashboard générique », pas « desk vol ».
- **Surface / heatmap = héros** : zone de tracé **carrée** (`aspect-ratio: 1 / 1` sur le canvas IV, pas sur la carte entière).
- **Légende couleur** : en dehors du carré de tracé (bandeau vertical à droite du plot, ou barre horizontale sous le carré). Si la légende est intégrée au bloc mesuré, le **conteneur** peut être un rectangle ; le **plot** reste carré.
- **Hiérarchie** : une vue dominante (carte surface) + vues **satellites** (smile, terme, KPIs) plus petites et liées à la sélection (expiry / moneyness).
- **Inspiration UX** : parcours [VolStream](https://volstream-production.up.railway.app/) — *surface map → shape lab → pin* ; pas quatre fenêtres interchangeable.

---

## Inspiration produits (contenu / quant — pour plus tard)

| Source | Idée pertinente | Priorité pour nous |
|--------|-----------------|-------------------|
| [VolStream](https://volstream-production.up.railway.app/) | Heatmap héros, 3D lab, contrat épinglé pilote skew/term | **P0 UX** |
| [FlashAlpha IV Surface](https://flashalpha.com/tools/vol-surface) | Heatmap **IV marché − IV SVI** (résidus) | P1 quant |
| [ORATS Ticker Analysis](https://orats.com/ticker-analysis) | Calls/puts mid sur skew lissée ; IV vs HV | P1 quant |
| [ORATS Trade Builder](https://orats.com/blog/overlay-the-volatility-surface-on-future-expirations-in-the-trade-builder) | Bandes expected move 68 % / 95 % | P2 |
| [SpotGamma Vol Dashboard](https://spotgamma.com/volatility-dashboard-lp/) | Matrice strike×expiry en **Z-score** (60 j) | P2 (historique snapshots) |
| [ApexVol](https://apexvol.com/learn/volatility-surface) | Surface **implied vs forecast** | P2 pédagogie |
| [MiniKetch/vol-surface](https://github.com/miniketch/vol-surface) | RR/BF 25Δ/10Δ, scanner mispricing, realized vs IV | P1 open source |
| [Lavender Terminal](https://terminal.lavender-ts.com/) | Vues synchronisées + matrice spot×vol | P3 |

### Idées quant retenues (non layout)

1. **Résidu SSVI** — deuxième mode heatmap ou toggle (FlashAlpha / ORATS S%).
2. **Pin contrat** — sélection persistante qui recoupe smile + terme (VolStream).
3. **Historique** — snapshots datés → Z-score / IV rank sur la heatmap (SpotGamma).

---

## État actuel (Overview)

Grille `md:grid-cols-2 md:grid-rows-2` — quatre `DashboardPanel` de taille égale :

1. Smile (compact)  
2. Terme (compact)  
3. Surface / heatmap (compact, non carré)  
4. Stats (grille 2×2 de KPIs)

Fichier : `src/components/dashboards/ImpliedVolOverviewPanel.tsx`.

---

## Propositions de layout Overview

Légende : `[■]` = zone de tracé **carrée** ; `[▮]` = légende couleur hors carré ; `~` = panneau satellite.

### Schéma A — « Desk VolStream » (recommandé)

Surface héros à gauche ; colonne droite = terme + smile empilés ; KPIs en bandeau fin.

```
┌─────────────────────────────────────────────────────────────────┐
│  KPI strip : SPY · spot · ATM IV · skew · # expiries · badge   │
├───────────────────────────────┬─────────────────────────────────┤
│                               │  Terme ATM (bande horiz. ~25%)  │
│   [■ heatmap carrée    ][▮]   ├─────────────────────────────────┤
│   [■ surface IV        ][▮]   │  Smile expiry sel. (~35%)       │
│   [■                   ][▮]   │                                 │
│                               │                                 │
│  hint · clic → onglet Surface │  hint · clic → Smile / Term     │
└───────────────────────────────┴─────────────────────────────────┘
        ~62% largeur                      ~38%
```

- **Ratio desktop** : ~5/8 surface, 3/8 colonne satellites (ou `grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr)`).
- **Carré** : `aspect-ratio: 1/1` sur le wrapper du heatmap seul ; légende en `flex row` à droite du carré.
- **Mobile** : stack vertical — carré surface pleine largeur, puis terme, smile, KPIs.

---

### Schéma B — « Bandeau + carré centré »

Stats en haut ; surface carrée centrée (max `min(100vw, 70vh)` côté) ; smile et terme en **bandes** asymétriques sous le carré.

```
┌─────────────────────────────────────────────────────────────────┐
│  KPI strip (horizontal, chips)                                  │
├─────────────────────────────────────────────────────────────────┤
│              ┌─────────────────────┐                            │
│              │ [■ heatmap ][▮]     │  ← carré centré            │
│              └─────────────────────┘                            │
├──────────────────────────────┬──────────────────────────────────┤
│  Smile (~60% largeur)        │  Terme (~40%)                    │
└──────────────────────────────┴──────────────────────────────────┘
```

- Moins dense que A ; met la surface au centre visuel (posters / screenshots).
- Smile plus large que terme (la courbe strike est plus lisible en paysage).

---

### Schéma C — « L-Shape bento »

Grille CSS asymétrique type « bento » ; pas de symétrie 2×2.

```
┌──────────────────────────────┬──────────────┐
│                              │   Terme      │
│  [■ surface carrée    ][▮]   │   (étroit)   │
│                              ├──────────────┤
│                              │   Smile      │
├──────────────────────────────┴──────────────┤
│  Stats + disclaimer (bande basse, 1 ligne) │
└─────────────────────────────────────────────┘
```

- `grid-template-areas` :
  - `"surface surface term"`
  - `"surface surface smile"`
  - `"stats stats stats"`
- Surface occupe **2 lignes × 2 colonnes logiques** ; satellites à droite.

---

### Schéma D — « Slices synchronisés » (VolStream avancé)

Une heatmap carrée ; à droite, **deux mini-graphiques** dont les axes sont **couplés** à la crosshair heatmap (DTE fixe → smile ; moneyness fixe → slice terme).

```
┌──────────────────────────────┬─────────────────────────────────┐
│  [■ heatmap + crosshair][▮]  │  Smile @ DTE sélectionné        │
│                              ├─────────────────────────────────┤
│                              │  Terme @ moneyness sélectionné  │
│                              │  (ou ATM seulement en v1)       │
└──────────────────────────────┴─────────────────────────────────┘
```

- v1 : crosshair sur heatmap met à jour smile (DTE) et surligne point terme.
- v2 : second slice terme par moneyness (nécessite interpolation).

---

## Règles d’implémentation du carré surface

```tsx
// Plot carré, légende à part
<div className="flex min-h-0 items-stretch gap-2">
  <div className="aspect-square min-h-0 w-full max-w-full flex-1 basis-0">
    <ImpliedVolHeatmap … square />
  </div>
  <div className="w-8 shrink-0">{/* color scale */}</div>
</div>
```

- Ne pas mettre `aspect-square` sur le `DashboardPanel` entier (titre + hint inclus).
- Option **overview** : heatmap 2D seulement (pas 3D) ; onglet Surface garde le lab 3D.
- **Cible min** : côté carré ≥ 280 px desktop, ≥ 100vw−padding mobile.

---

## Décision à trancher

| Option | Forces | Faiblesses |
|--------|--------|------------|
| **A Desk VolStream** | Proche des refs marché, dense, surface domine | Colonne droite serrée sur petits laptops |
| **B Centré** | Très lisible, beau en capture | Perte de pixels utiles sur ultrawide |
| **C Bento L** | Moderne, claire hiérarchie | Grille CSS plus fragile au responsive |
| **D Slices sync** | Maximum de lien cross-vues | Plus de state / dev |

**Statut** : schéma A implémenté dans `ImpliedVolOverviewPanel.tsx` (2026-08-30).
