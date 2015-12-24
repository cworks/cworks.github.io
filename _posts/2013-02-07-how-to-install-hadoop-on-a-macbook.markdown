---
layout: post
title: "How to install Hadoop on a Macbook"
date: 2013-02-07 20:38
comments: false
categories: [Big-Data, Hadoop, Apple]
---
I'm slowly but surely making my way through the BIG data fog and recently I've started experimenting with the Hadoop toolset.  Follow these steps to install Hadoop in pseudo distributed mode on a Mac.

#Installation

##Check that Java is installed
Hadoop is written in Java so your machine will need a 1.6 or greater JDK installed.  Most Mac machines already have Java 1.6 installed and you can check by typing ```java -fullversion``` at the command line.  If Java isn't installed you'll need to do that first by following [these steps](http://docs.oracle.com/javase/7/docs/webnotes/install/mac/mac-jdk.html).

##A word about Users

This procedure sets up Hadoop to run under your User account for ease of use.  This way you can work with Hadoop without needed to switch to another User.  Keep in mind we do this for convenience only and in production environments you will likely want to create separate User accounts for Hadoop.  Some distros such as Cloudera CDH[n] will create the required service accounts during the installation process.

##Configure SSH for Hadoop

A Hadoop cluster consists of several processes residing on other boxes, in this setup however those processes all run locally.  Yet in both cases Hadoop works the same, it SSH'es into each host and runs a command to startup or shutdown the targeted process.  The same processes required in a fully distributed cluster are the same ones required in a pseudo distributed cluster where all processes run on the same box.  For this to work in an automated fashion we need to configure prompt-less SSH operation *(we don't want SSH to prompt for a passphrase each time Hadoop uses it to start and stop processes)*.

Mac people first need to enable Remote Login in the ```System Preferences > Sharing```

Then follow the steps in the screen capture below, of course use your hostname (not corbett17).  Once you're able to ssh to localhost without being prompted for a passphrase you're good to continue.

![SSH Configuration](/images/hadoop-setup/SSH-Hadoop.png "SSH Configuration")

##Install Hadoop *(using Homebrew)*

When it comes to installing Hadoop on a Mac your best bet is to use the Apache version.  I would love to install Cloudera's distro but they don't produce a Mac version and the tarballs are designed to integrate with rpm, yum and zypper package managers not manual installation methods.  I recently attended a Cloudera class and asked for a native Mac installer for CDH[n]...would love this so I'm keeping my fingers crossed! I digress...back to business...So Apache version is what we're installing but since we're talking Mac, lets use [Homebrew](http://mxcl.github.com/homebrew/) to get the job done.

Enter these commands to get the install rolling.

![Install with Homebrew](/images/hadoop-setup/Homebrew-Hadoop.png "Install with Homebrew")

Homebrew will install Hadoop version 1.1.1 in ```/usr/local/Cellar/hadoop/1.1.1```

![Hadoop Cellar](/images/hadoop-setup/Hadoop-Cellar.png "Hadoop Cellar")

And create symlinks in ```/usr/local/bin```...now that's a sweet brew!

![Hadoop Symlinks](/images/hadoop-setup/Hadoop-Symlinks.png "Hadoop Symlinks")

Now confirm installation

![Hadoop Version](/images/hadoop-setup/Hadoop-Version.png "Hadoop Version")

#Configuration and startup

The first thing we want to configure is where Hadoop will store it's data.  We create a top-level directory `/data/hadoop` then create some sub-folders

`/data/hadoop` top-level hadoop data directory  
`/data/hadoop/dfs` location where data is saved for data-node  
`/data/hadoop/mapreduce` location of mapreduce and tasktracker files  
`/data/hadoop/nn` name-node storage location  
`/data/hadoop/tmp` hadoop tmp location  

``` bash create hadoop data directories
mkdir -p /data/hadoop/dfs /data/hadoop/mapreduce /data/hadoop/nn /data/hadoop/tmp
chmod -R 755 data
```





