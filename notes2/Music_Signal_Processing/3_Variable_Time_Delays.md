#Variable Delay Lines
Variable delay lines allow the user to adjust the time of the delay in real-time. 

Some of the applications of time variable delays include flanging/phasing, chorus, vibrato, pitch shifters, Doppler effect simulation.

Modulating a variable delay may cause an assocated change in pitch, which is exploited in some effects.

###Implementation
In Csound, a variable delay can be implemented with the **vdelay** opcode. With a variable delay, you must let the processor know what your maximum delay time is. This is so the processor can allocate the appropriate memory during initialization.

Variabiable delays can also be achieved using the opcodes **delayr**, **delayw**, and one of the following.

1. deltapi - uses linear interpolation
2. deltap3 - cubic
3. deltapn - Higher-order interpolation

These work by *writing* a signal to a buffer, then *reading* the signal from the buffer using the opcodes above, which create a delay read/write loop. The tap opcodes can then be used to extract audio from the buffer at different times.


###Port opcode
Smoothes changes

The argument for port includes a *half-time* parameter. This is the time it takes for port to reach half the target value. Because of this, port will never actually reach the value, it will just continue to to get closer until a new value is set.


##Flanger
Flangers are done by using a varible delay with a slow LFO modulating the delay time. See slides for spectrograms of a flanger with various settings.

###Flanger Delay Time and Frequency
Delay time can be put in terms of the comb filter natural frequency, that is the fundamental frequency of the resonance peaks. The amplitude reponse is then a series of peaks at multiples of this fequency.

With this, we can tune a flanger to a given pitch. We only need to define the time $\tau$ indirectly in terms of the natural frequency, which is the reciprocal.

$$
\tau = \frac{1}{f_0}
$$

###Tuning the filter
Including a lowpass filter will also have an effect in the total loop time. 

This is very important for situations where we want to tune the fundamental frequency precisely. We need to account for the added filter delay. 



###String Resonator
We can use this to fix the problem,(just read the slides).

Note: use the **interp** opcode to interpolate a k-rate signal through a-rate.


##Chorus
The chorus effect is created when a number of players play together. The small deviations of tuning and onset time create a thickening of the melodic line.

This effect can be achieved by summing a number of delayed signals whose delay times vary constantly. This modulation can be create by an LFO or by a band limited noise generator with a very low frequency setting.

The average delay should be around 10 to 30 ms, and the delay timemodulation should not be very wide.


###Delay Time Modulation
A chorus design can be implemented so the delay time modulation source is either an LFO, or a low-frequency bandlimited noise source.

The modulation signal and amplitude need to be carefully considered in order to obtain a subtle effect on the output.

In order to vary the pitch with a variable delay, we need to consider the *rate* of delay time change. A rate increase will be perceived as higher pitch, while a decrease is perceived as lower.


###Delay Time Rate of Change

**Frequency Change**

- Increasing the modulation frequency makes the delay time change at a faster rate.
- Reducing the modulation frequency slows down the rate of change.

**Amplitude**

- Wider modulation make sthe delay time rate of change increase
- Narrower modulation reduces the delay time change at a slower rate.




###Variable Delays and Pitch
When the delay time rate of change start exceeding the ranges used for flanging and chorus, a more pronounced pitch shift may start to be noticeable. In fact a slight pitch modulation is already part of the the chorus effect.

This is because therr will be a significant difference between the delay line write speed and the readout speed.


###Increasing Delay

When the delay time is increasing, the read position of  delay line is moving at a slower rate than the write position (wihich runs at the sampling. This produces a lower pitch. 

###Decreasing Delay
When the delay time is decreasing, the read position of the delay line is moving at.a faster rate then the write position. This produces a higher pitch.

We can take advantage of these effects to produce a vibrato effect.

##Vibrato
If we modulate the delay time with a periodic source, depending on th emodulation width, we will get a periodic change of pitchl. Generally, the width is not more than a few milliseconds. 

As with the chorus effect, to get a constant vibrato interval for differe...


###Waveshapes of Vibrato
The key aspect of the vibrato effect is the choice of the right wveeshape. We will need t choose on ethat is not linear, because otherwise we will not get a smooth vibrato.

Increasing delay times realted to pitch shift: the rate of change in delay time determines the pitch shift. (pitch shift is the derivative of the delay time)...

###Vibrato and Delay Time Width
We can therefore relate the width of the vibrato to both tedelay time modualtion width and the modulation frequnecy. 

1. Triangle Wave: The rate of change of triangle wave is a square wave. When the signal rises, the raate is positive, when it falls, it is negarive. The resulting pitch interval p alternates between 
`p = 1 += delta f`

2. Sine wave: The rate of change (derivate) of a sine wave is a cosine wave. 



###Sine Wave Vibrato




###Classic Analgoue Vibrato
It is also possible to simulate a change in delay time using fixed delays by crossfading delay taps and mixing them together. 

This is the mechanism behind the first kind of electronic vibrato effect developed for the Hammond organ, the vibrato scanner.

Since Hammond organs rely ona steady, fixed RPM tonewheel generator, it is not possible to vary the pitcho fthe osuurce signals. The output is always steady in frequency.

The vibrato scanner was developed to provide an electronic....

##Vibrato Scanner Mechanism

There are two main parts to the vibrato scanner.

1. A fixed electronic delay line: this is acascade of LC stages each adding around 0.006 ms of delay, to which the input signal is applied. Each stage has an output tap connect to. a set of stationary lates arranged in a circle.


SEe slides! Awesome image and diagram of the physical electro-mechanical wheel used to create vibrato on the hammond organ

###Digital Model
A gaussian function can be used to emulate the pickups on the wheel the spins around to pick up the delayed signals. 

