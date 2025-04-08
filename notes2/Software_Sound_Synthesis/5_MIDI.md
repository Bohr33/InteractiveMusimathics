###p-fields
- You can tell Csound to tag your p1 variable, which will let you identify a specific instance. This is done with a decimel point following the instrument number.<br>
Ex. n.x,    n = instrument number,     x = instance value. <br>




###Negative p2 values
Using a negative p2 values allows you to automatically take over the last instance of a given instrument as soon as the next instance begins to play. This works as long as your score statements are using the same p1 values (as long as the instances are the same). This creates an overall legato effect.

```
schedule(1.01, 0, -1, 0.5, 440) ;runs indefinetly, until next instance
schedule(1.01, 2, -1, .25, 660) ;this replaces the last instance, and new p-values are used
schedule(-1.01, 2, 0, 0, 0) ; turned off with a negative p1

```

###Extra Time
**xtratime** - an opcode that will allow you to add extra time to the end of an instrument's note, it acts like an extra release segment for the instrument.

THis extra time is added the instance the instrument ends, even if the duration is undefined


###Triggering Events
- i-time: schedule, event_i, scoreline_i
- k-rate: schedulk, event, scoreline
- numeric score: i-statments


#MIDI
MIDI - Musical Instrument Digital Interface

###Vitrual MIDI
- This is the use of the MIDI protocol within digital only means; no physical connections required. This happens when you send MIDI data from the daw to plugins, and/or other virtual devices.

###MIDI in Csound
-Mn : receive MIDI input from device n<br>
-Qn : send MIDI output to device n<br>
-+rtmidi : <br>

**note** - you can handle multiple devices with MIDI using portmidi. This also allows the following options

-Ma : receive MIDI from all devices
-Mm : takes MIDI input from all devices and maps ports to channels above 16.

###MIDI Device IO and IDEs
Each IDE handles MIDI devices slightly differently<br>
- CsoundQt: uses Csound MIDI backends, or its own MIDI IO. 
- Cabbage - has its own implementation of MIDI..


###MIDI File IO
-F filename: read MIDI data from *filename*
-T : stop Csound at the end of MIDI file data input.
--midioutfile = filename : write MIDI data to *filename*


##MIDI Messages

###Channel Messages
These are MIDI messages that are routed through specific channels so that they can be independtally read for specific purposes. They are composed of up to three 8-bit data bytes:

1. Byte 1: statues byte, containing the message type, and the channel number (each 4 bits)
2. Byte 2: message data byte, informs the system what type of message the data is
3. Byte 3: data byte, this is the byte that contains the actual data that will control your system.

###Note Messages in Csound
By default, <br>
- NOTE ON messages on channel *N* will initiate *instr N* realtime events.
- NOTE OFF message on channel *N* turn off corresponding *instr N* instances.

###Note Mapping optins
1. --midi-velocity=N, puts NOTE ON velocity in p-field N
2. --midi-velocity-amp=N, converts NOTE ON velocity to amplitude relative to 0dbfs and places it in p-field N
3.  --midi-key=N, puts NOTE ON MIDI number and places it in p-field N.
4.  --midi-key-cps, converts NOTE ON Number to frequency and places it in p-field N.

###CC Messages in CSound


###Aftertouch
- You can have monophonic aftertouch, or polyphonic aftertouch. Monophonic contains 1 data byte, while polyphonic has 2 data bytes, one specifying the note, and another with the aftertouch data.

###Pitchbend
Pitchbend messages contain 2 data bytes that come together for a much finer control.
Instead of the usually 7-bit resolution you get with most MIDI messages, you get a 14-bit resolution with pitchbend.

##MIDI Polyphonic Expression (MPE)
-MPE is an agreed upon extension upon the MIDI protocol for multitouch applications.


##Open Sound Control (OSC)
1. it uses computer networks through the internet protocol (IP)
2. it is aysnchronous, message are sent wihtout and pre-definined means of synchronisation or timing
3. it is openly defined, customisabl, and allows more precision than MIDI
4. COmmunications are one direction, from a client to a server

###Messages
Messages are defined in a straightforward way...

1. Destination (IP number or name) and port
2. Adress
3. Data Type(s)
4. Data Object(s)

###Destination
Destinations for OSC are defined by and IP code, or a machine name. Codes are a string four numbers. Ex. A.B.C.D<br>
128.0.0.1 is the reserved name for the local machine.

###Address
The OSC message address is a string defining what the message may be, allowing a host to parse input messages and respond to them appropriately. The usual form is similar to a directory location. Ex. instr1/freq

###Date Types
A string of letters defines the message data types.


###Data Objects
The data types defined by Csound extend the standard types found in the OSC protocol and allow for audio, arrays, and function tables to be sent and received.

###OSC in Csound
OSC in Csound is achieved with three basic opcods...
1. OSCsend : sends any OSC message to any destination
2. OSCinit sets up an OSC server in the loal machine to recieve messages
3. OSClisten : listens are responds to OSC messages sent to a server set up by OSCinit.

