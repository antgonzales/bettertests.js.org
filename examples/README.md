# examples

Every code block on bettertests.js.org is lifted from a test in `rules/` and
runs in CI. One file per rule, numbered in the order the rules appear on the
site.

```
src/       fixtures: transformData(), <SignUpForm />, <ProductPage />, factories
rules/     NN-slug.test.jsx, one per recommendation
scripts/   sync-markdown.mjs, copies marked regions into ../_recommendations
```

Each test file has two marked regions:

```js
// example:bad
// Problem: one or two lines on what is wrong with this version.
...tests that pass anyway...
// example:end

// example:good
...
// example:end
```

The matching Markdown file in `_recommendations/` has two marker pairs:

```md
<!-- example:bad rules/01-describe-the-object.test.jsx -->
```jsx
...
```
<!-- /example -->
```

Workflow:

```sh
npm install
npm test            # all rules, bad and good
npm run sync        # rewrite the Markdown blocks from the tests
npm run sync:check  # what CI runs; fails if Markdown and tests differ
```

Edit the test, not the Markdown. Imports and msw setup live outside the
marked regions so the site shows only the part that teaches the rule.
