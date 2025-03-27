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


###Obtaining the Frequency Response
The frequency response is given the filter *transfer function*, which comes from the **digital filter equation**. The frequency response is the **spectrum** of the impulse response.

$$
\text{Filter Equation} \rightarrow \text{Transfer Function} \rightarrow \text{Frequency Response}
$$


##Filter Equations
Digital filters are defined by their equations. They will show...

1. the delays used in the filter
2. The coefficients associated with each signal.

**Example**

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
Transfer functions are normally described as a function of a single cariable $z$, which represents frequency in a generic way. That is why we can use it to provide a frequency response of a filter.

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


###Delays and the $z$ variable
see notees




###What is $z$?
We can interpret it in such a way that the transfer function can yield the frequency rsponse of the filter. This is done by setting $z$ to specific values that refer to frequencies in the spectrum from 0 to the Nyquist Frequency.



###Filter Implementation
**IIR** - IIRs filters are 



###Resonators
see notes

Resonators can very easily become unstable, thus we must be careful about choosing the right coeffecients. 

In digital systems, an unstable filter will "explode", meaning the values become out of range and nan values are produces, polluting the entire filter system.

###Feedback and Poles

The transfer function $H(z)$ of theis filter is 

$$
H(z) = \frac{a}{}
$$





IIR filters (feedback filters) have poles, while FIR filters (feedforward) have zeros.



###Ipulse Response
The resonantor is analgous to the physical model for a tuning fork. The dampening effect of the resonator is proportional to the R value.


###Resonator Variansts
One of the problems with resonators is an asymettry bewteen the shoulders depending on the cutoff frequency of the filter. When closer to 0, the shoulder will be on the left, when closer to the Nyquist frequency, the shoulder will be on the right.


###Other IIR filters




###EQ Filters
EQ filters are not implemented using resonantors. Resonastors effect on phase, will produce phase cancelations that make the process complicated. Instead a different design is used. See *EQfil* opcode in csound.






