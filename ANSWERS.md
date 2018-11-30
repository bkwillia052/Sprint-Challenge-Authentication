<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
    Sessions are a way to store information about a client across multiple client-server interactions. Without them there's no way to keep track of the 'state' of the client-server's interactions. 

2. What does bcrypt do to help us store passwords in a secure manner.
    It allows us to use hashing as a way to secure and verify sensitive data.  
3. What does bcrypt do to slow down attackers?
    It hashes information to an arbitrary nth power to make brute force attacks more expensive. 
4. What are the three parts of the JSON Web Token?
    The header, payload, and signature. 