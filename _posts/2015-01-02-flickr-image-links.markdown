---
layout: post
title: "Flickr Images"
date: 2015-01-02
comments: false
categories: [Flickr, Photo]
---

Flickr images...yay!  Flickr is more than just a photostream like Instagram, its a great photo management app with a nice [API](http://code.flickr.net/) to support custom integrations.  So if you have aspirations of managing photos or creating albums then flickr is a great choice.

The quickest and easiest way to pull an image is to grab the **HTML Code** using the Flickr console.  Login to your Flickr account, find the image you want, location the share icon (see photo below) and copy the **HTML Code**.

<img class="center" src="/images/flickr-images/htmlcode.png">

A little inspection on the **HTML Code** reveals its an HTML <code>img</code> wrapped in a hyperlink.  The hyperlink back to flickr is meeting a guideline defined by the [Flickr Community](https://www.flickr.com/guidelines.gne), which basically says users can display images hosted on Flickr but must provide a link back.  By default when you copy the **HTML Code** from Flickr the link back is baked into the copied HTML.  The **HTML Code** for my image below is:

{% highlight html %}
<a href="https://www.flickr.com/photos/130419749@N03/15991012989"
	title="photo21 by corbett martin, on Flickr">
	<img src="https://farm8.staticflickr.com/7546/15991012989_db55719fae.jpg" width="500" height="373" alt="photo21">
</a>
{% endhighlight %}

<a href="https://www.flickr.com/photos/130419749@N03/15991012989" title="photo21 by corbett martin, on Flickr"><img class="center" src="https://farm8.staticflickr.com/7546/15991012989_db55719fae.jpg" width="500" height="373" alt="photo21"></a>

Direct linking is probably not a good idea for a couple reasons.  **First** the direct link could change, true the **HTML Code** contains the direct link as well so that doesn't remedy that situation.  **Second** direct linking goes against the community guideline of providing a link back to Flickr.