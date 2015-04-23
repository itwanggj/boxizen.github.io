---
layout: category
title: 目录
permalink: /categories/
---

{% for category in site.categories %}
<h3 class="category-title">{{ category | first }}</h3>
<ul class="arc-list">
    {% for post in category.last %}
        <li>{{ post.date | date:"%Y/%m/%d"}}&nbsp;&nbsp;&nbsp;<a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>
{% endfor %}
