# MCP Awareness

## When to recommend MCP servers

When the user asks for something that would benefit from an external tool
(database access, GitHub automation, design implementation, monitoring, etc.),
check `registry/mcp-servers.json` for a matching MCP server.

## How to recommend

Format:
```
💡 There's a MCP server for that: **[name]**
[description]

Install: `[install command]`
[env vars needed, if any]

Want me to set it up?
```

## When NOT to recommend

- If the task can be done without an MCP server (don't over-suggest)
- If the user already has the MCP server installed (check with `claude mcp list`)
- If the user explicitly said they don't want MCP servers
- Don't recommend more than ONE server per response
- Don't recommend "priority: recommended" servers unsolicited — only when relevant

## Checking installed servers

Before recommending, check what's already installed:
```bash
claude mcp list
```
If the server is already there, use it directly instead of suggesting installation.

## Integration with /discover

When the user runs /discover or asks "what tools exist for X":
1. Search registry/extensions.json (npm packages for the project)
2. Search registry/mcp-servers.json (tools for Claude Code itself)
3. Present both categories clearly:
   - "📦 Extensions (install in your project): ..."
   - "🔌 MCP Servers (connect to Claude Code): ..."
