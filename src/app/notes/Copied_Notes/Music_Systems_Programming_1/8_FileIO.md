#File IO

##Standard IO
###Stream
The stream is an abstracted object that opens files to send or receive their information to/from.

There are two distinct types of mappings for streams, *text* and *binary*.


###Stream Orientation

The stream can have two types of *orientation*

1. Byte Oriented - This stream is limited to the unicode charachters
2. Wide - A larger size that allows you to print receive more charachters than the Unicode charachters.

The orientation stream is identified by the first use of either a byte-oriented IO function, or a wide-oriented IO function.


###fopen
The standard format for opening a stream is with fopen.
`FILE  *fopen(const char* PATH, const char* mode)`

If function is successful, it will return a valid file stream handle.

PATH - is the path to the file, either relative to the root directory, or as an absolute path.

mode - this will determine how you want to interpret the file.


###modes
- READ "r" - for reading a file
- WRITE "w" - for writing
- READ + WRITE - "r+"
- WRITE + READ - "w+"
- APPEND - "a"
- READ + APPEND - "a+"

What is the difference between r+ and w+? r+ will first read a file first, so the file must exist beforehand. However with w+, it will first write the file, so it will create the file if it doesn't exist.

**Append vs Write** - Append will open a file if it is found, but only add data to the end of the file. Whereas write will overwrite the data from the beginning if the file is found.

**Exclusive Mode**
For write modes, you can include the letter **x** as in **wx**, **w+x** for exclusive mode. This ensures a new file is always created when writing, returning an error if the file name already exists.

**Note** - is generally good practice to avoid using r+, w+, and a+ as you can easily accidently overwrite data.


"wb", "rb" - some code will have a b included here, which tells the compiler its reading binary, however this is only for windows, it will be ignored for Linux and Mac

##The FILE handle
FILE is an opaque object, meaning we don't know what is inside.

###Opening a FILE for Reading
It is very good practice to make sure the file is actually opened when opening a file.
```
FILE *fp;
if((fp = fopen(filename, "r")))==NULL
	{
		printf("Error opening %s \n", filename);
	}
```


###Closing the File
Use the function `fclose()` to close a file.<br>
`void fclose(FILE *fp)`<br>
You should always close the file whenever you are done with it.


##Other Streams
These streams are opened automatically within the <stdio.h> library. 

1. STDIN - standard input. Opened in read mode.
2. STDOUT - standard output. Opened in write mode.
3. STDEER - standard error. Opened in write, this is reserved for error messages and allows you to reroute error messages to different locations (like a console) from the terminal.

##Text File Functions
###fputs() & fgets()
These functions write and read (respectively) a string to and from a file.

`int fputs(char *str, FILE *fp)`
`char *fgets(char *str, int num, FILE *fp)`

**fputs()** writes `str` to the file stream `fp`. It returns a non-negative value is successful, and EOF if not.

**fgets()** reads charachters from the file `fp` into string `str` until num-1 charachters have been read, or a newline is reached, or EOF.

As well as this, there are single chachter versions called fputc() and fgetc().

`int fputc(int c, FILE *fp)`
`int fgetc(FILE *fp)`

A charachter can also be pushed back into the stream using ungetc().

`int ungetc(int c, FILE *fp)`


###fprintf & fscanf
To print to a file, we use a similar function to printf, which is `fprintf()`.<br>
`int fprintf(FILE *fp, const char format, ...)`

NOTE - printf is the same as...
`int fprintf(stdout, const char format, ...)`

###Reading
Just like fprintf, and printf, if we want to read from a file we can use `fscanf`, which works just like scanf().

`fscanf(FILE *p, const char *format, ...)`

`char *fgets(FILE *fp)`
`char *fgetc(FILE *fp)`

also
`ungetc(int c, FILE *fp)` - this puts a charachter BACK where it was in the string?


##Direct IO
The standard library includes two other functions for reading and writing called fread() and fwrite(). These are different in that they can read and write and type of data.

###fread()

`size_t fread(void *buffer, size_t size, size_t items, FILE *fp)`

**void \*buffer** - this is the memory you are going to read the data into.

**size_t size** - the size of the items you want to read. (if you are reading floats, sizeof(float), etc.

**size_t items** - the number of items you want to read

**FILE \*fp** - the stream handle

This function returns size_t, the number of items read.


**NOTE** - This function does not clear the memory. If there isn't enough data to read than was specified in fread, then the remaining empty spaces will be filled with whatever was left before it.

###fwrite()
`size_t fwrite(void *buffer, size_t size, size_t items, FILE *fp)`

Has the same prototype as fread, except this writes data from the buffer to the file `FP`.

This returns the number of items written
 
 
 
##Stream Position
FILE -> stream(read) -> fread() -> 10 bytes

Whenever you use a function like fread, each time you call the function and read 10 bytes (for example), the stream position will move ahead 10 bytes. This will continue until you reach the end of file.

###rewind()
If you want to move back to the start of the file, you can use the function `rewind(FILE *fp)`.

###fseek()
fseek allows you to move the file pointer to a certain location.
`int fseek(FILE *fp, long offset, int whence)`

This will position the pointer at the offset position (in bytes), relative to the value of whence parameter, which can be 3 different modes.

1. SEEK_SET: offset is the absolute position from the beginning of the file.
2. SEEK_CUR: the offset is the position from the current read/write pointer position
3. SEEK_END: the offset is calculated in relation to the end of the file.

fseek returns an int which is 0 if everything is good, or can be EOF if not.


###ftell()
Tells you where you are in the file
`ftell(FILE *fp)`

##Error Reporting
Three functions can help us diagnose stream issues.

`int feof(FILE *fp)` : Reports on the EOF indicator for the stream
`int ferror(FILE *fp)`:checks for the error indicator, returning non-zero if set, zero if not.
`void perror(const char *s)` - can use this to print an error if there is an error in the stream.

##File System Functions
The C Library also includes functions to manaipulate the file system, so that programs can remove, rename, or create temporary files.

1. `int remove(const char *filename)` - deletes a file, preventing any subsequent access to it.
2. `int rename(const char *old, const char *new)` - renames a file
3. `FILE *tmpfile(void)` - creates and opens a temporary file in *wb+* mode.



##Integrarting Rand Walk w/ Csound
You can integrate a score processing programming within csound by using the tag `bin="./program"`.

This placed within the tag for the csound score as...
`<Csound Score bin="./program">`






