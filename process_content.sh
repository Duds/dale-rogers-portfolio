#!/bin/bash

# Process work files (case studies)
for file in TEMP_MARKDOWN_FILES/work_*.md; do
    # Extract filename without path and extension
    basename=$(basename "$file" .md)
    # Remove work_ prefix
    name=${basename#work_}
    # Convert to kebab case
    kebab_name=$(echo "$name" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/-$//')
    # Create target file path
    target="src/content/case-studies/$kebab_name.mdx"
    echo "Processing case study: $file -> $target"
done

# Process think files (articles)
for file in TEMP_MARKDOWN_FILES/think_*.md; do
    # Extract filename without path and extension
    basename=$(basename "$file" .md)
    # Remove think_ prefix
    name=${basename#think_}
    # Convert to kebab case
    kebab_name=$(echo "$name" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/-$//')
    # Create target file path
    target="src/content/articles/$kebab_name.mdx"
    echo "Processing article: $file -> $target"
done
