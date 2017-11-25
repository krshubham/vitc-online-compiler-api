# The online compiler for VITC
The backend for the Vitc online compiler


The module handles post requests containing the following two keys ( as of now):

+ `code`: The full source code
+ `lang`: The **language** of the code

#### Languages can be of the following types:
+ `c_cpp` for **C/C++** code
+ `java` for **JAVA** code (More about versions later)
+ `pyth2` for **Python 2** code
+ `pyth3` for **Python 3** code