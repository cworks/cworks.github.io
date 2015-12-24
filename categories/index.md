---
layout: page
title: Categories
footer: false
---
<div>
  {% assign tags_list = site.categories | sort %}  
    {% if tags_list.first[0] == null %}
      {% for tag in tags_list %}
          <article>
            <h2><a href="{{root.url}}/categories/{{ tag }}">{{ tag | capitalize }} <span>({{ site.tags[tag].size }})</span></a></h2>
          </article>
      {% endfor %}
    {% else %}
      {% for tag in tags_list %}
          <article>
            <h2><a href="{{root.url}}/categories/{{ tag[0] }}">{{ tag[0] | capitalize }} <span>({{ tag[1].size }})</span></a></h2>
          </article>
      {% endfor %}
    {% endif %}
  {% assign tags_list = nil %}
</div>
