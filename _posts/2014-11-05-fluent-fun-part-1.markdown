---
layout: post
title: "Fluent Fun Part 1"
date: 2014-11-05 22:00:27 -0600
comments: false
categories: [Java, Design-Patterns]
---

I've had this mild obsession with the fluent programming style for months now, its not going away which is weird, so I guess thats my intuition telling me theres something about it I feel is worthwhile enough to concentrate on, develop the concept more and apply it in practice.  One things for sure and thats the fluent style is much more readable than your standard command-query API and I think thats why I like it, because it reads as a sentence or small narrative, much more intuitive and easy to read, it presents code as a high level thought pattern much like we think as humans.  Simply put fluent programming is a more expressive and colorful way to code, so much so that its like simulated talking.

Lets put the fluent style to the test by considering a small problem.  Lets launch a reconnaissance rocket to the planet Melmac.  First some thought to what we need, Captain Obvious says you'll need a rocket, a satellite, guidance coordinates, propellant and ignition.  Using a tradition command-query approach one could:

{% highlight java %}
Satellite sat = new Satellite();
sat.setCamera(new HDCamera());
Rocket rocket = new Rocket();
rocket.setCargo(sat);
rocket.setCoordinates(-100, 30, 54);
rocket.setPropellant(new LiquidHydrogen(400000, Unit.Gallons));
rocket.launch();
{% endhighlight %}

Now lets consider coding this as we'd speak it.

Load satellite into rocket, set the destination coordinates, fill with fuel and launch.

{% highlight java %}
newRocket().cargo(newSatellite().camera().hd())
	.coordinates(-100, 30, 54)
	.fuel().liquidHydrogen().gallons(400000)
	.launch();
{% endhighlight %}