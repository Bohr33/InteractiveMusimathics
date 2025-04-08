#Reverberation
When modeling real-world reverberation, it is usually broken up into 2 stages: **Early reflections** and **diffuse reverberation**.

Four Factors influence the characteristics

1. Reverberation Time
2. Frequnecy Dependency
3. First reflection delay
4. Echo density growth

###Reverberation Time
The time it takes for a reverberated sound to decay to 1/1000 of its original intesity (-60 dB), known as $T_{60}$. This is simply a reference to compare the reverberation time between different reverberations.

However, **reverb time** is not uniform across the frequency spectrum, and high frequencies tend to decay faster.

###First Reflection Decay
The time delay between the direct sound and the first reflection often reflects the size of the reverberant space. It will vary between 5 and 50 milliseconds. If the time is shorter than 5 msecs, it will be perceived as a very,very small space. Longer than 50 milliseconds and it will be perceived as an echo.

###Echo Density Growth
This relates to the time the early reflections make to grow to a level of 1 echo/msec. Again, bigger rooms will imply longer times. A good value is around 100 msecs.


###Distance
One factor affecting our perception of distance to the source of a sound is the relationship between direct and reverberated signal levels.

1. Sound sources are perceived as closer if the direct signal is more intense than the reverberation. 
2. Very little of the direct sound of a distant source reaches the listener. 

Another cue is the loss of high frequencies. High frequencies fade out more quickly than the low frequencies so this can tell us that a source is closer or further away.


##Implementation
###Component Reverberators
Digital Reverbs often break down the steps of reverberation into multiple componenets. The two basic component reveberators are: Comb Filters, and Allpass Filters.

##CombFilters
Comb filters are a simple delay with feedback.

It can be defined by a pair of equations such as...

$$
w(n) = x(n) + gw(n-d)\\
y(n) = w(n-d)
$$


###Impulse Response
The impulse response of a system is a way we can describe its operation. The impulse signal is a single sample followed by 0s. By running this impulse through a system, we can obtain its impulse response.

This is known as a Linear Time Invariant System. THis is because the response linear and time invariant (lol).

We can run this impulse response through the comb filter to obtain the filters response.

###Amplitude Response
From the impulse we can get the amplitud erepsonse. This is defind as the response of the system to sinusoids at different frequencies. The amplitude response is obtianed by getting the spectrum of the impulse response. (FFT). In the case of the comb filter, the amplitude response looks like an inverted comb, hence the name.

See slides for graph

The height of peaks and troughs are dependant on the gain g, approaching infiinity and 1/2 respectively, as it approaches 1. 

###Minima and Maxima
The filter **natural frequency** is the reciprocal of the delay time, $\tau$. The maxima are at multiples of this frequency. The reverb time $T_{60}$ can be used to define th egain g. 

$$
g = \frac{1}{1000}^{\frac{\tau}{T_{60}}}
$$

###Comb Filter applications
Comb filters are used for other effects, not just reverb. These effects stem from the fact that the comb filter also implements a simple digital waveguide.

##Allpass Filters
Allpass filters are similar to comb filters, except they implement a feedforward signal as well.
Parameters are similar to the comb filter: there is a loop time, and a g value.

$$
w(n) = x(n) + gw(n-d)\\
y(n) = w(n-d) - gw(n)
$$

###Allpass Impulse Response
Teh filter starts by outputting a sign-reversed impulse, because the feedforward gain is negative. The decay is exponential, but mre gradual than that of a comb filter with the same g. 

###Frequency Response of Allpass
The most important property of the allpass filter is its theoretically flat amplitude response. However, they tend to introduce complex phase delays. Allpass filters are colourless only in their steady-state. The might colour an impulsive sound. 

Because of these charachteristics, the allpass filter is connected in series for reverberation. Comb filters however work better in parallel.



##Schroeder Reverberator
The schroedder Reveberator is an early digital reverberator designed with comb and all-pass filters. It contains 4 comb filters in parallel which are then sent into 2 allpass filters in series. There are a few variable components we can set in this design.

###Comb Filter loop times
The reverberators strive to dilever the following charachteristics

1. Fairly dense total impulse response
2. Reasonably smooth exponential decay
3. Random time pattern between pulses to prevent colouration

Comh loop times are chosen to have no common factors, this prevents alignment between each comb filters and gives a more natural response. 

###Comb Loop Time and Room Simulation
The atual loop times for th ecomb filters will reflect the environment to be simulated. The arrival of the first reflection and the growth of echo desnity will determine th size of the acoustic space.
So the loop times will be chosen to match that: longer loop times for larger spacse. Shorter for smaller spaces. 

Ex. arond 50 msecs, ratio of 1.7 to 1 for a concert hall. 

###Allpass loop time
The function of the allpass filters in the schroder design is to increase the echo desnity.

Because of this, the loop times are relatively short to avoid audible echoes and also to provide an echo desnity growth that reaches the 1 echo/mssec threshold. Otherwise the reverberation will not be realistic. The loop time of the first allpass should not exceed 6 msec, and the second should be even shorter.


###Filtering
The schroeder reverb sounds quite artificial. One reason for this is the decay time is completely flat, i.e. it decays at the same rate for all frequencies. We can fix this with low-pass filtering.

In order to accurately represent how a real revebration constantly decays its high frequencies, we can put a low-pass filter within our comb filter design so that as it moves through the filter, it will continually lose high frequency data.

See slides for diagram.

###Freeverb
This is a derivitave reverb design from the Schroeder design. It extends the number of comb and allpass filters to be 8 and 4 respectively. For stereo, 2 reverbs are used with slightly different parameters.

The comb loops times are 25.3, 26.9, 28.9, 30.7, 32.6, 33.8, 35.3 and 37.4 ms. Allpass loop times are 12.6, 10, 7.7 and 5 ms. 


###Feedback Delay Networks
Feedback delay networks (FDN) have been used to implement diffuse-field reverberation. They are an extension of the idea of parallel comb filters. Here, instaead of the feedback being to each individual comb, each delay line of the network will receive a combination of all the delay outputs. 

To regulate the feedback, a mixing matrix for each feedback path is used. Lp filters are added to the feedback path to simulate high-frequency loss. Each delay + LP is a waveguide modellin g a reveberation path.

See slides for a diagram of FDN.


See slides for a breakdown of the matrix used for mixing the FDN signals.


###Matrices in Csound
The matrices can be defined in Csound at init-time as two-dimensional arrays.

```
is[][] init 2,4;
im[][] init 4,4;

see slides...
```

###Pre-built reverbs in Csound

1. reverb = simple schroeder reverb
2. nreverb - expanded schroeder network witha. user-defined number of allpass + combs, and with high-frequency attentuation.
3. reverbsc - a FDN reverb with 8 delay lines
4. freeverb - stereo reverb based on a schroeder design, 8 combs and 4 allpass. 
5. babo - physical model of a room+listener (a geometric model)
6. hrtfreverb = a binaural diffuse-field reverberator based on FDNs.










Question: What is the area under a sound waves amplitude over time? Does this have any meaning? i.e. what is the area under the curve of an audio file? Could it be total energy?


IDea: Build an audio file integrator, and derivitator. What would happen?

Idea for Final: Impulse Response Designer. 