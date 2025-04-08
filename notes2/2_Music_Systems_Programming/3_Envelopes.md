#Envelopes

Like oscillators, we can implement envelopes using interpolation.

Envelopes can be drawn in a variety of ways, but to simplify their specification, we tend to employ a piece-wise approach, i.e. we split the total time function into segments and generate each curve separately. The two methods most generally used are linear and exponential.

###Linear
$f(x) = a + bx$

$f(t) = y_0 + (y_1 - y_0)\;\cdot\;\dfrac{t - x_0}{x_1 - x_0}$

Rather than writing this entire function, and using input values to get the output for each point, we can instead find the *increment*, and simply add this recursively. The increment can be found by...

$$
i = \dfrac{y_1 - y_0}{x_1} \\
y(t + 1) = y(t) + 1
$$



One issue with linear envelopes is they are only somehwat accurate with lots of small values. However, they are also less ideal in that they are not a natural shape for amplitudes. Our perception of amplitude is based on the ratio of levels, thus a exponential/logarithmic change would be best.

###Exponential
To make an exponential envelope, we can adjust our linear envelope.

$$
f(x) = a + bx \rightarrow a^xb
$$

The time position $x$ will vary between 0 and 1, adn the coefficients $a$ and $b$ are the ratio we want to cover, and the starting point, respectively.

$$
a = \frac{y_1}{y_0}\\
b = y_0
$$

To make this an iterative process, we could use the formula...

$$
m = (\frac{y_1}{y_0})^\frac{1}{d}\\
y(t+1)=y(t)\cdot m
$$


Note: One note about the exponential envelope, is the input values cannot be 0, values must be positive.


###ADSR
When calculating an ADSR, it might make sense to use the amount of time elapsed to switch between segments. However, this has an issue when the user retriggers a note while still in the decay phase. This will cause it to jump to 0 on reset, and create a click. It is better to check for a specific level.



##Implementation
There are many possible implementations of envelopos so there is not a one size fits all application.
###Parameters need for Envelope
- increment
- decreement
- sustain
- release factor


#C++ Access Control
When designing a new data type, we want to be clear about what data is *internal* to the structure, and what is accessible. Generally, we want to hide our member attributes and provide functions for setting and retrieving these values. By doing this, we can create a clear interface for our structures that make the types easier to use, and prevent errors down the line.

Not all of the attributes in a structure should be able to accessed and set by a user or function. For instance, the phase value of an oscillator has no real need to be changed, it should be kept and modified internally by methods.

To solve this, we can control the access of member variables by using keywords such as **private** and **public**.

1. **Private** - this is the highest level of protection, only the structure itself can access and alter the attribute, child structures cannot access the variable either.
2. **Protected** - this is also not accessible by outside functions and parameters, however it is accessible by inherited classes.
3. **Public** - visible and accessible by everything and everyone.


**Friend** - the *friend* qualifier can be used to allow other classes to access private or protected code.


###Class vs Structure
In a structure, anything that isn't specified as private will, by default, be public. For a class, by default, an unspecified attribute will be private.

The syntax for declaring members of each type are...

```
class T {
//private members
protected:
//protected members
publiic:
//public members
};

```


###Inheritance
Below shows how you can create a class and have it inherit member variables from the parent while specifying a protection level.

```
class Osc{
	...
	}
	
class Osci : private Osc {};
```

- if specified as private, all base class attributes become private, ending the variable visibility there.
- if specified as protected, the public and protected members become protected
- if specified as public, all public variables are public.

By default, if not specified, an inherited class will be private. For structures, by default, the inherited structure will be public.


Best practice when working with larger structures is to make all members private as a default, and then as you need access to members, begin making them accessible with protected or public.


##Namespaces
Namespaces help prevent name clashes and make sure that the function, class, etc being used is the correct one. 

These can be useful in situations where you are combining code with someone elses library, and some of your classes or other members share the same name.

```
namespace mine{
	void f();
	int a;
	class Osc{};
}

mine::Osc	osc;
mine::a = 0;
mine::f();
```

using namespace mine...

##Operator Overloading
When creating a new type/class, we want these structures to behave naturally as any other type. To do this, we may want to use standard operators such as +,-,etc. to operate on our classes in specific ways. We can do this with operator overloading.


Operator overloading is when you overload an operator, i.e. give a new defition to an existing operator such as +, -, *, /, [], ().


**Syntax**<br>
*return_type* operator**op**(*arguments*)



###Example
```
class MyInt {
	int val;
	public:
		MyInt(int x) : val(x){};
		
		const MyInt &operator+=(const MyInt &y){
		val += y.val;
		return *this;
		}
		MyInt operator+(const MyInt &y){
		MyInt x(*this);
		x += y;
		return x;
```
 This allows us to write the code...
 
 ```
 MyInt a(1), b(2), c(3);
 c = a + b;
 ```


###Standard IO
In C++, we do not use the functions `scanf()` and `printf()` like in C.
Instead we use functions included in the standard C++ library that provided IO access in a more object-oriented way.

- std::cout - standard output, quivalent to stdout
- std::cin standard input, equivalent to stdin
- std::cerr - standard err, equivalent to stderr

They are access via the libraries...

- \<iostream>
- \<fstream>
- \<sstream>

All of functions in these libaries are part of the `std` name space and are accessed like `std::cout`.

In these functions, the `<<` and `>>` operator are overloaded, allowing us to write statments such as...

```
cout << "This is a constant"" << 32 << "and a variable" << a << '\n';
```


