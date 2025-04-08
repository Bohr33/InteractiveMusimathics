#Types
---
###Ints
1. Short - This is a version of an integer with less byte size than a normal int. This is system dependant and so not all shorts have the same amount of bytes.

2. Int - Default version of short. Has 4 bytes. This is standard accross all systems.
3. Long Int - Has 8 bytes.

###Char
1. 8 Bit values used for storing charachters. 

###Floating Point
Used to hold numbers with Decimels. It does this by representing a value as it would an integer, while also storing the place of the decimel (think scientific notation). <br>
Ex. 102.35 = 10235 x 10^-2.
<br><br>
**Float** - The default 32-bit floating point types. Gives you about 7 decimel places.<br>
**Double** - A larger, 64-bit floating point types.
Gives you about 15 decimel places.
<br><br>
#Variables
---
What is a variable? - a slot in memory that you give a name to.
<br>
All Variables need...<br>
1. Type - Ex. Float, Int, Char<br>
2. Name - Ex. Any combination of charachters that isn't  a keyword.

When giving variables values, we use the **=** symbol.
This is **not** reads as *equals*. Instead, this should be ready as an *assignment*.<br>
Ex. int a = 10; The integer variable *a* is assigned the value of 10

##Constants
###Literals
- Ints - 1L, creates long int constant. 1U, unsigned int literal.
- Double - 2.3 becomes 2.3f
- Signed Int - \-9 becomes 
- Chars - 'a' - a char literal. Must use single quotes. Double quotes refers to a string of charachters like "Hello World".

#Input/Output
- printf - used to output text and charachters to the terminal<br>
	**syntax:** printf(const char *format, ...) <br>
	For replacing text with a variable, use the type specifier '%'.<br>
	Ex. `printf("The length is %d\n", 50);` <br>
	Ex. `printf("The length is %f\n", float_var);` <br><br>
	To specify the number of floating point variables you would like to print, use the syntax %.3f. This would print the floating point value with 3 decimel places. <br><br>
- scanf - used to input text and charachters from the terminal
<br>
`scanf("%d", &a)`
<br>You must dereference the variable for scanf. It requires the address of the variable you would like to save the input in. 

<br>**Both printf and scanf are included in the <stdio> header**







