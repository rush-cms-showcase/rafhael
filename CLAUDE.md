# CODE GUIDELINES

## MANDATORY CODING STANDARDS - NEVER VIOLATE THESE:
1. **ALWAYS** use single quotes (') never double quotes. Exceptions: `src/components/ui/*`, `.json` and `.css` files
2. **ALWAYS** write everything in **ENGLISH**
3. **NEVER** add semicolons at the end of lines
4. **ALL** files must be kebab-case (`tech-detector.tsx`, not `TechDetector.tsx`)
5. **NO** inline comments, comments must be on their own line
6. In `ts` and `tsx` files **ALWAYS** use tab for indentation with size 4 (tab size = 4)
7. **NO** trailing commas in objects/arrays
8. Tailwind classes **ONLY**, no custom CSS **unless absolutely necessary**
9. **STRICT TYPE!** I want a strong typing code
10. **NEVER** create solo .md files in root (except `README.md`, `CONTRIBUTING.md`, `CODE_GUIDELINES.md`), use only  `./.ai` or  `./docs folder`
11. **MODERN** approach, bring insights if you feel necessary
12. Check package.json ßto see current packages versions
13. Commits are **ALWAYS** atomic and lowercase
14. **ALWAYS** use `pnpm` instead of `npm` or `yarn`

### Examples
```typescript
// ✅ CORRECT
const message = 'Hello World'
const config = {
	name: 'RafhaelWebsite',
	version: '1.0.0'
}

// ❌ WRONG
const message = "Hello World";  // Never use double quotes or semicolons
const config = {
    name: "NextStarter",  // Wrong: spaces instead of tabs
    version: "1.0.0", // No trailing comma
};
```

## EXCEPTIONS TO CODING STANDARDS:
- **`src/components/ui/*`** - These are shadcn/ui importable modules, DO NOT edit them
  - May use double quotes, different formatting
  - Keep them as imported from shadcn/ui

# PROJECT MANAGEMENT

## Organization Structure
Use `.ai/` directory:

```
.ai/
├── current-sprint.md    # Active sprint only
├── backlog.md           # Future tasks and ideas
├── context.md           # State between sessions
├── reports/             # Future tasks and ideas (files in date-file format)
├── notes/               # Quick thoughts, blockers, ideas (files in date-file format)
├── completed/           # Archived sprints (files in date-file format)
├── docs/                # Documentation about project (files in date-file format)
└── decisions/           # Architectural decisions (files in date-file format)

# Default date-file format: YYYY-MM-DD-{title}.md
```

## Strict Constraints
- **NO** functional components without `export function Name() {}` (No arrow functions for components)
- **NO** direct API calls in components (Use `src/lib/` wrappers)
- **NO** usage of `any` type (Strict TypeScript)

## Sprint Management

### Rules
- Work in `current-sprint.md` for active tasks
- Move completed sprints to `completed/YYYY-MM-DD.md`
- Use checkboxes `[ ]` for task tracking
- Record estimated vs actual time
- Future ideas go in `backlog.md`

### Sprint Format
```markdown
## Sprint #3 - Feature Name

**Started**: 2025-01-15 09:00
**Estimated**: 4 hours
**Status**: IN_PROGRESS / COMPLETED
**Priority**: High / Medium / Low

### Tasks
- [x] Task description [P1]
- [ ] Another task [P2]

### Dependencies
- Task B depends on: Task A

**Ended**: 2025-01-15 14:30
**Actual**: 5.5 hours

### Sprint Metrics
- **Velocity**: 2/4 tasks (50%)
- **Time Accuracy**: 5.5h / 4h = 137%
- **Blockers**: 0

**Notes**: Any important learnings
```

### Priority Levels
- **[P1]** Critical - Must complete this sprint
- **[P2]** High - Should complete this sprint
- **[P3]** Medium - Nice to have
- **[P4]** Low - Can move to backlog

---

## Definition of Done

Task complete when ALL checked:

### Code Quality
- [ ] Follows `CLAUDE.md`
- [ ] TypeScript: No `any` types
- [ ] No commented-out code
- [ ] No debug statements (`console.log`)
- [ ] Code formatted (Prettier/EditorConfig)

### Functionality
- [ ] Works as specified
- [ ] Edge cases handled
- [ ] User-friendly error messages
- [ ] Loading states implemented
- [ ] Responsive design

### Testing
- [ ] Tests written and passing
- [ ] Unit tests for business logic
- [ ] Feature tests for endpoints/pages
- [ ] Tests actually test the feature
- [ ] Browser tested manually (no console errors)

### Performance
- [ ] Optimized API calls (No duplicate requests)
- [ ] Images optimized
- [ ] Client bundles minimized
- [ ] Expensive operations cached/memoized
- [ ] Page load < 2s

### Security
- [ ] Input validated (frontend + backend)
- [ ] Authorization checks (policies/gates)
- [ ] No sensitive data in logs
- [ ] CSRF protection on forms
- [ ] XSS safety checked

### Documentation
- [ ] Complex logic has JSDoc
- [ ] Sprint file updated
- [ ] Architectural decisions recorded (if applicable)

---

## Context Management

### Before Clearing Context
**ALWAYS update these files**:

1. **`.ai/current-sprint.md`**
- Mark completed tasks `[x]`
- Add new tasks discovered
- Update time spent

2. **`.ai/context.md`**
```markdown
## Last Updated: [timestamp]

## Current State
- Working on: [specific feature/file]
- Last completed: [what finished]
- Next task: [where to continue]
- Current file: [path/to/file.tsx]

## Important Context
- [Decisions made]
- [Blockers encountered]
- [Dependencies to remember]

## Code in Progress
- [Exact function/component being edited]
- [Uncommitted logic or approach]
```

3. **Save work state**
- Ensure all files saved
- Note uncommitted changes in context.md

### After Clearing Context
Start new session with: "Follow session start protocol and continue development"

---

## File Templates

### `notes.md`
```markdown
## Blockers
- [ ] [2025-01-15] Database issue - Status: Investigating

## Decisions Pending
- [ ] [2025-01-15] Choose Redis vs Memcached
- [ ] [2025-01-16] API versioning strategy

## Ideas for Future
- [2025-01-15] Real-time notifications
- [2025-01-16] Bulk operations for users

## Technical Debt
- Refactor auth middleware
- Optimize Reports module queries
```

### `decisions.md`
```markdown
## [2025-01-15] - Decision Title

**Context**: Brief context

**Decision**: What we decided

**Consequences**:
- Pro: Benefit
- Con: Trade-off

**Alternatives Considered**:
- Option A (rejected: reason)
- Option B (rejected: reason)

**Status**: Implemented / In Progress / Deferred
```

### `backlog.md`
```markdown
## High Priority
- [ ] Feature name [Est: 6h]
- [ ] Another feature [Est: 4h]

## Medium Priority
- [ ] Nice to have [Est: 3h]

## Low Priority / Ideas
- [ ] Future enhancement [Est: 8h]

## Future Ideas (Not Estimated)
- Description of potential feature
```

## 🚀 Verification Protocol

Before declaring a task complete or deploying, YOU MUST RUN:

### 1. Code Quality & Safety
- [ ] **Type Check**: `npx astro check` (Must pass with 0 errors)
- [ ] **Linting**: Verify no lint errors
- [ ] **Security Audit**: `pnpm audit` (Report critical vulnerabilities)

### 2. Build Verification
- [ ] **Production Build**: `pnpm build` (Must succeed)
- [ ] **Console check**: Verify no console errors in browser terminal (if applicable)

### 3. Documentation Update (The "Memory" Phase)
- [ ] **Update Plan**: Mark completed steps in `task.md` or `.ai/current-sprint.md`
- [ ] **Log Changes**: Update `.ai/context.md` with new architectural details
- [ ] **Generate Report**: Create a walkthrough artifact or entry in `.ai/reports/` if the task was significant