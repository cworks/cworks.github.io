---
layout: post
title: "fluent programming"
date: 2014-04-17 10:19:17 -0500
comments: false
categories: [Java, Design-Patterns]
---
### Fluent - able to express oneself easily and articulately

For years I've written, reviewed and rewritten code that was by and large disjointed, although simple to follow in most cases...still disjointed because my style of developing was muffled by a mass of "getters" and "setters" and methods with high cohesion.  Not to mention my classes generally came "without instructions" and callers were left to assemble the proper usage pattern by trial and error, lead down the wrong path because my code was fluent-less.  Sometimes code is what it is, you control who uses it and you can afford a crude implementation but when writing client libraries, public classes or complex logic, careful attention to the "fluidness" of its use can make all the difference.

One of the best implementation of a fluent design that I've come across is [JOOQ - Java Object Oriented Querying](http://www.jooq.org/).  It highlights the fact that to be "fluent" you need to be "fluent" in something (i.e. you need a language).  That "language" is confined to a "domain" so that you manage the breadth of the required vocabulary.  JOOQ works in the domain of databases and speaks the language of SQL in Java form and does so in a very "fluent" manner.

Let's take a look at what "fluent" looks like from the callers perspective.

{% highlight java %}

	Select<?> select = dsl.select(HITTING.YEAR,
		PLAYER.FIRST_NAME, PLAYER.LAST_NAME,
		HITTING.AVG, HITTING.HR)
		.from(PLAYER)
		.join(HITTING).on(PLAYER.PLAYER_ID.equal(HITTING.PLAYER_ID))
		.where(HITTING.YEAR.equal("2013"))
		.and(HITTING.AVERAGE.greaterThan(300))
		.orderBy(HITTING.YEAR.desc(), HITTING.AVG.desc(), HITTING.HR.desc())
		.limit(100)
	select.fetch();

{% endhighlight %}

###Notice several things about this code:

####The "language" (of SQL) is baked right into the API
This is where you need to know your domain and how to develop a language specific to it such that its easy to use and eloquent.  Many things fall right into this model quite naturally, consider a domain such as Virtual Machines, Protocols, Gaming and my fav Unit Testing!

####Cascading method calls as a guide
This idiom works wonders for making a public interface that flows and assists the caller in using your code.  Consider an alternative approach below.  The volume of code is about the same but this implementation loses clarity and enables misuse.  The "query" instance is set after the "createSelect" method call and although it may be a subclass or implementation of an interface, the reference is set...the point: its all we have to work with.  It likely has lots of methods (especially for SQL domain) and nothing guides the caller in making choices on what to call next, this is a trial and error situation.  Compared with the first example that literally guides the caller, this one is troublesome.  In the "fluent" example the object being dereferenced is unknown but tailored to the context which sets up what can be invoked next.

{% highlight java %}

	Select query = dsl.createSelect(HITTING.YEAY);
	query.setFrom(PLAYER);
	query.setJoin(new Join(HITTING.PLAYER_ID, PLAYER.PLAYER_ID));
	query.setWhere(HITTING.YEAR, Op.equal, "2013");
	query.setAnd(HITTING.AVERAGE, Op.greaterThan, 300);
	query.addOrderBy(HITTING.YEAR, Order.desc);
	query.addOrderBy(HITTING.AVG, Order.desc);
	query.addOrderBy(HITTING.HR, Order.desc);
	query.setLimit(100);
	query.fetch();

{% endhighlight %}

####Its an implementation of the Builder Pattern
At its core the "fluent" style is an implementation of the [Builder Pattern](http://en.wikipedia.org/wiki/Builder_pattern) which if you've ever tried to employ can be a challenging to do with a small amount of code.  The Builder Pattern requires a commitment but may be well worth the effort depending on what you're developing.

All in all I *love* this idiom and I look for opportunities to employ it, especially when I'm designing client libraries.  Do yourself a favor and read a much better blog post on this by [Martin Fowler](http://martinfowler.com/bliki/FluentInterface.html). Try this pattern out for yourself, its a different way of coding in Java and offers a lot of learning opportunities.
