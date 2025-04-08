#Advanced Csound Topics
##Function Tables
- function tables are arrays of numbers stored in memory. These can be written to, and read from, and are *Global*, they are accessible anywhere in Csound.

###Applications
- Waveforms
- Envelope Shapes
- Transfer Functions
- Sequences (durations, amplitudes, pitches...)
<br>

###Properties
- Number - Used to identify the table from others
- Time of Creation - when the table should be created. (This should almost always be 0, the fact you have this option is because back in the day, memory was limited so you had the option to delete tables and reuse the memory for other purposes)
- Size - the length of the array
- GEN routine - the number identifying the subroutine used to create your array of values. There are about 30 options, from loading in a soundfile to generating complex additive waveforms.

###Defining a Function Table
Two methods can be used to create a function table... <br>
1. ftgen opcode <br>
2. f-statement (Csound score)

##Gen Routines
###Gen 10
Function - creates table consisting of a single cycle of a waveform defined by harmonic weights (amplitudes) based on frequencies determined from the harmonic series.<br>
`ifn ftgen 1, 0, 4096, 1, 1/2, 1/3, 1/4, 1/5, 1/6, 1/7, 1/8, 1/9, 1/10` <br><br>
**Note** - No matter what amplitudes you put, you will get a normalized tables. This is because the function generator will automatically normalize whatever array of data you have created. If you **don't** want to normalize the output, you can stop this providing a negative GEN number.

###Gen 7
Function - creates straight lines between supplied points

###Gen 2
Function - Copies each number given to it a a parameter to the respective function table position. We generally don't want this table to be normalized, so we often use the negative version of this (-2).
`ifn ftgen 1, 0, 8, -2, 0, 4, 7, 12, 7, 12, 4`<br>
However if we want to retrieve these values, we have ot use a **Table Lookup**

###Table Lookup
The most direct way to lookup values of a table is with the `table` opcode...<br>
`xval table xindex, ifn [, imode, ioff, iwrap]`<br>
This opcode is simple, you provide an index and a table number, it returns the value at that index.

###Phase Generator
- a phase generator creates a phase value that ramps between 0 and 1. It is useful for reading tables, or driving other repetive operations.<br>
`xsig phasor xfreq [, iph]`<br>

###Truncation & Interpolation
In addition to the `table` opcode, you also have variations such as `tablei` and `table3` which perform different versions of interpolation when moving between the values of your table.

##Arrays
- tables are like arrays in csound, however arrays are different in that they are not global and are local to the instrument. Like other variables, arrays have the options of being...
- i-vars - one off computatoins
- k-vars - scalars
- a-vars - vectors

###Syntax
Made with type charachter (i, k,a ) and square brackets
`ivar[], kvar[], avar[]`<br>
You can init the array with `init`<br>
`kvar[] init 10`<br>

###Accessing Items
You can access the values using an index within the square brackets<br>
`ivar[0]` - first position<br>
To store values in array positions...<br>
`kvar[0] = 1`<br>

**Note** - Another option you have to fill an array is with the `fillarray` opcode...<br>
`inotes[] fillarray val1, val2, val3, val4, ...`<br>

###Opcodes Using Arrays
Some opcodes work directly with arrays....

`aSig[] diskin "stereo.wav"`

*Note* this is especially useful for referencing 2-channel audio files with one variables. For instance, the `diskin` opcode requires you to output your two channels to two variables, with arrays, you can store this within a single array.

#Control of Flow
Control of flow in Csound is sequential. During performance time, there is an implicit loop, the k-cycle, which runs each performance time opcode.

###Conditional Expressions
- you can use conditional expressions to control the performance of certain statements based on a conditional test.
- a == b
- a != b
- a < b
- a > b
- a <= b
- a >= b
**Note** - you cannot use vectors (a-rate variables) for conditional tests

Using these statments, you can creating **branching** <br>

###Init and perf time branching
if the condiiton invloves init-time variables, the branching will occur both at init-time and perf-time.<br>
However, if the condition invloves k-rate variables, then the branching ONLY takes place at perf-time

##Iteration
Iteration can be done using while loops....<br>

```
while (condition) do
...
od
```
###Applications
Branching and iterations can be used to control synthesis and generate sequences of advanced. It can be very useful for making computer music in a programmatic way.

```
ik = 0
ii = 0
while ik <= 12 do
	schedule(1, ii, 1, 0.5, 60 + ik)
	if ik == 4 || ik == 11 then
		ik += 1
	else
		ik += 2
	endif
	ii == 1
od
```
This example is a progmatic way of creating a major scale using conditions to branch.

###Loops and Arrays
Loops and arrays can be used in conjunction to create powerful results with relatively simple code.

#Global Variables & Software Bus
There are two forms of globals that can be employed to share data between two instrument instances<br>
1. **Global variables**<br>
2. **Software Bus Channel**<br>
The main characteristic of a global object is that they are unique, thre is always only one instance of each in a program. We call this a *singleton*<br>

###Global Variables
Global variables of any existing type (including arrays) can be created by prepending the letter 'g' to the name. These are initialized using the `init` opcode.<br>
`givar init 0 //creates global ivar initialized to 0`<br>

###Global f-tables

```
gifn ftgen 0, 0, 4096, 10, 1, 1/2, 1/3, 1/4

instr 1
	a1 oscili 1, 400, gifn
	...
endin
```

###Control and Audio Global Variables
What is the advantage of using global variables for audio and control?<br>
- it allows you to connect instances of instruments into eachother, allowing you to send audio and control systems into each other for various control purposes.
- It's also extremely useful for reverbs, and for various global effects that you want to apply to all instruments.

###The Software Bus
Another global method in Csound is the software bus. This can also be used by hosts of csound to send and receive data.<br>
The sofware bus works with named channels. Once a channel is created, they are accessible by everywhere in the program.

```
chn_k "name", imode //channel for i or k-rate use (scalar)
chn_a "name", imod. //channel for a-rate use (vector)
```

You can access channels using specific opcodes like `chnset, chnget,` etc...<br>

###Application: Audio Bus
We can also create audio busses. A particular case is 'sources is sinks'. This is when we have an instrument, and want to send that audio to a single effect instrument. The initial instrument is the 'source' and the effect is the 'sink'.<br>

#Case Study
##Wavetable Synthesis
Wavetable synthesis uses one or more stored waveforms in a function table which are read to produce the output audio. This can be done with opcodes such as `oscili`, or with a phasor and table lookup....<br>

```
aph phasor kfreq //phase at kfreq Hz
asig tablei aph, ifn, 1 //wavetable lookup
```
**Note** Interpolation (`tablei`) is essential to reduce erros and have a good SNR.



###Random Harmonic Weights

```
ihar[] init 40
ik = 1
while ik < 40 do
	//rnd31 generates bipolar random numbers, abs makes them non-negative
	irnd = abs(rnd31(1, 0, 0))
		ihar[ik] = irnd < 0.8 ? 0 : irnd/ik //select values above 0.8 and divide by ik
		ik += 1
od
```
This can be used to generate wavetables with random harmonic weights.