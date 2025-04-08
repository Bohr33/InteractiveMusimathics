#Interpolation
The previously implemented table lookup oscillator works, however it is far from ideal. The reason for this is due to phase truncation.

###Phase Truncation
Phase Truncation occurs when our double precision values are truncated to integers in order to read the table. This is a small error, but produces very noticable effects.

To solve this, we use the concept of interpolation, where we estimate the value in between the two known values by applying a polynomial. The higher order polynomial used, the more accurate the interpolation, however this makes the code more complicated and uses more computational power. Generally, at least linear interpolation should be used.

##Interpolation Methods

###Linear Interpolation 
Linear interpolation uses a first order polynomial to draw a linear line between the two known points, then extracts the value in between.

$$
f(x) = ax + b	 \qquad (0 < x < 1)
$$

The $a$ and $b$ values are calculated from the table values at adjacent positions. $x$ is given by the fractional position between the two indicies. 

$$
a = y_2 - y_1\\
b = y_1
$$

###Cubic Interpolation
Cubic expands linear interpolation by using a 3rd order polynomial, this is also known as 4-point interpolation sinc four table values are used to extract a curve.

$$
f(x) = ax^3 + bx^2 + cx + d \qquad (0 < x < 1)
$$
where $x$ is the fractional psotion between table indices.

To use this for interpolation, we find the values in the table for four points we know, (4 points are necessary so we can solve for 4 coefficients) create a system of equations, solve for the coefficients, then using our found polynomial, obtain the fractional value.

1. Obtain 4 closest values from table
$$
f(-1) = y_0, \quad f(0) = y_1, \\ f(1) = y_2, \quad f(2) = y_3 \\
y_n = T([\omega(t) -1+n]\bmod \mathrm{N})
$$
2. Solve the System - by plugging in values -1 - 2 into the cubic equation, we obtain these equations for coefficients.
$$
\begin{array}{l}
y_0 = -a + b - c + d\\
y_1 = d\\
y_2 = a+b+c+d\\
y_3=8a+4b+2c+d
\end{array}
$$
3.Finally, rearrange so we can obtain coeffecients in terms of $y$ values;

$$
\begin{array}{l}
 da=(y_3 - 3y_2+3y_1-y_0)/6\\
b = (y_2)-2y_1+y_0)/2\\
c=-y_3/6 +y_2 -y_1/2-y_0/3\\
d=y_1
\end{array}
$$

Like linear interpolation, we must have a table that is extended by two points to account for the case where need to read beyond the table. We also need to make sure we do not attempt to read the table value at $-1$, thus protection should be in place.


###Sinc Interplation
Even more accurate, and is a widely used function many aspects of signal processing.

**Normalized Sinc Function**
$$
\operatorname{sinc}(x) = \frac{\sin(\pi x)}{\pi x}, \qquad x \neq 1\\
\text{and...}\\
\operatorname{sinc}(0) = 1
$$

**Unnormalized Sinc Function**
$$
\operatorname{sinc}(x)=\frac{\sin(x)}{x}
$$

This function is used as described in the **Whittaker-Shannon Interpolation Formula**, which states that a band-limited signal can be perfectly reconstructed from its samples using a sum of sinc functions.

**Sinc Interpolation Function**
$$
f(x) = \sum_{i\ =\ -\infty}^{\infty}f(i) \cdot \operatorname{sinc}(x-n)
$$

- $f(n)$ is known function values from the table at $n$.
- $\operatorname{sinc}(x-n)$ acts as an interpolation kernel that reconstructs the original signal.

**Solving the Infinite Problem**<br>
The above equation has **infinite support**, meaning the sum extends indefinitely. In practice, the sum is windowed to limit the amount of computations to a finite number.



For oscillators, we tend to stick to just linear or cubic interpolation. Since interpolation is used for other signal processing.



#C++ Inheritance
The cleanest way to implement these methods is to create new structures with these new methods. We can do this easily within C++ using the concept of  **inheritance**. This allows us to easily copy the already written code from the oscillator, and expand it to include these new methods.

A structure that inherits from another structure is known as the *child* or *derived* structure. The one inherited from is known as the *parent* or *base*.

The syntax for a structure definition that inherits and can access all members of a base structure is...

`struct name : base_name{...}`

###Inheriting from Osc
Here is an example of inheritance defintion from the original `Osc` structure.

```
struct Osci : Osc {
	Osci(double a, double f, const double *t,
	unsigned int sz, double phs = 0., unsigned int vsz = 64, 
	double esr = 44100.) : Osc(a,f,t,sz,phs,vsz,esr){};
	
	const double *process(double a, double f);
	const double *process(double a);
	const double *process();
	);
```
Note that a constructor is supplied for each structure, which calls the base constructor, passing, in this case, all parameters to it. 

The sole reason we have created these structures is to provide new implementations to the processing methods in the base structure, which we declare here (and we can implement elsewhere). These methods will *hide* the base structure ones, and take the place of them when an object of the derived structure is used.

However, this can be improved on by using **polymorphism**.

##Polymorphism - (several forms)
Polymorphism allows us to create several forms of a process that is present at the parent of an inheritance structure. If we declare a function as virtual, using the keyword virtual, then we are allowed to override the function definition within the child structures. This is also known as overriding.


Instead of hiding the base methods, we can let the compiler decide which one to use, when most appropriate.

We can do this with **virtual methods**, which allow the compiler to safely select the relevant function. We simply have to mark the *base* structure functions with the keyword `virtual` to warn they may be re-implemented in a child:

```
struct Osc {
...
	virtual ~Osc() {delete[] s;}
	virtual const double *process(double a, double f);
	virutal const double *process(double a){
		amp = a;
		return process(amp, fr);
	}
	virtual const double *process(){
		return process(amp, fr);
	}
};
```
Now, in the derived structures, the functions will not be hidden, but use the overide mechanism.

###Oscillator Inheritance Tree
We can further re-organize the written oscillator structures to further remove repeated code.

- In th ebase, declare the processing 'kernel' as virtual, that is, the oscillator code, to be re-implemented in the derived structures
- In the base, declare various interfaces to it, the over loaded `process()` methods, which will call the actual processing code
- In the derived structures, re-implement the processing 'kernel'

Now, when any of the three oscialltor structures are created, these will in turn call, through the virutal mechanism, the appropriate oscillator code.

```
struct Osc {
	attributes...
	
	virtual void oscillator();
	
	Osc(double a, ...) ... {};

	virtual ~Osc() {delete[] s;}
	
	const double *process(){
	oscillator();
	return s;
	}
	
		const double *process(double a, double f){
	amp = a; fr = f;
	oscillator();
	return s;
	}
	
	const double *process(double a){
	amp = a;
	oscillator();
	return s;
	}
};

struct Osci : Osc {
	Osci(double a, ....) : Osc(a,f,t,sz,vsz)
	
	void oscillator(); //overrides Osc::oscillator()
	
struct Oscc : Osc{
	Oscc(double a, ...) : Osc(a,f,t,sz,vsz)
	
	void oscillator();

```

In this example, we have not implemented the `oscillator()` 'kernel', only declared it. We can define these functions elsewhere. For this case, it is probably best to implement in another header, implementation file.

The code implementing a structure method needs to use a qualified name, which has the form

*struct_name :: method*

The implementation might loook like this.

```
void Osc::oscillator(){
	for(int i = 0; i < vsize; i++){
		s[i] = amp * table[(int) ph];
		ph += size * fr /sr;
		while(ph >= size) ph -= size;
		while(ph < 0) ph += size;
	}
}

void Osci::oscillator(){
	double frac;
	int posi;
	for(int i = 0; i < vsize; i++)
	{
		posi = (int) ph;
		frac = ph - posi;
		s[i] = amp * (table[posi] + frac*(table[posi+1] - table[posi]));
		ph += size * fr/sr;
		while(ph >= size) ph -= size;
		while(ph < 0) ph += size;
	}
```

When using another outside file, it must linked with the main program at compilation. This can be done like...

```
$c++ -o program main.c oscillators.cpp -I
```

##Function Table Objects
Now that we have more advanced types of oscillators in a object oriented structure, it can be useful to create a function table object that can simplify use of function tables.

There are two attributes we need which will be common to all.

1. table data array
2. table size

A simple base table we could make, employs a generating algorith that just copies data from an array into it;

```
struct Func {
	double *table;
	int size;
	Func(int siz, const double *in = NULL) :
	table(new double[siz+2], size(siz)){
		if(in){
			memcpy(table, in, siz*(sizeof(double));
			table[siz+1] = table[1];
			table[siz] = table[0];
		}
	}
	~Func() { delete[] table;}
};
```

Note, the create table adds to extra points to the end of the table and copies the first two data values into these locations. This is for use with the linear and cubic interpolation methods. 

###References
Reference allows you to pass arguments as a reference type, rather than directly or through pointers. This is useful for circumstances such as our table structure since it would be wasteful to copy the entire structure into our oscil structure.

However a downside to this is we have to deal with pointer/dereference notation, which can be cumbersome. However we can simply this notation by using references.

The main differences between references and pointers are...

- a reference binds to a single object at initialization time; in that sense, it behaves similarly to a constant pointer in that you can't change to where it is pointed to
- It is not possible to have a NULL reference.
- The reference variable does not need to be de-referenced to access the object, we can do iit directly

A reference to an object of type T is declared and initiliased as 

T& *ref* = *object*;

```
Func table(10000);
Func &tableref = table;
```
This decalres a reference called `tableref` and assigns it to reference our `Func table` `table`.


##Phase Generators and Table Readers
The idea of any oscillator can be broken down into structures that focus simply on phase generation, and table manipulation.

Oscillators are actually composite objects made up of three separate operations put together:

1. **table lookup** - the reading of function table values
2. **phase update** - incrementing/decrementing the phase value;
3. **amplitude scaling**: applying a gain to the values from table lookup

We can seperate these steps and model them as signal processing objects. This can be useful if we want to be able to use these processes indepentantly.

###The Phasor
A phase generator will produce a ramping signal that will go from 0 to 1 at a given rate. 

$$
\omega(n+1)=(\omega(n)+\frac{f(n)}{f_s}\bmod 1)
$$

This is generally implemented as a loop.

```
void Phasor::process(){
	for(int i = 0; i < vsize; i++)
	{
		s[i] = phs;
		phs += incr;
		mod1();
	}
}
```

The increment is set to $\frac{f(n)}{f_s}$.

###Table Reader
Now we can implement a table reader. We can also allow for more options now that the operations are seperated. For instance, we could allow for 2 lookup modes: a raw index, and a normalised mode (0 - 1). Furthermore, we can provide an option for dealing with out-of-range indices. A constructor for this would look like...

```
struct TableRead{
	...
	TableRead(const Func &tab, double phase = 0., bool norm = true, bool wrap = true, int vsize = 64, double sr = 441000.);
```





