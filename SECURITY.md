# Security Policy

## Supported Versions

We currently support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it by emailing us directly instead of opening a public issue.

**Email**: admin@formular.dev

Please include the following information:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Assessment**: Within 1 week
- **Fix Release**: Within 2 weeks for critical issues

## Security Best Practices

When using this library:

1. Always keep dependencies up to date
2. Use `pnpm audit` regularly to check for vulnerabilities
3. Validate all user inputs
4. Use HTTPS in production
5. Follow secure coding practices

## Dependencies Security

We regularly audit our dependencies using:
- `pnpm audit`
- Automated dependency updates
- Manual security reviews

Run security checks:
```bash
npm run security:check
```

## Disclosure Policy

We follow responsible disclosure principles:
1. Report vulnerabilities privately first
2. Allow time for fixes before public disclosure
3. Credit researchers who report issues responsibly
