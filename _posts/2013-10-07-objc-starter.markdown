---
layout: post
title: "ObjC Starter"
date: 2013-10-07 22:08
comments: false
categories: [Objective-C]
---
Getting up and running on Objective-C is one of the more intimidating development challenges, especially for those trying to learn the basics (like me).  So let's learn some basics and go from there...

For the record, I'm running on a Mac, with Xcode and the Command Line Tools installed, which gives me core command line tools like gcc and system header files.  Your friend <a href="https://www.google.com/search?as_q=xcode+command+line+tools+install" target="_blank">Google</a> can help you figure out how to install Xcode and the Command Line Tools.

### Old School Chuck (no Xcode IDE)  
Open up your favorite code editor (Sublime Text) and code HelloChuck.m, which is 99% C code and 1% Objective-C code.  The only Objective-C portion is the #import instead of C's #include.

{% highlight objc %}
#import <stdio.h>

int main(int argc, const char *argv[]) {
    printf("Hello Old School Chuck!\n");
    return 0;
}
{% endhighlight %}

### Compile and run from command line

{% highlight bash %}
gcc HelloChuck.m -o HelloChuck   
./HelloChuck  
Hello Old School Chuck!  
{% endhighlight %}  

### New School Chuck (Xcode IDE)  

Now let's step up our sophistication and use Xcode (*sigh*).  Launch Xcode and do ```File > New > Project```.  Select from the Wizard: ```OSX > Application > Command Line Tool``` and click Next.  

Specify a Product Name (this will be the executable), Organization Name, Company Identifier and Type=Foundation.  All this stuff is Apple's way to promote good code bundling, similar to Java's packaging.  Take a look at the Bundle Identifier and if you're happy with it click Next.  Finally select the folder to place the Project into.  Once Xcode creates the project it should look similar to this:  

{% highlight bash %}
|____HelloChuck
| |____HelloChuck
| |____HelloChuck-Prefix.pch
| |____HelloChuck.1
| |____main.m
|____HelloChuck.xcodeproj
{% endhighlight %}

HelloChuck/main.m is where Xcode has generated the main function and this is where we'll start.  Open main.m in the Xcode editor and inspect the code.  First thing we see is #import, importing Foundation.h which is Apple's core Objective-C library, it contains #imports for a ton of useful stuff like NSArray, NSAutoreleasePool, NSLog and NSString.  If you're curious open Foundation.h in Xcode and look at the #imports.  

Compared to the Old School Chuck we see that New School Chuck has a higher percentage of Objective-C code.  For example we have NSAutoreleasePool, which is Apple's memory management class.  Then we have NSLog which is a way to log information to Apple's System log.  The @ character tells the compiler to create a behind the scenes NSString for the text we're passing to NSLog.  One of the last things we see is the drain message being sent to the pool, which cleans up memory we allocated during the execution of HelloChuck.

{% highlight objc %}
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {

    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];
    NSLog (@"Hello New School Chuck!");
    
    [pool drain];
    return 0;
}
{% endhighlight %}

### Compile and run from command line
Compiling and running the New School Chuck from Xcode is easy (you click a button) but it's always nice to know how to compile and run from the command line.  It's pretty easy but we need to tell the compiler that we're using Foundation classes so it can link in the Foundation code.  

{% highlight bash %}
gcc -framework Foundation main.m -o HelloChuck  
./HelloChuck  
2013-10-07 23:09:48.432 HelloChuck[15224:707] Hello New School Chuck!  
{% endhighlight %}

Well that's it...Old School C and New School Objective-C...basic yes but important to get liftoff.  

"You've taken your first step into a larger world."  ―Obi-Wan Kenobi  
