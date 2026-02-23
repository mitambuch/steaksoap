# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| latest  | :white_check_mark: |
| < latest | :x:               |

Only the latest release is actively supported with security updates.

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly.

**Do NOT open a public issue.**

Instead, send an email to the project maintainer or use [GitHub's private vulnerability reporting](https://github.com/mitambuch/steaksoap/security/advisories/new).

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

This policy applies to the steaksoap template repository and its default configuration. Vulnerabilities in user-customized projects derived from steaksoap are the responsibility of the project owner.

## Best Practices

steaksoap follows these security practices:

- No secrets in code — environment variables only (`.env`)
- Dependencies are audited before installation
- Minimal dependency footprint (5 production deps)
- Automated linting catches common security issues
- `pnpm audit` is recommended as part of regular maintenance
