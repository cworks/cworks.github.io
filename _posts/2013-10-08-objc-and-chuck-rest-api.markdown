---
layout: post
title: "ObjC and Chuck  REST API"
date: 2013-10-08 12:53
comments: false
categories: [Objective-C]
---
A small follow-up on [ObjC Starter](http://www.corbettworks.net/blog/2013/10/07/objc-starter/)...let's do something a little more fun than Hello Chuck.  

Now days it's becoming more and more popular to expose a public service using the architectural style of [REST](http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) due to its ease of implementation and use.  And what better service to provider to the greater good than a Chuck Norris joke API!  

The [Internet Chuck Norris Database](http://www.icndb.com/api/) contains lots of sayings from the baddest man on the planet...Chuck Norris.  So let's code an Objective-C function to get a random joke from ICNDb!  

First order of business is to create a new function, lets call it helloChuckREST.  Then we create an instance of ```NSMutableURLRequest``` which is the request object that we initialize with the URL: http://api.icndb.com/jokes/random.  We set the HTTP method to GET, allocate an ```NSError``` instance to hold errors that may occur during the remote call.  We need a response instance so we allocate ```NSHTTPURLResponse```, then we send the request by calling sendSynchronousRequest on the ```NSURLConnection``` object.  Notice that we pass-by-reference the address of our response and error objects so we can get at that data after the synchronous call completes.  If the statusCode of the response is not HTTP 200 - SUCCESS then we log the statusCode and return, otherwise we decode the response body into a UTF8 String and log it.

Now this is slightly more fun than Hello World!

{% highlight objc %}
void helloChuckREST() {
    
    NSMutableURLRequest* request = [[NSMutableURLRequest alloc]
                                    initWithURL:[NSURL URLWithString:@"http://api.icndb.com/jokes/random"]];
    
    [request setHTTPMethod:@"GET"];
    NSError* error = [[NSError alloc] init];
    NSHTTPURLResponse* response = nil;
    NSData* data = [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&error];
    
    if([response statusCode] != 200) {
        NSLog(@"Error doing GET on %@, HTTP statusCode %li", [request URL], (long)[response statusCode]);
        return;
    }
    
    NSString* responseText = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
    NSLog(@"Hello REST Chuck!: %@", responseText);
}
{% endhighlight %}

### Compile and Run
{% highlight bash %}
gcc -framework Foundation main.m -o HelloChuck
./HelloChuck
2013-10-08 13:42:04.209 HelloChuck[16274:707] Hello REST Chuck!: { "type": "success", "value": { "id": 311, "joke": "Paper beats rock, rock beats scissors, and scissors beats paper, but Chuck Norris beats all 3 at the same time.", "categories": [] } }
{% endhighlight %}


