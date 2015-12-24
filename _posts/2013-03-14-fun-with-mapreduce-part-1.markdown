---
layout: post
title: "Fun with MapReduce"
date: 2013-03-14 20:51
comments: false
categories: [Big-Data, Hadoop, Map-Reduce, Java]
---
Several weeks ago I attended a Hadoop class and received my first real exposure to the [MapReduce programming model](http://en.wikipedia.org/wiki/MapReduce), which I admit to being a little skeptical about learning, so it was good for me in the sense it helped with my mental block.  Up until this point I had very little hands on MapReduce experience, in fact I intentionally avoided it, opting for Hive instead, since it provides a very SQL like programming experience.  Yet I know for the sake of learning and understanding core concepts that some MapReduce will only strengthen my data slicing and dicing skills.  That in fact is where I see the benefit, yes you can use MapReduce to *query* data but it also seems strong at transforming data from one form to another, which would be real handy in most companies that deal with wonky data.

So like a good little student I went home all geeked out and enthusiatic about using MapReduce for something and seeing that I'm a huge Basebell fan I *thought - hey lets make this interesting by using data from the Great Game*.  I proceeded to search for raw Baseball data and came across this awesome site by [Sean Lahman](http://www.seanlahman.com/baseball-archive/statistics/), which has download packages for Baseball stats dating back to 1871!  I downloaded the 2012 comma-delimited version and used the yearly Batting data to produce Career Batting Stats for every player to play the Great Game.  The rest of this post is a tutorial on writing and running the MapReduce code, this of course will require that you have access to a Hadoop instance.  If you happen to be on a Mac follow [these steps]({{ root_url }}/blog/2013/02/07/how-to-install-hadoop-on-a-macbook/) to get one up and running.

##Download Lahman 2012 Baseball Stats
Grab the source dataset from [Sean Lahman](http://www.seanlahman.com/baseball-archive/statistics/), select the 2012 CSV version.

##Load Source Data into Hadoop

{% highlight bash %}
corbett@corbett17:~/Downloads/datasets|⇒  unzip lahman2012-csv.zip -d lahman2012
Archive:  lahman2012-csv.zip
  inflating: lahman2012/TeamsHalf.csv  
  inflating: lahman2012/AllstarFull.csv  
  inflating: lahman2012/Appearances.csv  
  inflating: lahman2012/AwardsManagers.csv  
  inflating: lahman2012/AwardsPlayers.csv  
  inflating: lahman2012/AwardsShareManagers.csv  
  inflating: lahman2012/AwardsSharePlayers.csv  
  inflating: lahman2012/Batting.csv  
  inflating: lahman2012/BattingPost.csv  
  inflating: lahman2012/Fielding.csv  
  inflating: lahman2012/FieldingOF.csv  
  inflating: lahman2012/FieldingPost.csv  
  inflating: lahman2012/HallOfFame.csv  
  inflating: lahman2012/Managers.csv  
  inflating: lahman2012/ManagersHalf.csv  
  inflating: lahman2012/Pitching.csv  
  inflating: lahman2012/PitchingPost.csv  
  inflating: lahman2012/readme 2012.txt  
  inflating: lahman2012/Salaries.csv  
  inflating: lahman2012/Schools.csv  
  inflating: lahman2012/SchoolsPlayers.csv  
  inflating: lahman2012/SeriesPost.csv  
  inflating: lahman2012/Teams.csv    
  inflating: lahman2012/TeamsFranchises.csv  
  inflating: lahman2012/Master.csv 
{% endhighlight %}
{% highlight bash %}
corbett@corbett17:~/Downloads/datasets|⇒  hadoop fs -put lahman2012 datasets/lahman2012 
corbett@corbett17:~/Downloads/datasets|⇒  hadoop fs -ls datasets/lahman2012
Found 26 items
-rw-r--r--   3 corbett supergroup     198529 2013-02-28 22:23 /user/corbett/datasets/lahman2012/AllstarFull.csv
-rw-r--r--   3 corbett supergroup    5730747 2013-02-28 22:23 /user/corbett/datasets/lahman2012/Appearances.csv
-rw-r--r--   3 corbett supergroup       7304 2013-02-28 22:23 /user/corbett/datasets/lahman2012/AwardsManagers.csv
-rw-r--r--   3 corbett supergroup     240867 2013-02-28 22:23 /user/corbett/datasets/lahman2012/AwardsPlayers.csv
-rw-r--r--   3 corbett supergroup      16719 2013-02-28 22:23 /user/corbett/datasets/lahman2012/AwardsShareManagers.csv
-rw-r--r--   3 corbett supergroup     220135 2013-02-28 22:23 /user/corbett/datasets/lahman2012/AwardsSharePlayers.csv
-rw-r--r--   3 corbett supergroup    6488747 2013-02-28 22:23 /user/corbett/datasets/lahman2012/Batting.csv
-rw-r--r--   3 corbett supergroup     644669 2013-02-28 22:23 /user/corbett/datasets/lahman2012/BattingPost.csv
-rw-r--r--   3 corbett supergroup    8171830 2013-02-28 22:23 /user/corbett/datasets/lahman2012/Fielding.csv
-rw-r--r--   3 corbett supergroup     298470 2013-02-28 22:23 /user/corbett/datasets/lahman2012/FieldingOF.csv
-rw-r--r--   3 corbett supergroup     573945 2013-02-28 22:23 /user/corbett/datasets/lahman2012/FieldingPost.csv
-rw-r--r--   3 corbett supergroup     175990 2013-02-28 22:23 /user/corbett/datasets/lahman2012/HallOfFame.csv
-rw-r--r--   3 corbett supergroup     130719 2013-02-28 22:23 /user/corbett/datasets/lahman2012/Managers.csv
-rw-r--r--   3 corbett supergroup       3662 2013-02-28 22:23 /user/corbett/datasets/lahman2012/ManagersHalf.csv
-rw-r--r--   3 corbett supergroup    3049250 2013-02-28 22:23 /user/corbett/datasets/lahman2012/Master.csv
-rw-r--r--   3 corbett supergroup    3602473 2013-02-28 22:23 /user/corbett/datasets/lahman2012/Pitching.csv
-rw-r--r--   3 corbett supergroup     381812 2013-02-28 22:23 /user/corbett/datasets/lahman2012/PitchingPost.csv
-rw-r--r--   3 corbett supergroup     700024 2013-02-28 22:23 /user/corbett/datasets/lahman2012/Salaries.csv
-rw-r--r--   3 corbett supergroup      42933 2013-02-28 22:23 /user/corbett/datasets/lahman2012/Schools.csv
-rw-r--r--   3 corbett supergroup     180758 2013-02-28 22:23 /user/corbett/datasets/lahman2012/SchoolsPlayers.csv
-rw-r--r--   3 corbett supergroup       8369 2013-02-28 22:23 /user/corbett/datasets/lahman2012/SeriesPost.csv
-rw-r--r--   3 corbett supergroup     550032 2013-02-28 22:23 /user/corbett/datasets/lahman2012/Teams.csv
-rw-r--r--   3 corbett supergroup       3238 2013-02-28 22:23 /user/corbett/datasets/lahman2012/TeamsFranchises.csv
-rw-r--r--   3 corbett supergroup       1609 2013-02-28 22:23 /user/corbett/datasets/lahman2012/TeamsHalf.csv
-rw-r--r--   1 corbett supergroup        129 2013-03-02 20:22 /user/corbett/datasets/lahman2012/_partition.lst
-rw-r--r--   3 corbett supergroup      30497 2013-02-28 22:23 /user/corbett/datasets/lahman2012/readme 2012.txt
{% endhighlight %}


##Overall design
For more information on the Lahman 2012 database files check out the readme 2012.txt file included in the download.

Here's the outline of what our code is going to do, it's pretty simple I think.  First we're going to code a Mapper that will recieve a Line of text from the Batting.csv file and parse the playerId then use it as a key, additionally the code will parse specific stat fields and emit them as a csv-line along with the key.  Output from the mappers are the input to the Reducers, so our Reducer code will take each players list of yearly stats and produce a career stat line.  What we end up with is a file containing the career stats for every baseball player.

![MapReduce Diagram](/images/baseballmr/BattingMR.png "MapReduce Diagram")

##The code
Grab the code from [github](https://github.com/cworks) by cloning it to your local box or by downloading an archive of it.  Once you download the code you'll have the following directory structure:
{% highlight bash %}
corbett@corbett17:/tmp/sandbox|⇒  tree
|____hadoop-foo
| |____net.cworks.mrfun
| | |____pom.xml
| | |____README.md
| | |____src
| | | |____main
| | | | |____java
| | | | | |____PlayerBatting.java
| | | | | |____PlayerBattingMapper.java
| | | | | |____PlayerBattingReducer.java
| | | | |____resources
| | | | | |____log4j.properties
| | | |____test
| | | | |____java
| | | | | |____BattingTest.java
| | | | | |____PlayerBattingStatsTest.java
{% endhighlight %}
The project is [Maven](http://maven.apache.org/) based and you can build it by cd'ing into ```hadoop-foo/net.cworks.mrfun``` then type: ```mvn package```.

##Driver class
MapReduce jobs are typically implemented by a driver class that initializes configuration required to run the job.  Almost all jobs will need theses things configured:

+ Create a ```Job``` instance
+ Input Path - Typically a file or directory in HDFS holding some data your Mapper requires
+ Output Path - A path where output will be written
+ Mapper Class - Your Mapper class (one that extends org.apache.hadoop.mapreduce.Mapper)
+ Reducer Class - Your Reducer class (one that extends org.apache.hadoop.mapreduce.Reducer)

The following snippet of code is from ```PlayerBatting.java``` which is the driver class for this tutorial, you can find it in ```src/main/java```.  Check out the ```job.setJarByClass()``` method, this is pretty neat method, it sets the jar file by finding where a given class came from.

{% highlight java %}

/**
 * main method
 * @param args
 */
public static void main(String[] args) throws Exception {
    Logger logger = LoggerFactory.getLogger(PlayerBatting.class);
    logger.info("PlayerBatting starting up...");

    /*
     * The expected command-line arguments are the paths containing
     * input and output data. Terminate the job if the number of
     * command-line arguments is not exactly 2.
     */
    if (args.length != 2) {
		System.out.println("Usage: PlayerBatting <Batting.csv> <PlayerBatting.csv>\n");
		System.exit(-1);
    }

    /*
     * Instantiate a Job object for your job's configuration.  
     */
    Job job = new Job();
    
    /*
     * Specify the jar file that contains your driver (PlayerBatting class), mapper, and reducer.
     * Hadoop will transfer this jar file to nodes in your cluster running mapper and reducer
     * tasks.
     */
    job.setJarByClass(PlayerBatting.class);
    
    /*
     * Specify an easily-decipherable name for the job.
     * This job name will appear in reports and logs.
     */
    job.setJobName("Career Batting Stats");

    /*
     * Specify the paths to the input and output data based on the
     * command-line arguments.
     */
    FileInputFormat.setInputPaths(job, new Path(args[0]));
    FileOutputFormat.setOutputPath(job, new Path(args[1]));

    /*
     * Specify the mapper and reducer classes.
     */
    job.setMapperClass(PlayerBattingMapper.class);
    job.setReducerClass(PlayerBattingReducer.class);

    /*
     * Specify the job's output key and value classes (output from reducer)
     */
    job.setOutputKeyClass(Text.class);
    job.setOutputValueClass(Text.class);

    /*
     * Start the MapReduce job and wait for it to finish.
     * If it finishes successfully, return 0. If not, return 1.
     */
    boolean success = job.waitForCompletion(true);
    System.exit(success ? 0 : 1);
}
{% endhighlight %}

##Mapper class
The Mappers purpose is to parse some data and emit a Key-Value pair.  In this example the Mapper gets a line of text from the Batting.csv file and emits the playerId as a key and some select batting stats.  Keep in mind that your map method is going to execute for each line of the input file so take care to code defensively and efficiently.  You don't want to read one million lines then throw a NullPointerException because of some bad data.

To define a map function for your MapReduce job, extend the ```org.apache.hadoop.mapreduce.Mapper``` class and override the map method, you need to specify four important parameters:

+ Input key type
+ Input value type
+ Output key type (this is also the Input key type to the Reducer)
+ Output value type (this is also the Input value type to the Reducer)

{% highlight java %}

import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

public class PlayerBattingMapper extends Mapper<LongWritable, Text, Text, Text> {

    /*
     * The map method runs once for each line of text in the input file. The method receives a key
     * of type LongWritable, a value of type Text, and a Context object.
     */
    @Override
    public void map(LongWritable key, Text value, Context context)
        throws IOException, InterruptedException {
        
        // logic to deal with the line of text (value variable) goes here

        // emit key, value
        context.write(new Text(battingData[0]), new Text(sb.toString()));
    }
}

{% endhighlight %}

##Reducer class
The Reducers job is to "do something" with all the mapped values for a particular key.  So in our example the Reducer will receive a playerId and an list of data associated with that playerId.  The list contains batting stats for each year that a player played baseball.  Our Reducer sums up the stats to create the players career batting stats.

To define a Reducer class you need to extend ```org.apache.hadoop.mapreduce.Reducer``` and override the reduce method which will receive a key (the Output key from Mapper) and an Iterable (list of Output values from Mapper).

{% highlight java %}

import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;

public class PlayerBattingReducer extends Reducer<Text, Text, Text, Text> {

    /**
     * Reduce yearly player stats to career stats
     * @param key
     * @param values
     * @param context
     */
    @Override
    public void reduce(Text key, Iterable<Text> values, Context context)
        throws IOException, InterruptedException {

        String careerBattingStats = null;
        String battingData = null;
        for (Text line : values) {
            battingData = line.toString();
            careerBattingStats = sumStats(careerBattingStats, battingData);
        }
        // emit key and final result
        context.write(key, new Text(careerBattingStats));
    }
}

{% endhighlight %}

##Compile the code
{% highlight bash %}
corbett@corbett17:~/dev/hadoop-foo/net.cworks.mrfun|master⚡ ⇒  mvn clean package 
[INFO] Scanning for projects...
[INFO]                                                                         
[INFO] ------------------------------------------------------------------------
[INFO] Building net.cworks.mrfun 0.0.1-SNAPSHOT
[INFO] ------------------------------------------------------------------------
...
...
...
[INFO] Building jar: /Users/corbett/dev/hadoop-foo/net.cworks.mrfun/target/net-cworks-mrfun.jar
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
{% endhighlight %}

##Run the job
Running the MapReduce job is pretty easy.  You run ```hadoop jar``` passing the jar file that contains the Mapper, Reducer and Job class, plus the input file and output location  *(recall we specified an input and output path when setting up the Job)*

```hadoop jar net-cworks-mrfun.jar PlayerBatting datasets/lahman2012/Batting.csv output/career-batting-stats```

{% highlight bash %}
corbett@corbett17:~/dev/hadoop-foo/net.cworks.mrfun/target|master⚡ ⇒  hadoop jar net-cworks-mrfun.jar PlayerBatting datasets/lahman2012/Batting.csv output/career-batting-stats
13/03/28 21:36:51 INFO PlayerBatting: PlayerBatting starting up...
13/03/28 21:36:52 WARN mapred.JobClient: Use GenericOptionsParser for parsing the arguments. Applications should implement Tool for the same.
13/03/28 21:36:53 INFO input.FileInputFormat: Total input paths to process : 1
13/03/28 21:36:53 WARN util.NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
13/03/28 21:36:53 WARN snappy.LoadSnappy: Snappy native library not loaded
13/03/28 21:36:53 INFO mapred.JobClient: Running job: job_201303282055_0003
13/03/28 21:36:54 INFO mapred.JobClient:  map 0% reduce 0%
13/03/28 21:37:02 INFO mapred.JobClient:  map 100% reduce 0%
13/03/28 21:37:12 INFO mapred.JobClient:  map 100% reduce 33%
13/03/28 21:37:14 INFO mapred.JobClient:  map 100% reduce 100%
13/03/28 21:37:17 INFO mapred.JobClient: Job complete: job_201303282055_0003
13/03/28 21:37:17 INFO mapred.JobClient: Counters: 26
13/03/28 21:37:17 INFO mapred.JobClient:   Job Counters 
13/03/28 21:37:17 INFO mapred.JobClient:     Launched reduce tasks=1
13/03/28 21:37:17 INFO mapred.JobClient:     SLOTS_MILLIS_MAPS=11305
13/03/28 21:37:17 INFO mapred.JobClient:     Total time spent by all reduces waiting after reserving slots (ms)=0
13/03/28 21:37:17 INFO mapred.JobClient:     Total time spent by all maps waiting after reserving slots (ms)=0
13/03/28 21:37:17 INFO mapred.JobClient:     Launched map tasks=1
13/03/28 21:37:17 INFO mapred.JobClient:     Data-local map tasks=1
13/03/28 21:37:17 INFO mapred.JobClient:     SLOTS_MILLIS_REDUCES=11244
13/03/28 21:37:17 INFO mapred.JobClient:   File Output Format Counters 
13/03/28 21:37:17 INFO mapred.JobClient:     Bytes Written=933532
13/03/28 21:37:17 INFO mapred.JobClient:   FileSystemCounters
13/03/28 21:37:17 INFO mapred.JobClient:     FILE_BYTES_READ=4911390
13/03/28 21:37:17 INFO mapred.JobClient:     HDFS_BYTES_READ=6488878
13/03/28 21:37:17 INFO mapred.JobClient:     FILE_BYTES_WRITTEN=9870081
13/03/28 21:37:17 INFO mapred.JobClient:     HDFS_BYTES_WRITTEN=933532
13/03/28 21:37:17 INFO mapred.JobClient:   File Input Format Counters 
13/03/28 21:37:17 INFO mapred.JobClient:     Bytes Read=6488747
13/03/28 21:37:17 INFO mapred.JobClient:   Map-Reduce Framework
13/03/28 21:37:17 INFO mapred.JobClient:     Reduce input groups=17862
13/03/28 21:37:17 INFO mapred.JobClient:     Map output materialized bytes=4911390
13/03/28 21:37:17 INFO mapred.JobClient:     Combine output records=0
13/03/28 21:37:17 INFO mapred.JobClient:     Map input records=96601
13/03/28 21:37:17 INFO mapred.JobClient:     Reduce shuffle bytes=4911390
13/03/28 21:37:17 INFO mapred.JobClient:     Reduce output records=17862
13/03/28 21:37:17 INFO mapred.JobClient:     Spilled Records=192942
13/03/28 21:37:17 INFO mapred.JobClient:     Map output bytes=4718442
13/03/28 21:37:17 INFO mapred.JobClient:     Total committed heap usage (bytes)=296091648
13/03/28 21:37:17 INFO mapred.JobClient:     Combine input records=0
13/03/28 21:37:17 INFO mapred.JobClient:     Map output records=96471
13/03/28 21:37:17 INFO mapred.JobClient:     SPLIT_RAW_BYTES=131
13/03/28 21:37:17 INFO mapred.JobClient:     Reduce input records=96471
corbett@corbett17:~/dev/hadoop-foo/net.cworks.mrfun/target|master⚡ ⇒ 
{% endhighlight %}

##See the Results!
We use ```hadoop cat``` (*with grep*) to find career stats for the great Chicago Cub, Ryan Sandberg. 
See the Results [G,AB,R,H,2B,3B,HR,RBI,SB,CS,BB,SO,IBB,HBP,SH,SF,GIDP] 
{% highlight bash %}
corbett@corbett17:~ hadoop cat output/career-batting-stats/part-r-00000 | grep sandbry 
sandbry01 2164,8385,1318,2386,403,76,282,1061,344,107,761,1260,59,34,31,71,139
{% endhighlight %}

How do we know this correct?  Well it matches [Baseball Reference](http://www.baseball-reference.com/players/s/sandbry01.shtml)!  Woo-Hoo!
  



















