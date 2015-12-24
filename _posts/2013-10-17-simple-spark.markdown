---
layout: post
title: "Simple Spark - a Java micro web framework"
date: 2013-10-17 19:26
comments: false
categories: [Java]
---
You have got to love simplicity in code, even if you love the most intricate pieces of art or the complex aspects of nature.  If you've done programming and actually perspired to build something my guess is you've come to appreciate "simple is better".  

I’ve never personally been a huge fan of [minimalism in art](http://en.wikipedia.org/wiki/Minimalism) but minimalism in code is a thing of beauty.  Recently at work we've been turning the crank hard on going the way of REST and forgoing the complexities of SOAP, RMI and JMS...sure those things have a place but generally speaking plain ole simple HTTP protocol and some basic REST principles can take us far down the "simple is better" road.  More than half of all the things we do requires making a request and getting a response, so what better way than plain ole HTTP.  Now the thing is the offering of libraries and tools that claim to make this kind of programming in Java easier is as wide as the ocean but not all are simple...rarely if ever do I find myself thinking *"wow this is just really simple and elegant"*. Take for instance the JAX-RS spec'd tools like Jersey and RESTEasy...good grief man...really?  Ok ok...to harsh...they have a place but when I use these tools do I think...yeah simplicity in code?  Plain ole Servlets a little less cumbersome, Spring MVC better but is there something simpler?  I say yes there is...something like [Spark](http://www.sparkjava.com/), the small Java web framework which takes its roots from [Ruby's Sinatra](http://www.sinatrarb.com/) tool.  

If you want to have fun playing around with some simple tools, investigate Spark for yourself...you won't be disappointed and it may even change the way you look at that next Restful service implementation at the office.  Your boss will love you because you're coding less yet doing more!  

Believe it or not this little snippet is enough code to handle an HTTP POST to create Jobs.  The REST call would be: POST /jobs?jobName=painting&startOn=20131201  

{% highlight java %}
public class JobAPI {
    public static void main(String[] args) {

        /**
         * Create a new Job
         */
        Spark.post(new Route("/jobs") {
            @Override
            public Object handle(Request request, Response response) {
                String jobName = request.queryParams("jobName");
                String startOn = request.queryParams("startOn");
                Job job = new JobBuilder().name(jobName).startOn(startOn).create();
                saveJob(job);
                // created 201
                response.status(201);
                return job.getId();
            }
        });
    }
}
{% endhighlight %}

Simple and FUN.  Check out the projects [readme](http://www.sparkjava.com/readme.html) for more API help and have fun building stuff!  

