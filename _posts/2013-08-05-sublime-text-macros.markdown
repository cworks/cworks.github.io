---
layout: post
title: "Sublime Text Macros"
date: 2013-08-05 10:47
comments: false
categories: [Sublime-Text]
---
I’m in love with Sublime Text, so much so that I’ve ditched IntelliJ for writing Java code and Vim for plain text editing. This little editor is feature packed but in a sleek lightweight implementation that runs across all platforms…this is a great benefit for me because I work across the big 3 OS’es but can concentrate on *one* editor (awesome).

One thing that has saved me from hours of repetitive cut-and-paste operations is it’s Macro capabilities.  Now I don’t find myself needing to create Macros very often but every now and then I’m faced with a problem where I actually consider writing code or a script to generate code…at which point I slump in my chair and say “really”.  That’s usually when I’m not thinking very Sublime but when I come to my senses I realize that Sublime Text Macros can bail me out, and in a very simple way.

For example, the other day I was faced with coding Hive table partitions and Sublime’s Macros helped me quickly generate the statements with little to no effort.  I needed to code the following line for each day of the year:

{% highlight sql %}
ALTER TABLE logs ADD PARTITION(day="2013-01-01") LOCATION '/user/hive/warehouse/log/day=2013-01-01';
{% endhighlight %}

So what I did was open up Excel, type “2013-01-01″ in the first cell, then select it and drag down until I reached the last day of 2013.  Then I formatted the whole column like “yyyy-mm-dd” and copied it straight into Sublime Text.  What I was left with is in the video below…it shows how I quickly Macro’d out my code with Sublime Text.  The whole task took me less that 2 minutes…now that’s Sublime!

{% vimeo 64362508 %}
