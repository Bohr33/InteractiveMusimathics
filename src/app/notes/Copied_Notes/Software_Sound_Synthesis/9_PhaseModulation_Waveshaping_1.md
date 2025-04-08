#Phase Modulation and Waveshaping

##Phase Modulation
Phase modulation is often considered an alternative implementation of FM. Instead of modulation the frequency directly, we do it indirectly by modulating the phase.

###Phase vs Frequency

**Phase** - the phase of a waveform can be described as the points in the cycle at each moment in time. In order for us to hear the waveform, the phase needs to change.

**Frequency** - the frequency of a waveform is how much the phase is changing from one instant of time to another. The *instantaneous* frequency is how much the phase changes if th emeasurment itime interval is squeezed down to zero.


We can generate a changing phase value by using a **phasor**, or phase generator. This produces a value ramping up from 0 to 1, at rate determined by its frequency argument.


###PM vs FM
if we modulate the phase, we end up modulating the frequency, and vice-versa.

PM: aph = phasor(ifc) + apm<br>
FM: aph = phasor(ifm + afm)

apm and afm are the modulation signals for phase and frequency, respectively.
These methods are different, however their effects are very similar.

###Phase Modulation
`s(t) = sin(ac + Isin(am))`

am = 2pi fc * t.  ac 

###PM Spectrum
The effect of PM is similar to that of FM, with all its Bessel oefficients.

The main difference is that with PM, a **sine** modulator produces a uniform-phase spectrum.

A sine carrier produces sine partials, and a cosine carrier produces cosine partials.

###Modulation Index
In PM, the modulation index is used directly as the amplitude of the modulator. 
`Isin(wc)`

We are not concerned with the peak frequency deviation variable since we are not modulating in terms of frequency.

###Implementing PM
First, generate a phase signal we can modulate with phasor.


###Using Wavetables
Instead of using sin functions directly, it is more efficient to read from a table.

`apm tablei aph+amod, -1, 1, 0, 1`

###FM Equivalence
The PM code 
```
amod oscili indx/i2pi, ifm //sinemodulator
aph phasor ifc				//carrier phase
apm tablei aph+amod, -1, 1, 0, 1 //sine carrier
```
is equivalent to...
```
amod oscili indx*ifm, ifm, -1, 0.25 //cosine modulator
acar oscili 
```

Pm is preferred to FM in many applications as it is more flexible and produces more predictable results. With PM, it is much more easy to implement...
- stacked modulators
- feedback modulation

PM is a more practical method than FM for general use. Most applications, such as the Yamaha DX synthesizers, use PM instead of FM.


###Stacked PM
A form of complex modulation can be achieved by stacking modulators

```
afm1 tablei phasor(ifm1), -1, 1, 0, 1 //modualtor
afc	  tablei phasor(ifc) + afm1*kndx1/i2pi, -1, 1, 0,1 //carrier
```
You can then stack another modulator on top of the first,
```
afm0 tablei ...
afm1 tablei phasor(ifm1), -1, 1, 0, 1 //modualtor
afc	  tablei phasor(ifc) + afm1*kndx1/i2pi, -1, 1, 0,1 //carrier
```

###PM Operators
We can pack together a PM oscillator with an envelope, making it an operator.

```
aop tablei phasor(kcps*iopratio) + amod, -1, 1, 0, 1
aop *= madsr(iatt, idec, isus, irel) * iamp
```

Here, `kcps` is the frequency and `iopratio` is the c:m ratio for this operator. The modulation input is amod, and iopamp is the output amplitude.

We can stack and combine these in anyway we like to create different synthesis designs.

###Feedback PM
In addition to stacking, PM can use feedback. For this we first need to set the instrument ksmps size to 1,

`setksmsp1`<br>

so that the feedback period becomes 1 sample only. Then we declare the audio output variable used ot hold the carrier signal, and feed the output back to modulat the signal phase directly

```
apm init 0
apm tablei phasor(ifc) + apm*kndx/i2pi, -1, 1, 0, 1
```

This can be combined with stacked modulation to create even more complex versions of PM.

