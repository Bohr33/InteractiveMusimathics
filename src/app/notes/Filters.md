#Filters
Filters are devices that have an effect on the spectrum of the sound, modifying amplitudes and phases of an input at different frequencies.

Electronic filters for sound were first invented from the time audio was first sent as an elctric signal.

Simple filters evolved from simple elctronic oscillator circuits where capacitors held the voltages and a slight delay would happen because of the timing of the filters.


##Digital Filter Delays
While analog signals rely on capcitors, resistors, and other electronic components, digtal filters rely on delays.

##Filter Classificications

1. Order - this is determined by the shortest sample delay in the filter.	
	- First Order - One sample Delay
	- Second Order - Two sample Delay
	- Higher Order - Higher order filters are usually implemented with convolution, rather than delays.

2. Filter Families
	- **Finite impulse response (FIR)**: uses delayed inputs, called feedforward filters. These **only** use feedforward delays. FIRs are much more stable since their impulse response is finite.
	- **Infinite Impulse Response (IIR)**: Uses delayed outputs, but may also use delayed inputs. IIRs are much more unstable than FIR filters. The benefit of the IIR is their response is not linear; filter occurs at different levels at different frequencies.

FIR filters have the advantage of being stable and easier to implement, however their application is limited. IIR filters allow for much useful musical application with greater control over their shape.	

##Filter Impulse Response
The filter impulse response is the filter's response to an impulse with a single sample at 1, followed by 0s.

**Frequency response** -  how a filter alters an input signal, in terms of its *amplitude* and *phase* at *different frequencies*. 

**Amplitude Response** - the part of the frequency response that has to do with boosting or attenuating the different input frequencies. The amplitude response is the magntude of the impulse response spectrum.

**Phase Response** - determines the timing delays imposed on different frequenncies. It can be linear or non-linear. To compute the phase response, we can obtain it from the phse angle of the impulse response spectrum. Instead of taking the amplitude for amplitude response, we instead take its angle.


###Obtaining the Frequency Response###
The frequency response is given by the filter *transfer function*, which comes from the **digital filter equation**. The frequency response is the **spectrum** of the impulse response.

$$
\text{Filter Equation} \rightarrow \text{Transfer Function} \rightarrow \text{Frequency Response}
$$


##Filter Equations
Digital filters are defined by their equations. They will show...

1. the delays used in the filter
2. The coefficients associated with each signal.

**Example**
This example demonstrates a **first-order filter** equation
$$
\begin{aligned}
y(n) = a_0x(n) + a_1x(n-1)\\
n = \text{time in samples}\\
y(n) = \text{output}\\
x(n) = \text{input}\\
a_0, a_1 = \text{Coefficients}
\end{aligned}
$$



##Transfer Functions
Another way to describe a filter is via its **transfer function** $H(z)$.

Transfer functions are normally described as a function of a single variable $z$, which represents frequency in a generic way. That is why we can use it to provide a frequency response of a filter.

A transfer function $H$ is the effect of a filter on input $X$ producing $Y$.

In this form, each **n-sample delay** is written as the exponential $z^{-n}$ in a polynomial expression assocaited with the inputs $X$ and $Y$. The form $z^{-n}$ represents a delay by $n$ samples.

This allows us to rewrite...

$$y(n) = a_0x(n) + a_1x(n-1)\\$$
as...

$$
Y(z) = a_0X(z) + a_1X(z)z^{-1}
$$

We can write the equation of a transfer function as...

$$
Y(z) = H(z)X(z)
$$

where $H(z)$ is the effect of the filter on $X(z)$, the input, producing $Y(z)$, the output. The filter is represented as...
	$$
	Y(z) = X(z)[a_0 + a_1z^{-1}]
	$$
and thus the transfer function is defined as...
$$
H(z) = a_0 + a_1z^{-1}
$$

If for a value of $z$, $H(z)$ becomes zero, we have a filter **zero** at that point.



###What is $z$?
As of now, we can interpret $z$ as a generalized version of *frequency*.

We can interpret it in such a way that the transfer function can yield the frequency response of the filter. This is done by setting $z$ to specific values that refer to frequencies in the spectrum from 0 to the Nyquist Frequency.

By obtaining the frequency response of a filter, we can then extract the amplitude and phase response.


##Case Study: Averaging FIR
One of the simplest filters we can describe is the 1st order FIR averaging filter.

$$
y(n) = \frac{x(n)+x(n-1)}{2}
$$

It can be seen that this filter simply takes the average of the current sample, and the previous one, each having equal coefficients of 0.5.

There are two key effects that we must take into account:

1. A change in amplitude depending on the frequency
2. A delay in signal by different amounts depending on the frequency

We can breakdown the frequency response into the amplitude and phase response to have a closer look.

###Amplitude Response
We can estimate the amplitude response of the simple averaging filter by seeing what happens at the extremes of its range: **0 Hz** and **Nyquist Frequency** $\frac{f_s}{2}$.

1. A sinusoid at the **Nyquist Frequency** is
	
	$$
	x(n) = \{1, -1, 1, -1, ...\}
	$$
	and so its average comes out as $y(n)=0$

2. A sinusoid at **0 Hz** is...

$$
x(n) = \{1, 1, 1, 1, ...\}
$$
and so $y(n)=1$


By extrapolating these two data points we can estimate that the effect of the filter is a lowpass amplitude response, and has a zero at the Nyquist Frequency.

We can make sense of this intuitevly if we think about what is happening. We are essentially combining to signals slightly out of phase. At low frequencies, this hardly displaces the signals. At higher frequencies, and especially the nyquist, this delay becomes a significant portion of the wavelength of the input, until they are completely out of phase.

More precisely, the amplitude response is...
$$
A(f)=\cos(\frac{\pi f}{f_s})
$$

If we plot this function up to the Nyquist frequnecy, we will see that it is the first quarter of a cosine cycle. 

###Phase Response
FIR filters may have a linear phase response. When that happens, we have the same time delay of **N/2 samples** regardless of frequency.This happens when FIR filters have coefficients that are symmetrical about a middle point.

The coefficients are [0.5, 0.5] so this is a linear filter with a **1/2 sample delay**. The output phase angles can be described as...
$$
\phi(f)=\frac{\pi f}{f_s}
$$

##Other Simple Filters
Following the simple averaging filter example, we can extrapolated other filter designs.

###Hi-pass
Instead of averaging, if we take the **difference** of the input and delayed sample, we can create a high-pass filter

$$
y(n) = \frac{x(n) - x(n-1)}{2}
$$

Now the filter will have a **zero** at 0Hz, and equal 1 at the Nyquist frequency. It's amplitude response would then be...

$$
A(f) = \sin(\frac{\pi f}{f_s})
$$

###Bandreject
We can construct a simple band-reject filter by instead using a **second-order averaging** filter, which uses a 2 sample delay.

$$
y(n) = \frac{x(n)+x(n-2)}{2}
$$

This effectively gives us half a cycle of a cosine wave instead of a quarter, making our zero now equal half the Nyquist frequency. it's amplitude response is given by...

$$
A(f)= |\cos(\frac{2\pi f}{f_s})|
$$

###Bandpass
Laslty, following the process to create a highpass filter, a **second-order difference** filter can give us a bandpass filter.

$$
y(n)=\frac{x(n)-x(n-2)}{2}
$$

This will give us half the period of a sine wave as our amplitude response.

$$
A(f)=\sin(\frac{2\pi f}{f_s})
$$

##Filter Implementation
**IIR** - IIRs filters are generally simple to implement, but complex to design. A way around this is to use pre-packed formats such as *resonators* and *butterworths*. Their cutoff frequencies and bandwidths can be made time-varying, which is important for musical applications

**FIR** - FIR filters are simpler to design and offer linear-phase characteristics. Implementing them is easy, but depending on their order can be computationally expensive. They are also not time-varying.

**Note** - FIR filters can be time variant, however this undermines the reason for choosing an FIR filter in the first place. They have fixed coefficients with a linear response, thus altering the coefficients over time elimantes these useful qualities.



##Resonators
Resonators are the basic type of digital feedback (IIR) filters. They are much more interesting for musical applications as well. However, they can very easily become unstable, thus we must be careful about choosing the right coeffecients. 

$$
y(n) = ax(n)-b_1y(n-1)-b_2y(n-2)
$$

In digital systems, an unstable filter will "explode", meaning the values become out of range and nan values are produces, polluting the entire filter system.

###Transfer Function
Starting with the above filter equation, we can obtain our filter transfer function with the following process.

1. First, isolate our input signal and scaling factor $ax(n)$
	$$
	y(n)+b_1y(n-1)+b_2y(n-2)=ax(n)
	$$
2. Next, replace our input signals and $n$ terms with their $z$ counterparts.

	$$
	Y(z) + b_1Y(z)z^{-1} + b_2Y(z)z^{-2}=aX(z)
	$$

3. Factor out our terms to isolate $Y(z)$

	$$
	Y(z)[1+b_1z^{-1}+b_2z^{-2}]=aX(z)
	$$
4. Finally, isolate our terms
	$$
	Y(z)=X(z)\left[\frac{a}{1+b_1z^{-1}+b_2z^{-2}}\right]
	$$
	
And since $H(z)=\frac{Y(z)}{X(z)}$, this means our final transfer function is...

$$
H(z)= \frac{a}{1+b_1z^{-1}+b_2z^{-2}}
$$

Notice that the feedback part of the filter shows up in the denominator. We will see eventually that the feedforward parts will end up in the numerator.

If for a value of $z$ the denominator is 0, this leads to an undefined result, and we call this a **pole**. If the numerator is 0 (the feedforward part), this is called a **zero**.

###Coefficients
The resonator filters have two main charachteristics: **center frequency** $f$ and **bandwidth** $B$. These are determined according to coefficients $b_1$ and $b_2$.

The following equations define their relationships to bandwidth and center frequency.

$$
\begin{align}
&R=e^{-\pi B/f_s}\\
&b_1 = -\frac{4R^2}{1+R^2}\cos(\frac{2\pi f}{f_s})\\
&b_2=R^2
\end{align}
$$

With these we can define a full transfer function and frequency response for a given frequency and bandwidth.

$$
H(z)=\frac{a}{1-\frac{4R^2}{1+R^2}\cos(\frac{2\pi f}{f_s})z^{-1}+R^2z^{-2}}
$$

**Note**: for the filter to be stable, $R <= 1$. At $R = 1$, the filter will become self-oscillator, and at $R > 1$ the filter will become unstable.

###Filter Gain Scaling
The output of the resonator will vary based on the center frequency, bandwidth, and input signal. With sharper resonances, the system can cause clipping and distortion.

To avoid this, we can set the scaling $a$ so the signal is scaled to prevent these issues.

To normalize a pure sinusoid at the center frequency to 1, we use the equation...

$$
a = (1-R^2)\sqrt{1-\frac{b_1^2}{4R^2}}
$$

###Resonator Amplitude Response
The amplitude response of the resonator will depend on the center frequency and bandwidth. A sharp peak wil occur at the center frequency if the bandwidth is narrow.

###Resonator Phase Response
The phase response of the resonator is non-linear unlike the FIR filters. At the cutoff frequency, a phase reversal will occur as the angle goes from 0 to a limit of $-\pi$. The steepness of this transition is governed by the bandwidth.


###Resonators as Oscillators
As hinted, resonators can be become self oscillating under certain conditions. With these conditions, they become osillators with a decay control.

The filter equation...

$$
y(n)=ax(n)+\frac{4R^2}{1+R^2}\cos(\frac{2\pi f}{f_s})y(n-1)-R^2y(n-2)
$$

shows that, if fed with a single impulse, the output will be a sinusoidal oscillator with a frequency of $f$ Hz. The decay will be determined by the value of $R$, the filter resonance.

We can observe this by viewing the Impulse Response of the filter.




##Resonator Variants
One of the problems with the basic resonator is an asymetry bewteen the shoulders depending on the cutoff frequency of the filter. When closer to 0, the shoulder will be on the left, when closer to the Nyquist frequency, the shoulder will be on the right.

We can solve this by adding a 2 sample feedforward delay to the filter. This will create a zero at 0Hz and the Nyquist frequnecies. The trade-off is that the filter rolloff will be less steep on the other side of the filter.

$$
y(n)=a_0x(n)-a_2x(n-2)-b_1y(n-1)-b_2y(n-2)
$$

Here, $a_2$ can be set to either 1, or the value of $R$.

###Transfer Function
If we rearrange the above function in a similar process as before, we can obtain a transfer function with both feedfoward and feedback elements.

1. $$
	y(n) + b_1y(n-1) + b_2y(n-2) =a_0x(n) - a_2x(n-2)
	$$
2. $$
	Y(z) + b_1Y(z)z^{-1}+b_2Y(z)z^{-2}=a_0X(z)-a_2X(z)z^{-2}
	$$
3. $$
	Y(z)(1 +b_1z^{-1}+b_2z^{-2})=X(z)(a_0-a_2z^{-2})
	$$
4. $$
	\frac{Y(z)}{X(z)}=H(z)=\frac{a_0-a_2z^{-2}}{1 +b_1z^{-1}+b_2z^{-2}}
	$$
	
Now we can clearly see the feedforward components in the numerator, while the feedback components are in the denominator.
	

##Other IIR filters
IIR filters are typically derived from existing analog filter models whose frequency ay be derived from frequency and bandwidth.

Some models are normally implemented in second-order sections. The generic equation is given as...

$$
y(n)=a_0x(n)+a_1x(n-1)+a_2x(n-2)\\-b_1y(n-1)-b_2y(n-2)
$$

In this case, the model of the filter detrmines how the coefficients are computed from parameters such as bandwidth and frequency.

###Transfer Function
Following similar steps as before, we can obtain this filter equation's transfer function.

$$
y(n)+b_1y(n-1)+b_2y(n-2) =\\
a_0x(n)+a_1x(n-1)+a_2x(n-2)
$$

$$
	H(z)=\frac{a_0+a_1z^{-1}+a_2z^{-2}}{1 + b_1z^{-1}+b_2z^{-2}}
$$

These filters are called **biquadratic** since their transfer functions are made of two quadratic expressions.

When the numerator is 0, our output is 0, and we get our filters **zeros**.

When the denominator is 0, the output is infinite, and the get our filter **poles**

The equation can also be rewritten with an intermediary expression as...

$$
w(n)=x(n)-b_1w(n-1)-b_2w(n-2)\\
y(n)=a_0w(n)+a_1w(n-1)+a_2w(n-2)
$$

This is known as the **direct form II**(DFII) or **canonical form**. The earlier version is known as just the **direct form** (DFI).





###EQ Filters
EQ filters are not implemented using resonantors. Resonastors effect on phase, will produce phase cancelations that make the process complicated. Instead a different design is used. See *EQfil* opcode in csound.






