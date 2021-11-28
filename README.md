# JS-GUI
Javascript based data visualization client for incoming serial port data from the CANSAT. 

To install dependencies run the following command in project directory and client directory:
#### `npm install`
Then, flash arduino with the .ino file and connect it to COM3 (if a different port is in use, change this in the [server file](server/index.js))
Finally, open two terminals: first in the *project* directory and second in the *client* directory and run:
#### `npm start`
