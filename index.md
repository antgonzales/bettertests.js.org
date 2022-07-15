---
layout: default
image: /assets/img/better-tests-logo.png
---

<section class="intro">
  <h1>What is Better Tests?</h1>
  <p>Better Tests is a collection of Javascript testing best practices inspired by
  <a href="https://www.betterspecs.org/" target="_blank">BetterSpecs.org</a> to
  improve your coding skills and level up your test suite.</p>
  <p><em>Note:</em> These recommendations use <a href="https://jestjs.io/" target="_blank">Jest</a> syntax as the
  basis for testing Javascript. Make considerations when using a different framework.</p>
</section>

<section class="recommendations">
  {% for rec in site.recommendations %}
    {{ rec }}
  {% endfor %}
</section>
