#Data Structures

So far, we have been able to allocate memory for a single variable of a single type, or allocate an array of contigous memory with a single type. But what if we want to allocate memory for a mix of data types? i.e float, int, char all in one block? We can do this with data structures.

###Why Data Structures?
Allows us to essentially create our own data type, which will make the process of allocating memory, and accessing our data type, much more efficient. You can also think of the data structure as a type of hetergenous array. It is a mix of various data types we need in a specific order, while still being contiugous like an array. The elements we add to this structure are called *member variables*.


###Syntax

```
struct name {
	type	member_name;
	...
	};

```

You can than reference this structure like...
`struct name var1, var2, etc`


###Typedef
You can simplify the process of referencing a structure by using the **typedef** function/keyword. **typedef** allows us to give new names for existing types.

```
	typedef struct name{
		type	member_name;
		type 	member2_name;
	} NEW_NAME;
```
You can now define new types using this type definition like...<br>
`NAME var1, var2`

###Example with Notes
```
	typedef struct note
	{
		int number;
		float amp;
		float dur;
	} NOTE;
```

##Member Access

###Initialization
To initilialize members of a given type, create you variables, and just like an array initialization, enclose the member values in brackets, in the order that they are defined.<br>
`NOTE a = {0, 0.f, 0.f}`<br>
If you want to initialize variables out of order, you can do...
`NOTE b - {.amp = 0.f, .dur = 1.f, .number = 60}`

###How to access our member variables?
We use the name of our variable (not the structure name, but the name we gave on initialization) and a dot specifier.<br>

```
NOTE a;
a.dur = 5.0;
a.amp = 6.0;
a.number = 61;
```

##Structures and Functions
Once you have defined your structure as a new data type, you can now also use it as a return type for a function, or as input to a function...<br>

```
NOTE	transpose(NOTE* x, int semitones)
{
	x.number += semitones;
	return x;
}

```

##Pointers and Structures

###Managing Large Data Structures
Normally, when you pass a variable to a function, the computer will **copy** the value at that variable, and then copy again when it returns the value back. If we have a large enough data structure (imagine a kilobyte or something) then this will result in a large over head. In order to prevent the copying process, we can instead pass a pointer to our structure.

###Accessing Members through Pointers
With pointers to structures, we cannot access our member variables with the `.` symbol since we still need to dereference them. Instead we must use a special symbol combination of `->`.<br>

```
NOTE *px;
void transpose(NOTE* px, int semitones)
{
	px->number += semitones;
}
```
**Note** the purest way to access member variables with pointers is to use the member accesser (.) as well as a dereference (*).<br>
`(*px).number += semitone`

##Functions in Structures
Structure members can be of any built-in, or user defined data type. However, they cannot be functions, but they can include pointers to functions. For the NOTE data type, it might be useful to include a pointer to a function that converts this value to herz.

```
typedef struct note {
	int number;
	float amp, dur;
	double (*cps) (struct note);
}NOTE;
```
This only creates a slot to hold the function. To use it we must write our function, and pass it an instance of the type during its decleration.

```
double get_cps(NOTE x){
	return 440. * pow(2., (x.number - 69.)/12.);
}
...
//Initialize
NOTE a = {60, 1.f, 1.f, get_cps}, b;
double hz = a.cps(a);
b = a;
```
**Note**: The last assignment of NOTE a to b also copies the "get_cps" function. That function is now also accessible by NOTE instance b.

##Union
As well as structures, the C language allows you to define another hybrid type that can have two or more different interpretations, called a *union*. All members in this case share the same memory space so if gets modified, it will be reflected in others.
###Definition Syntax

```
Union	myUnion {
	float 	f;
	int 	i;
	char	c[4];
	};
```
###Decleration Syntax
`Union myUnion a;`


###What is the point of Union?
Unions are useful when you need to work with multiple types of data but never at the same time. Unions only allocate enough memory to store the largest member variable.


##Enumeration
Enumeration is the process of defining text to contiugous values (1, 2, 3, 4). It automatically gives each text the next available value and counts upwards starting at 0. This is useful for name multiple use cases that could be read by a switch statement, for example.

###Syntax
`ENUM {SINE, SAW_UP, SAW_DOWN, TRI, PULSE}`

The main purpose of this is to make our code more human readable by giving names to data that simply is used to switch cases.

##Bitwise Operators
C has no way of access singular bits in your computer. The byte is the minimum data amount that the language can access. However, you can still operate on individual bits using bitwise operators.<br>
**NOTE** - the size of a byte (normally 8-bit) is not defined by the language, but instead by the system you are working on. <br>

There are two main types of bitwise operators...

1. Bitwise Logic
2. Bit Shift

###Bitiwse Logic
1. & - AND
2. | - OR
3. ^ - XOR - exclusive OR
4. ~ - NEGATION 


###Bitiwse Logic on a Set of Bits
Each byte aligns with each other and the Logical operator applies the logic, as if indivually, on the bits that occur in the same place.

Bitmask - a bit mask is a byte that has a singular place with the value 1. You can use this to isolate specific bits by using the `&` operator with whatever input byte you want to isolate a bit from.

```
 0000 0100 ;bitmask
&1100 0110
----------
=0000 0100
```

###Why is accessing an individual bit useful?
You can save space by using the on/off state of indivudal bits for parameters that could only have 2 states (true/false). This can be useful for selecting system options, or for flags, or similar things. Using bit operators to access options is one of the most common uses of this logic.

**Note**: See options example.

###Bit Shift Operators
As the name states, these operators will shift the locations of your bits to the right or left. In practice, they are also a fast way of either multiplying a byte by 2, or dividing by 2.

1. << - left shift - multiply by 2
2. >> - right shift - divide by 2

```
0000 0001 << 0000 0010

0000 0011 >> 0000 0001

```
Can also be thought of as...

```
x << n  //multiplication by 2^n
x >> n. //division by 2^n

```
Note - if you bitshift past the edge of a bit, the hanging bit will be discarded. The operation is rounded. However, this makes bitshift less useful for non power of two values.



	