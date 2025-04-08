#Pitch FX

###Index of Modulation
We know if FM that the deviation is equivalent to the product of $f_m$ and the index of modulation $I$.

Thus we can equate...


$$
\pi\Delta_df_m
$$



###Controlling the Modulation

From this, we can use th einex of modulation I to determine the width of delay time modualtion.

..


###Adaptive FM



###Feedback Adaptive FM
Sinc eadaptive FM is just phase modulation, we can use feedback to modulate the delay time. This is an adaptive FM form of Feedback FM. We need to set ksmsps to 1 in order to fully realise it. Maximum delay is set to 16ms since the index is normally set to 0.



##Spatial Effects
###Doppler Shift
Doppler shift is the perveived chang ein frequency of a waveform due to a moving source. 

The perceived frequency $f_p$ will be relate to the original frequency $f_0$ by the following relationship....

$$
f_p = f_0 \frac{c}{c-v}
$$

$c$ = speed of sound in the air (344 m/s)<br>
$v$ = velocity of the sound source<br>

###Doppler and Variable Delay
The effect of a variable delay line is similar to the Doppler effect. When the delay time is decreased, the effect is smilar to making the source move closer to the lisstener, since the time delay between the emission and the reception is decreased. 

A digital wave form canb esaid to travel $c/sr$ meters every sample. A delay of $D$ samples will reperesent a distance of $D(c/sr)$ meters. So if $D$ varies, then we can say that the sound source is movign with speed...

$$
v = \frac{D}{t}\cdot\frac{c}{sr}
$$

##Rotary Speaker
A similar application of the doppler effect is the leslie rotary speaker. This is a design where the source position varies over time in a circular way. 

###Leslie Effect
Two effects arise from the moving speakers, an amplitude modulation due to the horns facing different directions, and a frequency modulation as the source moves.

In an anechoic room, the effect would be similar to a vibrato and tremolo combined. However in a normal setting, we need to take account of the various reflections  as the horn rotates.

This reduces the AM effect and imposes a *polyphase* vibrato onto the sound. To emulate this effect, we can break it down into FM and AM parts.

###Implementation
We can use a **phasor** to simulate the rotation, generatin a phase signal to be used for modulation.

A delay line can be set up based on the typical dimateer of the roating horn. This gives us a maximum delay of about 1.5ms.

Sinusoidal modultion can be used to vary the delay time driven by the phase signal. 

###Polyphase Vibrato




##Pitch Shifting
Pitch shifting is created by having a constant difference the readout and the write rates. We can demonstrate this by using an array as a delay line and decoupling the reading and writ epositions.

The writing position proceeds sample by sample, as before, however the reading position is now determined by the amount of pitch shift required, which is also the playback speed.

As we have seen, when the delay time is increasing the read position of 

When the delay time is decreasing, the read position of delay line is moving at a faster rate than the write position (which runs at the sampling rate. This produces a higher pitch.

###Issues
Issues will arise when the read or write positions catch up to the other position. This will produce an audible click. The standard solution to fix this is through windowing

###Windowing
A window can be applied as an envelope to the signal that can smooth out the edges. This is typical done with a Hanning (Hamming?) window, which is an inverted cosine function.

###Overlapping
Windowing impoves the audio quality, but intrdouces unwanted amplitude modulation.

This can be improved further by using another delay line output, a **tap** that is placed at 1/2 delay length relateive to the read position. Mixing these two overlapped outputs will reduce the AM effect, making the sound continusous. The window should ...




###Feedback
The other change we can make to the original design is to include a feedback route into the delay line.

The effect can the be used to create rpeggios and stacked transpotisitions based on the pitch shift interval. ....



##Pitch Shifter and Granular Processing
The pitch shifter we have developed here is a type of granular processor that uses a continous input signal s aa source and a delay line as a buffer.

- Delay time determines the grain size
- sSince there are two overlapped grains, the grain density is given by twice the reciprocal of the delay time
- Grain frequency/pitch is deetermined by the pitch transposition fact
- Grain envelope is given by the window shape.

These principles allow us to rethink the pitch






