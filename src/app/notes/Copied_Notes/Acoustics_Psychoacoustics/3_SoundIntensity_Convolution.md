#Sound Intensity
--
###Free Field vs DIffuse Field
**Free field** - describes acoustic conditions containing still dry air, there are minimally reflections and this mimizes the variation in sound. This is an ideal condition for acoustic tests. <br>

**Anachoic Chambers** are also ideal. These specially treated rooms absorb almost no sound by minimizing the amont of reflective surfaces.

**Diffuse Field** - this is the opposite of a free field. The field has more reflective surfaces that are treated for optimal sound. These are ideal for musicians and music. Like an acoustically design theatre.

###Sound Pressure
- Sound Pressure is measure of local deviation from the ambient atmospheric pressure, measured in Pascals or N/m^2.
- The lower threshold of hearing is 0.00002 Pa.
- The higher threshold of pain is 20 - 200 Pa. (It's very dependant on frequency).

###Intensity
`I = p * v` I = Sound Intensity.    p = Pressure, v = velocity

###Decibels
- A Decibel is 1/10 of a bel.
- The smallest change we can perceive is about 1 dB.
- Decibels are relative values that represent a change in sound intensity. This means we need a reference level to measure our change in intensity.

###Bit Depth to Decibels
CD Quality has a bit depth of 16.<br>
That gives us `2^16 = 65536` possible values for amplitude storage.<br>
So, this gives us a dynamic range in decibels of...<br>
`Dynamic Range = `


###Dynamics in Analog Audio
- All audio stored as voltage will create an electronic 'hiss', this is known as the *noise floor*.
- Vinyl typically shows a dynamic range of about 60dB.
- Cassette tapes have a dynamic range of about 55dB.

###dBU/dBV
**dBU** - uses 0.775 as its reference 0db.<br>
**dBV** uses 1 volt as its reference 0db.

##RMS

RMS (Root-Mean-Squared) - is a method of attaining an average value of a signal's amplitude.<br>
Our ears perceive changes in dynamics over time, in a sense, they average the miniscule changes in amplitude and use a greater increase of the average to perceive a loudness increase... The RMS method of measuring level is good measurement that echoa this process.


###Inverse Square Law
In essence, if you double the distance you are from a sound source, this will result in halving the intensity level of the pressure wave. 
- Since amplitude and intensity are directly proportional, this will result in the amplitude also being halved as you double the distance so...<br>
*For each doubling of distance, sound level will drop by 6db*
