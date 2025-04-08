#Filters

Filters are a means of processing sound in terms of the amplitudes and phases of partials. Their effect over amplitudes at various frequencies is called the *amplitude response* while their effect on the phase at various frequencies is called the *Phase response*.

There are two ways we can analyze filters, by amplitude repsonse (LP,HP,BP, etc), or from frequency response

**Size of Filters** - the size of a filter refers to its order, that is 1st order, 2nd order, n-order filters. A first order filter has a 1 sample delay, 2nd order has 2 sample delay, etc.

**Filter Structure** - filters can a have a 2 types of impulse response

1. Finite IR - the response will eventually die out, and stabilize at 0. FIR filters are imlemented with feedforward delays, that is the input is combined with its delayed *input*.
2. Infinite IR - this response never decays completely theoretically, however in digital systems they eventually hit the value limit. IFR are implemented with feedback delay, which is a delayed *output*.

In programming implementation, we are most concerned with the order of the filter (the n-sample delay) and the type of impulse response.

In oscillators, we maintain the phase of the oscillator. In envelopes we maintatin the envelopes current value. For filters, we must maintain the state of the **delay**.

##IIR/Feedback Filters

###First Order Filters
First Order filters are very smooth with gentle amplitude response curves. They are implemented using a 1-sample delay of their output.

$$
y(t) = ax(t) - by(t-1)
$$

- $x(t)$ : input 
- $y(t - 1)$ : output delayed 1 sample
- $a$ and $b$ : filter coefficients

The values of $a$ and $b$ will determine if highpass or lowpass.

For a lowpass filter, we set...

$$
r = 2 - \cos(2\pi \frac{f}{f_s})\\
b = \sqrt{r^2 - 1} - r \\
a = 1 + b
$$

- $f$ : cutoff frequency
- $f_s$ : sampling rate

For a highpass filter, we simply need to modify b...


$$
r = 2 + \cos(2\pi \frac{f}{f_s})\\
b = r - \sqrt{r^2 - 1} \\
a = 1 + b
$$


Basically, what we need is cutoff frequency $f$, sampling rate $f_s$, and to hold the delay.

**Implementation**<br>

The variables we will want to store in our structure state will be the delay value, `m_del`, as well as our coefficients `m_a` and `m_b`. These coefficients will need to update when changed. You could update them constantly, or every sample block, however it is more effecient to only do this when changed.

```
//m_del = delay
m_delay = in[n] * m_a;
m_del *= m_a; //double-check this
```

The First order IIR filters can be implemented with a common *engine* or *kernel* that would like...

```
virtual const douuble *filter(const double *sig){
	for(uint32_t i = 0; i < m_vframes; i++)
	{
		m_del = m_a * sig[i] - m_b * m_del;
		m_vector[i] = m_del;
	}
	return m_vector;
}
```
A processing function could then invoke this kernel with the appropriate settings for *a* and *b*. 

We could, for instance, write some functions that would set these variables for the appropriate type, HP or LP.


###Second Order Filters
This type of second order filter is called a **resonator**. The reason is because it can create a resonance at the cutoff filter. Furthermore, second order filters feature a steeper rolloff of -12dB, whereas the first order filters have a rolloff at -6dB.

Resonators are defined with the following equation.
$$
y(t) = a\cdot x(t) - b_1\cdot y(t - 1) - b_2\cdot y(t-2)
$$

There are two values we need for this filter, *bandwidth*, and *cutoff frequency*. These are values are used to generate the coeffecients using the following equations...

$$
R = \exp(-B\frac{\pi}{f_s}\\
b_1 = -\frac{4R^2}{1+R^2}\cos(2\pi\frac{f_c}{f_s})\\
b_2 = R^2\\
a = (1-R^2)\sin(\cos^{-1}(\frac{R_1}{R^2}))
$$

The value of $R$ can be approximated as $1-B\frac{\pi}{f_s}$ in certain cases where $R$ is close to one.

$a$ is an input scaling gain that is used to keep the filter under control so the amplitude is not out of control when the bandwidth is small.

**Implementation**
The kernel for the second order IIR filter would look like...

```
const double *Reson::filter(const double *sig)
{
	double y;
	for(uint_32 i = 0; i < m_vframes; i++)
	{
		y = sig[i] * m_scal - m_b[0] * m_del[0] - m_b[1] * m_del[1];
		m_del[1] = m_del[0];
		m_vector[i] = m_del[0] = y;
	}
	return m_vector;
}
```

**Feedforward Designs**

You can also implemented a resonator filter with a 2-sample feedfoward path. The benefit of this is it will remove the shoulder that is present without this. The beginning of the filter will go all the way down to zero at the beginning, which is more appropriate and common for things like a bandpass filter.

$$
y(t) = ax(t) + a_2x(t-2) - b_1y(t-1) - b_2y(t-2)
$$

To make this more practical to implement, we can rearrange it as a system of equations.

$$
w(t) = ax(t) - b_1w(t-1) - b_2w(t - 2)\\
y(t) = w(t) + a_2w(t-2)
$$

A more general version of a second-order filter would allow to use different types of filter packages by computing the appropriate coefficients.

$$
w(t) = x(t) -b_1w(t-1)-b_2w(t-2)\\
y(t)=a_0w(t)+a_1
w(t-1)+a_2w(t-2)$$

**Direct Form 1/2**
The two equations above are denoted in a way known as **direct form II**, as opposed to direct form I which uses seperate delays for feedback and feedforward paths.

$$
y(t)=a_0x(t)+a_1x(t-1)+a_2x(t-2)-b_1y(t-1)-b_2(t-2)
$$

We generally implement the DF2 method since it is more economical.

###Fourth-order Virtual Analog Filters
Fourth order filters are common designs for analog systems and many digital systems. They feature an even steeper roll-off than previous filters at -24db/Octave. They can be constructed by placing 2 second order filters in series.

See paper for more details and equations.

###Balancing
Given that filters, and especially resonators, can have a dramatic and sometimes overbearing effect on the amplitude under certain conditions, it is useful to have  means of controlling and balancing the output to ensure it doesn't get out of control. We can do this by balancing via a *comparator* signal, which would be the pre-filter audio. This is easily achieved with a pair of RMS estimators.

$$
y(t) = x(t)\frac{RMS(c(t))}{RMS(x(t))}\\
RMS() = \text{RMS estimator}\\
c(t) = \text{Pre-filter signal}
$$

However, we must be careful not to have 0 in the denominator, and must add a check to protect against this case.


**NOTE** - lookup LTI, linear time invariant systems. As far as I understand, a linear system is one where the order of the components does not matter, the same signal will be produced in either order. 

**NOTE** - also, figure out how to draw the graphs for the filter flow and input them in this documents.


#Templates
C++ allows us to create families of entire entities (types or functinos) from a single prescription.

A template is defined with the keyword `template` followed by a parameter list and the template body:

template<*parameter_list*> definition;

```
template<typename T>
	class
	{
		T var;
	};
```
	
You would instantiate this as....

template-name<*argument-list*>name;
	
```
	X<int> a;
	X<float> b;
	X<X<int>> c;
```
	
Templates are commonly sused to define classes that are similar in structure but depend on different types.
	
Here is an example of a template being used to make an array class, which can be of any defined type. It will need a type for the array, and the size.
	
	
```
template<typename T, uint64_t N> class MyArray{
	T data[N];
	pubic:
		MyArray(T init){
			for(uint32_t i = 0; i < N; i++) const {
				return data[n];}
			T& operator[] (uint64_t n){
				return data[n]; }
	};
```

Note that two operators are defined here: one for reading, which returns a constant reference, and another for writing. The const is used when the template is declared as a const.
	
##Templates in C++ Library
The C++ standard libary has templates for objects such as Arrays, and lists. These template documentations can be found at cppreference.com.
	
All C++ functions can be accessed within namespace std.
`std::Array`

One of the greatest benefits of the provided templates is automatically dynamically allocate their memory. This eliminates the need to allocate the memory ourselves and will help clean up our code. 
	
##Vector Template
The most useful and fundamental template for our purposes is the vector template. This is a wrapper around a dynamically allocated array. All arrays initialized with the **new** keyword can be replaced by an std::vector, thus we will use it for our audio vectors. whenever the vector goes out of scope, the allocated array will be automatically deleted.
	
It can be declared as...
	
```
#include <vector>
...
std::vector<int> data(size);
```

Thus we can replace our audio vectors that are allocated with the **new** keyboard with...

```
Class Example{
	protected:
		...
		std::vector<double> m_vector;
	public:
		Proc(..., uint32_t vframes, ...) : ..., m_vector(vframes);
		...
	};
	
```
Which also eliminates the need to deallocated the memory within the destructor.

###Vector Methods
Along with deallocating memory, the vector template comes with other functions that can be useful for us.

- **operator=** : assigns a vector to another vector
- **assign()** : assigns a value to an element
- **at(a)** : access a specified element at a
- **front()** : returns the first element
- **back()** : returns the last element
- **data()** : returns a pointer to the internal array
- **size()** : returns the size of the array
- **clear()** : clears the vector
- **resize()** : resizes the vector

**Note**: although the vector automatically dynamically allocates memory, the resize() function can be useful if we know in advance how many elements we need. This can prevent the vector from constantly re-allocating itself if data is being added.
	
	
**Iterators** - these are members of the vector class that can be moved around and used to access things, although they are not only used in the vector class. Other data templates in the C++ library such as std::list and std::map also have iterators. Iterators are essentially just pointers to the internal data that don't expose the internal structure. An iterator can be used to walk through thte array and access it through de-referncing:
	
```
int main(){
	std::vector<int> v(1,2,3,4,5,6,7,8,9);
	for(std::vector<int>::iterator i = v.begin() i < v.end(); i++);
		cout << *i << "\n";
	return 0;
```

**Range-based for**
For containers like vectors, C++ provides an alternative method for looping through its members from the standard for() syntax.

for(*range-decleration* : *range-expression*) *body*

This is known as the **range0based for**. This is suitable for objects with the `begin()` and `end()` methods.

```
int main(){
	std::vector<int> v{1,2,3,4,5};
	for(int i : v) std::cout << i << "\n";
	return 0;
```
	
	
	
	





