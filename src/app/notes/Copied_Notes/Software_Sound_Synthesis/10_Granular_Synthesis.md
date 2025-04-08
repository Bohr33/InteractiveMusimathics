#Granular Synthesis
Started by Dennis Gabor in 1940's. He wanted to reconcile time and frequency in the analysis of audio signals. Fourier Analysis considers the frequencies, but does not include time, works as theoritcal through infinite time of an unchanging waveform.

He advanced the idea of **acoustic quanta**, which could analyse sound both in time and in freqeuncy. This is where the idea of **grain** originates.


###Acoustic Quanta
Gabors acoustic quanta were fundamentall defined by a sinusoid, which gave it frequency localisation, and shaped by a Bell-shaped envelope, providing time localisation.

He demonstrated the trade off between localisation in time, and localisation in frequency. imagine a bell envelope which shapes a given spectrum, as this reaches a pulse, we loose the ability to identify its spectrum, however if we expand its time envelope to all of time, we can identify its frequency, but it can't be localized in time.

##Grains
The concept of acoustic qunata can be used to decompose a sound waveform in a grid of time and frequency. This mechanism ha been adopted by tools such as the phase vocoder.

The concept of a grain is a generalisation of the acoustic quantum, it can be of any waveform input and any envelope shape, wherease the quanta is specifically a sine wave with bell envelope.

###Grain Charachteristics
Garins generally have short duration, they lose any relevant perceptual charachteristics on an individual basis.


###Generating Grains
We can create a granular process in csound by creating a waveform (sineusoid), an envelope (bell shape), and then playing this instrument within a stream, where we can define parameters such as grain duration, grain wave frequency (of sinusoid), grains per sec

The frequency of the wave form will generally affect the timbre of the resulting sound, not the perceived pitch. Unless the grain duration is long with a relatively short grain start frequency.

You will often find that there is a peak resonance at the frequency of the input waveform frequency.

###Synchronous Granular Synthesis
Synchronous Granular Synthesis is when grains are played back in a continous stream, with a determined frequency of grain generation.

Some important charachteristics of this are...
- sensation of pitch may emerge, linked to the rate of grain generation
- A number of harmonics are present and the spectrum has a peak at around the grain waveform frequency.
- The higher the waveform frequency in relation to the grain rate, the less defined the pitch of the sound is.

As well as synthesis, we can use granular techniques as a form of audio processing.

##Synchronous Granular Synthesis Processing
Static waveforms can be replaced by time-varying ones. Each grain does not necessarily need to use the same waveform, we can change these grain by grain.

One example of this by reading grains from a sound file.

###Using poscil
By loading in a sound file using GEN 1, we can then read from this table using **poscil**. This is similar to oscil except it allows us to reading from tables that aren't a power of 2.


###Grain Start Position
We an modify where the grainulator reads from the table by modulating the phase of poscil.
For poscil, the phase can be greater than 1, and will wrap around. 

###Grain Pitch
When the wave form is a single cycle, we could specify this frequency directly to get the correct cycles per second.

When reading from an audio file, we instead need to specify this as a pitch ratio: 1 for normal playback, > 1 to raise the pitch, < 1 to lower the pitch. We translate this using...

`f0 = p * (fs/N`<br>
p = pitch ratio<br>
fs = frequecy

See slides

###Stream Generation
See Slides

###Grain Density and Overlap
A few considerations
- Grain rate now can define how dense the stream is, so we can refer to this as *grain density*.
- Depending on grain size and grain density, grains may overlap or not, resulting in varying degrees of smoothness.

The number o foverlaps is given by the product of grain duration and density. We may set the grain desnity to be dependent on overlaps and duration.

`Gdens = O/ Gdur`

###Stream Timescale
Using this aproach, we can manipulate the sound timescale independently of pitch. This is because, how fast we progress through the wavetable is only dependent on the grain start position.

The position increment in seconds can be given by the reciprocal of grain density (grain generation frequency).

`I_position = 1/G_density`


By setting the time scale to be negative, we can also read through the tables backwards. However, poscil cannot have a negative phase so we have to write code to deal with this scenario.

##Asynchronous Granular Synthesis
An alternative to generating a stream of grains is by producing a "cloud" of grains.

In this case, each grain is not in sync with the rest, but has an indeterminate start time and duration. We can only control the overall trend of the grain clouds.

We can use random number generators as a means of creating values for the meaningful variables.

###Instrument Design
Infinite recusion can be used for this method. The davantage of this is that very compact code can create rich textures.

The approach could be summarized as...

- For each parameter, we will have a center value and random deviation, for example...
`ifreq = p7 + birnd(p8) //birnd generates a bipolar uniform distribution`<br>
- Each Instrument schedules the next


###Soundfile input
just like with synchronous granular processing, we can use a soundfile as input for generating granular clouds.

##Granular Synthesis Opcodes
Some of the most useful and relevant opcodes are...
- **syncgrain** (diskgrain, syncloop): implements synchrnous granular processing in a simple manner.
- **partikkel**: implements particle synthesis, which is a generalisation of granular synthesis emcopassing all forms. It is very complicated but allows for a options.



###Syncgrain
`asig syncgrain kamp, kfreq, kpitch, kgrsize, kprate, ifun1, ifun2, iolaps`

- **kamp**: amplitude
- **kfreq**: rate of grain generation, or density
- ...


###Diskgrain
This is a variant of syncgrain, where it reads from a soundfile

###syncloop
Another variant of syncrgrain, but allows for looping within the source file.

##FOF (Format) Synthesis
FOF or format wave synthesis is a technique developed by Xavier Rodet at IRCAM in the 1980s.

It was ported to Csound in the form of the **fof** opcode.

The idea is that the voice will be decomposed into a sequence of grains. You can think of your voice as generating a stream of pulses with a different formant resonator. Rodet looked to mirror this process with FOF synthesis.

###The Singing Voice
The voice is composed of two main components.
1. The glottis - which produces the pulses of sound
2. The r


###Formants
Formants are regions of resonance within the voice. Formants are charachterized by a center frequency, bandwidth, and relative amplitude


###FOF
The principle of FOF synthesis is the generation of a stream of sine wave grains. Grains may or may not overlap.

A stream such grains generates a tone with several harmonics with a resonance pak.

The main difference between granular synthesis is that the FOF method provides control over the grain envelope shape.

###The local Envelope
We call the envelope of each grain the FOF *local* envelope.

This charachterised by
- rise time
- total duration
- exponential decau
- a fast decay tail at the end


###Bandwidth and Skirtwidth
The local envelope basically determines the width of the formant region. This is charchterised by a bandsidth at -6dB and a skirtwidth at -40dB.

Bandwidth at -6dB is determined by the rate of exponential decay of each grain. A fast decay rate widens the bandwidth, whereas a slow rate makes it narrow

SKirtwith at -40dB is determined by the rise time: longer rise times make the skirtwidth narrower.

###FOF vs Filters
FOF essentially is packaging a band-limited pulse generator and a filter together.
The grains themselves can be seen as impulse responses of a bandpass filter. An IR is what a filter outputs when fed with a single pulse.
BP impulse reesponses are decaying sine waves at the filter center frequency.


###Bandwidth and impulse response
The FOF synchronous grain strema can be interpreted as follow:
- a FOF grain is equivalent to the impulse response of BP filter
- FOF generates a sequence of such BP impulse responses at every fundamental period, overalpping them.

##FOF grain waveform and spectrum
There is a straightforward relationship between FOF grain waveforms and the resulting sound spectrum.

##FOF opcode
The csound implementation is based on the FOF opcode, which generates one stream of grains, and thus one formant region.

You can mix multiple of these opcodes together to generate tones with several formant regions.

###Key FOF Parameters
**Octaviation** - octaviation provides control for the rate of grain generation that affects our perception of the frequency. It fades out alternate grain when moving from 0 to 1. This leads to 1/2 as many grains being produced, which we perceive as a shift down by an octave.

###Singing Voice Synthesis
An instrument can be designed to use FOF according to the following steps...

1. Function tables are created to store formant parameters,: this uses GEN 2 with rescaling suppressed

2. In the instrument, table readers are used to retrieve the formant parameters from function tables, for formant frequencies, bandwidths, and amplitudes
3. FOF parameters are set
4. The fundamental frequency should.... SEE slides


###FOF2 & FOG
There are two variations of FOF that can also be used.

1. FOF2 - fof2 is similar to fof, except that the i-time parameter iphase is replaced by a k-rate parameter, making it possible to start grains at different positions during performance

2. FOG- similar to FOF, but with more modifications 
	- Fundmanental frequency is called grain density
	- Formant frequency is replaced by a transposition 	ratio
	- A new parameter is added: aphs, a-rate table start position for grain redout.