---
layout: post
title: "sublime text setup"
date: 2013-08-24 22:01
comments: false
categories: [Sublime-Text]
---
Sublime Text makes me want to code, its simple, quick, highly customizable and  my fav code editor in and out of the office.  Here's some notes on my initial setup.

##1 First things first...install Sublime Text 3
Version 3 is still in beta but plenty stable, download it from [here](http://www.sublimetext.com/3)

##2 Next install Package Control
Best idea ever is package management and package managers (thanks rpm) and as fate would have it, Sublime Text has a Package Manager named...Package Control.  It's easy to install, do `(View > Show Console)` then copy the following Python code into the Console and volia Package Manager is setup and ready to roll.

```
import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())
```

If that fails (it shouldn't) then follow the installation instructions [here](https://sublime.wbond.net/installation).  Also here's the official [Package Manager site](https://sublime.wbond.net/)

##3 Install coding fonts
If you're coding then you likely want a [monospace font](http://en.wikipedia.org/wiki/Monospaced_font) and your system likely has plenty but one that I'm fond of is Adobe's Source-Code-Pro fonts, in particular the Light version.  You can download it from [github](https://github.com/adobe/source-code-pro).  Follow the instructions for your system...once installed set it as the active font-face in Sublime Text - `(Sublime Text > Preferences > Settings-User)`.  Add the following property in your User settings, anything placed here will override the Sublime Text defaults.

```
	"font_face": "Source Code Pro Light"
```

##4 Install the Soda theme(s)
This little gem makes Sublime Text rock more...for starters it comes with a sweet little system folder tree to help with trapsing through code files in directories.  Download and install it by doing ```(Shift + Command + P)``` then select ```Package Control: Install Package```, once a list of packages loads find the one titled ```Theme Soda```.  Check out the official download site [here](http://buymeasoda.github.io/soda-theme).

Set the Dark theme by opening up your User settings again (see #3) and placing the following snippet in the settings.

```
	"theme": "Soda Dark 3.sublime-theme"
```
Also I love the folder icon enhancement for the sidebar.  You can enable it in your User preferences by adding this snippet.
```
	"soda_folder_icons": true
```
##5 Install Solarized Theme
Again we use Package Control ```Package Control: Install Package```, type and select ```Package Control: Install Package``` then type and select ```Solarized Color Scheme```.  Once installed you can select it by ```(Sublime Text > Preferences > Color Scheme > Solarized Color Scheme)```

Solarized Dark looks like...

![SublimeTextSolarizedDark](/images/sublimetext/SublimeTextSolarizedDark.png "Solarized Dark")

##6 Create sublime symbolic link
Create a symbolic link so you can start Sublime Text from the command line.  I keep scripts in ```~/bin``` because its on my ```$PATH```.  So do something similar then create the link.
```
ln -s /Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl sublime
```
Now you can start Sublime Text by typing ```sublime``` from the command line.

##7 Have fun coding with Sublime Text!




