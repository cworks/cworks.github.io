---
layout: post
title: "Jackson Streaming"
date: 2013-12-12 22:24
comments: false
categories: [Java, JSON]
---
JSON can be processed as a stream in addition to the full hydration method implemented by ```ObjectMapper```.  The Jackson library implements stream processing behind ```JsonParser``` which acts like a cursor over the key-value pairs inside a [JSON object](http://en.wikipedia.org/wiki/JSON#Data_types.2C_syntax_and_example).

The basic processing pattern is simple...before the ```JsonParser``` is used you check it's postion to be where you want it.  For example ```JsonToken.START_ARRAY``` or ```JsonToken.START_OBJECT```.  Then you iterate over the array or object by advancing the cursor until ```JsonToken.END_ARRAY``` or ```JsonToken.END_OBJECT```.  While inside an iteration you use the methods on the ```JsonParser``` to tokenize the current JSON element and process the data.

Basic example using Jackson stream processing

{% gist 7939706 JacksonStreamTesting.java %}
