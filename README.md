# nextBus
-----
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This program will tell you how long until your next bus arrives, using the [Metro Transit NexTrip API](http://svc.metrotransit.org/).
-----

## Setup
-----
1. You will need to download and install [NodeJS](https://nodejs.org/en/download/).
2. Clone this repository to your desktop.
3. Open your terminal/command prompt and point your working directory to the root directory of the repository. For example:

```
cd C:\Users\Ana\nextBus
```
4. To install all the dependencies, run:
```
npm install
```

## Usage
-----
After cloning this repository, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you are ready to use the program.

You will need the following parameters:
- Bus Route
- Bus Stop Name
- Direction

To run the program, enter the following in the terminal:
```
node nextBus.js <"Bus Route"> <"Bus Stop Name"> <"Direction">
```

After running this commnd in the terminal, you will receive a response of `x minutes`, where x is the number of minutes until the bus arrives at that stop.

If there is no output, the last bus for the day has already left.

## Examples
-----
```
$ node nextBus.js "146 - Ltd Stop -  Vernon Av - 50th St - Mpls" "46th St  and Nicollet Ave" "north"
```

```
$ node nextBus.js “Express -Target -Hwy 252 and 73rd Av P&R -Mpls” “Target North Campus Building F” “south”
```

```
$ node nextBus.js “METRO Blue Line” “Target Field Station Platform 1” “south”
```

```
$ node nextBus.js "5 - Brklyn Center - Fremont - 26th Av - Chicago - MOA" "7th St  and Olson Memorial Hwy" "north"
```
## Author
-----
- Ana Knickerbocker (https://github.com/anaknickerbocker)