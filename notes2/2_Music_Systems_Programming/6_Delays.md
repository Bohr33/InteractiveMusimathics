#Delays
Delays are essential tools in the realm of audio processsing. Their use can range from classic long delays for a delay effect, or for more complicated structures such as filters

##Circular Buffers
An initial conception for a delay might include copying a sample data into a place in memory, and then for each next sample, moving these samples over in a memory space. However can become very inefficient and tedious, especially for longer delay lines, thus we introduce the concept of the **circular buffer**.

For a circular buffer, we instead move a pointer for reading and writing positions around a block of memory, wrapping to the start once we reach the end. This saves us from constantly re-writing data points.

Furthermore, we lots of uses we only need to keep track of one pointer, the read position, since our write position will precede this pointer by 1 sample. In this case, our delay length will be decided by the size of our delay memory buffer.

###Implementation
There are three simple actions we need to do to implement a circular buffer delay.

1. Read the delay buffer at the current position to generate output.
2. Write the input signal to that position.
3. Increment our r/w pointer, and wrap if we reach the end of the buffer.

In this simple example, we've created a slapback echo, whose delay length will be based on the size of our delay buffer. However we can create more complex effects with fixed delays as well.


##Component Reverberators
The basic application for fixed delays is echo and reverberation. Reverberators can be constructed efficientlly by various connecting components together. These components can be constructued from fixed delays. The two most used components are **comb filters** and **allpass filters**.

###Comb Filter
Comb filters are made from a simple delay that feeds back into the input with a scaling factor $g$ being applied. The $g$ value is related to the total reverb time of the comb filter.

$$
g = \left(\frac{1}{1000}\right)^{\frac{r}{\tau}}\\
r = \text{Reverb Time}\\
\tau = \text{Delay Time}
$$

In a comb filter, you can have a negative g-value. This will invert input, and the output amplitude response will have peaks where the positive g had troughs, and troughs where the positive g had peaks.

**Implementation**

```
const double *AuLib::Delay::dsp(const double *sig) {
	m_vector[i] = m_delay.set(sig[i]+m_delay[m_pos] * m_fdb, m_pos);
	m_pos = m_pos == m_delay.vframs() = 1 ? 0. : 	m_pos + 1;
	}
	return vector();
}
```


###Allpass filter
Allpass filters are very similar to comb filters, however they include a feedforward section in addition to feedback. The feedforward also contains a $g$ variable for a scalar, but is usually inverted $-g$.



```
in = in + delay[p] * g
out = -in * g + delay[p]
delay[p] = w;
p = p! = N-1 ? p+1 : 0
```

###Schroeder Reverb
Using the comb and Allpass filter, we can combine these components together to create a schroeder reverb.

##Variable Delay Lines
Variable delay lines will allow us to do a lot more effects such as flanging, chorusing, vibrato, pitch-shifting, and more. However this will complicate the process, and some key aspects must be considered.

- Since writing to the delay will always proceed sample by sample, we must calculate our delay in relation to the writer pointer position in order to obtain a reading position index.
- The reading position might fall beyond the delay buffer memory, we will have to watch for this and use a modulus to wrap it to the proper range.
- The reading position may fall between two integer indices of our delay array, we can use interpolation to read data in-between.
- When interpolating linearly, we will need to read the next sample of ahead of where we are currently reading, because of this, we will have to watch for the case where the delay reads outside of our delay line and instead read the first position of our array.


$$r = w - d\\
r = \text{read position}\\
w = \text{write position}\\
d = \text{delay}
$$

An implem

###Interpolation
One issue with this is that read from a fast moving read position can create zipper noise when jumping mulitple samples. To fix this, we want to interpolate with a index that is a floating point.

An issue with the interpolation, is that by taking the next sample we might hear a click due to reading outside of the delay (or a crash via segmentation fault).


##Multitap Delays & Convolution
In addition to fixed and variable delays, another possibility is to add **taps** to the delay line. Here, instead of only extracting the output of a single point in the delay line, we get extract the data from multiple positions, where each other position is a *tap*. This can be used to emulate things such as early reflections in reverberation, as well as other effects.

If we place a tap at every single point in a delay line, then we can implement **convolution**. When doing this, we also apply a gain multiplier to each tap, and the output will be a sum of $N$ taps, where $N$ is the size of the delay line.

We can store the sequence of gain values itself, which will also be of size $N$, and we call this file the **impulse response**. One method of obtaining an impulse response is to record a room's response to a given impulse of noise. We can think of this as the recording of all of the individual reflections of a room's surface.

##Equation of an Impulse Response
$$
y(n) = a_0x(n) + a_1x(n-1) + a_2x(n-2) ... a_{n-1}x(n-(N-1))
$$
The coeffecients $a$ actually makes up our impulse response.

Furthermore, we can generalize this concept to obtain the impulse response of any system, and impart that system via convolution. For instance, FIR and IR filters can be analyzed by sending an impulse through them, then their impulse be used to implement the filters on an input.

###Implementation
To implement a convolution algorithm, we can use the same technique as a fixed delay line, however now we will need to read from every position of the delay line, and sum their outputs. This means we will need a total of $N$ read pointers.

```
const double *AuLib::Fir::dsp(const double *sig) { double out = 0;
uint32_t N = m_ir.tframes();
for (uint32_t i = 0; i < m_vframes; i++) {
m_delay[m_pos] = sig[i];
m_pos = m_pos != N - 1 ? m_pos + 1 : 0;
for (uint32_t j = 0, rp = m_pos; j < N; j++) {
      out += m_delay[rp] * m_ir[N - 1 - j];
      rp = rp != N-1 ? rp + 1 : 0;
    }
    m_vector[i] = out;
out = 0.; }
return vector(); }

```
Note that this code is quite expensive and computationally heavy. To perform a single sample of convolution, we must read every point within the delay and perform a multiplcation and addition for each. The complexity of the operation increases by $N^2$. Because of this, this implementation, known as **Direct Convolution** is only used for small $N$. For larger values, we instead use the spectral domain where the fast-fourier transform is used.

#C++ Lambda Expressions

Lambda expressions are designed so that they are created to be anonymous, and designed for data in a flexible way. They are used in contexts where a small, temporary function is called for.

Associated with the lambda function is the idea of its *closure*, which is the scope of the environment, including varaibles etc, it has access to. C++ allows use to construct lambdas with a well-defined *capture list* that will define the closure.

###Syntax
```
[captures](parameter_list) -> return_type {body}
```
This defines a function, and there is no name attached thus it is an anonymous function.

- The parameter list is just like any argument in list
- type is just like any other type
- body is just like any other function body
- Captures however allow you to capture the external environment. Basically, the external environment means data/variables outisde the labmda function's current scope. This can include members within a class that the lambda is in with the `this` pointer.

###std:transform
the std::transform function applies a function to an iterate ...


Wherever you have a function that takes a function pointer, you could replace this with a lambda function.

We can also use lambda functions to assign to function pointers. However, instead of writing the entire function pointer type, we can use the keyword **auto**.

```
auto myFunc = [](float x) -> float return x;

```

###std::function
There is a standard function in the standard library, std::function that allow syou to create function templates. We can also assign lambda functions to these.

###Example
Lambda functions are useful when processing elements in a vector or list. For example, if we wanted to change the gain of signal vector, we can use a combintation of iterators with a lambda.

```
std::vector<double> audio(vecsize);
int gain;
...
std::transform(audio.begin(), audio.end(), audio.begin(), [gain](double s) {return s*gain});
```

###Auto Types
A lambda expression has a type that is unique and unnamed. It is possible to assign this expression to a C-style function pointer containing the same type decleration as the resulting function.

```
int (*add) (int, int) =
	[] (int a, int b) {return a + b};
	std::cout << add(2,1) << std::end;
```
To simplify this, C++11 introduced the **auto** type specifier, which allows variable to have their types deduced from the initializer.This can allow use to re-write the above example as...
```
auto add = [](int a, int b) {return a + b;};
```
The auto keyword can be used whenever it is possible to deduce from the context what type it is.



###Functional Programming
The basic principle of functional programming is that we are manipulating functions and passing them to be manipulating for different use cases. Another core principle is that there are no *side effects*. Side effects refere to functions that do other actions rather than simply taking in values, and outputting them. Printf() has side effects.

Why functional programming? with no side effects or state, 


Faust is a functional programming language.