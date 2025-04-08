#Libraries
**What is a library?**
- a collection of pre-compiled binaries

**Static Libraries** - archive of object code. Originally, all libaries were static. 

**Dynamic Link Libraries** - when creating a library, you create whats called a shared libary. In mac these are specified by lib_name.dylib. What this does, is when an executable is created, it does not have its own copy of the code in the executable, instead it contains a reference to the library's executable code you need.

**Dynamic Load Library** - Difference is you don't need to link to it when creating the executable. These are typically used for plugins. Basically, on the plugin load, the system will go and find all the libraries that are needed for the plugin.

##Creating a Library
In macOS, we have the command `c++ -dynamiclib`.


###Compiler Toolchain
- pre-processor
- compiler
- ?
- Linker
- standard libs


##Helper Programs
When creating large libraries, it can become very cumbersome to deal with all the commands and managing the libraries and source files.

###Make
Make was the earliest form of a build helper program. Make allowed you to write specific rules for compilation, and more importantly, it would also keep track of updates when changes in individual files were made. With this, on recompilation it would only recompile the edited source code, the unchanged files would not be recompiled.

One issue with make file is that many parameters are system dependant, thus one make file might not work another machine.

Thus, a tool was made to do a similar thing that Make does, except it generates a make file. Based on settings, it will look at any given platform's options and use this to generate a Make file on a given platform/machine. This tool was known as **autotools**, however it was very difficult to use and write scripts for. Thus, another program was built known as **CMake**

###CMake
CMake is great because it will generate scripts, which then create a *project file*. THis project file can make a Make file, but it can also created project codes for platforms like Xcode, Ninja, and other program files, thus making it very versatile.



##Documentation
How should we document are code? We could write a markdown file by hand. However there is a tool called **Doxygen** which will generate a documentation file based on annotations made within the code.


##Designing a Library
There are two types of approaches/uses you can use when creating a c++ libary, a toolkit or a framework.

###Toolkit
Toolkits create instantaneous objects you can call and use within your code. Essentially, *composition* is used to combine the pre-written objects together. For example, the standard libraries are a toolkit, you cannot create subclasses out of the functions provided in these libraries.

###Framework
In a framework, the classes are used as a means of creating new classes through inheritance and other c++ functions. This allows you to create sub-classes for the specific operations you need as based on.


###Rule of Three 
If you have a *desctructor*, you will also need to define a *copy constructor*, as well as a *copy assingment operator*.

A copy constructor is needed so that when an object instance is passed into another classes, any allocated rescources are properly copied and managed. This is a form of defensive programming.

The same applies to the copy assignment operator. If you want to write something such as `obj1 = obj2`, the copy assignment operator needs to properly handle the passing of allocated memory.

This is why the std::vector template is so useful. The vector will automatically create and deallocate memory when the object goes out of scope, thus we don't need to manually manage our memory.

Another usefull template is the `std::unique_ptr<class>` which can help use create dynamic objects. Like vectors, once they go out of scope, they automatically deallocate the memory. Only downside is that these pointers cannot be shared. However we can do this by creating a `std::make_shared<class>`


###Creating a Library Structure
- Express commonality
- public interface
- customize behavior - whenever you make virtual functions, you will want them to be private functions of your class.



