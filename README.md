# node-robotjs-ws
An experiment with robotjs to create a websocket server for creating mouse keyboard apps. 

##keyboard.js 

keyboard js is a wrapper around the keyboard functions provided by robot js, this simplifies the robotjs interface by simply providing
tap, press, release without any modifier arguments. (modifiers are simply regular keys) 

here is my code to toggle apps using the apple command+tab menu

```js

// after 5 seconds activate the menue, and move right twice then close the menu
// assumes there are at least 4 open apps...
require('./keyboard.js').sleep(5)
	.press('command')
	.tap('tab').sleep(1)
	.tap('tab').sleep(1)
	.tap('tab').sleep(5)
	.release('command');


```
