---
layout: default
---

<section class="intro">
  <h1>{{ site.title }}</h1>
  <p>{{ site.description }}</p>
  <p>Note: These recommendations use <a href="https://jestjs.io/" target="_blank">Jest</a> syntax as the
  basis for testing Javascript. Make considerations when using a different framework.</p>
</section>

<section class="recommendations">
  {% for rec in site.recommendations %}
    {{ rec }}
  {% endfor %}
</section>
