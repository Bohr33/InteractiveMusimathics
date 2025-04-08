#Additive Synthesis
Each comonent of a complex waveform is called a partial.

Theoretically any sound can be composed by the addition of such waveforms. Additive synthesis is much more practically applied to synthesize sound with discrete, discernable partials.


###Opcodes for Additive Synthesis
You could use an oscillator, which can read any waveshape, however we would ideally like to control all of these partial amplitudes over time with envelopes to create a dynamic spectrum.


A typical additive synthesis instrument is created by adding the outputs of a number of sinusoidal oscillators, each contributing a partial to the overall sound.

The classic design for an additive synthesis instrument includes *n* oscillators controll by *n* pairs of time functions. (one for amplitude, one for frequency).


###Challenges with Simple Additive Synthesis
1. Computational Complexity - the addition of many oscillators with specific envelopes for each parameter qill quickly get expensive computationally wen attemtping to recreate complex spectra.
2. data explosion - using two sets of individual functions for each partial creates a lot of data.

**Solutions**

1. Simpler instruments - use less partials, remove frequency envelopes, etc.
2. Efficiency Measures - turn off oscillators when not in use, remove insignificant partials, account for masking effects
3. Analysis-sythesis - generating time function data by means of spectral analysis, resynthesizing sounds with generate time functions.

**Note** - a typical tool used for spectral analysis is the Phase Vocoder (PVOC).

##Inharmonic Spectrum
A classic application of additive synthesis is to generate inharmonic spectra consisting of discrete partials. This one of the early uses of additive synthesis.

Jean-Claude Risset made some examples with this by creating some synthesized versions of bells and gongs.

###Barphones
Using additive syntesis, we have a very convinient way to model things that have inharmonic spectra. This includes barphones, marimbas, bells, and other similiar sounding metallic like instruments.


##Organs

###Tonewheels
Tonewheel generatores consisted of a synchronous motor running at constant speed. Different sinewave pitches are produced by varying the amount of teeth that were on each tone wheel.

###Drawbars and Partials

- 16' = lower octave (-1 octave)
- 5 1/3' == fifth (fourth lower) (7 semitones)
- 8' - unison (key pitch)
- 4' = octave (12 semitones)
- 2 2/2' = octave + fifth (19 semitones)
- 2' - 2 octaves (24 semitones)
-...



##Modeling the Organ
###Tonewheel Generator
- create a single phase source for each of the 12 pitches, simulating the synchronous motor and gear mechanism
- Base frequencies of each phase generators are set to the 12-tone equal tempered scale.


###Transistor Organs
With the development of transistor technology, electronic organs appeared as an alternative to the electromechanic tonewheel organ.

However, many of the features of the tonewheel organ were adopted...
1. 12 high frequency square wave generators tuned to 12 TET.
2. Octave dividers for each tone, producing all audible waveforms in different octaves.
3. Drawbar/slider control to produce the mixed blen of various octaves.


#Complex Textures

###Shepard - Risset Tones
The Shepard/Risset Tone is an illusion where tones seperated at octaves apart are constantly rising and as they get higher they decay while a new tone replaces it and rises up. This happens slowly so that it is almost inperceptible as to when they are entering creating a seemingly neverending rising pitch.

###Recursive Example
As well as creating a loop outside of the instrument to schedule your falling sine waves, you can also have the instrument schedule itself creating a recursive version of the same effect.

###Infinite Recursion
It is possible to setup infinite recursion in Csonud where new instances are generated sequenctially in time.

It is not possible to have events starting at the same time, since that would cause the engine to get stuck. However, if we schedule the next event to start at least 1 k cycle ahead, then it will work corectly.


##Analysis-Synthesis
Additive synthesis is probably best handled by methods using a previous analysis of sound spectra. These can generate the time-function for amplitude and frequency needed to drive a bank of sinuoid oscillators.

The most common analysis tool is the **Phase Vocoder**, which is essentially a filter bank that obbtains amplitude and frequency from an input.

###Phase Vocoder Analysis
In general, phase vocoder has the following characteristics.
- a bank of filters



