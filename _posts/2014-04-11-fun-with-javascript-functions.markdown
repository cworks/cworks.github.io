---
layout: post
title: "Javascript function-expressions & function-declarations"
date: 2014-04-11 09:21:43 -0500
comments: false
categories: [Javascript]
---
We're doing more and more Javascript at work these days and in a recent code-review a developer asked about the difference between:

{% highlight js %}
// function-expression
sort = function(things) { ... }

// and

// function-declaration
function sort(things) { ... }
{% endhighlight %}

Functions are made with function-expressions

{% highlight js %}
sort = function(things) {
	for(var i = 1; i < things.length; i++) {
		var j = i;
		while(j > 0 && things[j-1] > things[j]) {
			var tmp = things[j-1];
			things[j-1] = things[j];
			things[j] = tmp;
			j = j - 1;
		}
	};
};
{% endhighlight %}

And function-declarations

{% highlight js %}
function sort(things) {
	// ... do some sorting
}
{% endhighlight %}

The major difference between a function-expression and a function-declaration is when the function is loaded.  Consider the following sequence:

{% highlight js %}
var sample1 = [1, 3, 2, 0, -1, -3, 10];
var sample2 = [12, 5, 1, 8, 3, -1, 2, 1, 8];

sort(sample1) // BOOM - sort is not defined
sort = function(things) {
	for(var i = 1; i < things.length; i++) {
		var j = i;
		while(j > 0 && things[j-1] > things[j]) {
			var tmp = things[j-1];
			things[j-1] = things[j];
			things[j] = tmp;
			j = j - 1;
		}
	};
};

sortWrapper(sample2)
function sortWrapper(things) {
	sort(things)
}

{% endhighlight %}

The sequence above results in a ReferenceError because the function-expression sort is not defined at the time it's applied.  The function-expression *must* be loaded before it's used by a caller.  Contrasted with a function-declaration, in which the order doesn't matter.  That is the function-declaration can occur after the call (as in the example above) without raising an Error.  This is because no code is executed until all function-declarations are loaded by the Javascript engine.
