#!/bin/bash

# ============================================================
#  build.sh — Script de déploiement GitHub Pages
#  Projet : latelierdusavoir
#  Usage  : bash build.sh
# ============================================================

set -e  # Arrête le script si une commande échoue

# ──────────────────────────────────────────────
# CONFIG
# ──────────────────────────────────────────────
DIST_DIR="docs"
FOLDERS=("public" "pages" "scripts" "styles")

# ──────────────────────────────────────────────
# COULEURS
# ──────────────────────────────────────────────
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

log()   { echo -e "${GREEN}[BUILD]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

# ──────────────────────────────────────────────
# VÉRIFICATION DE L'EXISTENCE DU FICHIER INDEX.HTML
# ──────────────────────────────────────────────
if [ ! -f "index.html" ]; then
  error "index.html introuvable. Lance ce script depuis la racine du projet."
fi

# ──────────────────────────────────────────────
# NETTOYAGE ET COPIE DES FICHIERS
# ──────────────────────────────────────────────
log "Nettoyage de $DIST_DIR/..."
rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"

log "Copie de index.html..."
cp index.html "$DIST_DIR/index.html"

for folder in "${FOLDERS[@]}"; do
  if [ -d "$folder" ]; then
    log "Copie de $folder/..."
    cp -r "$folder" "$DIST_DIR/$folder"
  else
    echo "  ⚠️  Dossier '$folder' introuvable, ignoré."
  fi
done

# ──────────────────────────────────────────────
# CNAME (domaine personnalisé GitHub Pages)
# ──────────────────────────────────────────────
log "Création du fichier CNAME..."
echo "latelierdusavoir.com" > "$DIST_DIR/CNAME"

# ──────────────────────────────────────────────
# RÉSUMÉ
# ──────────────────────────────────────────────
TOTAL_FILES=$(find "$DIST_DIR" -type f | wc -l | tr -d ' ')
TOTAL_SIZE=$(du -sh "$DIST_DIR" | cut -f1)

echo ""
echo -e "${GREEN}✅ Build terminé — $TOTAL_FILES fichiers copiés ($TOTAL_SIZE) dans $DIST_DIR/${NC}"
echo ""