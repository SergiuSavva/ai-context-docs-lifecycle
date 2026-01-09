# [Feature/Service] Runbook

> **Owner**: [Team/Person]  
> **Last Updated**: YYYY-MM-DD  
> **On-Call**: [Contact or rotation]

---

## Quick Reference

### Health Check

```bash
# Command to verify service/feature is healthy
curl https://api.example.com/health
```

### Key Metrics

| Metric | Normal | Warning | Critical |
|--------|--------|---------|----------|
| Response time | < 200ms | < 500ms | > 500ms |
| Error rate | < 1% | < 5% | > 5% |
| [Custom metric] | [Normal] | [Warning] | [Critical] |

### Dashboards

- [Monitoring Dashboard](https://...)
- [Logs](https://...)
- [Alerts](https://...)

---

## Common Issues

### Issue 1: [Description]

**Symptoms**:
- Symptom 1
- Symptom 2

**Likely Cause**: [Brief explanation]

**Resolution**:
1. Step 1
2. Step 2
3. Step 3

**Prevention**: [How to prevent recurrence]

---

### Issue 2: [Description]

**Symptoms**:
- Symptom 1

**Likely Cause**: [Brief explanation]

**Resolution**:
1. Step 1
2. Step 2

---

## Manual Operations

### Operation 1: [Name]

**When to use**: [Circumstances]

**Impact**: [What this affects]

**Steps**:
```bash
# Step 1: Description
command --flag

# Step 2: Description
another-command
```

**Verification**:
```bash
# Verify the operation succeeded
verification-command
```

---

### Operation 2: [Name]

**When to use**: [Circumstances]

**Steps**:
1. Step 1
2. Step 2

---

## Rollback Procedures

### Feature Flag Rollback

```bash
# Disable feature immediately
export FEATURE_X_ENABLED=false
# or
# Update feature flag in admin panel
```

### Code Rollback

```bash
# Identify last good commit
git log --oneline -10

# Revert to previous version
git revert HEAD
# or
# Deploy previous release tag
deploy --tag v1.2.3
```

### Database Rollback

**⚠️ Caution**: Database rollbacks may cause data loss.

```sql
-- Verify current state
SELECT * FROM table WHERE condition;

-- Rollback migration (if applicable)
-- npm run db:migrate:down
```

---

## Escalation

### Level 1: Self-Service
- Check this runbook
- Review recent deployments
- Check monitoring dashboards

### Level 2: Team
- Contact: [Team channel/email]
- Available: [Hours/timezone]

### Level 3: On-Call
- Contact: [On-call rotation/PagerDuty]
- Criteria: [When to escalate]

---

## Dependencies

| Service | Purpose | Failure Impact |
|---------|---------|----------------|
| [Database] | Data storage | Feature unavailable |
| [Auth Service] | Authentication | Users can't log in |
| [External API] | [Purpose] | [Degraded functionality] |

### Dependency Health Checks

```bash
# Check database
psql -c "SELECT 1"

# Check external API
curl https://external-api.com/health
```

---

## Useful Queries

### Query 1: [Description]

```sql
-- [What this shows]
SELECT column1, column2
FROM table
WHERE condition
ORDER BY created_at DESC
LIMIT 10;
```

### Query 2: [Description]

```sql
-- [What this shows]
SELECT COUNT(*) as count, status
FROM table
GROUP BY status;
```

---

## Maintenance Tasks

### Daily
- [ ] Check error rates
- [ ] Review alerts

### Weekly
- [ ] Review slow queries
- [ ] Check disk usage

### Monthly
- [ ] Update this runbook
- [ ] Review and archive old logs

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| YYYY-MM-DD | Created runbook | [Name] |
| YYYY-MM-DD | Added Issue 2 | [Name] |

---

<!-- 
RUNBOOK GUIDELINES:
- Keep procedures step-by-step and copy-pasteable
- Include verification steps after each action
- Update when new issues are discovered
- Review monthly for accuracy
-->

