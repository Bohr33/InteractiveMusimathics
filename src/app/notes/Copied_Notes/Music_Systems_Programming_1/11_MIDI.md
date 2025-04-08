#MIDI

MIDI was originally designed as a 1-way protocol using the 5-pin DIN connection. Eventually USB's replaced this functionality and allowed for connections both ways.

###Format
MIDI is sent across 1 of 16 channels

- Each MIDI byte is 10 bits long, with an 8 bit MIDI data byte in the middle.
- For physical DIN connections, the limit for data speeds is 3,125 bytes per second.


##Hexadecimals
Hexadecimal is useful because we can use 1 digit for 4 bits. It is a compact way to represent bytes.

Hexadecimal is a 16 base number system. It uses digits 1-9, as well as A, B, C, D, E, and F, to represent values 10-15.


Ex. The value 255 as a binary byte is 1111 1111, as Hexadecimal it is 0xFF.
Ex. The value 16 as binary is 0001 0000, as Hexadecimal is 0x10.

##MIDI Messages
###Global Messages
- SYSEX - system x messages
- SYS RT - realt time controllers for global parameters like transport
- SYS Common

##Channel Messages

3 Bytes make up a MIDI byte <br>
Status Byte - Message Byte (1) - Mess Byte (2)

Status bytes begin with a 1, 1xxx xxxx. Message bytes begin with a 0, 0xxx xxxx.

###Status Byte
1. Tells you what type of message you have
2. Tells you what channel the byte is on.

The available note types for a status byte are...
1. 0x80 - NOTEOFF
2. 0x90 - NOTE ON
3. 0XA0 - AFTERTOUCH
4. 0xB0 - CONTROL CHANGE
5. ....

Each status byte will use at least 1 of the message bytes, some will use 2. Ex. a note NOTE ON or OFF message will use message byte 1 for the MIDI note number, and Message Byte 2 for velocity.

The second byte tells you what channel you are on, which can be of range if 16, 0x0F.


**Note** - the byte is the minimal addressable unit in C, we cannot access individual bits within the C language. Instead we must use bitwise operators and bitmasks to isolate individual bits within bytes.


###Masking MIDI Bytes
Mask for Channel -> Status & 0xFF

See notes...


###MIDI into Computer
MIDI in the computer flows from the computer program, and using the API system is sent into a MIDI driver, which will then send the data out to the device.

Some available MIDI drivers are CoreMIDI, alsaMIDI, JackMIDI, and we will be using the cross-platform MIDI library **PortMIDI**.


##PortMIDI

Port MIDI has two necessary headers

```
#include <portmidi.h>. //Main MIDI library
#include <porttime.h>. //Used for timing, also necessary
```

###Initializing PortMIDI
To start PortMIDI, we must use the function `Pm_Initialize();`. Like portAudio, this will need data about what device to open.


The PmDeviceInput Structure must be passed to initialize portMIDI.
```
typedef struct{
	int structVersion;
	const char *interf;
	const char *name;
	int input;
	int output;
	int opened;
	}PmDeviceInput;
```

###Timer Functions
Timer must be started before you open available devices.
`Pt_Start(); //a timer function`

###Opening Devices

```
PmError	Pm_OpenOutput(
	PortMidiStream	**stream,
	void *OutputDeviceInfo	info; //NULL
	int32	buffersize;
	PmTimeProcPtr		time_proc, //timer callback, usually NULL
	void * time_info, //NULL
	int32_t	latency; //usually 0
```

###Writing MIDI Messages

```
PmError	Pm_WriteShort(
	PortMidi	*stream,
	PmTimeStamp	when,
	int32_t		message);
```

In order to pack our midi data into the proper `int32_t` format, we can use the `PmMessage()` function.

```
PmMessage(status, databyte1, databyte 2)
```
###Closing PortMIDI
`Pm_Close(*portmidistream)`
see notes.


###Useful Functions

```
Pm_Initialize(); //Initializes Port MIDI
Pm_CountDevices(); //Gets available MIDI devices
```


##MIDI Input
When doing midi input to a program, your program will be constantly waiting for MIDI input.

