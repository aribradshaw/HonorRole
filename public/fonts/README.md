# Font Files

If you have the actual font files for the Honor Role brand, please add them here:

## Required Fonts:

1. **Helvetica Neue Extended** - For body text
   - Files: `HelveticaNeueExtended.woff2`, `HelveticaNeueExtended.woff`
   - Used for: All body text and general copy

2. **Neue Haas Grotesk** (or Neue Haas) - For "Honor" in logo
   - Files: `NeueHaasGrotesk.woff2`, `NeueHaasGrotesk.woff`
   - Used for: "Honor" text in logo/header

3. **Division** - Base for "Role" (custom R)
   - Note: The "R" in "Role" is completely custom, so the full Division font won't match exactly
   - Files: `Division.woff2`, `Division.woff` (if available)
   - Used for: "Role" text in logo/header

## Current Setup:

The website is currently configured to use system fonts with proper fallbacks:
- **Body text**: Helvetica Neue Extended → Helvetica Neue → Helvetica → Arial
- **Logo "Honor"**: Neue Haas Grotesk → Neue Haas → Helvetica Neue
- **Logo "Role"**: Division → Helvetica Neue

If you add the font files to this directory, uncomment the `@font-face` declarations in `app/globals.css` to load them.
