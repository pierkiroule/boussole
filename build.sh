#!/bin/bash

# Script de build pour Vercel avec gestion de version
echo "🚀 Building application with version management..."

# Générer une version unique basée sur la date et l'heure
BUILD_VERSION="1.0.0-$(date +%Y%m%d-%H%M%S)"
echo "📦 Build version: $BUILD_VERSION"

# Exporter la version pour le build
export BUILD_VERSION

# Exécuter le build Vite
npm run build

# Vérifier que le build a réussi
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "🔧 Version $BUILD_VERSION deployed"
else
    echo "❌ Build failed!"
    exit 1
fi