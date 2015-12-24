---
layout: post
title: "Neo4j from Java"
date: 2013-12-08 21:10
comments: false
categories: [Neo4j, Java, Nosql]
---
[Neo4j](http://www.neo4j.org/) is a graph database implemented in Java that stores Nodes and Relationships between Nodes in a native graph format.  Neo comes with a graph query language called Cypher (very cool) which is used to traverse the graph for information.  Several mechanisms exist for getting data out of the graph and they are bullet pointed below.

#### 1) Native Java API (embedded neo)
Querying the graph using the native Java API requires that you run an embedded version of Neo4j within your Java process.  Using the Native Java API is a great way to learn and unit-test but it suffers from one major drawback and that is only one Java process can be accessing the graph at a time.  This is the method we review in the code snippets below.

#### 2) neo4j-shell
Neo comes with a command line tool called neo4j-shell that can be used to query the graph directly using the Cypher query language.  This is a great way to learn Cypher and to prototype your queries but typically you will want to codify the Cypher queries into an application.

#### 3) Neo4j REST api (client-server neo)
One of the great features of Neo4j is that it comes with a baked in RESTful api that can be used to run Cypher queries and return results.  This is the recommended way to run Neo4j in a client-server setup.  You run Neo4j on a server and have client Neo apps access the graph over REST.  This method does not suffer from the "one process per neo instance" problem like the Native Java API method does.

Let's take a quick look writing a simple Neo app that uses the native Java API in embedded mode.

First thing is to create a new embedded graph database instance, below I use the $NEO_HOME env variable to reference an exiting graphDB that I already have movie data loaded into.

{% highlight java %}
class Neo {
	...
    public static Neo create() {
        String neoHome = System.getenv("NEO_HOME");
        if(neoHome == null) {
            throw new IllegalArgumentException("NEO_HOME must be set!");
        }
        // $NEO_HOME/data/graph.db contains a movie database
        String graphDBPath = neoHome + File.separator
            + "data" + File.separator + "graph.db";
        GraphDatabaseService db = new GraphDatabaseFactory()
            .newEmbeddedDatabase(graphDBPath);
        // 
        return new Neo(db);
    }
    ...
}
{% endhighlight %}

Once the GraphDatabaseService instance is created, hold on to it because we need it to start transactions, thus we pass the instance into the Neo constructor (the Neo class is my simple wrapper for Neo...nuttin special).  Inside the Neo constructor we do one important thing...we create an instance of ExecutionEngine by passing it the GraphDatabaseService instance, then we save both the GraphDatabaseService and ExecutionEngine instances in the Neo instance so we can reuse.

{% highlight java %}
class Neo {
	...
    /**
     * private constructor, use create()
     * @param graphDB
     */
    private Neo(GraphDatabaseService graphDB) {
    	// set GraphDatabaseService instance
        graphDB(graphDB);
        ExecutionEngine engine = new ExecutionEngine(graphDB());
        // set ExecutionEngine instance
        engine(engine);
        // register a shutdown hook for graceful neo shutdown
        shutdownHook(graphDB());
    }
    ...
}
{% endhighlight %}

Now once we have good GraphDatabaseService and ExecutionEngine instances we can use them to query the graph.  The method below runs a simple Cypher query that obtains all Nodes and Relationships in the movie database.  The result is iterated over and each relationship is printed in JSON format (see github for full example code).

{% highlight java %}
public class NeoApp {
	...
    void printAllNodes() {
        String query = "START a=node(*) " +
            "MATCH (a)-->(b) " +
            "RETURN a, b";
        try(Transaction tx = neo.graphDB().beginTx()) {
            ExecutionResult result = neo.engine().execute(query);
            Iterator it = result.iterator();
            while(it.hasNext()) {
                Map relationship = (Map)it.next();
                Node a = (Node)relationship.get("a");
                Node b = (Node)relationship.get("b");
                toJson(a, b);
            }
            tx.success();
        }
    }
    ...
    public static void main(String[] args) {
        NeoApp neoApp = NeoApp.create();
        neoApp.printAllNodes();
    }
}
{% endhighlight %}

The output will print to the console and look something like:

{% highlight json %}
{"born":1964,"name":"Keanu Reeves"}->{"born":1949,"name":"Nancy Meyers"}
{"born":1964,"name":"Keanu Reeves"}->{"born":1953,"name":"Robert Longo"}
{"born":1964,"name":"Keanu Reeves"}->{"born":1950,"name":"Howard Deutch"}
{"born":1964,"name":"Keanu Reeves"}->{"born":1944,"name":"Taylor Hackford"}
{"born":1964,"name":"Keanu Reeves"}->{"born":1967,"name":"Andy Wachowski"}
{"born":1964,"name":"Keanu Reeves"}->{"born":1965,"name":"Lana Wachowski"}
{"born":1964,"name":"Keanu Reeves"}->{"born":1946,"name":"Diane Keaton"}
{"born":1964,"name":"Keanu Reeves"}->{"born":1937,"name":"Jack Nicholson"}
{"born":1964,"name":"Keanu Reeves"}->{"born":1958,"name":"Ice-T"}
{"born":1964,"name":"Keanu Reeves"}->{"born":1968,"name":"Dina Meyer"}
{"born":1964,"name":"Keanu Reeves"}->{"born":1947,"name":"Takeshi Kitano"}
{"born":1964,"name":"Keanu Reeves"}->{"born":1968,"name":"Orlando Jones"}
{"born":1964,"name":"Keanu Reeves"}->{"born":1930,"name":"Gene Hackman"}
{"born":1964,"name":"Keanu Reeves"}->{"born":1970,"name":"Brooke Langton"}
{"born":1964,"name":"Keanu Reeves"}->{"born":1940,"name":"Al Pacino"}
{"born":1964,"name":"Keanu Reeves"}->{"born":1975,"name":"Charlize Theron"}
{"born":1964,"name":"Keanu Reeves"}->{"born":1967,"name":"Carrie-Anne Moss"}
{"born":1964,"name":"Keanu Reeves"}->{"born":1961,"name":"Laurence Fishburne"}
{"born":1964,"name":"Keanu Reeves"}->{"born":1960,"name":"Hugo Weaving"}
{% endhighlight %}

Have fun playing around with Neo and graph databases, they're useful, fun and are sure to change the way you look at data in the "real world".  Stay tuned for a post on using the Neo4j REST api.  Ciao!

