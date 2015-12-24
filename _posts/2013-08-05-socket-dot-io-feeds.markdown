---
layout: post
title: "Socket.IO Feeds"
date: 2013-08-05 10:30
comments: false
categories: [Javascript]
---
If you’re like me I often come away from looking at a site, scratching my head thinking wow that’s neat, how did they do that!?!  One thing that impresses me is when a site appears to be handling realtime data feeds and then rendering the data with some fancy gui and/or chart.  I’d love to employ some of those techniques in my work so this post is about finding a way to A) get realtime data pushed to a web-client and B) render it in realtime.

I found I could do this fairly easy with Node.js, Socket.IO and Highcharts, the trifecta of Javascript libraries!  I use Node.js to start a Server process that uses Socket.IO to listen for client connections.  When a client connects Socket.IO starts to push samples out to the client and the client does not have to constantly poll for updates…pretty cool huh?  The client receives the samples via Socket.IO and plots them into a Highchart graph.

### Code for the Server
{% highlight js %}
var io = require('socket.io').listen(3131);
 
io.sockets.on('connection', function (socket) {
 
  var max = 100
 
  // generate a sample every second
    setInterval(function() {
        var x = (new Date()).getTime(), // current time
            y = Math.floor((Math.random() * max) + 1);
        socket.emit('sample', {
        	x: x,
        	y: y
        });
        console.info("emitted: [" + x + "," + y + "]");
    }, 1000);
});
{% endhighlight %}

### Run Server
Run it from the command line using Node.js, it will sit there until a client connects.
{% highlight bash %}
corbett@corbett17:~/dev/node-foo|⇒  node Server.js
   info  - socket.io started
{% endhighlight %}
Then when a client connects it will start pumping out samples to that client approximately every second.  So open up Dashboard.html in a browser…code below.

### View Dashboard in browser
{% highlight html %}
<html>
<body>
<div id="graph_container" style="min-width: 400px; height: 400px; margin: 0 auto"></div>
<script src="socket.io/socket.io.min.js"></script>
<script src="jquery/1.9.1/jquery-1.9.1.js"></script>
<script src="highcharts/js/highcharts.js"></script>
<script>
/*
 * Fun with node.js, socket.io and highcharts!  The trifecta of javascript libraries :)
 * This tutorial is pretty simple yet neat and good for getting your feet wet with some newer
 * javascript libraries.  There are 2 parts to this tutorial:
 *
 * 1) a Server piece written in javascript, using socket.io
 * 2) a Client piece (this file) written in html, javascript, using socket.io
 *
 * This tutorial is a little unique because instead of pulling data from the Server process, the
 * Server pushes data to us (this page), well actually anyone who pulls up this page gets updates.
 * This is different from typical data applications that request data from the server via ajax or
 * traditional http request methods.  The push from Server method opens up the possibility to
 * implement realtime data feeds on your site, which would be stupid cool!
 *
 * To run:
 * 1) start server process: node Server.js
 * 2) open this file in a browser and you'll see samples being plotted from server
 */
$(function() {
  Highcharts.setOptions({
		global: {
			useUTC: false
		}
	});
 
	var graph = new Highcharts.Chart({
		title: { text: 'Real Time Samples' },
		xAxis: {
			type: 'datetime',
			tickPixelInterval: 100
		},
		yAxis: {
			title: { text: 'Samples' },
			tickInterval: 10,
			min: 0,
			max: 100
		},
		tooltip: {
            formatter: function() {
                return '<b>'+ this.series.name + '</b><br/>'
                    + '[ ' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x)
                    + ' , '
                    + this.y + ' ]';
            }
		},
		chart: {
			type: 'spline',
			renderTo: 'graph_container',
			events: {
				load: function() {
					var series = this.series[0];
				    var socket = io.connect('http://localhost:3131');
				    socket.on('sample', function (sample) {
				    	// when a sample arrives we plot it
						series.addPoint([sample.x, sample.y], true, true);
				    });
				}
			}
		},
        series: [{
            name: 'Random data',
            data: (function() {
                // generate some points to render before real samples arrive from feed
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                // 20 samples, starting 19 ms ago up to present time when feed starts plotting
                for (i = -19; i <= 0; i++) {
                    data.push({
                        x: time + (i * 1000),
                        y: 0
                    });
                }
                return data;
            })()
        }]
	});
 
});
</script>
</body>
</html>
{% endhighlight %}
When a client connects to the Server you should see the Server pushing out samples.
### Server running
{% highlight bash %}
corbett@corbett17:~/dev/node-foo|⇒  node Server.js
emitted: [1367983439273,83]
   debug - websocket writing 5:::{"name":"sample","args":[{"x":1367983439767,"y":89}]}
emitted: [1367983439767,89]
   debug - websocket writing 5:::{"name":"sample","args":[{"x":1367983440274,"y":97}]}
emitted: [1367983440274,97]
   debug - websocket writing 5:::{"name":"sample","args":[{"x":1367983440769,"y":39}]}
emitted: [1367983440769,39]
   debug - websocket writing 5:::{"name":"sample","args":[{"x":1367983441275,"y":53}]}
emitted: [1367983441275,53]
   debug - websocket writing 5:::{"name":"sample","args":[{"x":1367983441771,"y":32}]}
{% endhighlight %}
And the cool thing is you see the client plotting data as its received from the Server!
![Socket.IO Dashboard](/images/socketdotiofeeds/socketiodashboard.png "Socket.IO Dashboard")


