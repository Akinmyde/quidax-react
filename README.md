
# Project Setup

## Requirement
You need to have React and npm/yarn installed on your computer to run this source code on your computer. 

## Production App URL
```
https://quidax-react.netlify.app/
```
## Cloning the project

```
git clone https://github.com/Akinmyde/quidax-react.git
```

## Installing all dependencies required

In the project root directory run:
```
run npm install or yarn install
```

## Starting the App
```
yarn start
```

# Implementation style
I make use of React Context to manage my state. Especially the part of persisting the cart. An alternative would have been making use of a store like redux or perhaps using local storage.

I make use of Context API because I really don't want to add another layer of obfuscation to the code. I see the application as a basic one since I only need to manage a few states and data.

Also, I make use of the GraphQL API to get a single book. Although, I can always pass the current book as props and not make the API call I thought it was required to make use of both GraphQL APIs in this assessment. Also, I did that because I don't really know how often the data changes so it's important to always show the updated information by getting it in real-time from the server.


