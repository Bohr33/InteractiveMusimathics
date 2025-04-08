
#Waveshaping Synthesis
Waveshaping is based on the idea that if you distort a waveform, you will get different harmonics in the resulting waveform.

This is an economic way to a complex time-evolving spectra. Waveshapers are commonly used in overdrivers, and fuzz-boxes where an input is distorted, resulting in the addition of high-frequency components and bright timbre.

###Basic Principles
A waveshaping instrument can be simply built with a sinusoidal wave oscillator drive a waveshaper.

###Transfer Functions and mapping
A waveshaper maps an input signal to a corresponding output according to the transfer functions. For example, taking sin(w) as input, and f(x) as the transfer function, the output is f(sin(w)).

- if the transfer function is linear, f(x) = ax, then the output is a*sin(w), which won't change any harmonic content of the wave.
- if the transfer function is non-linear, harmonics will be introduced. For example, f(x) = x^3 produces...

`f(x) = (3sin(x) - sin(3x))/4`

This can be rewritten as ....
`f(x) = .75sin(x) - .25sin(3x)`

This shows that the output of this waveshaping function would have an amplitude of .75 (relative to the input amplitude) and another harmonic at 3 times the frequency of the input, with .25 of original amplitude.


###Implementation
For efficiency, it is best to use a table to create a transfer function...

```
asig oscili iamp, ifreq //driving osc
ash tablei asig, gifn, 1, 0.5 //waveshaper
```

Where the incoming signal drives the index for a table reading opcode.

###Transfer Function Charachteristics

1. straight line: no amplitude distortion
2. The more extreme the change in slope, the more components
3. An *even* function (symmetric about y-axis) produces only *even* harmonics
4. An *odd* function (symettrical about x-axis) produces only odd harmonics
5. Transfer function shapes with discontinuities or sharp points will generate an infinite number of harmonics, some of which will be aliased.


We can also use math to craft a transfer funciton, this will give us more insights as to what harmonics will become present.

##Polynomial transfer functions
Transfer functions are commonly designed using *polynomials*. A polynomial is designed by an expression that is a sum of one or more terms containing a variable raised to different powers.

`f(x) = ax + bx^2 + cx^3 + dx^4`<br>

Each term has an associated *coefficient*, (a,b,c) which is a real number.

The order of the polynomial is determined by te highest power term in the expression.

Here, we are essentially adding different terms of even and odd components to a larger function. This helps us determine what harmonics will be present in the output.

###Bandlimited spectra
The advantage of using pllynomails for transfer functions is that they guarantee band-limited spectra. The can in turn be used to avoid aliasing.

When driven with a sinusoidal input, a waveshaper with a polynomial transfer function of order N will not produce components above the Nth harmonic.

###Harmonics
A table is given to calculate the spectrum of an output signal of a waveshaper driven by a sinusoid. On this table...
- each line is associated with a particular polynomial term, and a divisor.
- the column values are harmonic weights for each term, starting the harmonic 0


###Polynomial Charachteristcs
- an even-numbered term contributes only to even harmonics
- an odd-number term contributes only to odd harmonics.


###Distortion Index
In general, with any non-linear waveshaping transfer funciton, the amplitude of the driving signal will have an effect on the output spectrum. With the polynomial waveshaper, the spectral spread will increase with the input amplitude.


###GEN 3
 We can use the GEN 3 routine to generate tables based on polynomiol coefficients
 
 `ifn ftgen 0, 0, 4097, 3, -1, 1, 0, 1.1, etc..`<br>
 
 
##Spectral Matching
One of the ways to tackle the selection of a suitable transfer function is by using **spectral matching**. This technique generates transfer functions that yeild a certain steady-state spectrum with a given amplitude (distortion index).

To do this, we can use Chebyschev Polynomials of the first kind. These polynomials have a special property that when being driven with a cosine function of amplitude 1, the polynomial of order *k* will produce only the *kth* harmonic.

###Designing a polynomial
With spectral matching, the design of a polynomial transfer function is a much more straightforward process than directly defining coefficients.

1. Define a target steady state spectrum with a given set of harmonics
2. For each harmonic, use the respective Chebychev polynomial
3. Multipy each polynomial with the respective harmonic amplitude
4. Combine all polynomials into a transfer function

We can use GEN 13 to simplyify this process

###GEN 13

GEN 13 draws a polynomial matching a given spectrum

###Spectral Evolution
The spectral evolution is not smooth, this is one of the issues with spectral matching. 

The resulting polynomials will produce ripples based on the shape of the Chebyschev polynomials. As the amplitude incoming increase, certain harmonics will be accentuated, or decreased, based on the shape of the Chebvyschev polynomials.

One to improve this aspect is to alternate the polarity of the amplitudes for each order (harmonic). This follows the pattern (+, +, -, -, +, +, etc..) starting from H0. For example, with harmonics of 1, 2, 3, 4, 5 with amplitudes 1, .5, .3, .25, .2, their amplitudes would become 1, -.5, -.3, .25, .2.

###Distortion Index and Amplitude
Sinc ethe output signal amplitude is dependent on the amplitude of the input to the waveshaper, any changes in the distortion index also will have an effect on the output amplitude.

This may be useful to correlate the spectral spread with the input amplitude, however we may want to eliminate this effect.

###Transfer funciton normalisation
Because the amplitude of the output will vary depending on the input amplitude (distortion index), it can be useful to normalize the output so all input levels have equal output level. The output amplitude can be normalised according to a given waveshaper transfer function.

For this, we use a normalisation function driven by the distortion index. The output of the function will be...<br>

```
output = g(a) * f(a * cos(w))
w = phase
a = distortion index
g(a) = normilization function
f(x) = waveshaping function
```

We can do this easily with GEN 4 in Csound. GEN 4 generates a new normalization table based on an input table that contains a polynomial transfer function.

`ifn gifn 2, 0, 2049, 4, 1, 1`

In this example, the input function is in table 1, and contains 4097 data points (4096 + extended guard point). 

As the transfer function is bipolar, GEN 4 starts from the table midpoint and proceeds outwards axamining pairs of values to create the normalising function. As a result, the normalising table is always 1/2 the size of the transfer table.


**Note** - with waveshaping, you can only produce harmonic timbres. There is no way to produce inharmonic spectra through wave shaping.However if we combine this with ring modualtion, we can create some inharmonic spectra

###Waveshaping + Ring Modulation
The principle here is to multiply the output of a waveshaper with a sine wave of frequency `fm` and amplitude `a`. The result is a waveform with sums and differences of all waveshaper harmonics and frequency `fm`.

`fm +- kfw     k=0,1,2...N`

###Ring Mod Similarites to FM
Using this technique, we can get a very similar result to that produced by FM. The inharmonic sidebands produced will happen for every harmonic in the waveshaper spectrum so very complex harmonics can be produce. The ratio between `fm` and `fw` will decide whethere or not the harmonics are inharmonic or not.

if `fw/fm = N1/N2` are integers with no common factors then...<br>

1. the fundamental frequency can be determined as `f0 = fc/N1, fm/N2`
2. if N2 > 1, then every harmonic multiple of `N2` will be missing
3. if `fw or fm` are irrational, then the outptu spectrum will be inharmonic.
4. if N1 or N2 are not small integers, then the output spectrum will be inharmonic.

###Multiple Waveshapers
This technique can be extended to use multiple waveshapers.

##FM, PM, & Waveshaping
FM, PM, and Waveshaping are all part of the same class of techniques called *non-linear distortion* synthesis.

###PM as waveshaping
If we use sines and cosines as waveshapers, then we can recast waveshaping as a form of PM.

```
PM Formula: sin(wc + I*sin(wm))
Since
sin(a + b) = sin(a)*cos(b) + sin(b)*cos(a)
we have
sin(wc) * cos(I*sin(wm) + sin(I*sin(wm)) * cos(wc)
```
This can be seen as two sets of sin and cosine waves being driven by sine and cosine waveshapers, both being ring modulated after waveshaping.



