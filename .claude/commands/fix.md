# /fix

Systematically diagnose and fix a bug.

## Arguments
$ARGUMENTS — Description of the bug, error message, or unexpected behavior.

## Steps

1. Invoke the debugger agent workflow (see .claude/agents/debugger.md)
   Pass the user's $ARGUMENTS as the bug description.

2. The debugger agent handles: REPRODUCE → SEARCH → ISOLATE → ROOT CAUSE → FIX → PROVE → VALIDATE → COMMIT

3. If the debugger agent asks a question, relay it to the user.

## Rules
- This command is a shortcut to the debugger agent
- All debug logic lives in .claude/agents/debugger.md — don't duplicate it here
- If you need to change the debug process, change the agent, not this command
