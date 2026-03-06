# /discover

Find extensions and MCP servers from the project registries.

## Arguments
$ARGUMENTS — Natural language description of what you need (e.g., "3D rendering", "payments", "animations", "database", "GitHub automation").

## Steps (follow this exact sequence)

1. **LOAD REGISTRIES** — Read both:
   - `registry/extensions.json` (npm packages for the project)
   - `registry/mcp-servers.json` (tools for Claude Code itself)

2. **MATCH EXTENSIONS** — Find relevant extensions:
   - Compare the user's description against each extension's `tags`, `name`, and `description`
   - Rank by relevance (exact tag match > partial name match > description match)
   - Select the top 1-3 matches

3. **MATCH MCP SERVERS** — Find relevant MCP servers:
   - Compare the user's description against each server's `when`, `name`, `description`, and `category`
   - Select the top 1-2 matches

4. **PRESENT** — Show results in two sections:

   ### 📦 Extensions (for your project)
   For each match:
   ```
   EXTENSION: [name]
   CATEGORY: [category]
   PACKAGES: [npm_packages joined with ", "]
   WHAT IT DOES: [description]
   SETUP: [numbered setup_instructions]
   DOCS: [references as clickable links]
   ```

   ### 🔌 MCP Servers (for Claude Code)
   For each match:
   ```
   SERVER: [name]
   CATEGORY: [category]
   WHAT IT DOES: [description]
   INSTALL: [install command]
   ENV VARS: [env list, or "none"]
   DOCS: [docs link]
   ```

   If no extensions match, don't show that section.
   If no MCP servers match, don't show that section.

5. **NO MATCH** — If nothing matches in either registry:
   - Say: "No matching extension or MCP server found in the registries."
   - Offer: "I can set this up manually following project conventions. Want me to proceed?"
   - If the user agrees, proceed with manual installation following `.claude/rules/` patterns

6. **INSTALL** — If the user picks an extension:
   - Confirm what will be installed
   - Run the `setup_instructions` step by step
   - Install npm packages
   - Create necessary files following project conventions
   - Add environment variables to `.env.example` and `src/config/env.ts` if needed
   - Run `pnpm validate`
   - Commit: `feat(<scope>): add <extension-name> integration`

7. **CONNECT** — If the user picks a MCP server:
   - Confirm what will be connected
   - Ask for required env vars if any
   - Run the install command
   - Verify with `claude mcp list`
   - Report success or failure

## Examples

```
User: /discover animations
→ 📦 Extensions: Motion (Framer Motion)

User: /discover "I want users to pay for stuff"
→ 📦 Extensions: Stripe Payments

User: /discover "I need a database"
→ 🔌 MCP Servers: PostgreSQL

User: /discover "browser testing"
→ 📦 Extensions: Playwright E2E
→ 🔌 MCP Servers: Playwright Browser

User: /discover "I want to implement a Figma design"
→ 🔌 MCP Servers: Figma
```
