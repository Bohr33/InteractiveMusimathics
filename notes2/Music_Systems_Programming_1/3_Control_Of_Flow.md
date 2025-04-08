#Control of Flow
---
##Conditional & Logic Statements
*Also known as predicate statements*<br>

- True = Not 0 <br>*Includes negative values!*
- False = 0

###Relational Operators
Relational Operators perform a conditional comparison and return a value of either 0 (False) or 1 (True)

```
> ">" - Greater Than
> "<" - Less Than
> ">=" - Greater Than or Equal to
> "<=" - Less Than or Equal to
> "==" - Equal to
> "!=" - Not Equal to
```


###Logical Operators
Logical Operators are used to combine 1 or more relational expressions.
The 2 fundamental logical operators are...

```
&& 'AND' - is only true when both values are true
|| 'OR' - is only false when both values are false
```
There is also the *unary* operator...<br>
`! 'NOT' - Negates its operand, returns 1 if 0, and 0 if 1`

##Branching
The process of using conditional statements to create unique program flows based on a conditional result.

###if() Statement

The "if()" statement is the most fundamental of the conditional statements and allows the program to check a conditional result and execute different statements based on the result.

```
if(conditional expression)
{
	code to execute if true...
}
```
We can extend this expression to include a unique statement to execute if the conditional test is false with the `else` keyword...

```
if(conditional expression)
{
	code to execute if true...
}else
{
	code to execute if false...
}
```
Lastly, we can continue a chain of conditional branches by using the `elseif()` keyword...

```
if(conditional expression)
{
	code to execute if true...
}elseif(new conditional expression)
{
	code to execute if second conditional expression is true
}else
{
	code to execute if both conditions are false
}
```

*There isn't really a boolean type in C (it was added in C24), the standard is just to use an int. Doesn't really matter because C compiles down to a byte anyway, so you cannot save processing by using a 1 bit int*



###Ternary Expression
The Ternary if statement is a condensed version of the normal if statement. This version is useful for assigning a value to a variable based on a simple conditional test.These can be nested within each other, and within other conditional statments.

`Condition ? Expression-if-true : Expression-if-false;`

Ex. `a = a < 10 ? a + 10 : a - 10;`

###Switch Statements
The switch statement is another type of conditional expression that allows us to check an expression and execute instructions based on discrete matches defined by the `case` keyword.<br>
If no match is found, the computer will look for a `default` case to execute...

``` 
switch(var){
	case CONST1:
		...
		break;
	case CONST2:
		...
		break;
	default:
		...
	}
```
The `break` keyword is used to tell the program to leave the switch statement once a match is found. Otherwise, the program will continue to check other cases even when a match has already been found. This is known as *fall-through*. There are legitimate cases where *fall-through* can be used, however in most cases it is more efficient to include the `break` statement to leave the block once a match is found. <br><br>
**Note** - CONST variables must be literals, they cannot be variables. Switch is essentially pattern matching and must have integral values to test against.


##Iteration & Loops
In programming, we may want to repeat certain statements for a given amount of time. In conjunction with conditional expressions, we can create powerful structures that allow for continous execution based on a condition.

###while() and do...while() loops

**while()** - The while loop checks a condition and if true, it will continue to evaluate the given expression, once executed it will continue to check until value 
is false. It is essentially an `if()` statement that will continue to execute until untrue.<br><br>
`while(expression){code to execute if true}`

**Note** - it is possible to create a loop where the conditional expression never recieves a false value. In this situation, the computer will enter an *infinite loop* and never exit the program. This is not an issue in the modern age, since we have built in measures to exit the program in these situations.

**do...while()** - Similar to the while loop, this statement will execute the expression at least once, before checking the conditional expression. This is useful when you want to ensure that your statement is executed at least once<br>

```
do
{
	expression to execute...
}
while(condition)
```
Generally, when using these loops we will have some type of counter that will keep track of the iterations passed and eventually return a false value in the conditional expression...

```
int cnt = 0;
while(cnt < 10)
{
	printf("cnt = %d", cnt);
	cnt++;
}
```
In this example, we used what's known as the *postfix increment* `++`, which increments our variable by 1, exactly like the statement `cnt += 1`. <br>
There is also the *prefix increment*, which is similar to the postfix increment...<br>
The difference is, the *prefix increment* will increment our value first, and then check the conditional or expression. The *postfix increment* will use the value in the expression first, then increment...<br>
###Post Increment vs Pre Increment

```
cnt = 0;
while(++cnt < 10)
{
	printf("cnt = %d\n", cnt);
}
```
This example will print values 0 - 9. The the value 'cnt' will be incremented before the condition is checked, thus not executing the statement below.


```
cnt = 0;
while(cnt++ < 10)
{
	printf("cnt = %d\n", cnt);
}
```
This example will print values 0-10 since it is using the postfix increment. It will first check the value is less than 10, then increment before executing the statement, allowing 10 to also be printed.

###For Loops

**for()** - since counting variables are so common in loops, this type of loop was created and has a built in syntax for using a counting variable.

`for(counter init : conditional-expression : update-counter`

```
for(int = 0 : i < 10 : i++)
{
	///some code to execute
}
```

###Break Statments
If necessary, we can make use of the `break` keyword to exit a loop at anytime if necessary, similar to its use in the `switch` statement. 

##Terminal Commands
you can print your program to a text by using the ">" symbol, followed by a name for the file (usually a text file, not sure if any other file type could work) <br>
`./myProgram > Program_Output.txt`
This would run "myProgram, and print its print results to the file.<br>
To take a .txt file, and display on your current terminal, you can use the `cat` command.
`cat myProgram.txt`
This would display the results of the .txt just like the program would.

You can redirect output from a program to another using the " | " symbol, known as pipe.<br>
`./program1 | ./program2`