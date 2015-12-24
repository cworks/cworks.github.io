---
layout: post
title: "Apple Finder Tweek"
date: 2013-02-09 19:59
comments: false
categories: [Apple]
---
Ok - I'm a programmer and I love Apple because its UNIX and the command-line environment resembles a real UNIX like system.  That being the case I'd like to browse the file-system with the Finder but Apple has locked that baby down and hidden from it standard UNIX directories that I'd like (and need) to see.  So we need to beat on our Apple boxes...

#### 1. Open a Terminal: /Applications/Utilities/Terminal.app

![AppleShowAllFiles](/images/appletips/AppleShowAllFiles.png "Set AppleShowAllFiles to TRUE")

#### 2. Restart the Finder

![KillAllFinder](/images/appletips/KillallFinder.png "Restart the Finder")

#### 3. View the file-system in all its glory

+ Go to folder: Shift + Command + G
+ Enter /
+ Click "Go"
+ Voila! we see the underlying UNIX directories: /bin, /etc, /sbin, /tmp, /usr and /var

![Finder](/images/appletips/Finder.png "Finder")
