---
layout: post
title: "Instagram Images"
date: 2015-01-01
comments: false
categories: [Instagram, Photo]
---

You have two options for pulling images from [Instagram](//instagram/com) and using on your blog.  Neither of which I'm too keen on at the moment but maybe that will change.  The thing about Instagram is it's more of a photostream than an image management service (like [Flickr](//www.flickr.com)).  Links to images are obfuscated by design and users have no way to customize photo links or names.  You have to get the link for each image by logging into Instagram or use their [REST Api](http://instagram.com/developer/)...not covering the api approach in this post but will be taking a gander at it later.

##Option 1: A-La-Carte

Using Instagram copy the image link address.

<img class="center" src="/images/instagram-images/instagramimageurl.png">

Once you grab the image url, you're set right?  Well...sort of.  Using the url **as is** doesn't quite cut the mustered because that link is the image page on Instagram.  Here's that url...[Check out](http://instagram.com/p/oDv60XqcHP/) my dear ole pup Bucky.

We need to append **media** on the url to get an actual hyperlink to the image.

####So the copied url was:

	http://instagram.com/p/oDv60XqcHP/

####What we need is:

	http://instagram.com/p/oDv60XqcHP/media


The response will be a [redirect](http://en.wikipedia.org/wiki/URL_redirection#HTTP_status_codes_3xx) to the actual location on Instagram's servers.

####Instagram dance (curl output)

{% highlight bash %}

Original request & response:

	* Connected to instagram.com (54.236.151.170) port 80 (#0)
	> GET /p/oDv60XqcHP/media HTTP/1.1
	> User-Agent: curl/7.30.0
	> Host: instagram.com

	< HTTP/1.1 301 MOVED PERMANENTLY
	< Location: http://instagram.com/p/oDv60XqcHP/media/

	Following the redirect:

	> GET /p/oDv60XqcHP/media/ HTTP/1.1
	> User-Agent: curl/7.30.0
	> Host: instagram.com

	< HTTP/1.1 302 FOUND
	< Location: http://photos-h.ak.instagram.com/
	< hphotos-ak-xfp1/t51.2885-15/
	< 10369413_602429723188951_117177110_a.jpg

Request that gets image:

	* Connected to photos-h.ak.instagram.com (63.234.248.82) port 80 (#1)
	> GET /hphotos-ak-xfp1/t51.2885-15/
	> 10369413_602429723188951_117177110_a.jpg HTTP/1.1
	> User-Agent: curl/7.30.0
	> Host: photos-h.ak.instagram.com

{% endhighlight %}	

**Whew!** thankfully web servers take care of the heavy lifting, we just kick back and chill with our image being served from Instagram's servers...see below.

####You can see the actual image is:

	http://photos-h.ak.instagram.com/hphotos-ak-xfp1/t51.2885-15/10369413_602429723188951_117177110_a.jpg

<img class="center" src="//instagram.com/p/oDv60XqcHP/media">

Instagram provides documentation on this method on their [developer site](http://instagram.com/developer/embedding/).  They provide a **size** option that can be used to specify what size image you want.  Here's several examples using the size option.

####Thumbnail size (wittle Bucky)

	http://instagram.com/p/oDv60XqcHP/media/?size=t

<img class="center" src="//instagram.com/p/oDv60XqcHP/media/?size=t">

####Medium size (Normal Bucky)

	http://instagram.com/p/oDv60XqcHP/media/?size=m

<img class="center" src="//instagram.com/p/oDv60XqcHP/media/?size=m">

####Large size (Goliath Bucky)

	http://instagram.com/p/oDv60XqcHP/media/?size=l

<img class="center" src="//instagram.com/p/oDv60XqcHP/media/?size=l">

##Option 2: Instagram Baked

This option comes with Instagram goodies, like the like button, comments and hashtags.  Not bad if you don't mind all that stuff, you'll sacrifice some presentation freedom but all-in-all images look nice.

Using Instagram find the image you want and look for the Embed button.

<img class="center" src="/images/instagram-images/embed.png">

You'll be presented with a dialog that contains the embedded image code, copy the code and use in your blog.

<img class="center" src="/images/instagram-images/embedded.png">

I sure hope Instagram doesn't go out of business cuz I'm relying on them to keep my images accessible!  So now the question is how can we put together an image gallery with images from Instagram?  Stay tuned...in the meantime here's the Instagram baked image of my pup Bucky:

<blockquote class="instagram-media"
	data-instgrm-captioned data-instgrm-version="4"
	style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); max-width:400px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf//42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB/lQPb79drWOyJVa/DAvg9B/rLB4cC+Nqgdz/TvBbBnr6GBReqn/nRmDgaQEej7WhonozjF+Y2I/fZou/qAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://instagram.com/p/oDv60XqcHP/" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_top">#shihtzulove #wittlebucky Beef bone breakfast for Bucky!</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A photo posted by Corbett Martin (@corbettworks) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2014-05-16T12:59:14+00:00">May 5, 2014 at 5:59am PDT</time></p></div></blockquote>
<script async defer src="//platform.instagram.com/en_US/embeds.js"></script>

