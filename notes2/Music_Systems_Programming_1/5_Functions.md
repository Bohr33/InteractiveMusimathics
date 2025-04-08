#Functions
###4 Things Need for Functions
1. Return Type - the type of result returned by the function, if nothing, set to **void**
2. Name - a symbolic name to identify the function.
3. Argument List - a list of arguments to be input to the function, each with a type and name.
4. Body - inside brackets, the code to be run when the function is called. Exits upon encountering a **return** statement.


**Syntax**<br>

```
Return-Type		Name(Argument List)
{
	Body....
	return val
};
```

###Arguments

You can call a function by passing any of the following...

1. Literals - `add(1, 4)`
2. Variables - `add(a,b)`
3. Expressions - `add(c*2, a+b)`
4. Function Results - `add(2, add(1, 1))`

###Variable Lifetime
By default, all variables are treated as **auto**, meaning they come into being as the function is called and cease to exist when the function exits. This means we can give variables names within functions that are the same as variables outside of the function, they are not within the same scope so they do not interfere with eachother. However, we could use the keyword **static**, which allows a variable to continue past a function call. It should only use for very deliberate cases however.

##Call Semantics
All arguments in C are passed by value, meaning their values are copied in place of the variable when called by a function. However, if we wanted to change the contents of a variable that is outside a functions scope, we can achieve this by passing the pointer to said variable. 

```
void setVal(int *p)
{
	*p = 7;
}

int main()
{
	int a = 0;
	printf("Value of a = %d", a); //prints 0
	setVal(*a);
	printf("Value of a = %d", a); //prints 7
};
```
Since array variables are just pointers to their memory address, they work in similar fashion. Simply pass a pointer to the array to the function. However, it is often also useful to pass the size of the array as well, that way the function can perform operations on the array while knowing where to end.

###Swapping
Swap Example: If you want to swap two the values of two variables, you could use pointers.

```
swap(int *a, int *b){
	int tmp = *b;
	*b = *a;
	*a = tmp;

```
The Advantage of this is that we can access these values directly, unlike using variables, which copies our inputs into registers in order to manipulate them, passing the pointers directly allows us to manipulate the variables at their actual memory address. This will create *side-effects*, effects which are felt outside of the scope of the function itself.

##Parameterized Macro
Parameterized Macros are not functions, but rather text replacament defined by a set of rules. Here, the CAST example shows how we can use this to cast a variable.

```
#define SWAP(a,b) int tmp; int 

#define	 CAST(a,b)  (a) b
c = CAST(int, d);  -> (int) f
```

We can also use this to do simply arithmatic, similar to functions.

```
#define SUM(a, b) a + b

int main()
{
	printf("%d \n", SUM(2, 4)); //prints value 6
	return 0;
}
```
Since this is just text replacement, we could also pass variables to this macro, assuming the variables are valid.

###Multiple Line Macro
Macros are supposed to be contained on a single line. However, we can bypass this by using the backslash charachter \.

```
#define SWAPINT(a,b){ \
	int tmp = a;
	a = b;
	b = tmp; }
```


###Variable Arguments
You can define a function with a variable number of arguments by using an elipses delimiter (...). However, if we use this, we will need some definitions from `stdarg.h` to access each argument.

1. `va_list` - the type holding a variable argument lsit.
2. `va_start(va_list ap, parmN)` - a macro that initialises an argumnent list, parmN is the name of the rightmost parameter before the variable argument list.
3. `type va_arg(va_list ap, type)` - a macro that retrieves each successive argument in the list.
4. `va_end(va_list ap)` - a macro used to close the argument list access operation.

Here is an example. **Note** -  you must tell the function how many arguments you are passing to it.

```
#include <stdarg.h>

void func(int n, ...) {
	va_list ap;
	int i;
	va_start(ap, n);
	for(i = 0; i < n; i++)
		printf("%d", va_arg(ap, int));
	va_end(ap);
	printf(\n);
}
int main(){
	func(2, 1, 2);
	func(3, 1, 2, 3);
	return 0;
}
```

###Recursiveness
You can a function within itself to create a type of loop. This is known as a **Recursive Function**.

```
unsigned int fact(unsigned int f)
{
	if(f ==0) return 1;
	else return f * fact(f-1);
}
```
This Example will find the factorial (!) of a number. Since the definition of a factorial is recursive in nature, a recursive function is a good solution.

##Modular Programming
Modular programming is the system of using header files to link together different programming files. These files will contain functions that can be used by the main program file. The advantage of this is it keeps programs organize and seperated by the main program file, ensuring there isn't any leakage and helping with debugging.

###Good Practice
In practice, to do modular programming, we should...

1. In each source file, mark all functions that are only accessible locally as **static**. <br> `static int my_local_func(int a, float f)`<br>The **static** keyword prevents external access from outside the module by making it invisble to the calling program. It limits the scope of the function to that file.
2. Functions that make up the interface to the module, i.e. those that will open up the functionality to the rest of the program should be declared in the header file.
3. It is also possible to have global variables in outside file, being that they are used with the keyword **extern** in the main file. However, it is best practice to avoid this, and instead pass values cleanly as parameters to functions.

###Brackets vs Quotes
When including libaries, we use brackets as in... `#include <stdio.h>`. This tells the compiler to search in standard locations, as well as in directores we pass using the option -i flag. However, when including modules, it is best practice to use double quotes as in `#include "module.h"`. This tells the compiler to search in the same directory as the source file.

##Function Pointers
The name of a function is actually a pointer, just like an array. You can actually create a pointer to a function, and assign that to different functions.

###Decleration
`type (*pointer_name) (arguments)`<br>
Example:<br>
`int (*func) (int, int)`

Example 2:
 
```
int (* pf) (int, int) = func;
pf = func2;
pf(a,b); //calling the function using the pointer.
```

Is this ever useful? Yes! using function pointers, we can pass functions as arguments to other functions and those functions will be called by the program. This is known as a **Callback**.

###Assembly Code Notes
w0 and x0 are cpu registers. This is where you store data within the computer. w0 is a 32 bit register, and x0 is a 64 bit register.

**Note**<br>
You can compile code into assembly with the -S command when compiling!
