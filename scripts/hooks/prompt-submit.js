#!/usr/bin/env node

/* UserPromptSubmit hook — re-injects non-negotiables before every prompt.
   Short and stable — must NOT bloat context. Cross-platform pure Node. */

const reminders = [
  '# Non-negotiables (re-injected per turn)',
  '',
  '1. **Branch first**: never commit on main/master. Husky will block.',
  '2. **Memory check**: before non-trivial tasks, `grep -rl "#<domain>" .claude/memory/`.',
  '3. **End-of-session**: write `.claude/memory/sessions/YYYY-MM-DD-HHMM.md` + run `pnpm memory:index` + output RELEASE CHECK.',
  '4. **Karpathy**: think before coding · simplicity first · surgical changes · goal-driven execution.',
  '5. **User mobilization**: when help is needed, use the `🧑 ACTION HUMAINE REQUISE` block (QUOI/POURQUOI/COMMENT/LIVRABLE).',
  '6. **Commit body**: feat/fix require WHY/WHAT/IMPACT/TEST in body (commit-msg hook warns if missing).',
];

const output = {
  hookSpecificOutput: {
    hookEventName: 'UserPromptSubmit',
    additionalContext: reminders.join('\n'),
  },
};

process.stdout.write(JSON.stringify(output));
