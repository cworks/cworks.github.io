---
layout: post
title: "nginx on aws"
date: 2014-09-23 08:14:31 -0500
comments: true
categories: [Nginx, Aws]
---
First let me say there are plenty of online resources about installing Nginx and using it as a reverse proxy so please use those resources and even consider them "official" when compared to this post.  This is by-and-large a small brain dump for myself and a few other folks I know will benefit from this, especially those new to AWS and Nginx.

Our goal is to implement an Nginx reverse-proxy on an EC2 instance fronted by Route 53 (Amazons Domain Name Service).  We're actually going to point 2 different DNS entries to an EC2 instance then Nginx is going to direct requests to the appropriate local web-server.  This setup benefits from being able to serve 2 public DNS entries with one EC2 instance...not revolutionary by any means, in-fact very common and something we want to highlight.

{% img center /images/nginxonaws/nginx_on_aws.png %}


##AWS Account, EC2 instance, Route 53 Hosted Zones

We're not covering how to setup AWS because Amazon provides awesome documentation on every nook and cranny of their platform.  The high-level bullet points for this post is you'll need an AWS account, EC2 instance and Route 53 Hosted Zone configuration for all the domain names you want to service.

###EC2 Instance

Almost any Linux instance will do, I'm using `t2.micro` for this post.  Don't forget to setup a Security Group and allow Inbound HTTP traffic on port 80, HTTPS traffic on port 443 and SSH traffic on port 22.  Additionally create a key-pair to use for secure-shelling into your EC2 instance.

###Route 53

You'll also need to have or register domain names and create **Hosted Zones** for each.  You need to create **A-Records** for each domain (i.e. www.foo.com, foo.com) and configure a route to your EC2 instance.  Oh you'll also (or should) setup an Elastic IP address and assign to the EC2 instance you're going to use.  Configure that Elastic IP in each **A-Record** you configure in Route 53.

##Installing Ngnix

SSH into your EC2 instance and ensure all your packages are up to date then install Nginx.

```
[ec2-user@stargate ~]$ sudo yum update
[ec2-user@stargate ~]$ yum install nginx
[ec2-user@stargate ~]$ service nginx start

```

Nginx should be started and you can verify that by hitting your EC2 instance through your domain name.  If everything is setup and working with Route 53, EC2 and Nginx you should see an Nginx welcome page.

Now on to the good stuff.

##Configure Nginx Reverse Proxy for 2 domains

Find the `nginx.conf` file (a typical location is `/usr/local/nginx/conf/nginx.conf`) and make the appropriate changes to reverse proxy the 2 (or more domains) setup in Route 53.  The values for server_name(s) should match the **A-Records** in Route 53.  Nginx will proxy requests sent to port 80 to the appropriate location.  In this example requests sent to www.yourfirstdomain.com will be sent to localhost:1234 and www.yourseconddomain.com will be sent to localhost:1235.  The only thing left is to implement 2 server processes running on port 1234 and 1235...consider implementing 2 small Nodejs Servers and listen on those ports.  Then bounce Nginx and test.

```
http {

    server {
        listen 80;
        server_name [place your 1st domain name here i.e. www.yourfirstdomain.com]        
        location / {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            # a server process we direct to for requests sent to www.yourfirstdomain.com
            proxy_pass http://127.0.0.1:1234;
        }
    }

    server {
        listen 80;
        server_name [place your 2nd domain name here i.e. www.yourseconddomain.com]
        location / {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            # a server process we direct to for requests sent to www.yourseconddomain.com
            proxy_pass http://127.0.0.1:1235;
        }
    }
  
}
```




