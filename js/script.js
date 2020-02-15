const RIGHT = 0;
const UP = 1;
const LEFT = 2;
const DOWN = 3;

let screenHeight;
let screenWidth;
var player;
var audio;
let stopColors;


function randBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function waw() {
    //code from Youtube Iframe Player API page
    //technically just loading the api, putting the normal
    //script before the asynchronous call
    const bod = document.getElementById("body");
    screenHeight = bod.offsetHeight;
    screenWidth = bod.offsetWidth;
    console.log("Hao")
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    audio = new Audio("Sound/ohNo.mp3");
}

function theyDidIt() {
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

    //get the location of the video
    let x = document.getElementById('player');
    let xpos = x.offsetLeft;
    let ypos = x.offsetTop;
    x.style.position = "absolute";
    //movement
    /* The movement is done using random ideas I thought up, it goes as follows, on random intervals between 1 and 3 seconds the cross axis
        velocity of the video will change, while the main axis velocity will remain constant. On random intervals between 6 and 10 seconds
        the main axis velocity, aka direction, will change.
    */
    let smallChangeCounter = randBetween(800, 1000);
    let bigChangeCounter = randBetween(3000, 6000);

    let smallStart = 0;
    let bigStart = 0;
    let xvel, yvel = 0;
    let direction = randBetween(0, 3);
    let xvelpos = 1;
    let yvelpos = 1;
    let offset = (Math.random() + Math.random()) / 10;
    let degree = 0;
    let done = 0;

    function step(timestamp) {
        let smallProgress = timestamp - smallStart;
        let bigProgress = timestamp - bigStart;

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

        xvel += xvelpos * offset;
        yvel += yvelpos * offset;
        xpos += xvel * 1.4;
        ypos += yvel * 1.4;

        if (xpos + 0.18 * screenWidth > screenWidth) {
            xpos = 0;
            if (Math.random() > 0.7) bigStart = 0;
        }
        if (xpos < 0) {
            xpos = screenWidth - 0.18 * screenWidth;
            if (Math.random() > 0.7) bigStart = 0;
        }
        if (ypos + 0.1 * screenWidth > screenHeight) {
            ypos = 0;
            if (Math.random() > 0.7) bigStart = 0;
        }
        if (ypos < 0) {
            ypos = screenHeight - 0.1 * screenWidth;
            if (Math.random() > 0.7) bigStart = 0;
        }
        if (player.getCurrentTime() > 48.7 && !done) {
            degree = 0;
            done = 1;
            let boom = new Audio("Sound/boom.mp3");
            boom.play();
            let lastThing = document.getElementById("why");
            lastThing.style.display = "inline-block";
            clearInterval(stopColors);
            x.style.backgroundColor = "black";
        } else if (player.getCurrentTime() > 42.5) degree += 3
        else if (player.getCurrentTime() > 33.5) degree -= 1;
        else if (player.getCurrentTime() > 23.9) degree += 4;
        else if (player.getCurrentTime() > 17.65) degree -= 3;
        else if (player.getCurrentTime() > 11.6) degree += 2;
        else if (player.getCurrentTime() > 6.2) degree += 1;

        if (done) {
            let exp = document.getElementById("explosion")
            exp.style.marginLeft = screenWidth / 2 - x.offsetWidth / 2 + "px";
            exp.style.marginTop = screenHeight / 1.7 - x.offsetHeight / 3 + "px";
            exp.style.display = "inline-block";
            x.style.marginLeft = screenWidth / 2 - x.offsetWidth / 2 + "px";
            x.style.marginTop = screenHeight / 1.7 - x.offsetHeight / 3 + "px";
            x.style.transform = "rotate(" + degree + "deg)";
            return;
        }
        x.style.transform = "rotate(" + degree * 3 + "deg)";
        x.style.marginLeft = xpos + "px";
        x.style.marginTop = ypos + "px";

        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
    //bad practice, but shouldn't be an issue since this is for fun

}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: "fAaFsc2VXhk",
        playerVars: {
            //controls: 0,
            fs: 0,
            modestbranding: 1,
        },
        events: {
            'onStateChange': leggo
        }
    });
    let x = document.getElementById('player');
    x.style.marginLeft = screenWidth / 2 - x.offsetWidth / 2 + "px";
    x.style.marginTop = screenHeight / 1.7 - x.offsetHeight / 3 + "px";
}

function leggo(e) {
    console.log(e.data);
    if (e.data === 2) {
        e.target.playVideo();
    }
    if (e.data === 3) {
        e.target.playVideo();
        e.target.setVolume(100);
    }
    if (e.data === 1) {
        audio.play();
        Prep();

        itHasBegun();
        //used the commented out bit to find the perfect times to adjust rotation
        //player.setPlaybackRate(0.25);
        //setInterval(function(){
        //    console.log(player.getCurrentTime())
        //}, 1);
    }
}

function show(id, timeAppear, endAt) {
    let elem = document.getElementById(id);
    setTimeout(
        () => elem.style.display = "inline-block",
        timeAppear
    );
    setTimeout(
        () => elem.style.display = "none",
        endAt
    );
}

function Prep() {
    function unDesplayAbs() {
        let abs = document.getElementById("abs");
        abs.style.display = "none";
    }

    function positionExplosion() {
        let x = document.getElementById("explosion");

        x.style.marginLeft = screenWidth / 2 - x.offsetWidth / 2 + "px";
        x.style.marginTop = screenHeight / 2 - x.offsetHeight / 3 + "px";
    }

    function enableMedia() {
        let media = document.getElementById("media");
        media.style.display = "block";
    }

    unDesplayAbs();
    positionExplosion();
    enableMedia();
}

function itHasBegun() {
    function play(file) {
        let why = new Audio(file);
        why.play();
    }

    setTimeout(theyDidIt, 3700);
    for (let i = 1; i < 5; i++) {
        show("frog" + i, 9000, 13000);
    }
    show("commLab", 13000, 19000);
    show("mariet", 15000, 19000);
    show("studentPortal", 17000, 19000);
    show("who", 24000, 32000);
    show("stop", 26000, 32000);
    show("wPost", 28000, 32000);
    show("noHello", 30000, 32000);
    setTimeout(() => play("Sound/why.mp3"), 9000);
    setTimeout(() => play("Sound/blaster.mp3"), 13000);
    setTimeout(() => play("Sound/blaster2.mp3"), 17000);
    setTimeout(() => play("Sound/okay.mp3"), 21000);
    setTimeout(() => play("Sound/hThere.mp3"), 25000);
    setTimeout(() => play("Sound/blaster.mp3"), 27000);
    setTimeout(() => play("Sound/yup.mp3"), 30000);
    setTimeout(() => play("Sound/Adele.mp3"), 34000);
    setTimeout(() => play("Sound/stop.mp3"), 39000);

    setTimeout(function() {
        stopColors = setInterval(function() {
            document.getElementById('whatHaveIDone').style.backgroundColor = "rgb(" + randBetween(0, 255) + "," + randBetween(0, 255) + "," + randBetween(0, 255) + ")";
        }, 250)
    }, 3700);
}