#Key System Concepts

###Quantization Precision
When generating signals in a digital system, we only have limited space due to the memory of the computer. When sampling a digital signal, the size of the byte measurment that stores our sample determines how many possibe values we can store the amplitude of a sample of a waveform. No matter how large of a *bit depth* we have, the system will produce *quantization error*, which results from the distortion that arises when storing these digital samples. However, we can almost completely minimize this effect by having a large enough *bit depth*.<br>
The current standard for *bit depth* is usually between 16  and 64 bits.

###Channels
When multiple channels are used for digital audio, the samples for each channel are *interleaved*, meaning the samples for each channel alternate in the buffer array. This is efficient since it allows for a buffer to calculate each channel at (relatively) the same time, and the pointer does not have to skip around for each channel, keeping the output as up to date as possible.

###Control Rate, ksmps, and Vectors
Csound uses 2 seperate signal rates to control audio sampling, and control signal sampling. The control rate is referred to as the krate (kr).<br><br>
For every control period, a control signal will contain one sample, and an audio signal will contain 1 or more samples; this value is determined by the ratio kr/sr.<br><br>
Alternatively, this relationship can be thought of as: in the course of one computation cycle, a control rate signal consists of a single sample, while the audio rate signal contains a block of samples. This block is known as a *vector*, while the control rate signal is known as a *scalar*.<br>
**Note**: The control rate (kr) cannot be any value, it must ensure that ksmps (The number of samples in one second) is an integral value, meaning sr/kr must equal an integer value.

##Life Cycle of an Instrument
An instrument passes through multiple stages through its life cycle. First it is compiled from text representation into a binary form, then it is loaded by the engine to do audio processing. It is then de-instantiated when it is done producing sound.
###Compilation
The first step is compilation. In this step, the computer identifys all elements of the code, then builds a tree containing the instrument graph and its components. Then, the compiler translates this tree into data structures that represent the instrument in binary form, and prepares it for use by the audio engine.
###Performance
When an event to perform an instrument is received, the compiler will find the compiled binary for that instrument, and allocate memory for it if memory is available. This results in the message....<br>
`new alloc for instr ...`
However, if a memory was previously allocated for an instrument, the system will hold that allocated memory so it can be used in the future.<br><br>
During performance of an instrument, the engine runs the *performance loop* that goes into each instrument and calls the performance routine defined within that instrument. This is where ordering of instruments, and opcodes become important. The system will first perform instruments in numerical order (instr 1, instr 2...), and then within each instrument, performs the statements top-down, line by line.
###De-instantiation
An instrument runs until its event duration completes. However, it is also possible to leave this as undefined, allowing the instrument to run until a *turnoff* command is sent to it.<br>
It is also possible to extend the duration of an instrument with a *release* or extra time period, this allows the instrument to carry on for a little longer after its turnoff time. This is useful for working with MIDI controls as the *note off* message will end the instrument, although we may want to extend its duration with a release.

##Function Tables
Function tables are another very important concept in Csound. Their purpose is to store a pre-defined array of a mathmatical function somewhere in memory. What the table stores can be literally any kind of data, it is up to the user what this data will be, and how it will be used.<br>
The values stored in an array are floating point values, usually 64-bit, however this depends on the version of Csound and the machine. Indexing is 0 based, and the final index is determined by `size - 1`. To access tables, you can either index them directly, or use an opcode that has predefined methods for reading table data.

###Gen Routines
Csound contains many pre-determined methods for creating data for function tables. There are 30 standard GEN routines in csound and each perform various functions from defining indivudal pointers, to creating complex polynomials.

###Normalization
By default, when generating data for a function table through a GEN routine, csound will *normalize* our results, contracting or expanding the range to be within (0-1, or -1 - 1). We can override this feature by using a negative value for the GEN routine number.
###Precision/Size
Most tables can be defined by any size, however some routines require the tables to be a power of 2.<br>
Longer tables are generally more desirable as they can hold more data points, however this comes at the cost of memory, so a balance must be found.
###Guard Points
Every table in Csound includes an extra point at the end which is known as a *guard point*. This value is used for interpolation. When reading a table, interpolating uses two contiguous values to calculate the interpolate value. This works until we reach the end of the table, so we include a guard point so the interpolation can work without having to create more complex code to read back from the beginning of the table.<br>
Usually the guard point is a repetition of the first point in the table, however for some cases this is not the case. In this case, it is referred to as an *extended guard point*.

##Audio IO
Audio IO is the system that is responsible for reading audio into a program, and writing audio to a destination.

###Audio Buffers
Audio IO employs a software device called a *buffer*. This is a block of memory that store compuational results of audio before being sent to a destination. This is employed because it is more efficient to read and write chuncks of data as opposed to computing each sample individually, then sending that to the output. The size of the audio buffer is something that is often accessible in audio programs.

###IO Layers in CSound
Csound uses two buffers depending on the type of IO device, the *software* buffer and the *hardware* buffer. Both have options to set the size of the buffers with...<br>
`-b N` for software<br>
`-B N` for hardware<br>
The outer buffers can read/write to sound files, or to a chosen audio device. 

##Real-Time Audio
Real-time audio is implemented using back-end plugins. It uses the cross-platform third party library *portaudio*. There are also other options depending on the operating system of the machine.

###Latency
Latency is a major concern for musicians when using digital audio. We can estimate the latency a buffer adds to the signal by dividing th enumber of frames in it by the sample rate. A buffer of 128 sample frames will have an inherent latency of 2.9 milliseconds.

###Csound Utilities
Csound also includes utility routines that implement functions like spectral analysis, noise reduction, and other functions. They can be accessed via the `-U	` option.<br>
`-U <utility name> <arguments>`

###Configuration File
A file name `.csoundrc` can be used by Csound to hold default options for your system. It should reside in the user home directory (topmost directory) and contain any options the user would like to keep as default.<br>
`-o dac -i adc -b 123 -B 512`<br>
If a contradictory option is set in a local file, the local option will take precedence.


