#Arrays
**Stack** - The consecutive storage system used by the computer.<br><br>
- Arrays allow us to allocate blocks of memory in the stack under one variable name. <br>
- The benefit of this is that we now have a way to store and retrieve a collection of data through the use of one variable, the array pointer.

**Array Syntax**<br>
Declaration: `type var[size];`<br>
Access: `var[index]`<br>
**size** -  must be a literal, constants won't work since they are variables.<br> *It must be known at compile time since the computer must allocate the memory before computation.*<br><br>
*It can often be useful to declare the size of your array with a #define preprocessor definiton*<br>
`#define SIZE 128`<br><br>
**index** - must be integer, but can be a variable

To initialize an array with values...<br>
`int a[x] = {0, 1, ...} for x values`
`int a[2] = {0,1}`<br>

###Initialization Notes
- you do not need to specify the size of an array when initializing  it with values. This will be implied by the set given...<br>
Ex. `int a[] = {1, 2, 3, 4, 5};`
- you can also designate the indecies of values with **designators**...
`int a[5] = {[4] = 2, [2] = 1, [6] = 3};`


##2-Dimensional Arrays
It is also possible to create arrays within arrays, extending them to 2 dimensional arrays, or even further...<br><br>
**Syntax:** `type var[rows][columns];`<br>

To initialize with values...
`int a[2][2] = {{1,2}, {3,4}}`<br>

###Accessing Values
The format for accessing these values is the first value species which array/dimension, and the second value specifies that array's value.<br>
1. `a[0][0] = 1`<br>
2. `a[0][1] = 2`<br>
3. `a[1][0] = 3`<br>
4. `a[1][0] = 4`<br>

- To access 2-dimensional arrays, it is often most efficient to use a loop within a loop.<br>

```
for(i = 0; i < 2; i++)
{
	for(j = 0; j < 2; j++)
	{
		a[i][j] = k;
	}
}

```

###Char Arrays/Strings
- a string in C is just an array of **char** types.
`char array[6] = {'h', 'e', 'l', 'l', 'o', '\0'}`
- The null charachter `\0` is necessary for the computer to know where the end of the string is. Otherwise it would endlessly keep accessing memory.
- The null charachter is automatically added by the compiler in the case of string constants.<br>

###Using Arrays
The example below is a general printing program. It contains no data, but once data is supplied it will be able to print out the data in the array that is within the giving range.

```
#define MAXCOL 80
#define MAXLINE 40

int main()
{
    int n, i;
    float data[MAXCOL], level, decr = 2.f/MAXLINE;

    for(i = 0, level = 1.; i < MAXLINE; i++, level -= decr)
    {
        for(n = 0; n < MAXCOL; n++)
        {
            if(data[n] >= level && data[n] < level + decr) printf("*");
            else printf(" ");
        }
        printf("\n");

    }

    return 0;
}
```

##Pointers
**Pointer** - a special type of variable that stores the memory address of a variable, instead of the variable itself.<br>
**Syntax:**

```
type asterix var_name
int	 *p;
```
This declares a pointer "p" that holds an integer. However it is currently not assigned to anything. We can assign it to the address of a variable like...

```
int n;
int *p = &n
```
Now pointer "p" is storing the *address* of "n".

###Indirection (Dereference)
Indirection is used to retrieve the value of the variable that is represented by your pointer.

```
int a = 2, k;
int *pa;
pa = &a;
k = *pa
k now is assigned the value of 2
```
In this example, the **"\*"** operator is used in two different cases. For decleration, it tells the compiler we are declaring a pointer. When assigning variable "k" to the address at "a", we are using it to *dereference* the pointer so we assigning the value at that address, and not the address itself.<br>

We do not need to dereference pointers when assigning the address stored in a pointer to another pointer...<br>

```
int n, k;
int *p = &n;
int *q;
q = p;
p = &k;

```


##Pointers and Arrays

- An array variable is simply a pointer that is always pointing to the first memory address of the array.

```
int array[5];
int *pp;
pp = array
```

###Pointer Arithmetic
- you can assign a pointer to that memory address, and do operations on it.

```
int array[5];
int *pp;
pp = array;
pp = pp + 1;
```

A common expression to access a certain value within an array is...

```
int array[5];
int *pp;
pp = array + 3;
```
This would move the pointer 3 memory positions ahead.<br>

You can then derefence this value and retrieve the value at that point in the array.


```
int array[5] = {1,2,3,4,5};
int *pp;
pp = array + 2;
int a = *pp;
printf("%d", a);
```

Output here will be the value 3.

**Note** - you can also use move backwards through the array with `-`

##2-Dimensional Arrays w/ Pointers
Pointers also have a unique way of accessing data within 2-Dimensional arrays.<br>
When creating 2 Dimensional arrays, we are inherently creating a double pointer system. That is, we have a collection of elements with x rows and y coloumns. Pointers allow us to traverse through these variables in a format that follows this system.<br>
`int a[3][2] = {{1, 2}, {3, 4}, {5, 6}};`
Using this example, we can illustrate how pointers can be used to access data by row and/or coloumn...<br>

`int *p = *a;`
This allows us to point to the first position in the array. Notice that we must *dereference* a since it is a pointer, to a pointer at the first position.
`*(p + 1) = -1`<br>
This will assign the value of -1 to the first posiiton.<br><br>
`p = *(a + 1)`<br>
This example assigns pointer "p" to the next **row**. Since it is assiged only to the first layer of pointer of a, it is pointing to the first element of each row. Thus if we increment it, it will skip all other values within the column since the pointer knows the size of these coloumns when declared.<br><br>

`int (*pp)[2] = a;`
In this example, we create a pointer "pp" and say it is pointing to an array size of 2. Since our array "a" is two dimensional, and its coloumns have the same size of two, we can assign its pointer to it. <br>
**Note** - we do not have to dereference "a" this time since we do not want to point to the next pointer layer. 

`int b = *(++p);`<br>
This assigns "b" the value 4, since we  increment the value of "p".<br><br>

`int c = **(a + 2);`<br>
This assigns "c" the value 5 since "a" skips 2 coloumns. Note - we have to dereference twice here since a is the highest level pointer, and we want to retrieve the value at that address, not the next pointer.<br>

`int d = *(*(pp+2) + 1)`<br>
Here, we assign the variable "d" the value of 6 by using pointer arithmetic on both layers of pointers. The first "row" pointer, is incremented twice, giving us the final array, then it is dereferenced and incremented again, leaving us in the final position of our 2-dimensional array. This pointer is then dereferenced to give us the value at that position.<br>


###scanf w/ Pointers

```
for(n = 0; n < MAXCOL; n++)
{
	scanf("%f", data * n)
	//data = address, n = offset
}
```
###Methods for Accessing Array Data
1. Indexing - using a variable directly for accessing.
2. Pointer Arithmetic - using a pointer to access the array variable, then incrementing the pointer and dereferencing

**Indexing Example**

```
	int a[N];
	
	for(i=0; i < N; i++)
	{
		a[i] = i;
	}
```

**Pointer Arithematic**

```
int a[N];
int *pa = a;

for(i = 0; i < N; i++)
{
	*pa++ = i;
}
//The result is a filled array with values 0,1,2...

```

##Pointers and Strings

`char string[5] = "hello";`

Since the string `"hello"` is already stored in the system as a literal, we can instead use pointers to save its location...
`const char *string = "hello"`<br>
`char* p = string`<br>
However we must be sure to make this pointer a `const` type, its operation is only defined as a read-only.<br>








