Chatty
=====================

A simple real time chat app implemented with ReactJS and websocket server

### Usage

Clone the repo

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

### Technologies Used
* ReactJS
* Express
* Websocket server
* CSS

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)


### User Experience
* This app is straight-forward to use.
* The user can see how many users are online on the top right corner.
* To post a new message, the user simply types his/her name and message in the fields and hit enter.
* If the user changes his/her name by typing into the name box, a message stating this name change will be posted.

!["page view"]()