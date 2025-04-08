#Digital Delay Lines

Delay lines introduce a delay between input and output. This can be done with

- Long transmission lines
- Spatial distance between source and receiver
- Recording and playback
- LC circuits
- Bucket brigade devices
- Digital delay lines

Digital delay lines are the most used technique for modern circumstances. Other methods are used in analog settings.

##Digital Delay Lines
Digital delay lines are simple processors that store audio samples far a specified amount of time, releasing them afterwards.

Their function is to introduce a delay to the signal. These delays are used in many forms of audio processing, not just in creating delays.

###Circular Buffers
Circular buffers offer a method of storing, reading and writing samples in/from a block of memory in a digital program. They are circular in that once the pointer to the memory location reaches the end, it jumps back to the beginning of the buffer. 
This technique allows us to use a dedicated block of memroy to store some amount of samples we wish to delay.


###Delay Time
Delay itime is the fundamental property of a delay tline. The simplest delay line shave a fixed delay time that cannot be changed at any point during performance. 

Delay times can be in terms of seconds or samples. Denoted as (Ds or Dn).

To switch between delay times, we can use the formula...

$$
D_s = \frac{D_n}{sr}\\
D_n = D_s \times sr
$$


###User Defined Opcodes
Csound allows user to define their own opcodes.

UDOs have a few advantages over ordinary instrument code: 

1. They can have their own internal control rate 
2. They can be used recursively


```
opcode Foo, aki, aki
	asig, ksig, ival xin
			xout. asig, ksig, iin
endop	

```
Inputs and outputs are defined by using the `xin` and `xout` opcodes.


Opcode Overloading: You can define two opcodes that have the exact same name as long as they have different argument types. These will be resolved on call as csound checks how many arguments are given.



##Feedback
When using a single delay line, only 1 delay will be produced without an extra processing parameters. If we wanted to create multiple delays without having to chain together multiple delay objects, we can use feedback to keep the signal looping through the system.

###Feedback Pairs
Feedback delays are best implemented with the `delayr` and `delayw` opcodes.

##Loopers
An interesting application of delay lines beyond echo effects is to use them as memory buffers to store audio snippets. This is known as a looper effect.

This can be implemented by doing the following...

1. Set up delay line with a given duration
2. Start filling the delay with a signal
3. If the delay buffer is full, stop recording
4. output signal from delay line

###Tapped Delays
A typical delay creates only one delayed copy of the input signal. If we ant more copies, delayed at different intervals, we need to use more than one delay opcode.

An alternitive to this to tap the circular buffer. Tapping means retrieving the delayed signal at other points within the circular buffer, allowing the delay to come at different times as specified by the tap time.

There are several opcodes that can be used to tap into the delay line. These opcodes get the signal t speciic a dlay times xdlt or xdles.

**Delay Tap Opcodes**

- deltap - rounding readout
- detalpn - delay expressed in samples
- deltapi - linear interpolation
- deltap3 - cubic interpolation
- deltapx - higher-order interpolation

##Truncating, Rounding and INnterpolating Readout
When a certain delay time is translated into a number of buffere positions, it might result in a nonon-integral value. Because the location in a buffer is always integral, we have to decide how to interpret this>

1. Truncating or rounding: discards the fraction part ( 1.8 becomes 1) or rounds to the nearest. 
2. Interpolating: interpolates between the two or more adjacent buffer positions.
3. SyncL Mthod

When do you use interpolation?



###Opcode State
There are two types of opcodes in Csound with regards to state.

1. **Hold state between runs**: these opcodes need to keep track of internal state/data between each time they are run. For oscillator, this could be a phase state. For delay lines, this is read/write positions, and the delay memory
2. **No State** - thse opcodes produce output that is purely dependant on its input, these are known as **pure functions**. For example, **cpspch** opcode holds no internal state. 

