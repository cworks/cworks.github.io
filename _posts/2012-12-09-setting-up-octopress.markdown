---
layout: post
title: "Setting up Octopress"
date: 2012-12-09 20:40
comments: false
categories: [Octopress, Jekyll, Blogging]
---
So for several years I've wanted to like Wordpress but I've found it hard to do so because it's too
much complexity for what I need.  Don't get me wrong Wordpress works and is the leading Blogging/Website
platform but I'm not looking for a platform, rather something plain and simple to hack on, something
like Octopress.  These are the steps to get a local Octopress instance up and running.

### + [Install Git](http://git-scm.com/ "git")
### + Install Ruby enVironment Manager (rvm) and Ruby

Open a Terminal and enter the following command to download and install the stable version of rvm.  The
`--ruby` flag installs the latest ruby version, at this time the current stable version of ruby is 1.9.3
and this just so happens to be the required version for Octopress (at this time).  However if your following this
process in the not-to-distance future then go ahead and install the latest and greatest ruby version (`--ruby`),
then make sure to explicitly install the ruby version required by Octopress afterward.  You will be
able to choose which ruby version is used by Octopress and I'll point that out a little later.
```
# This will install rvm in $HOME/.rvm
curl -L https://get.rvm.io | bash -s stable --ruby
```

Check out the [rvm site](https://rvm.io/) for more information about cutting your teeth with Ruby and rvm.

### + Install Ruby (the version required by Octopress)

Enter these commands in the Terminal to install Ruby and tell rvm to use that version.  Then install the
latest [rubygems](http://rubygems.org/ "rubygems") with the last command.
```
rvm install 1.9.3
rvm use 1.9.3
rvm rubygems latest
```
Check the Ruby version
```
corbett:~|⇒  ruby --version
ruby 1.9.3p327 (2012-11-10 revision 37606) [x86_64-darwin11.4.2]
```
### + Setup Octopress

Clone Octopress from [github](https://github.com/imathis/octopress "octopress at github")
```
corbett:/dev/|⇒  git clone git://github.com/imathis/octopress.git octopress
Cloning into 'octopress'...
remote: Counting objects: 7364, done.
remote: Compressing objects: 100% (2652/2652), done.
remote: Total 7364 (delta 4245), reused 6910 (delta 4031)
Receiving objects: 100% (7364/7364), 1.45 MiB | 810 KiB/s, done.
Resolving deltas: 100% (4245/4245), done.
```
cd into the cloned octopress directory and accept the rvm notice for the .rvmrc file in that directory.  The .rvmrc file is a "project" level rvmrc file, that sets up the project's Ruby environment.  You can read more about rvmrc files [here](https://rvm.io/workflow/rvmrc/ "rvmrc files").
```
corbett:/dev|⇒  cd octopress 
==============================================================================
= NOTICE                                                                     =
==============================================================================
= RVM has encountered a new or modified .rvmrc file in the current directory =
= This is a shell script and therefore may contain any shell commands.       =
=                                                                            =
= Examine the contents of this file carefully to be sure the contents are    =
= safe before trusting it! ( Choose v[iew] below to view the contents )      =
==============================================================================
Do you wish to trust this .rvmrc file? (/dev/octopress/.rvmrc)
y[es], n[o], v[iew], c[ancel]> yes
Using /Users/corbett/.rvm/gems/ruby-1.9.3-p327
```
### + Install Octopress dependencies

Just for the sake of learning, do a more on Gemfile and you will see the list of dependencies for
Octopress.
```
corbett:/dev/octopress|master⚡ ⇒  more Gemfile
source "http://rubygems.org"

group :development do
  gem 'rake', '~> 0.9.2'
  gem 'rack', '~> 1.4.1'
  gem 'jekyll', '~> 0.11.2'
  gem 'rdiscount', '~> 1.6.8'
  gem 'pygments.rb', '~> 0.2.12'
  gem 'RedCloth', '~> 4.2.9'
  gem 'haml', '~> 3.1.6'
  gem 'compass', '~> 0.12.1'
  gem 'rubypants', '~> 0.2.0'
  gem 'rb-fsevent', '~> 0.9'
  gem 'stringex', '~> 1.4.0'
  gem 'liquid', '~> 2.3.0'
end

gem 'sinatra', '~> 1.3.2'
```
The next step is to install [Bundler](http://gembundler.com/) which is a Ruby gem that
manages an application's dependencies.
```
gem install bundler
corbett:/dev/octopress|master⚡ ⇒  gem install bundler
Successfully installed bundler-1.2.3
1 gem installed
Installing ri documentation for bundler-1.2.3...
Installing RDoc documentation for bundler-1.2.3...
```
Now install all of the gem dependencies.
```
corbett:/dev/octopress|master⚡ ⇒  bundle install
Using rake (0.9.2.2) 
Using RedCloth (4.2.9) 
Using posix-spawn (0.3.6) 
Using albino (1.3.3) 
Using blankslate (2.1.2.4) 
Using chunky_png (1.2.5) 
Using fast-stemmer (1.0.1) 
Using classifier (1.3.3) 
Using fssm (0.2.9) 
Using sass (3.1.20) 
Using compass (0.12.2) 
Using directory_watcher (1.4.1) 
Using ffi (1.0.11) 
Using haml (3.1.6) 
Using kramdown (0.13.7) 
Using liquid (2.3.0) 
Using syntax (1.0.0) 
Using maruku (0.6.0) 
Using jekyll (0.11.2) 
Using rubypython (0.5.3) 
Using pygments.rb (0.2.13) 
Using rack (1.4.1) 
Using rack-protection (1.2.0) 
Using rb-fsevent (0.9.1) 
Using rdiscount (1.6.8) 
Using rubypants (0.2.0) 
Using tilt (1.3.3) 
Using sinatra (1.3.2) 
Using stringex (1.4.0) 
Using bundler (1.2.3) 
Your bundle is complete! Use `bundle show [gemname]` to see where a bundled gem is installed.
```
### + Install the default theme
```
corbett:/dev/octopress|master⚡ ⇒  rake install
## Copying classic theme into ./source and ./sass
mkdir -p source
cp -r .themes/classic/source/. source
mkdir -p sass
cp -r .themes/classic/sass/. sass
mkdir -p source/_posts
mkdir -p public
```
### + Take it for a spin

Run the command below to start a local instance of Octopress.
```
corbett:~/dev/octopress|master⚡ ⇒  rake preview
```
Then point your browser to `http://127.0.0.1:4000` and get blogging!




