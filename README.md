## a Libconfig Parser for js

Implemented after the [Specs](https://hyperrealm.github.io/libconfig/libconfig_manual.html#Configuration-Files) and powered by [Sprache-js](https://github.com/luggage66/Sprache-js).

## Implementation Status

- [ ] Parsing whole files
    - [ ] read files
    - [ ] Comments
        - [ ] ignore them
        - [X] Script-style comments `# comment line`
        - [X] C++-style comments `// comment line`
        - [ ] C-style comments `/* comment */`
    - [ ] Include Directives (maximum of 10 levels)
- [ ] Settings
    - [ ] Groups
    - [ ] Arrays
    - [ ] Lists
    - [ ] scalar value
        - [X] Integer
            - [X] hex notation
            - [X] decimal notation
            - [X] octal notation
            - [X] signed Integers
        - [X] 64-bit Integer (*ignores the 64bit part for now)
        - [X] Float
            - [X] Normal Floats
            - [X] Signed Floats
            - [X] Exponents
        - [X] Boolean
        - [X] Strings
        - [ ] Strings with escape sequences