# Security Policy

## Supported Versions

| Version  | Supported |
| -------- | --------- |
| latest   | Yes       |
| < latest | No        |

Only the latest release is actively supported with security updates.

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly.

**Do NOT open a public issue.**

Use GitHub's private vulnerability reporting feature for this repository.

### What to include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response timeline

- **Acknowledgment**: within 48 hours
- **Initial assessment**: within 1 week
- **Fix or mitigation**: as soon as possible, depending on severity

## Scope

This project is a client-side React application. It does not handle:

- Authentication or user data
- Server-side processing
- Database connections
- Payment processing

The main security surface is:

- **Dependencies**: monitored by Dependabot, dependency review on PRs, and `pnpm audit` in CI
- **Build tooling**: Vite dev server (local only, not for production hosting)
- **Environment variables**: client-side only, no secrets should be in `VITE_*` vars

This policy applies to this repository and its default configuration.

## Best Practices for Users

- Never put secrets in `VITE_*` environment variables (they are embedded in the build)
- Review dependencies before adding them (`/discover` checks the curated registry first)
- Keep dependencies updated (`/update-deps` or Dependabot)
- Run `pnpm validate` before every merge
- Run `pnpm audit` as part of regular maintenance
