#!/bin/bash

# Zync Install Script
# Usage: curl -f https://raw.githubusercontent.com/gajendraxdev/zync-website/main/public/install.sh | sh

set -e

REPO="gajendraxdev/zync"
APP_NAME="Zync"
BIN_DIR="$HOME/.local/bin"
APP_DIR="$HOME/.local/share/zync"
DESKTOP_DIR="$HOME/.local/share/applications"
ICON_DIR="$HOME/.local/share/icons/hicolor/512x512/apps"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}⚡ Installing ${APP_NAME} (AppImage)...${NC}"

# 1. Detect Architecture
ARCH=$(uname -m)
if [ "$ARCH" = "x86_64" ]; then
    echo "   Detected Architecture: x64"
elif [ "$ARCH" = "aarch64" ]; then
    echo "ARM64 builds are coming soon!"
    exit 1
else
    echo "Unsupported architecture: $ARCH"
    exit 1
fi

# 2. Find Latest AppImage Release from GitHub Releases
echo "   Fetching latest release from GitHub..."

# Get the full API response with timeout
API_RESPONSE=$(curl -sL --max-time 10 "https://api.github.com/repos/$REPO/releases/latest" 2>/dev/null)

# Check if API call was successful
if [ -z "$API_RESPONSE" ] || [ "$API_RESPONSE" = "null" ]; then
    echo "   Error: Failed to fetch release data from GitHub API"
    echo "   Please check your internet connection or try again later."
    exit 1
fi

# Simple extraction - find lines with browser_download_url and extract the URL
# This uses a simpler approach that's more reliable across different grep versions
LATEST_URL=$(echo "$API_RESPONSE" | tr -d '\n' | grep -o '"browser_download_url":"[^"]*\.AppImage"' | grep -o 'https://[^"]*' | head -n 1)

# Debug: Show what we found
if [ -n "$LATEST_URL" ]; then
    FILENAME=$(basename "$LATEST_URL")
    echo "   Found: $FILENAME"
else
    # Fallback: try a different extraction method
    LATEST_URL=$(echo "$API_RESPONSE" | grep -o 'https://github.com/[^"]*\.AppImage' | head -n 1)
    
    if [ -n "$LATEST_URL" ]; then
        FILENAME=$(basename "$LATEST_URL")
        echo "   Found (via fallback): $FILENAME"
    fi
fi

if [ -z "$LATEST_URL" ]; then
    echo ""
    echo "   Error: Could not find .AppImage in latest release"
    echo "   Debug: Showing raw API response snippet..."
    echo "$API_RESPONSE" | head -50
    echo ""
    exit 1
fi

echo "   Downloading from: $LATEST_URL"

# 3. Prepare Directories
mkdir -p "$BIN_DIR"
mkdir -p "$DESKTOP_DIR"
mkdir -p "$APP_DIR"
mkdir -p "$ICON_DIR"

# 4. Download AppImage
APPIMAGE_PATH="$APP_DIR/Zync.AppImage"
curl -L "$LATEST_URL" -o "$APPIMAGE_PATH"

# 5. Make Executable
chmod +x "$APPIMAGE_PATH"
echo "   Made executable: $APPIMAGE_PATH"

# 6. Create Symlink
ln -sf "$APPIMAGE_PATH" "$BIN_DIR/zync"

# 7. Download Icon to System Theme
# Using src-tauri/icons/icon.png from main branch (High-Res 512x512)
ICON_URL="https://raw.githubusercontent.com/gajendraxdev/zync/main/src-tauri/icons/icon.png"
curl -s -L "$ICON_URL" -o "$ICON_DIR/zync.png" || echo "   Warning: Could not fetch icon."

# 8. Create Desktop Entry
# Remove old/conflicting entries
rm -f "$DESKTOP_DIR/Zync.desktop"

cat > "$DESKTOP_DIR/zync.desktop" <<EOF
[Desktop Entry]
Name=$APP_NAME
Exec=$APPIMAGE_PATH %U
Icon=zync
Type=Application
Categories=Development;Utility;
Terminal=false
StartupWMClass=zync
EOF

# 9. Integrate with System
# Update desktop database
if command -v update-desktop-database >/dev/null 2>&1; then
    update-desktop-database "$DESKTOP_DIR"
fi

# Update icon cache (Crucial for Icon=zync to work)
if command -v gtk-update-icon-cache >/dev/null 2>&1; then
    gtk-update-icon-cache -f -t "$HOME/.local/share/icons/hicolor"
fi

echo -e "${GREEN}✔ Successfully installed $APP_NAME${NC}"
echo -e "   Location: $APPIMAGE_PATH"
echo -e "   Symlink:  $BIN_DIR/zync"
echo -e "   You can now run: ${GREEN}zync${NC}"