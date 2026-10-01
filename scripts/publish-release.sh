#!/usr/bin/env bash
set -euo pipefail

echo "=========================================================="
echo "📦 FORMULAR RELEASE & NPM PUBLISH PIPELINE"
echo "=========================================================="

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${ROOT_DIR}"

VERSION=$(node -p "require('./package.json').version")
PACKAGE_NAME=$(node -p "require('./package.json').name")
TARBALL="${ROOT_DIR}/binaryjack-formular.dev-${VERSION}.tgz"

echo "Package: ${PACKAGE_NAME}"
echo "Version: ${VERSION}"

echo "Step 1: Running clean production build..."
pnpm run build

echo "Step 2: Running test suite..."
pnpm test

echo "Step 3: Packaging tarball..."
pnpm pack

echo "Step 4: Calculating SHA-256 Checksum..."
SHA256=$(sha256sum "${TARBALL}" | cut -d ' ' -f 1)
echo "SHA-256: ${SHA256}"

echo "Step 5: Verifying NPM registry authentication..."
if npm whoami &>/dev/null; then
    CURRENT_USER=$(npm whoami)
    echo "Authenticated as: ${CURRENT_USER}"
    echo "Publishing to NPM..."
    npm publish --access public
    echo "✅ Published ${PACKAGE_NAME}@${VERSION} to NPM successfully!"
else
    echo "⚠️ NPM Authentication: Not logged in or token expired (401 Unauthorized)."
    echo "💡 To publish to NPM, run: npm login && npm publish --access public"
    echo "✅ Tarball successfully generated and ready at:"
    echo "   ${TARBALL}"
fi

echo "=========================================================="
echo "🎉 Release packaging complete!"
echo "=========================================================="
