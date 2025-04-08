#Plugins
Short name for *run-time loadable software modules*.

To support plugins, your operating system must support **dynamic loading**.

The API for the plugin framwork must have a well-defined API. These are almost always in the style of object-oriented program.

###Dynamic Loading
Dynamic loading in the operating system is based on the function call `dlopen()`. This used to be in its own library, but it was so useful it became part of the standard C library.

`dlopen` takes a path as an argument, and returns an opaque pointer to the library.

From here, you can pass the library to the function `dlsym(lib, name)`, along with a symbol which corresponds to data within the library (normally a function). With that, you can assign the return of dysym() to a new variable and use the function. 

The symbol argument pased to dlsym() will be the name of the function.

For instance...

```
int func(int a){
	return a;
	}
	
	dlsym(lib, name)
```

###Why Object Orientation is useful
Your plugin will need to keep track of state, and allocate necessary memory of its own data.

Typically, whatever API you use will provide virtual functions you will need to override that have set functions that the DAW will call.


##Csound API Opcode Example
Note: we are working in C

When writing an opcode, the OPDS h; is necessary for any opcode. This essentially acts like a inheritance in C++ where our new structure OPC inherits from the class OPDS. 

```
typedef struct OPC{
	OPDS h;
	MYFLT *out;
	MYFLT *in;

}OPC;
```

###Mehods
Once your data space is defined, you will need to define the methods. There are some necessary methods you must implement as well.

```
int opcinit(CSOUND *csound, OPC *a){*out = *in; return Ok;};
```

**OENTRY Data Structure**

```
OENTRY entry = {"name", sizeof(dataspace, flags(usually 0), run-time flag, var_type1, var_type2);
OENTRY entry = {"example", sizeof(OPC), 0, 2, "k", "k")
```

Note: the run-time flag is only necessary in Csound 6 and earlier. 1, means run at init time. 2, means performance time, and 3 means both.



##Moving to C++



