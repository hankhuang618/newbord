# AGENTS.md

## Project mission
This repository is a migration project from a legacy single-file frontend (`19board.html`) into a Vue 3 modular architecture.

## Non-negotiable constraints
- Preserve all existing API endpoints exactly
- Preserve all existing business behavior exactly
- Preserve all existing features exactly
- Do not delete logic unless absolutely required for staged migration
- Prefer minimal-risk extraction over redesign

## Migration strategy
1. Identify major feature sections in the legacy file
2. Recreate them as separate Vue views/modules
3. Move API calls into service files
4. Move shared UI into reusable components
5. Move calculations and formatting into composables/utils
6. Keep behavior stable before optimizing structure

## Coding rules
- Use Vue 3
- Keep code readable and modular
- Do not introduce heavy dependencies unless necessary
- Keep naming consistent
- Preserve legacy semantics where possible
- Add comments where behavior is intentionally preserved from legacy code

## Required output
- Runnable Vue 3 project
- Clear folder structure
- README with startup steps
- Migration notes mapping old sections to new files
- TODO list for any partially migrated behavior

## Validation
Before considering work done:
- Ensure the project builds
- Ensure all core views exist
- Ensure API paths are unchanged
- Ensure no legacy feature is silently omitted
