#MIDI

How many bits per 1 second of 16-bit 44,100k audio?

16 * 44,100 = 705,600 bits per second = 705.6 kb/sec.


**Note** - MIDI messages are sent in series, however channels are parallel.

###MIDI Binary

- MIDI messages are made up of 8-bit words, however the first bit is either a **status byte** or **data byte**, which tells the MIDI system what type of message the rest of the message represents.
- Thus, the rest of the data message will be the data bytes that contain the actual value. This leaves 7-bits for the data resolution, which equals $2^7 = 128$ total values of data resolution.




