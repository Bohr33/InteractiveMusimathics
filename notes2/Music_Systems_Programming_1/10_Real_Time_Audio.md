#Real-Time Audio

The Audio CODEC is the part of the DAC or ADC that encodes and decodes your audio to and from the computer.


##The Flow of Realtime Audio
1. ADC
2. Computer
3. DAC - the DAC must receive audio up to date with the Sampling Rate it is processing at. It has an input buffer which will be filled by the program.

Between the ADC and Computer, and the DAC and computer, there is a layer of drivers that are **system dependant**. For mac, this is CoreAudio. For Windows there is ALSA. Some other options are ASIO, MME, WDM. Each one of these systems have a different API. These hardware buffers are usually quite small, but we don't have a way to acces or change these parameters ourselves.

Because of the buffering rate for both the ADC and DAC, there will be inherent latency within the system. If N is the buffer size from the ADC to computer, and M is the buffer size of the computer to the DAC, then the inherent latency in the system is (N + M)/SR.

There is also another layer of buffering between the drivers and the program, this, along with any buffering or latency wihtin the program itself, will contribute to the overall latency of the system.

Latency above 20ms is likely to be noticed by the user. We should attempt to keep our buffer sizes low enough so that this isn't perceivable. We can calculate latency as.<br>

```
l = (m + n)/(f)
n = input buffer frames
m = output buffer frames
f = sampling frequency
```

Note - when writing to a file, it is better to write in blocks of buffers like with Real-time audio. Although its not as imporant as with Real-time audio, when writing to a file, the operation to write to a file is expensive (computationally) so it is much more efficient to do this in blocks of samples or frames.


###How do you handle working with multiple driver options?
Given that the drivers used are system dependant, writing a program for everysingle option and use case is tedious. To solve this, we will use a libary, **PortAudio**.


##Port Audio
Header - `#include <portaudio.h`<br>
Link Command - `libportaudio`

`PaError err` - PaError is a special data type within port audio that allows you to define and work with errors.

###initializing Port Audio
In order to use Port audio, we must first initialize it. If this call is successful, we can continue to use other functions.

```
err = Pa_Initialize()
if(err = PaNoError)...

``` 
- this initilizes the Port Audio system and checks for an error by comparing with the `PaNoError` constant. You can also get an error text by passing this err variables to `PaGetErrorText()`.

###Port Audio Devices
Port audio uses a structure called `PaDeviceInfo` which tells port audio information about the device and sound card being used.

```
typedef struct PaDeviceInfo{
	const char *name;
	int maxInputChannels;
	int maxOutputCHannels;
	double defaultSampleRate;

}PaDeviceInfo
```

This function returns the number of devices available within the system.<br>

```
Pa_GetDeviceCount(),
(loop through all devices)...
info = Pa_GetDeviceInfo(i)
```
Using this, we can loop through all the available devices, and print information about all available devices, even letting the user decide which to use.

We can also access the default input devices (chosen in the user settings) with the function...

```
Pa_GetDefaultInputDevice();
Pa_GetDefaultOutputDevice()
```
Both of these functions will return the index of the default device. This can be convinient if we don't want to list all of the available devices to the user and have them choose.

###Setting up the Stream
Port audio has a structure that we use to set information about the stream.

```
typedef struct PaStreamParameters{
	PaDeviceIndex device;
	int		channelCount;
	PaSampleFormat	sampleFormat; (int, float, short, usually float)
	PaTime				suggestedLatency; (in frames)
}
```
Before you open a stream, you must declare this structure and these parameters.

###Opening the Stream

```
PaError	Pa_OpenStream(PaStream **stream, 
					const PaStreamParameters *inputParameters,
					const PaStreamParameters *outputparameters
					double SampleRate,
					unsigned long framesPerBuffer,
					PaStreamFlags	 flags,
					PaStreamCallback *streamCallback
					void	*hostData);
```

Why does PaStream have a double pointer? - This has to do with the PaError containg the pointer to the stream. Since it is within a non-abstract object, using the second pointer allows a pointer to the pointer be returned so it can be filled. The stream will be filled by the function, so we need another pointer so it can do that.

###Synchronous vs Asynchronous
The options of PaStreamCallback will determine whether the operational mode is synchronous or asynchronous.

Synchronous mode is like writing to a file. It is sometime called the *push* form of audio IO. It does not use a callback. It reads in data, does its processing, and then sends it out all synchronously.

Synchronous mode is *blocking*, meaning the program will not continue until the read or write operation has returned. It is less responsive and requires more buffering than asynchronous mode.

Asynchrnonous is often called the *pull* mode of audio IO. This is because the system will seek audio data when it needs it, rather than have it supplied regularly by a program.

For Real time audio, asynchronous is happening. It uses a callback function where the processing is called by the system on a different thread and blocks of samples are passed between them as needed.

The following structure shows the necessary data needed for the stream callback, including pointers to the buffers, the buffer's frame count, Time info about the stream, and userData.

```
typedef int PaStreamCallback(
	const void *input, void *output,
	unsigned long frameCount,
	const PaStreamCallbackTimeInfo* timeInfo,
	PaStreamCallbackFlags statusFlags,
	void *userData);
```

###Starting the Stream
Before using the read and write operatoins, you must call `PaStartStream` which will actually begin the streaming process.


The following structure shows how a callback function might/should be structured.

```
int audio_callback(const void *input, void *output, unsiged long frameCount, const PaStreamCallbackInfo *timeInfo, PaStreamCallbackFlags statusFlags, void *userData){
	int i;
	float *inp = (float *) input, 	*outp = (float *) output;
	for(i = 0; i < frameCount; i++)
	{
		outp[i] = inp[i];
	}
	return paContinue;
```

Callback should be written so that no onerous operations are done, such as memory allocating, printing, or reading/writing files. This is known as being *realtime safe*.

###Closing the Stream
The following sequence will stop all open streams, and terminate the library...

```
Pa_StopStream(handle);
Pa_CloseStream(handle);
Pa_Terminate();
```


