#Spectral Processing 1: Fourier Transform

**Note** - Victor updated the slides, check to make sure they are updated

Spectral techniques are the cutting edge of signal processing. Processing in the frequency domain allows us to control signals in much more interesting ways over processing in the time-domain.

Where you have a waveform in the time-domain, in the frequency domain you have a spectrum.


##Sums

###Integral Sums
Integral sums are used for continous signals
$$
\int_{a}^{b} x dx
$$


###Discrete Sum
$$
\sum
$$



**Note on Exponentiation**
a number to the power of 0 equals one because you are essentially dividing by 1 of itself, which equals one.




###Trigonometry

$$
\tan(\theta)=\frac{\sin(\theta)}{\cos(\theta)}\\
\tan(\theta) = \frac{O}{A}
$$


###Complex Exponentials
$$
e^{jx}=a +jb\\
j = i = \sqrt{-1}
$$

**Note**: In this field we are using $j$ instead of $i$ because $i$ is used for current in electronics.

###Euler's Formula
A complex sinusoid of unit magnitude is given by...
$$
e^{j\phi} = \cos(\phi) + j\sin(\phi)
$$

###Rectangular Form
The complex exponential $z = e^{j\phi}$ can be represented as..

$$
z = a + jb
$$



###Complex Sinusoids


We can describe the amplitude of a sinusoid and the angle with

$$
A = \sqrt{a^2 + b^2}\\
\phi = \tan^{-1}{\frac{-\beta}{\alpha}}
$$


##Fourier Transform
The FT produces a *function of frquency* from a *function of time*. This allows a general repreesentation of a waveform into a possibly infinite number of partials.


$$
X(f) = \int_{-\infty}^{\infty}x(t)e^{-j2\pi ft}dt
$$

The process written out is...




###Inverse Fourier Transform
The inverse transform is almost like a complicated additve synthesis machine.


###FT of Sawtooth Waveform
The saw spectrum is **purely imaginariny**, meaning it is only composed of sin components


###FT Triangle Waveform
The traignle spectrum is **purely real**, meaning it is only composed of cosine components.


###Ft Pulse Waveform
As your pulse width gets narrower, more and more frequency amplitudes will become equal. As you approach infitesimal width, you will get closer and closer to pure noise, which is equal amplitude of all frequencies.


###The Fourier Series



##Discrete Fourier Transform
The DFT is a discrete version of the FT. Time is given in samples,$n$, and the transform is only defined for $N$ samples.

$$
X(k) = \frac{1}{N}\sum_{n=0}^{N-1}x(n)e^{-j2\pi k \frac{n}{N}}
$$

The input is $N$ equally-spaced **time points** of a waveform, $x(n)$. The output is $N$ equally-spaced **frequency points** of a spectrum, $X(k)$.


###Sine Wave Example
See slides for graph.

The way the DFT works is by multiplying your input frequency by a test sine wave, and cosine wave. Then you add all of the samples together and divide by two. When there is no sine wave at the frequency, the output will be a sine wave, and when the average is taken of this, a value of 0 is retrieved, meaening no sine wave is found at that point.



When performing the DFT, you are only analyzing certain points along the frequency spectrum based on the $N$/ the Nyquist frequency. 

###IDFT
Inverse Discrete Fourier Transform



###Optimising the DFT
The spectrum of **real signals** has a symmetry aronud 0hz, so DFTs can be optimised to work only with positive frequencies, *half the poinnts* + *Nyquist*.

- The DFT is generally computed with fast algorithms ... eventually FFT.



##FIR filters Revisted
Recall that an FIR filter is a finite response filter with a feedforward path.

$$
y(n) = a0x(n) + a_1x(n-1) + ... + a_{N-1}x(n-N-1)\\
= \sum_{m=0}^{N-1}a_mx(m-n)
$$




The impulse response of filter is essentially the time domain representation of the filter response. We can take a DFT of this response and obtain the frequency response of the filter.

Because of this, we can design filters in the frequency domain, then perform a IDFT to obtain the time-domain of the filter, which is the impulse response, and also gives us the filter coefficients.




##Filter Design
Csound provides good support for flexible FIR filter deisng. The process is...

1. An amplitude response is drawn using a suitable GEN routine into a function table.

...



###GEN 53














