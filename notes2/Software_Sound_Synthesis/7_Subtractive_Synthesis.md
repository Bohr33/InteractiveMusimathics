#Subtractive Synthesis
Subtractive Synthesis is charachterized by...<br>
- A complex source *followed* by a Spectrum modifer<br>
The name subtractive synthesis is a little misleading. Better to think of the complex source, spectrum modifier model.

###Sources
- Oscillators
- band-limited signal generators (tri, saw, square, ex.
- noise generators
- input sound, disk (sound file)
- other signal generators and signal algorithms.

###Sources in Csound
- buzz
- gbuzz
- vco
- vco2

###Noise Generators
- rand xamp, [iseed, iuse31]
- randh
- randi

##Sound Modfiers
###Filters
Filters shape the input sound by modifying its frequency spectrum.
- The amplitude response of a filter determines how it changes the amplitude of an input signal depending on its frequency. There are 4 main types of filters.

1. Lowpass - lets low frequencies through
2. Highpass - lets high frequencies through
3. Bandpass - allows only a select bandwith of frequencies through
4. Bandreject - allows everything but a select bandwith of frequencies through
5. (Allpass) - Lets all frequencies through (but has an effect on the phase)

###Filter Components
- **Cutoff Frequency** - The cutoff frequency of a filter is defined by the point at which the signal has reduced by **-3 dB**. This is referred to as the **half-power** point.
- **Passband** - the passband is the band of frequencies below the cutoff frequency that are allowed to pass.
- **Stopband** - the stopband is the band of frequencies above the cutoff that are attenuated.


Bandpass filters are essentially a combination between a low-pass and high-pass filter. Their frequencies are instead defined by the **center frequency**.

**Resonant Filters**
some lowpass or highpass filters feature peaking at the cutoff frequency which defines a region of resonance.

**The Q**
Because of the way we percieve frequencies as ratios, instead of defining the bandwidth of a filter directly, it is better to base it off the center frequency. We do this with the **Q** factor.

`Q = f(cutoff) / B (bandwidth)`<br>
Higher Q equates to a narrower bandwidth

The Q value can be related to musical intervals, since both are fixed frequency ratios.

Ex. A Q of 1.5 is equivalent to the bandwidth of an octave.


###Time Response
Filters also have whats called a *time* response. This determines how quickly a filter will react to changes in amplitude. 

Time response is inversely related to the bandwidth.  The narrower the filter, the slower the time response will be.

**Note** this is why very selective filters, (like brickwall filters) are problomatic.


###Csound FIlter Opcodes
- tone - first order low pass
- atone - first order high pass filter
These are relatively gentle filters
- reson - standard multi-purpose bandpass filter with cf and Q control.
- areson - the inverse of reson, a standard band-reject filter.

**Balancing Signals**
If a resonating filter is left unsacled, huge variations of signal can occur causing clipping and distortion. Csound provides a useful opcode to mangage this with the **balance** opcode. 

**Modeling Filters**
butter lp, butterhp, butterbp, butterbr - a collection of classic filter models

**clfilt** - a filter that can model many classic types of filter models. *Chebychev, Eliptical*

**Multimode**
A type of filter that includes many filter modes at the same time, with individual outputs.

###Multiple Filter Arrangements
1. Parallel - Filters arranged where the same input is fed to all filter inputs. The outputs are mixed together and the overall amplitude response is the sum of individual repsonses.

2. Cascade (series) - The output of one filter is fed to the input of the next filter, and so for the entire filter chain. The overall amplitude response is the product of individual responses.

- A series connection can be used for mainly two purposes...

1. To create a more selective filter. Using two BP filters in series with the same CF and BW, we make a filte which will have a steeper roll-off and narrower BW.
2. to create a filter with a wider passband, but steeper rolloff.

**Note** - when connecting filters in series, the result is generally much lower in intensity than the original sound. Thus it is usuful to balance this output signal with the original using the **balance** opcode.

##Vocal Synthesis
The Vocal sound may be modelled in a subtractive synthessis way. It can be thought of as a Source-Modifier model where...<br>

- Source: glotis - vocal chords
- Modifer: vocal tract, mouth, and nasal cavaties

The vibration of the glottis produces a periodic signal that resembles a pulse waveform/ The vocal tract acts like a complex bandpass filter that modifies the signal from the glottis.

###Formants
We can model the action of the upper vocal tract using **formants**.

Formants are *fixed* regions of resonance in a spectrum. They do not move with a change of frequency in input signal (voice).

Vocal phonomes are charachterized by two types of sound: vowels and consonants. Vowels are responsible for sustained, pitched tones, while consonants are the noisy/transient parts.

Each vowel is associated to a different set of 3 to 5 formats, each with a specific center frquency, bandwidth, and relative peak amplitude.

##Channel Vocoder
A classic subtractive synthesis design is represented by the *channel vocoder*. It originated in the 1930's as a means of encoding and reproducing vocal signals. Later with elctronic musical instruments it became a means of realising *cross-synthesis*.

It allows for the spectral shape of a source to be imposed upon an excitation source.

###Designing a channel vocodr.
We split the spectrum into several bands, analyse the amount of energy n each of the bands, and impose that spectral envelope on another sound.

The two filterbanks have the following functions...
1. Analysis filters: used to break the input spectrum into bands and find the energy on each band (its RMS amplitude)
2. synthesis filters: used to filter out a osurce and impose the analysed spectral envelope. This part of design is just like a graphic EQ.

**Bands and Sources**
The number of bands will determine how accurate the result is. The more bands, the better analysis, but wih narrower filters, we will have a los in the time reesponse/ In addition, more computation will be needed to calculate the output when moe filters are used.

For the excitation source, any complex (component rich) source will be suitable.

###Vocoder Implementation
2 components needed

1. Analysis/Synthesis Channel
2. Input sources

To model this in Csound, we ca use two filters in series to get a more accuarte result.

```
instr 100
	aexc = butterbp(butterbp(gas, p4, p5), p4, p5)
	asig = butterbp(butterbp(gan, p4, p5), p4, p5)
	out(aexc*rms(asig)
endin
```