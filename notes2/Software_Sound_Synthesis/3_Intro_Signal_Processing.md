#Signal Processing
--
###Audio Blocks
In Csound, and audio signal is computed within blocks of samples, called **vectors**. The size of the audio block, in Csound, is determined by **ksmps**, which defaults to 10

*Note* - it is possible to access each sample of an audio variable using an indesx inside square braces *asig*[indx]. If you attempt to access a value outside the ksmps vector, the code won't compile.

###Control Signal
Csound provides another rate within its processing known as the control rate. 

The control rate is determined by taking the sample rate, and dividing it by the ksmps. This means that for every block of audio samples processed, 1 control rate value is being processed.

`krate = sr/ksmps`

*Control signals cannot be sent to output, the merely control other audio rate signals.*

--
**Why use control signals?** <br>
1. Control signals are economical and end up saving processing power because not all signals need the same, fast audio signal rate. <br>
2. Some opcodes require krate input instead of audio rate.

###Audio Channels
Each audio variabe carries one single channel of audio, but Csound can output any number of channels. This number is defined within the csound options as **nchnls**. <br>
**Note** - you must send out the number of channels of audio equal to the number of channels defined by nchnls.

###Input & Output Channels
By default, Csound sets the number of input and output channels equal to nchnls. However it is possible for these to be different. <br>
If you input device has less input channels than what is defined on csound, it will fail to run.

##Computation Passes and Processing Flow
###Initialization and i-time
There are 2 stages in a instrument run <br>
1. Initialisation time - this is the first step in running an instrument, it will initialise all i-time variables and other initialization steps.
2. Performance pass - this starts after the initialization period and the system runs k-cycles defined by the duration of the instrument.

**Note** - Some opcodes only work at i-time, others only at k-time, but many work with both.

###Initialization variables
As well as k-rate and a-rate variables, you can also have i-rate variables, which are only comuted once, at the initialization of the instrument, these are called i-rate variables. <br>
i-rate variables are useful when you need to perform a one time computation that will not change through the rest of the performance <br>
**Ex.** If you want to convert a MIDI note to a frequency for an instrument, this type of variable is perfect because it will be calculated once, and won't change throughout the performance.

1. **i-vars**, init-time: one-off computations at initialisation time. Do not change throughout performance
2. **k-sigs**, perf-time: control rate signal computation at performance time; these signals change and update throughout the performance, but slower than a-rate signals
3. **a-sigs**, perf-time: audio signal computation at performance time, runs at the sampling rate and is most taxing on the system.

##Opcodes
**Opcodes** - the unit used to generate and process signals, as well as to make one-off computations and conversions of values. Opcodes can have any number of inputs and outputs, including *none*.

**Inlining** - opcodes can also be used as functions, supplying them *inline* within another opcode. This sends the output of the inlined opcode into the argument of the outside opcode.

###Modulation
**Modulation** - varying a parameter overtime

###Assignment Operator
The assignment operator "**=**" can also be used to set the value of a variable. <br>
Ex. `ifreq = cpsmidinn(60)`

##Numeric Score
###Score Lines vs Schedule
- it is possible to use schedule and score events <br>
**Why use schedule over the score?** - schedule allows you to change and alter its elements programmatically, whereas the score doesn't allow this. However I like the score because it lays out your instrument performances in a very "scored" manner. Obviously it isn't as powerful, but the method of composition is slightly different.
The score also came before schedule, so from a historical perspective of the language I think it is quite useful and interesting.

##Soundfile Playback
The **diskin** opcode can be used to playback files.
`asig1[, asig2, ...] diskin "filename" [, kpitch, iskip, iwrap]`
- "filename" is the name of the file to play, wrapped in double quotes.

###Line Generators
There are many options for generating line segments in csound, but here are some linear options.

1. **line** - creates a single segment <br>`xsig line	ival1, itime, ival2` 
2.  **linseg** - creates multiple line segments. <br>`xsig lineseg	ival1, itime1, ival2, itime2, ival3 [, itime3, ival4, ...]` 
<br><br>
You can also create lines with an exponential curve, these are much better for frequency, and if you want a dB representation of a volume increase.

###Noise Generators
1. **rand** - `xsig rand xamp` - creates white noise
2. **randh** - `xsig randh xamp, xfreq` - sample and hold noise
3. **randi** - `xsig randi xamp, xfreq` - interpolated noise

White noise has a theoretically flat spectrum, with energy at all frequencies. The other two generate bandlimited noise, whose high frequencies are suppressed. The frequency parameter controls the rate of noise generation, and determines the spectrum of the noise. The higher the frequency value, the faster random values are taken which leads to a higher frequency response.

##Ring Modulation
Ring modulation is form of ampitude modulation where the amplitude of an oscillator is controlled by another audio signal.

$x = a+b$






