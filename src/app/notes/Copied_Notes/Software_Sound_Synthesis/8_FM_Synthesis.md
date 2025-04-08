#FM Synthesis

##Principles
FM starts with a basic vibrato structue. One oscillator's output controls the frequency of another oscillator. The wave whose output is sent into the frequency input of another oscillator is called the modulator, the oscillator who receives the input is called the carrier.

###Deviation
The instantaneous frequnecy will very between

`fc + d` amd `fc - d`
where d is the deviation, and is determined by the amplitude of the modulator frequency.

###The FM Spectrum
The spectrum of FM depends on the moduation and carrier frequencies. The spectrum is made up of a partial at the carrier frequency and a series of sidebands, with frequencies
`fc +- kfm`
where fc is the carrier freqeuncy, fm is the modulator frequency, and k is the sideband number.


###Modulation Index

`I = d/fm` where I is modulation index, d is deviation, and fm is modulation frequency


###Aliasing
The spectrum of FM is theoretically not band-limited, this means aliasing can definitely be a concern. However we know that t the highest significan tsideband is controlled by the index of modulation.

To avoid aliasing, we can use the rul of thumb: the maximum absolute sideband order `kmax` is approximately the modulation index plus 3.

###Sideband Amplitudes
Side band amplitudes are determined by the Bessel Coefficients, as functions of the modulation index. The amplitude of sideband k is given by the Besssel coefficient of order k for a modulation index I
`Jk(I)`

so...
`J2(I)` determines the amplitude of sideband 2, with frequency fc + 2d

##Designing Sounds with FM

###Osciallator waveforms for FM
FM is typically implemented using sinusoidal waeforms. Either sine or cosine. 

A rule of thmub for FM is that, using a cosine modulator...
- a cosine carrier produces a spectrum containing only cosine waves
- a sine carrier produces a spectrum containing only sine waves


Sine waves are anti-symmetrical, and when reading them backwards, will produce an inverted phase of the same wave.

However cosines are symmetrical, and there will be no different when reading backwards with a negative signal.

###Chowning's Recipe
Chowning uses the following recipe to quickly predict the resulting spectrum.
Using the ratio `fc/fm = N1/ N2`

1. the fundamental frequency is `f0 = fc/N1 = fm/N2`
2. if `N2 > 1` then every harmonic multiple of N2 will be missing
3. if `fc` or `fm` is irrational, then we will have an inharmonic spectrum.
4. if `N1` and `N2` are not small integers, the resulting spectrum will also be inharmonic.

###Sumation Formulae
FM synthesis is a special case of a more general method called closed-form summation formulae synthesis. This approach is charachterised by using a few sinusoidal sources, and combining them in such a way that several partials can be produced. 

##Complex FM
Generally, FM uses sine waves for the modulator. However you can also use other waveshapes to create complex modulating waves.

Because FM produces rich spectra, we will not need waves with more than two or three spectral components. 

There are generally 2 forms of complex modulator designs.

1. single modulating oscillator generating a fixed complex wave: not very flexible as it does not allow us to modify the frequency of each modulation component.
2. two or more inusoidal wave oscillators of different frequencies. This design permits independant control over the modulation parameters of each modulator.


##Exponential FM
IN analoge volatage controled synthesizers, it is very common to have exponential freqency modulation, as opposed to linear.
This happens when the oscillator fequency inputs are exponential rather than linear. The most typical approach is to have a 1V/oct, which means that for every unit change of input, we have a change onf an octave.

In this case, for a modulation signal m, we have the following expression
`f = 2^m`
The carrier frequency is then scaled by this expression.
