#First Synthesis Program

To create a basic first synthesis program, we need to generate a series of values that repeat over a given interval. This interval is known as the *period*.<br><br>
To avoid the use of libraries and external dependencies, our goal for this program will be to print our waveform values directly to the terminal. As we will see later, these values will be able to be sent to digital audio converted for us to hear the result...<br>

###Loop Structure

The basic structure we will use to create our repeating pattern will be based on a simple linear ramp, essentially a sawtooth signal...

```
while(n < END)
{
	s = n % max;
	n++;
}
```
This structure will allow us to print values of s, which increase at the same integral rate as n. However, the `%` modulus operator will allow us to reset this ramp over a period of `max`.

###Example Program

The entire program might look like...

```
#include <stdio.h>
#define END 44100

int main()
{
    unsigned int n = 0, max = END/441;
    float fmax = (float) max, s;

    while(n < END)
    {
        s = (n % max)/fmax;
        printf("%f \n", s);
        n++;
    }
    return 0;
}
```
The resulting output of this program would be a series of looping printed values that outline a rising ramped waveform.
###Considerations
- **Total Values Printed** In this program, we define the END of the program to be 44100 units, which will result in exactly that many printed values since our loop counter `n` increments by one on each loop.
- **Period** - we can find the period of our waveform by considering how many values are printed for each repetition of our waveform. This is defined by the value we are using the `%` on, which in this case is equivalent to `max`
$44100/441 = 100$
- **Scaling** - Our value of `max` will also tell us how many values we have in each loop, which is 100. However, we want to scale this value to be within the range of values that a DAC might expecting, being 0.00 - 1.00. So we scale our value by `fmax` to achieve this.
- **Frequency** - Since we haven't defined a unit of time for our program, its harder to understand what frequency might mean. However, we've defined our *period* as 100 units, and since we know...<br><br>
$Frequency = 1/Period$<br><br>
We can then say...<br><br>
$Frequency = 1/100$ units <br><br>
This makes sense if we consider that the cycle repeats once every 100 iterations, thus giving us an intuitive way to think about frequency in this example.

##Bringing back time 
###Period
 Now that we have unit definitons of our period and frequency, we can define a value for our time relative to our arbitrary units in the form of a sampling rate. If we say our sampling rate is 44100 units per second, we can obtain our period and frequency in terms of seconds by canceling out our units.
 
 Period = 100 units, Sampling Rate = 44100 units/1 second <br><br>
 Our goal is to eliminat the "unit" variable by divide our two "unit" units. To do this, lets first get the inverse of our sampling rate so we can easily cancel out our "unit" unit.<br><br>
 1/Sampling Rate = 1 second / 44100 units <br><br>
 Now it becomes simple...<br><br>
(1 second / 44100 units) x 100 units = 100/44100 seconds = 1/441 seconds <br><br>
Giving us a final period of $1/441 = 0.002268$ seconds
###Frequency
Now we can calculate frequency by simply taking the inverse of our period, but let's first do a similar process as above to check our answer...<br>
Our frequency is currently defined as 1 cycle / 100 units<br>
Since our goal is to get our value in terms of cycles per 1 second, we can do a similar process to the period...<br>

Sampling Rate = 44100 units / 1 second, Frequency = 1 cycle / 100 units<br>

(44100 units / 1 second) x (1 cycle / 100 units) = 44100 cycles/100 seconds...<br>

44100/100 = 441 cycles / 1 second <br><br>
And so, our final frequency when giving a sampling rate of 44100 samples per second will result in a 441 Hz tone. If we check this by taking the inverse of our previously calculated period, we find that is in fact correct.

1 / 0.002268 = 1 / (1/441) = 441

##Plotting the Waveform
###Redirecting Output with '>'
We can redirect the output of our program from the terminal using the `>` charachter. This allows us to redirect a program's output to a new file, or another program. If we want to save this data into a text file, we might use type this into the terminal...<br>
`./saw > wave.txt`<br>
giving us a new text file name `wave.txt` containing all 44100 values printed by the program.
###Redirecting Input with '<'
We can also redirect input to a program with `<`. To test this function, lets create a simple plotting program that will read in values, and plot them vertically on the terminal...

```
#include <stdio.h>
#include <math.h>

int main()
{
    float sample;
    int i = 0, s, nsamp = 0;

    do
    {
        i = scanf("%f", &sample);//read it
        s = (int) round(sample * 100);//scale it
        printf("[%5d]", nsamp++);//sample index
        while(--s >= 0) printf("-");//plot value
        printf("*\n");
    }
    while(i != EOF);
    return 0;
}

```
After compiling this program, we can direct our file `wave.txt` into this program, which will read each line of text in through `scanf()` with the command...<br>
`./plot < wave.txt`<br>
and print our waveform to the terminal
###Pipe "|"
In our terminal flow, the text file `wave.txt` acts as a middle man between our actually goal of printing our waveform to the terminal. We can skip this step by using the "pipe" symbol `|` and directly send our `./saw` program to `./plot` with the command...<br>
`./saw | ./plot`<br>
This will produce the saw result as `./plot < wave.txt`
##Getting Sound
If we actually want to listen to our sound file, there is a way we can convert our text file into a readable file for the dac. It first requires us to convert the text into a raw binary file that can be read by a an audio software like Audacity.
To do this, we will be using the file `tobin.c` which reads as follows...

```
#include <stdio.h>

int main(){
  float f;
  while(fscanf(stdin, "%f", &f) > 0)
    fwrite(&f,sizeof(float), 1,stdout);   
  return 0;
}

```
With this file, we can now create a raw binary file that can be imported to Audacity. We can combine the pipe `|` command with the output redirect command `>` to create a terminal command that combines both of our programs and gives us our desired output file...<br>
`./saw | ./tobin > output.raw`<br>
With this output file, we can import it directly to audicity with the **import raw file** option. Audacity gives us options for raw imports, and we want to ensure that we select...<br>
1. 32-bit float <br>
2. Mono<br>
3. 44100 Sample Rate<br><br>
Now if we playback the file on Audacity, we should be able to hear our waveform.<br><br>
**Note** - Our resulting file has a DC offset of 1 and is scaled by 0.5 from a normalized waveform. This isn't a major problem for this example program, however ideally we would like our wave forms to be centered at 0 and be normalized to the range (-1.0 - 1.0). This is because our printed values are only in the range of 0.0 to 1.0 and we never corrected this, however this is a consideration for future programs.

 
 






