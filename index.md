---
layout: default
image: /assets/img/better-tests-logo.png
---

<section class="intro">
  <h1>What is Better Tests?</h1>
  <p>Better Tests is a collection of Javascript testing best practices inspired by
  <a href="https://www.betterspecs.org/" target="_blank">BetterSpecs.org</a> to
  improve your coding skills and level up your test suite.</p>
  <p><em>Note:</em> The examples use <a href="https://vitest.dev/" target="_blank">Vitest</a>
  and <a href="https://testing-library.com/" target="_blank">Testing Library</a>. They run
  unchanged in <a href="https://jestjs.io/" target="_blank">Jest</a> except where a block says
  otherwise (<code>vi</code> becomes <code>jest</code>). Every code block below is lifted from a
  test that runs in CI; see <a href="{{ site.repository_url }}/tree/master/examples" target="_blank">examples/</a>.</p>
</section>

<section class="recommendations">
  {% for rec in site.recommendations %}
    {{ rec }}
  {% endfor %}
</section>
