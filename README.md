
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

## Starting the App IOS
```
yarn start
```

# Assumptions
I make use of React Context to manage my state. Especially the part of persisting the cart. An alternative would have been making use of a store like redux or perhaps using local storage.

I make use of Context API because I really don't want to add another layer of obfuscation to the code. I see the application as a basic one since I only need to manage a few states and data.

Also, I make use of the GraphQL API to get a single book. Although, I can always pass the current book as props and not make the API call I thought it was required to make use of both GraphQL APIs in this assessment. Also, I did that because I don't really know how often the data changes so it's important to always show the updated information by getting it in real-time from the server.


# Requirements
Due to time, I was not able to perfectly implement the search feature to my taste and the taste of the requirements. Although, it is hard to notice that something is off.

I believe that I met all requirements but I wasn't able to implement the slider to match exactly what we have in the mockup. Also, if I had more time, I would have done some refactoring to improve the search experience and also add a skeleton loader to all pages

## Issues Faced
The main issue is faced completing this assessment is time. due to my current tight schedule, I was only able to dedicate a few hours of my time to this assessment.

Also, I had to design the carousel from scratch myself at first then I realize that it was going to take me more time to complete. because of this, I had to switch to using a library for the carousel.

## Feedback
I think the Figma design should give applicants the privilege to view the margin, padding, fonts and colours from each layout.

It might be a bit difficult to size the spacing (margin and padding) with the eye or hand. tools like colour picker could help pick the colour for a particular section, but they aren't 100% efficient