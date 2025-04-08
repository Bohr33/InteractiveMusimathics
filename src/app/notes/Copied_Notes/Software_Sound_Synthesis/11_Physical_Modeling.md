#Physical Modeling
Physical modeling attempts to model the physical description of what makes a sound. The model synthesis is analogy to the real technique.

###Instrument Development
One of the many available methods to do physical modeling is through **waveguide** synthesis.

##Digital Waveguide Synthesis
A digital waveguide is a computational model of a traveling wave on an instrument. It is a basic component of a umber of physical model systems.

The idea is that a traveling wave can be modelled by a block of samples that represent it at points along its length.

It can be modeled using digital delay line.

###Delay lines
Delay lines are simple processors that store audio samples for a specified amount of time, releasing them aftwards.

In physical modelling, they are used to implement digital waveguides. The can also model a travelling wave on a string, pipe, bar.

###Delay In Csound
A single delay can be done with
`asig delay ain, idel`

Or we can use `delayr` and `delayw` which will read or write from delay memory, this is much more flexible and allows for things like feedback delay.

###String Waveguide
The idea behind this is that 2 delays are used to create a system similar to an oscillator string. An input is fed into a delay, its output is inverted and send into another delay, and that delay is send back into the original delay. 

The inversion refelects how string waves reflect off closed boundries. They invert off of the boundries.

###String Fundamental Frequency
f0 = c/2L<br>

###Waveguide Fundamental Frequency
The f0 of a waveguide model is determined in a similar length.

The speed of sound in a delay line is basically determined by the sampling rate fs. An audio sample travels Nd positions in a delay line Ndfs seconds. So we can say that its' speed c is fs samples/s.

f0 = fs/2Nd = fs/2dfs = 1/2d

###Initial Conditions
Just as in a string, the waveguid emodel needds an excitation to start moving. We can use the envelope shape of a plucked string as an excitement.



###Losses and Decay
To model a real string, its important to take into account the energy loss that occurs in real life. A string decays throughout its lifetime, so we can include this in our model.

Losses are generallly odelled by lowpass filters that can be inserted somehwere in the waveguide loop. Using just a gain to gradually diminish the string is not realistic, that's why a filter is a better solution, a lowpass filter will allow the Low frequecies to be present longer.Filters will then extract a bit of high-frequency energy every tmie the wave is reflected.

**See slides for improved model**.

##Karplus-Strong
This was one of the first practical examples of physical model synthesis to be put forward. It was first released in 1978-79.

The principle is similar to what we have seen, a delay line is used to model a string, with a filter in the feedback loop to effect the dcay.

The unique parts of karplus strong are...

1. A single delay line is used
2. we initialize it with random numbers (noise)
3. A different and simpler lowpass filter is employed. Karplus and Strong suggested filter designs for both plucked string and drum lik eemulation.

###Lowpass Filter
See slides!


###Implementing KS
Karplus Strong can be implemented with the following charachteristics
1. A noise generator, for excitation signal
2. A signal switch/gate
3. A single delay line with feedback
4. A lowpass filter.

###Tuning Issues
There are some problems with the KS design. one is that there is a small tuning error that occurs from the algorithm. If compared with a reference tone you will hear a small amount of beating from the pitch offset.


###Improved Tuning
We can imporve the tuning by using fraction-sample delays. It is possible to implement this by using an allpass filter in the feedback loop, which can extend the delay by a small amount. This can also be achieved by using interpolation when reading the delay line.

**Taps** - this is an operator that is put in between a set of delay times that allow us to retrieve the values at this point. It "taps" the audio coming through.

We can Tap a delay line at an interpolated position in csound using....
`delaytap` - linear interpoation
`delaytap3` - cubic interpolation

###Frequency and Decay Rate
IF we remove the LP filter, the output will not decay at all.

If we replace the LP by a simple gain scale G < 1, we can make the output decay at an exact rate.

- at aevery delay interval 1/f0 seconds, the signal is multiplied by G
- Since this repeats f0 times per secon, after Td seconds, the sound has decayed by a factor of G^(T0*f0)

###Setting the decay rate
We can set G to achieve an exact decay of x dB. A decay x is defined in dB as<br>
`x = 20log10(A)`<br>
We now set `A = G^(T0*f0)` as the decay factor after Td. We now get G in terms of x<br>
```
x = 20Tdf0log10(G)
G = 10^(x/20Tdf0)
```

##Plucked String Model
Using the improved model, we can tap the KS delay line at different positions to model a "pickup" like on a guitar.





