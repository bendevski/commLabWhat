# Hello.
---
What is this? Well, I don't really know. I received a video from Maxim, one of my close friends, and I realized that there is a lot of dumb stuff I could do with it.
## Process
So I made the basic structure of the code, and, having never done base JS coding for anything beyond coding challenges, I decided it was time to have some fun.
- Movement
The thing that took the longest. At first I just used random numbers for the directions, but that resulted in choppy, non-fun movement, that, honestly, just seemed awkward.
As such, I decided to make my own, overcomplicated logic.
I divided movement into main and cross axis. The cross axis speeds are free to change at random, but the main axis decides which direction the video will be moving for the forseable future. I did this by changing the cross axis at random every 1-3 seconds. And changing the main axis only once every 6-10 seconds.
The function that decides base movement can be found below, the direction marking where the object is moving on its main axis.
```
function movement(direction) {
         switch (direction) {
            case (RIGHT):
                if (randBetween(0, 1) === 0) return [-randBetween(8, 20), 20, randBetween(0, 1) ? -1 : 1, 0];
                else return [randBetween(8, 20), 20, randBetween(0, 1) ? -1 : 1, 0];
            case (UP):
                if (randBetween(0, 1) === 0) return [20, -randBetween(8, 20), 0, randBetween(0, 1) ? -1 : 1];
                else return [20, randBetween(8, 20), 0, randBetween(0, 1) ? -1 : 1];
            case (LEFT):
                if (randBetween(0, 1) === 0) return [-randBetween(8, 20), -20, randBetween(0, 1) ? -1 : 1, 0];
                else return [randBetween(8, 20), -20, randBetween(0, 1) ? -1 : 1, 0];
            case (DOWN):
                if (randBetween(0, 1) === 0) return [-20, -randBetween(8, 20), 0, randBetween(0, 1) ? -1 : 1];
                else return [-20, randBetween(8, 20), 0, randBetween(0, 1) ? -1 : 1];
        }
    }
```
And this is how the changes happened.
```
if (smallProgress > smallChangeCounter) {
            smallStart = timestamp;
            [yvel, xvel, yvelpos, xvelpos] = movement(direction);
            smallChangeCounter = randBetween(1000, 3000);
            offset = (Math.random() + Math.random()) / 10 + Math.random() / 15;
 }
 if (bigProgress > bigChangeCounter) {
            bigStart = timestamp;
            direction = randBetween(0, 3);
            bigChangeCounter = randBetween(6000, 10000);
            [yvel, xvel, yvelpos, xvelpos] = movement(direction);

 }
``` 
All in all, movement was chaos. Everything else was pretty simple to set up.

# Acknowledegements
HUGE thanks for to Max and the other makers of the video for letting me use it. All in all I had a great time doing dumb stuff for this project.
