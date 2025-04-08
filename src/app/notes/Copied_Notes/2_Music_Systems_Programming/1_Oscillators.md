#Oscillators

$$
a(n) = \sin(2\pi n \frac{f_s}{f}) \\
a(n) = waveform\ amplitude\ at\ n
$$

`sin(2 * PI * n * (f/sr));`

This is the previous method used to generate a sinusoid signal. However, if we want to change the frequency f over time, it will not work properly. This is because this equation does not take into account the previous phase. It only represents **instantaneous frequency**.

Note: the value calculated is the amplitude at a given sample, not the phase. The phase is used to calculate this value when fed into a $\sin()$ function.

In order to accuratly calculate the angle for each input as the frequency changes, we must take into account the phase of the previous value. To do that with an arbitrarily changing frequency, we must integrate it.

$$
s(n) = a(n)\sin\left(2\pi\int f(n)\right)
$$

This equation will given us our sample value (phase) based on a variable frequency.

**Question:** What does $a(n)$ mean in this case? if it is the initial phase, why multiply? It's probably amplitude.

Implemented in C it would like...<br>

$$
\phi = phase \\
s(n) = \sin(\phi) \\
\phi = 2\pi \int f(n) dt
$$

```
s[n] = sin(ph);
ph += 2*pi*f/sr;
```


The instantaneous frequency can be found by subtracting 2 phase values and dividing by time. If finding instantaneous frequency over a single sample, the time is 1, so it is just the difference.

The phase can be found by taking the integral of the instantaneous frequency, although we must known our initial phase value to get the accurate value, else we just have the change of phase.


###3 Important components of Oscillator
1. Amplitude
2. Frequency
3. PHASE!



###Implementation
This is an implementation in C. The issue is, we would have to create a structure to hold these values, and then use function pointers, and it is very messy. We would like to package the phase value with the function and oscillator.  To do this, we can move to C++.

```
double osc(double a, doble f, double *ph, double sr)
{	
	double s = a * sin(ph);
	*ph = += 2 * PI * f / sr;
	return s;
}
```

#C++
##Structures
In C++, when we attach a function to a structure, we call this a method. You can also have free functions in C++ as well though.

###Properties of Structures
- Member Functions/Methods - functions that are defined as a part of the structure itself. This is a key feature that isn't inherent in C.
- Member Variables/Attributes - these are variables defined within a structure that can be accessed by member functions
- Constructor

###Constructor
This is the function that initializes a given structure. They do not have to be defined, and will instead use the default constructor, but a structure can be defined by...

```
Struct Name {
	int a;
	
	Name(int x): a(x)
	{
		function body.
	}

}
```
With this definition, the structure can be created and initialized like...
`Name a(1);`

Constructor arguments can be given optional default values. These will be the values used if none are provided during initialization.

```
struct Osc{
	double ph;
	double sr;
	Osc() : ph(0.), sr(44100.) {};
	...
```

##Structures
The following shows an example of an oscillator structur being defined with two member variables, a constructor, and a member function (method).

```
struct Osc {
		double ph;
		double sr;
	
		Osc(double p, double sr) : ph(p), sr(sr)
		{};
		
		double process(double a, double f)
		{
			double s = sin(ph) * a;
			ph += f * twopi/SR;
			return s;
		}
	}
```

This is an example of what *object oriented programming* is. It allows us to define objects, which we can then make any number of instances of. This model *encapsulates* the model of a sine wave oscillator, with a method to manipulate it.


##Overloading
Overloading is when you have the same name for multiple functions, but give them different arguments. This allows the compiler to distinguish the two by arguments, and you can have have different versions of similar functions.

```
double process();
double process(double a);
double process(double a, double f);

a = process(); //calls the first function
a = process(0.5, 2.0); //calls the third function
```
However, the return value for the overloaded functions must be of the same type.
You can also have functions with the same number of arguments, but with different types.


###Defaults
Defaults allow you to call a function with no arguments, and the arguments are filled in with the default values.

```
type func( type arg = ..., type arg = ...);

//could be called like...
func(a);
func(a, b);
```

```
double process(double amp = 0.5, double freq = 440.);

Osc(double a, double f, double phs = 0., double esr = 44100.): amp(a), fr(f), ph(phs), sr(esr){};
```
Optional arguments need to be towards the right (end) of the parameter list. It is not allowed for the first to be optional is the second is not. This would create confusion for the compiler (and the user).

##Memory Management
In C, libary functions were needed to access the heap to allocate memory dynamically. In C++, this is built into the language. The keyword `new`, will allocate the memory for us.
To delete the memory, we use the `delete` keyword.

```
osc *osc = new Osc(0., sr);
delete osc;
```

Just like how we have a constructor that initiliazes the structure when called, when deleting a structure, a destructor is called. 
The signature for this method is the structure name preceeded by a ~.<br>

`~struct_name()`

We can also create arrays of objets in C++. However, a special version of delete is used when deleting arrays.

```
int *array = new int[n];
delete[]	array;
```

#Table Lookup Oscillator
There are some limitations to our current implementation of an oscillator. It does not allow us to generate arbitrary waveforms, and it makes one function call per output sample, which is not very efficient. We can implement a more flexible and general algorithm with the table look up oscillator.

The idea of a table look up osciallator is that we have a pre-defined table stored in memory that we can access which represents our wave form. Then, instead of computing each sample, we simple access this table and retrieve the appropriate value. 

###Algorithm Definition
The algorithms are defined as...<br>

$$
s(t) = a(t)\cdot T([\phi(t) \bmod \mathrm{N}]) \\
\phi(t + 1) = \phi(t) + f(t)\;  \cdot \; N\;/\;f_s
$$

$T()$ = table lookup "function".<br>
$N$ = table size

The $\bmod$ operator is used to ensure our input is always within the range of the table size.


###Modulo vs Mod

In C, we use $\%$ as the modulo operator. However, this only works for postive integers. For the table lookup oscillator, we need a similar operator that will also work for floats and negative values. This called the **Generalized Modulus** and is denoted by $\bmod()$.