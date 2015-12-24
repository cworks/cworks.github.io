---
layout: post
title: "Jackson JSON into Typed Collections"
date: 2013-09-18 10:27
comments: false
categories: [Java, JSON]
---
Love the Jackson JSON project for dealing with JSON data.  I've been using it more and more and it's very simple and performs well.  One challenge we had was converting a JSON stream/string into a typed Java Collection.  Our first implementation worked but required more code than we wanted to write and maintain.  We essentially got a List of Maps from the ObjectMapper and iterated over the List converting each Map into a domain Object...like a Dog.

{% highlight java %}

	public static <T> T toObject(String content, Class<T> objectType) {
		T theObject = null;
		try {
			ObjectMapper mapper = new ObjectMapper();			
			theObject = mapper.readValue(content, objectType);
		} catch (JsonParseException e) {
			throw new JsonTransformationException("JSON parse exception", e);
		} catch (JsonMappingException e) {
			throw new JsonTransformationException("JSON mapping exception", e);
		} catch (IOException e) {
			throw new JsonTransformationException("JSON io exception", e);
		}
		
		return theObject;
	}

{% endhighlight %}

And here's how it was being called.  What we want is a list of Dog instances but what Jackson returns is a List of Maps, where each element in the List contains a Map which contains the properties for each Dog.  Now this works but can we do better?

{% highlight json %}
// response content: an array of Dogs
[
	{ "name":"Nacho", "breed":"weenie dog" },
	{ "name":"Bucky", "breed":"shih tzu" }
]
{% endhighlight %}

{% highlight java %}
	// Calling the feeble JSON to Object code
	List<Map> dogs = JsonTransformer.toObject(response.getContent(), List.class);

	// Now convert each Map in the List into a Dog with custom code
	// ...
{% endhighlight %}


Well as it turns out we were asking too much from the Jackson library given our setup of it.  The library supports converting JSON strings to polymorphic Java typed collections *if we set it up correctly*...duh.  To get what we want requires doing a little more work before asking the mapper to read and transform the input JSON content to our typed Collection.

Cool thing is the ObjectMapper has a way to build a general CollectionType that is used to guide the readValue method of the ObjectMapper so that it can create the correctly typed Collection.  We just need to tell it what type of Collection we want (i.e. List, Map) and what's contained in the Collection.  In this case a List of Dog(s).

{% highlight java %}

    public static <T> List<T> toList(String content, Class<T> objectType) {

        List<T> theList = null;
        try {
			ObjectMapper mapper = new ObjectMapper();	
			// The key		        	
            CollectionType ct = mapper.getTypeFactory().constructCollectionType(List.class, objectType);
            theList = mapper.readValue(content, ct);
        } catch (JsonParseException e) {
            throw new JsonTransformationException("JSON parse exception", e);
        } catch (JsonMappingException e) {
            throw new JsonTransformationException("JSON mapping exception", e);
        } catch (IOException e) {
            throw new JsonTransformationException("JSON io exception", e);
        }

        return theList;
    }

{% endhighlight %}

Volia!  Now we can get a List of actual Dog instances.

{% highlight java %}

	List<Dog> dogs = JsonTransformer.toList(response.getContent(), Dog.class);

{% endhighlight %}




