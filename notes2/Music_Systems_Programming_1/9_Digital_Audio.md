#Digital Audio
In order for audio to be stored and manipulated in a computer, it must be *encoded* into a discrete format that can be stored in computer memory. The encoding process used primarily in computers for audio processing is called Pulse code modulation.

##PCM
Digital Audio is almost exclusively encoded and decoded using PCM (Pulse Code Modulation). In order to process digital audio, you will need the audio to be encoded with PCM. FIles like MP3 will not work for processing since they have a special compressed type of encoding, however we can decode these back into PCM and rencode as a MP3 if we wanted.

PCM works be generating a series of pulses that are modulated by the incoming audio. The incoming waveform will then be 'sampled' at these values, creating a series of modulated pulses as output, which get stored as values. These values are quantized based on the byte size of the device/encoder you are storing the values in. 

For a program to read encoded audio data, it must know information about how it was encoded. There are 3 factors that are most important for this process.

1. How often samples are taken (sampling frequency)
2. How the samples are encoded (sample precision)
3. How many channels the audio signal carries.

###Sampling Rate
Sampling rate is the rate at which data samples will be taken from incoming audio, and how fast those samples are sent out for playback. The sampling rate determines two major factors about the signal.

1. The highest recordable frequency will be at SR/2. This is known as the *Nyquist frequency*.
2. The higher the sampling rate, the more processing power required to calculate the data in time.

**Note** - you cannot sythesize a sine wave at the nyquist frequency. Since the sine wave starts at 0, it will be sampled exactly at 0 at each interval. However, you can synthesize a cosine wave at this frequency, since it starts at

###Sampling Precision
Sampling Precision is determined by the number of bits/bytes used to store the available values. The number of quantization regions available for storing amplitude values can be determined as...<br>
`Qb = 2^nbits`<br>

For each bit added, this equates to an increase in signal to noise ratio of about 6dB.

More bits means more quantization regions, means more precision, which means a higher signal to noise ratio.

8 bits  = 48db SNR<br>
16 bits = 96dB SNR<br>
32 bits = 192dB SNR<br>

**Floating Point Storage**<br>
The performance of floating-point encoding is generally at least as good as 24-bit integer, for single precision floating point values. Double precision is much better than this. The downside of higher bit encoding is that it requires more space to encode a larger bit value.

Another value of floating point storage is that expects amplitude values to be in range -1.0 to 1.0. Wherease with integer storage, this range is dependant on the number of bits being used. (-128 to 127 for 8-bit, and 32768 for 16-bit).




###Audio Channels
How can we store 2 channels of audio?

1. Non-interleaved - store each channel in its own complete block. Problem with this is it is inefficient since during playback you would have to jump back and forth between each block.
2. Interleaved - This is the good solution. Each channel is "interleaved" so the corresponding value for each channel is contiguous, making it easy and efficient for the playback sample. 

When channels are interleaved, we call a collection of samples from each channel a **frame**.


###Basic Operations on Channels

- **Gain** - gain scaling is done by applying a multiplier to each sample in a stream.
	`out[n] = in[n] * gain;`
- **Mix** - Mixing signals is equivalent to adding them together
	`out[n] = in1[n] + in2[n];`
-**Stereo Pan** - Panning can be achieved by applying proportional gains to each channel individually

```
left[n] = in[n]*pan;
right[n] = in[n] * (1.0 - pan);
```
**Note** - this is not equal power panning, but demonstrates the initial principle.

Question: What happens if you raise a signal to the power of another signal?


##Raw Signals
The problem with raw data is we have no means of knowing important parameters about the audio file such as the endianess, byte size, etc.

To fix this, we need to encoding data as a **self-describing soundfile format**.

###Self Describing Sound File Format
This is a type of encoding where important information about the audio file is stored within a header of the file; it is packaged with the audio data itself as one file.

Because there are so many different types of audio formats, it is very cumbersome to write your own support for each file type. Instead, we should use libraries that handle this for us. The industry standard for this is **libsndfile** library.

##libsndfile Library
libsndfile makes managing and working with different audio files very easy. It makes the process of dealing with the different requirements of various soundfile formats transparent so we can simply work on the processing.

###Opening FIles
Libsndfile gives us a single function for opening a file for reading or writing.

`SNDFILE *sf_open(const char *path, int mode, SF_INFO *sfinfo);`<br>

- *path is the name of the file
- mode defines the opening mode (SFM_READ, SFM_WRITE, SFM_RDWR)
- *sfinfo is a pointer to a variable that defines the information for the sound file.

This function returns an opaque pointer to a SNDFILE structure. The operations will depend on the data within this structure.

###SF_INFO Structure
```
typedef struct SF_INFO{
	sf_count_t frames;
	int samplerate;
	int channels;
	int format;
	int sections;
	int seekable;
} SF_INFO;
```

Each call to an open function should refere to a *seperate* instance of this structure. If we are writing a file, we need to pass in the appropriate parameters to this function for it to work how we intend.

Generally, the most important of these variables will be samplerate, channels, and format.

The format is a code determining (a.) the format used in storage, and (b.) the sample and encoding format.The first is called the *major* format, while the second is called the *subtype*.

**Note** - see notes or libsndfile documentation for a list of all major and subtype formats.

When defining these types, we use the bitwise OR | operator to combine them.

`sfinfo.format = SF_FORMAT_WAV | SF_FORMAT_FLOAT;`

###Reading and Writing
The libsndfile reading and writing functions are defined in two ways:

- By the type of audio data buffer we are supplying to it
- By how we are counting the data (samples or frames)

`sf_count_t sf_xxxxx_type(SNDFILE *sf, type *data, sf_count_t n);` 

- xxxxx determines whether it is a write or read function, and whether we are counting samples or frames. (See documentation or notes for details, but generally is like sf_read_float(), or sf_write_short(), etc.)
- sf is a handle to an open sound file
- n is the size of the data in samples or frames

The read/write functions will return the number of samples or frames read/written as sf_count_t, which is an integer type defined by the library to hold values up to SF_COUNT_MAX.

###Seeking
It is also possible to offset the start from which we either read or write data using the `sf_seek()` function. This works almost identical to the `fseek()` funciton, but starts at the beginning of audio data.

```
sf_count_t	sf_seek(SNDFILE *sndfile, sf_count_t frames, int whence);
```

###Compiling and Linking
Since libsndfile is an external library, we have to tell the program where this library is when compiling. If it is installed in system directory, then the flag `-lsndfile` should be enough to find it, if not, we must include the path to the library.





 