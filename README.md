# GETTAVET Chat

This is a react front end with Graph Ql API and Prisma backend. IT is designed to function as a chat component to blend into another project. 
## Getting Started

To run this program locally: 
From the command line clone this repo, then from the main directory run
```yarn``` to install required dependencies, then:
```yarn start```
This will start a frontend server on port 3000. 
then from server directory:
run ```yarn``` to install dependencies, then: 
```npm start```, which will give you a message that the Graph QL playground is running on port 4000.

You can find the schema under the server/src module in schema.graphql. 
The backend server is created in server/src/Index.js (within the server module).
resolvers are located at server/src/resolvers

for the front end all components are located in src/components

# All work pertinent files are commented for clarity

## Authors

* **Ryan Turner** - *Initial work* - [Too-far](https://github.com/too-far)

## License

This project is licensed under the MIT License 
