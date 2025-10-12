#!/bin/bash
# convert-to-australian-english.sh
# Converts American English to Australian English across all content files

echo "=================================================="
echo "Australian English Conversion Script"
echo "=================================================="
echo ""

# Create backup
BACKUP_DIR="src/content.backup-$(date +%Y%m%d-%H%M%S)"
echo "Creating backup at: $BACKUP_DIR"
cp -r src/content "$BACKUP_DIR"
echo "✅ Backup created"
echo ""

# Counter for changes
TOTAL_CHANGES=0

# Find all content files and apply replacements
echo "Converting to Australian English..."
echo ""

find src/content -type f \( -name "*.mdx" -o -name "*.md" \) | while IFS= read -r file; do
  # Skip backup directories
  if [[ $file == *"backup"* ]]; then
    continue
  fi

  # Create a temporary file for comparison
  TEMP_FILE="${file}.temp"
  cp "$file" "$TEMP_FILE"

  # Apply replacements (macOS sed requires '' after -i)
  sed -i '' \
    -e 's/\borganizations\b/organisations/g' \
    -e 's/\borganization\b/organisation/g' \
    -e 's/\borganize\b/organise/g' \
    -e 's/\borganized\b/organised/g' \
    -e 's/\borganizing\b/organising/g' \
    -e 's/\bspecializes\b/specialises/g' \
    -e 's/\bspecialize\b/specialise/g' \
    -e 's/\bspecialized\b/specialised/g' \
    -e 's/\bspecializing\b/specialising/g' \
    -e 's/\brealized\b/realised/g' \
    -e 's/\brealize\b/realise/g' \
    -e 's/\brealizes\b/realises/g' \
    -e 's/\brealizing\b/realising/g' \
    -e 's/\bcenters\b/centres/g' \
    -e 's/\bcentered\b/centred/g' \
    -e 's/\bcentering\b/centring/g' \
    -e 's/\bbehaviors\b/behaviours/g' \
    -e 's/\bbehavior\b/behaviour/g' \
    -e 's/\bbehavioral\b/behavioural/g' \
    -e 's/\brecognize\b/recognise/g' \
    -e 's/\brecognized\b/recognised/g' \
    -e 's/\brecognizing\b/recognising/g' \
    -e 's/\brecognizes\b/recognises/g' \
    -e 's/\banalyze\b/analyse/g' \
    -e 's/\banalyzed\b/analysed/g' \
    -e 's/\banalyzing\b/analysing/g' \
    -e 's/\banalyzes\b/analyses/g' \
    -e 's/\blabor\b/labour/g' \
    -e 's/\blabors\b/labours/g' \
    -e 's/\bfavor\b/favour/g' \
    -e 's/\bfavors\b/favours/g' \
    -e 's/\bfavored\b/favoured/g' \
    -e 's/\bhonor\b/honour/g' \
    -e 's/\bhonors\b/honours/g' \
    -e 's/\bhonored\b/honoured/g' \
    -e 's/\bmodeled\b/modelled/g' \
    -e 's/\bmodeling\b/modelling/g' \
    -e 's/\btraveled\b/travelled/g' \
    -e 's/\btraveling\b/travelling/g' \
    -e 's/\boptimize\b/optimise/g' \
    -e 's/\boptimized\b/optimised/g' \
    -e 's/\boptimizing\b/optimising/g' \
    -e 's/\bminimize\b/minimise/g' \
    -e 's/\bminimized\b/minimised/g' \
    -e 's/\bminimizing\b/minimising/g' \
    -e 's/\bmaximize\b/maximise/g' \
    -e 's/\bmaximized\b/maximised/g' \
    -e 's/\bmaximizing\b/maximising/g' \
    "$file"

  # Check if file was modified
  if ! diff "$TEMP_FILE" "$file" > /dev/null 2>&1; then
    echo "✅ Updated: $(basename "$file")"
    TOTAL_CHANGES=$((TOTAL_CHANGES + 1))
  fi

  # Clean up
  rm -f "$TEMP_FILE"
done

echo ""
echo "=================================================="
echo "Conversion Complete!"
echo "=================================================="
echo "Total files modified: $TOTAL_CHANGES"
echo "Backup location: $BACKUP_DIR"
echo ""
echo "Next steps:"
echo "1. Review changes: git diff src/content/"
echo "2. Test the site: pnpm run dev"
echo "3. Commit if satisfied: git add src/content && git commit"
echo ""
