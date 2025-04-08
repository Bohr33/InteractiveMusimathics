#FM, Spatial, Pitch Shifting, Granular
As we have seen, modulating a variable delay's delay time creates pitch shifting affects. This technique can be expolored to create other pitch based modulation effects.

##Adaptive FM Synthesis
Since we've used variable delays to do a form of vibrato, and since FM is basically a *fast* vibrato, we can use this technique to create FM tones of any input parameter. This is known as **adaptive FM synthesis**.

With vibrato, we saw that the *instantaneous frequency* of an input depended on the width of delay time modulation $\Delta_d$ and the modulation frequency $f_m$.


The instantaneous frequency is then given by...

$$
f(1 \pm \pi\Delta_d f_m)
$$

and the deviation is...
$$
\pi\Delta_df_m
$$


We know from FM that...
$$
d = If_m
$$
Thus we can equate...

$$
\pi\Delta_df_mf=If_m
$$

and rearrange for $\Delta_d$...

$$
\Delta_d = \frac{I}{\pi f}
$$

where $f$ is the carrier frequency.

###Controlling The Modulation
Now we have an equation where we can obtain our delay time modulation $\Delta_d$ in terms of $I$ and the carrier frequency. However, we may not know the carrier frequency of our input, thus we have to estimate this, or use an opcode like **ptrack**.


##Pitch Shifter
Since a variable delay time can alter the pitch, we can use this to create a general pitch shifting device. The amount of shifting applied is related to the rate of change of the delay time, thus a linearly increasing delay time will produce a constant pitch shift on the input.

- When the delay time is increasing, the **read** position is moving slower than the **write** position, this creates a lower pitch.
- When the delay time is decreasing, the **read** position is moving faster than the **write** position, producing a higher pitch.

###Issues
If we try and implement this, we will encounter an issue when the read position either catches up to the write position, or vice versa. A very long delay could solve this issue, but this isn't ideal.

###Windowing
One solution is to use a window to blend taper the output when this happens. The window's length is the length of the delay line and the zero point will happen when the read pointer matches the write pointer.

To apply this, we can generate an index by taking the absolute value of the difference between the read and write pointer.

`kd = kpw > kpr ? kpw - kpr : kpr - kpw`

However, with this implementation, there will be some AM applied where we don't want it. We can improve this by reading another delay line output, and mixing the outputs together.


###Pitch Shift Ratio
How do we determine the amount of delay time change based on the amount of pitch shift we want?

Let's say $\Delta_d$ is our buffer size in seconds.

Playing back at normal speed means...

$$
s = \frac{1}{\Delta_d}
$$

If we want to change the pitch, we simply multiply this speed, $s$, by the interval $p$ we want to shift.

$$
s = \frac{p}{\Delta_d}
$$

However, now we must take into account the fact that the write position is always moving ahead at $\frac{1}{\Delta_D}$ of the buffer each second.

Our formula must take this into account, so we subtract this...

$$
s=\frac{p-1}{\Delta_d}
$$ 

This is the readout speed of a delay line reader pointer, however we need to set a delay time as we cannot control the pointer speed directly.

###Variable Delay Time
The delay time we require varies cyclically from the maximum delay to 0 at a rate given by the readout speed. We can achieve this with a phasor going from 1 to 0.

$$
f_m=-\frac{p-1}{\Delta_d}
$$

Implementing this works well, however there are some issues. Assuming we use the crossfading technique to blend between two outputs each a offset by a 0.5 cycle, we will produce phase interference effects. This will be a problem for periodic signals.

###Variable Maximum Delay
To solve this, we can set the delay to match the waveform period. IF we can fit a complete cycle in half of the delay line, then the two taps, offset by the 1/2 delay size, will output in-phase signals. Since the input may vary in pitch, we need to make the delay time variable vary with the input frequency.

$$
\Delta_d = \frac{2}{f_0}\\
f_0 = \text{Input Frequency}
$$
And we can use a pitch tracking opcode to estimate this frequency if it is unknown.

###Feedback
We can also introduce a feedbac route into the delay line. This effect can be used to create arpeggios and stacked transpositions based on the pitch shift interval. 

Some considerations to note about this effect...

1. a delayr/delayw pair with deltapi taps can be employed to facilitate feedback
2. The feedback interval is dependent on the delay line size.
3. Shorter delays cause faster arpeggios.


###Pitch Shifter and Granular Processing
This technique for a pitch shifter is technically a type of granular processor that uses a continuous input as a source and a delay line as a buffer.

- Delay Time determines the grain size
- With 2 overlapped grains, the grain density is given by twice the reciprocal of the delay time.
- Frequency and Pitch are determined by the pitch shifting factor.
- Grain envelope is given by window shape

