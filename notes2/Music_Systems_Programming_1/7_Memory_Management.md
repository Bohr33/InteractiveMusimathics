#Memory Management

In C, memory is usually handled automatically by the compiler. It will read all the declared variables during pre-processing and alllocate the memory automatically. However, what do you do if you do not know how much memory you need during compile time?

###Stack Overflow
Another potential issue with automatic memmory allocation is that when variables are defined, their memory is defined in the part of the program memory space called *stack*. The stack is limited in its memory and might not have enough space for very large memory blocks. By using *dynamic* memory allocation, we store data in the memory space called the *heap*.


###Heap
The heap is undefined space in memory that you can access.
Some benefits of using the heap are...

- you can allocate any memory at any time
- you can use as much memory that you need


How do we access the memory? The C standard library has a few functions that allow us to control and manage our memory. They are...

- malloc - allocates memory and returns pointer to the memory
- calloc - allocates memory, resets the memory (sets all values to 0), and returns pointer 
- realloc - rallocates memory and returns pointer
- free - frees the storage


**Note** - the difference between malloc and calloc comes down to initialization. Malloc doesn't initialize the memory, could contain garbage, while calloc automatically sets all the values to 0.

###Syntax
```
void *malloc(size_t SIZE);
```
SIZE - in bytes
SIZE_t - is actually a type definition. It's the type you want to use when you are referring to memory sizes.

**Note** -  a return type of void, and void pointer are NOT the same. Void pointer means 'return a pointer of an undefined type'. Because of this, you will have to cast this pointer to a defined type later on.


```
int *p = (int *) malloc(sizeof(int) * 10);
```
**Note** - when allocating memory. It's important to use the `sizeof` function to return the size of the type you need. This will ensure that the size is accurate across systems where different sizes may be used for different types.


###Calloc
Calloc has a slightly different form than malloc.

`void *calloc(size_t n, size_t size);`

Calloc also takes a size variable **n**. It allocates **n** number of items of size **size** and resets the memory to 0.


###What if the memory fails to allocate?
The pointer will be set to NULL. It will be a NULL pointer. We can use this to check to make sure that our memory was allocated properly.


###Realloc
We use realloc when we have already allocated memory, but we want to expand, or shrink it.

`void *realloc(VOID *ptr, size_t SIZE);`

It allocates new space and copies the existing data to it, returning the pointer to this new data space.

###free
Whenver we allocate memory, it is the programmers responsibility to free this data and prevent memory leakage. This is done with the *free* function.

`void free(void *ptr)`

###Memset
memset sets all the values of a given area of memory to a certain value. Usually it is just use to set memory to 0.

`memset(VOID *ptr, int c, size_t len)`<br>
It sets **len** bytes of values **c** to the memory *ptr.


###memcopy
Allows you to copy data within dynamically allocated memory to a another set of allocated memory. It is also the fastest way of copy data from an array to another.

`memcopy(VOID *dest, CONST VOID *src, size_t size)`


##Data Structures & Memory Management
How do we manage structures with dynamic memory? There are two forms of management for this.

- Dynamic Arrays
- Linked Lists

###Dynamic Arrays
There are three main components to dynamic arrays.

1. Array Data
2. Size - Size is the actual amount you need at the moment you allocate the memory, however more is allocated automatically leading to...
3. Capacity - capacity is the actual total amount of allocated memory you have available, which is an overshot of the size of the array.



###Linked List
Linked lists are a structure where you have stored data, with some payload type, that has a pointer which pointers to another set of stored data. This allows you to convieniently add and move where these data variables are stored. This allows you to easily reorder to list of data. Linked lists are ideal for use cases where this kind of rearrangement is common. <br> <br>
Each element of a linked list is defined by a structure that will hold two members: the data it holds and a pointer to one or more link address.

```
typedef struct _elem {
	int data;
	struct _elem *next;
} elem
```
This example shows an element of a singly linked list of integers.

**Note** - you can also create a doubly linked list, which links to elements both before and after it. This can be even more useful in some cases.


###Fencepost Errors
Fencepost errors occur when you try to access data past the available block of memory that was allocated. By writing functions that are made to handle dynamic arrays, we can avoid fence post errors by providing checks within the function to make sure we are in range.


###Debugging
 - you can put a flag like "-g" into your program to help your program refer areas in your code where errors went wrong.
 - In some systems you can use **SANITIZER**. A useful third party tool that will help you identify where hidden errors or memory leaks are happening in the program.