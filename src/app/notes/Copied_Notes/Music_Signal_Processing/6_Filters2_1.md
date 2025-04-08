#Digital Filters 2


**Recap**:

Digital filters are constructed using a combination feedforward and feedback inputs. It can be defined as...

- An equation which relates the output signal to the input.
	$$
	y(n)= a_0x(n)+a_1x(n-1)+a_2x(-2)-b_1y(n-1)-b_2y(n-2)
	$$
- A transfer function $H(z)$, with delays as $z^{-n}$
	$$
H(z)=\frac{a_0+a_1z^{-1}+a_2z^{-2}}{1+b_1z^{-1}+b_2z^{-2}}
	$$
- A frequency response, which correspond to the spectrum of the impulse response, or to $H(z)$ evaluated for every frequency $f$ in the digital baseband.



###Filter Zeros
Given a transfer function, 
	$$
H(z)=\frac{a_0+a_1z^{-1}+a_2z^{-2}}{1+b_1z^{-1}+b_2z^{-2}}
	$$

depending on $z$ we will have different values for $H(z)$. The value of $z$ is essentially the input *frequencies* in the spectrum.

If the $z$ makes the numerator zero, the output will also be zero. These are known as the function zeros. The number of zeros can be extracted from the **order** of the filter. A second order filter means there will be two filter zeros.


###Filter poles
If the demoninator is zero, a pole is created. A zero in the denominator is known as singularity. The number of poles is determined by the order of the denominator. For a quadratic equation, this is also 2.

##The $z$-plane
To interpret the idea of zeros and poles, we need to interpret the $z$ variable ina. trasnfer function $H(z)$. We can do it in two complemenattary ways...

- **geometrically** - by showing it as points in a 2-D plane
- **algebraically** - by giving it a definite value.

To do this geometrically, we will use a 2-D plane called the *z-plane*. This plane represents the $z$ variable as any point on it. So a transfer function can be evaluated for any point on the z-plane.


**Note** - the $z$ value is the phasor function plus a scalar $R$.

###Unit Circle and z-plane
On the z-plane we can draw a unit circle. The values of $z$ in this circle correspond to pure frequencies in the **digital baseband**. 

The digital baseband is the range of values on the $z$-plane. It's total range is from $-f_s/2$ to $f_s/2$. The point $(0,1)$ on the plane corresponds to $z=0$, and the point $(-1,0)$ corresponds to both $-f_s/2$ and $f_s/2$.

This means the top half of the unit circle corresponds to positive frequencies, while the bottom corresponds to negative frequencies.

###Baseband Frequencies
Now we can interpret frequencies on the unit circle as fractions of the sampling frequencies. For example, at 90 degrees, point $(0,1)$ corresponds to $f_s/4$.

This means we can also described points $z$ in radian form, having an angle $\omega$ and radius $R = 1$.

###Zeros and Poles on z-plane
A zero on the z-plane is a location where $H(z)=0$. We can now interpret the z-variable as the coordinates for that point. The zero can be anywhere on the z-plane.

If a filter zero lies on the unit circle, then at that corresponding frequency point, the filter will have a notch and its output will go to zero.

Poles are locations where the transfer function goes to infinity. For a filter to be stable, poles have to be placed inside the unit circle. If a pole is on or outside the unit circle, the filter will be unstable.

A pole on the unit circle makes the filter output for that frequency very large.

###Example: First-order FIR
We found in the last class that the first order FIR filter has an amplitude response given by 
$$
A(f)=\cos(\frac{\pi f}{f_s})
$$

The filter transfer function is given y 
$$H(z) = 1 + z^{-1}$$
and has a zero at $z=-1$

The amplitude response can be calculated as the linear distance from the pole to some frequency angle $\omega$. 

We can find this distance as the hypotnuse of the a triangle formed by the sides $a$ and $b$ where $a = 1 + \cos(\omega)$ and $b = \sin(\omega)$.

$$
h^2=(1+\cos(\omega))^2+(\sin(\omega))^2\\
h^2 = 1 + 2\cos(\omega) + \cos^2(\omega) + \sin^2(\omega)\\
$$
Now we can use the identity $\cos^2(\omega) + \sin^2(\omega) = 1$

$$
h^2 = 1 + 2\cos(\omega) + 1\\
h^2 = 2 + 2\cos(\omega)\\
h^2 = 2(1 + \cos(\omega))\\
h = \sqrt{2(1 + \cos(\omega))}
$$

Now we can use the **double angle identity** $1 + \cos(\omega)=2\cos^2(\omega/2)$

$$
h = \sqrt{2(2\cos^2(\omega/2))}\\
h = \sqrt{4}\sqrt{\cos^2(\omega/2)}\\
h = 2|\cos(\omega/2)|
$$

Now if we replace our normalized angle  freqeuncy $\omega$ with the full term, we will see it is the same as our initally given amplitude response for this filter. Only difference is in the scaling factor.



###First Order IIR
The First Order IIR filter equation and transfer function are are
$$
y(n)=x(n)+y(n-1)\\
H(z)=\frac{1}{1-z^{-1}}
$$

This means there is a pole at $z=(1, 0j)$

In this case, we can obtain the amplitude response by taking the reciprocal of the distance from this pole to the frequency point in question.

This filter however will be unstable. We can stabalise it however by adding a coefficient $b$ to the $z$ term where $|b| < 1$

$$
H(z)=\frac{1}{1-bz^{-1}}
$$

###Second-Order FIR
Second-Order FIR filters will have to zeros. Given the filter equation...
$$
H(z)=0.5(1+z^{-2})
$$
The poles will occur at $(0, 1)$ and $(0, -1)$ or at angles $\omega = \pi/2$ and $\omega = 3\pi/2$.

Now, the amplitude response is the **product** of the lengths of the two lines create by connecting a given frequency point to the poles.


###Second Order IIR Filters
Similarily, second order IIR filters will have two poles, also symetrically placed above and below the horizontal axis. The closer a pole is to the unit circle, the more it affects the frequencies of the sound by *boosting* them.

The radius $R$ of the poles determines how much affect they have, and the angle tunes the filter resonance to a center frequency.


##Allpass Filters
A filter with a flat amplitude response is the allpass filter, however they will have an effect on the phase of the input signal.

**Why would you use an allpass filter?** - it will give you a delay that is non-linear, which is interesting and useful for certain processes.

We can create an all-pass filter by placing zeros and poles at the same angle, thus the filter will both push and pull on the amplitude response, cancelling each other out. The feedback and feedforward parts will cancel eachother out.

###Allpass Zeros and Poles
Poles must be inside the unit circle for a filter to be stable, however zeros can be outside the unit circle. Because of this, we can balance the zeros and poles by placing them at equal angles, but with reciprocal radii.

By setting our coefficients in this way, we create an allpass filter. For example, the following coefficients for a biquad filter can be used to achieve this with frequency $f$ and bandwidth $b$.

$$
a_1 = -2R\cos(2\pi f/f_s)\\
a_2 = R^2\\
b_1 = -(2/R)\cos(2\pi f/f_s)\\
b_2 = 1/R^2
$$

###Phase Response
If we graph the phase response of this allpass filter, we will see that the phase shifts 180 degrees at the cutoff frequency, meaning the phase inverts at this point, and becomes negative.

If we increase our bandwidth $B$, the slope of the phase response to this point becomes smoother and smoother. A low $B$ value will create almost a shelf at the transition from the positive to negative phase response.

I recommend plotting or finding a graph to visualize this.

###Tuning the Center Frequency
Depending on the bandwidth, the frequency where the phase shifts polarity is not exactly the $f$ we choose for the cutoff, to fix this, we need to add a scaling property.

$$
\cos(2\pi f/f_s)=\frac{1+R^2}{2R}\cos(2\pi f_c/f_s)
$$

Now $f_c$ will determine our exact cutoff frequency.

###Phase Shifter
Because the allpass filter inverts the phase of the frequencies above the cutoff frequency, we can use this to create a phase shifting affect.

We can create a phase shifter with a notch at the center frequency by summing the input back with the output of the allpass filter.

$$
y(n)= x(n)+\text{allpass}(n)
$$

By summing the input with the inverted result from the Allpass filter will create a peak at the center frequency.

$$
y(n)= x(n)-\text{allpass}(n)
$$

###Classic Voltage-Controlled Analog Filters
Analog Filters are different from digital filters in that they operate with continuous signals.


To describe components of analog filters we can use a few flow chart elements...

1. Gain element (multiplier)
2. sum (mix)
3. 1 sample delay
4. integrator
5. function

##4-pole Lowpass Resonant filter
This is the most common type of filter found in analog synthesizers. This was originally developed by Robert Moog for his modular system using a structure called a transistor lader.

###Digital Model
See notes for image of digital model.

One of the componenets in the digital model is the **tanh** function. This essentially applies a saturation effect.

The digital model for this filter contains four of the same low-pass filter components fed into each. The base component follows the equation...
$$
y(n)=y(n-1)+2V_tg[\tanh\left(\frac{x(n)}{2V_t}\right)-\tanh\left(\frac{y(n-1)}{2V_t}\right)]\\
V_t = \text{thermal voltage of transistor}\\
g=1-\exp\left(-\frac{2\pi f}{f_s}\right)
$$

###Resonance
The equation above does not include the **resonance**, which is a key feature of the four-pole ladder filter. To achieve this, a phase inverted filter output $w(n)$, delayed by 1 sample is added back into the first filter stage.
$$
y(n)=y(n-1)+2V_tg[\tanh\left(\frac{x(n)-4R[w(n-1)]}{2V_t}\right)-\tanh\left(\frac{y(n-1)}{2V_t}\right)]\\
R=\text{Resonance Gain}
$$

###Fine Tuning
1. Oversampling is necessary: because of non-linearities, to avoid aliasing we need to run the filter twice or more times on each input sample.

2. For fine-tuning of resonance and cutoff frequency, we apply a correction to both frequency and resonannce gain. 
3. The value for $V_t$ is dependent on the maximum signal level (0dbfs). This is because we want to try to mimick the voltage levels typically used in the analog filter input.


##State Variable FIlter
Another classic VCF design is the *state variable* filter. This is a design that gives simultaneous lowpass, highpass, and bandpass outputs. 

The state variable filter is an *integrator* based configuration, which gives the different responses at the different output stages.


###The Integrator
An integrator performs an integration of its input, meaning it sums the input with all previous values entered. It holds a *history* of the previous values, and continously adds incoming values to this.

$$
y(n)=x(n)+y(n-1)
$$

This operation is not stable, at 0Hz its amplitude response is infinite. However, it still has many practical applications.



##Delay Free Loop
In an analogue system, everything is happening at the same time, at the speed of light, thus little to no delay is happening. this creates a problem for digital systems where everything is happening sequentially.

To fix this in a digital system, we had to sneak in  a one sample delay somehwere. The question is where we put this delay in the system. We can do this by adding a 1-sample delay into both feedback paths. However, this does create some issues.

**Issues** - one issue is the filter behaves badly when the frequency is increased. We can show this issue by plotting the amplitude responses for three center cutoff frequencies. As these get closer the Nyquist frequency, the amplitude response becomes larger and larger, making it virtually unusable.


###Fixing the Issues
There are two main ways to solve this.

1. Increase the sampling rate or apply oversampling
2. Alternatively, we can apply a technique used to tackle the delay-free loops without adding an extra delay. This involves rearranging the filter equations in order to achieve the result.

For this, we replace the integrator with a hand-written feed forward delay.

##Case Study
### Linear Model of 1st Order Analog Circuit
The analog filter equation for this model is:

$$
\frac{dy(t)}{dt}=g(x(t)-y(t))
$$


###Digital Filter Equation
To make this a digital equation, we translate the derivative as a finite-time difference and add a 1-sample delay to resolve the feedback path.

$$
y(n)-y(n-1)=g\times(x(n)-y(n-1))\\
\text{where}\  g=1-exp(-2\pi \frac{f}{f_s})
$$

The amplitude response for this filter has a slight issue where the higher frequencies do not receive much attenuation.

In the model, we ignore the fact that in the real filter there is *zero delay* in the feedback path.

The only delay happens in the integration, so we need to correct the equation as
$$
y(n)-y(n-1)=g\times(x(n)-y(n))
$$
but we cannot compute this directly do the output referencing itself.

###Repositiong the delay free loop
To solve this, we start with
$$
y(n)=y(n-1) + g\times(x(n)-y(n))
$$

$y(n-1)$ can be thought of the **integrator state** at a given moment. We can replace this with the expression $s(n)$ and work out an expression for $y(n)$

$$
y(n)=s(n) + g\times(x(n)-y(n))\\
y(n)=s(n) + gx(n)-gy(n)\\
y(n)+gy(n)=s(n) + gx(n)\\
y(n)(g+1)=s(n) + gx(n)\\
y(n)=\frac{s(n) + gx(n)}{(g+1)}\\
$$
Now we need to find a way to compute the state $s(n)$

###Computing the Filter
Now we can go back and delegate certain steps to certain expressions within the filter equation.

We can replace the term $$g(x(n)-y(n))$$ with $u(n)$ in our original equation, and substitue our new equation for $y(n)$.

$$
u(n)=g(x(n)-y(n))\\
u(n)=g(x(n)-\frac{s(n) + gx(n)}{g+1}\\
$$

Now we can compute in three steps...

1. input + feeback: $u(n)=g(x(n)-\frac{s(n) + gx(n)}{g+1}$
2. output: $y(n)=u(n)+s(n)$
3. state update: $s(n)=y(n)+u(n)$



###s-plane and z=plane

The continous input of analog filters can be mapped onto the s-plane, unlike the z-plane this is infinite in the frequnecy inputs. Instead of being visualized as a circle, it is a line that extends infinetely upwards and downwards.

In this case the frequency points lie on the vertical axis, and the poles must be on the left side for the filter to be stable. 

The zero-delay free digital models can be obtained by mapping the s-plane vertical axis into the z-plane circle, providing frequency-warped stable and practical filters. This mapping is called **bilinear transformation**.





