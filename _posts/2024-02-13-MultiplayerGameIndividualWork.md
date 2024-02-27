---
toc: true
comments: false
layout: post
title: Multiplayer Game Individual Work
description: Everything I did during this project.
type: hacks
courses: { compsci: {week: 23} }
---

## Fail with the md file

- First we wanted to create our leaderboard in a seperate md file. We made a button in the main game that linked to this other file. We created a table that had a button that added rows into this table. We would use this later to add new scores each time someone finished the game. We also used sass to style it which looked pretty bad lol. We then switched to make the leaderboard appear in a drop down in the main game file.

## Switch to the main file

- After working in the seperate md file we had to completely restart within the main game file. We used the SettingsControl as a guide to create our own Leaderboard.js file that would create the drop down with the leaderboard and other things like the clear button within it. This was by far the hardest part for us in this project. We had a very hard time understanding how the code worked and how to use it for our own purposes. We got help from multiple different teams but still nothing worked. We eventually fixed all the bugs(Message saying undefined in the drop down and nothing showing up. Everything fading away when the button was clicked. Leaderboard now showing up in the drop down. Had problems with IDs withing the html.) and got our drop down to show up.

## Getting the leaderboard to work

- We used the table within Settings Control as a guide to make our own table for the leaderboard. While we waited for Nora and Kaden to get the local storage working we created our table and used fake data to make sure our leaderboard worked. We also played around with sass to make the leaderboard look a whole lot better. In addition, we figued out how to add other things for example our clear button. We also used SettingsControll as a guide for this.

```
get leaderboardTable(){
        // create table element
        var t = document.createElement("table");
        t.className = "table scores";
        // create table header
        var header = document.createElement("tr");
        var th1 = document.createElement("th");
        th1.innerText = "Name";
        header.append(th1);
        var th2 = document.createElement("th");
        th2.innerText = "Score";
        header.append(th2);
        t.append(header);

        this.table = t;

        return t;
    }

    static leaderboardDropDown() {
        // create title for leaderboard
        var localMultiplayer = document.createElement("div");
        localMultiplayer.id = "leaderboardTitle";
        document.getElementById("leaderboardDropDown").appendChild(localMultiplayer);

        var localLeaderboard = new Leaderboard("timeScores")

        var t1 = localLeaderboard.leaderboardTable;
        document.getElementById("leaderboardDropDown").append(t1);

        var clearButton = localLeaderboard.clearButton;
        document.getElementById("leaderboardDropDown").append(clearButton);

        var IsOpen = false; // default sidebar is closed
        var SubmenuHeight = 0; // calculated height of submenu
        function leaderboardPanel() {

            localLeaderboard.updateLeaderboardTable();
            // toggle isOpen
            IsOpen = !IsOpen;
            // open and close properties for sidebar based on isOpen
            var leaderboard = document.querySelector('.leaderboardDropDown');
            leaderboard.style.width = IsOpen?"80%":"0px";
            leaderboard.style.paddingLeft = IsOpen?"10px":"0px";
            leaderboard.style.paddingRight = IsOpen?"10px":"0px";
            leaderboard.style.top = `calc(${SubmenuHeight}px + ${GameEnv.top}px)`;
        }
        // settings-button and event listener opens sidebar
        document.getElementById("leaderboard-button").addEventListener("click",leaderboardPanel);
        // sidebar-header and event listener closes sidebar
        document.getElementById("leaderboard-header").addEventListener("click",leaderboardPanel);

        window.addEventListener('load', function() {
            var Submenu = document.querySelector('.submenu');
            SubmenuHeight = Submenu.offsetHeight;
        });
    }
```
```
<div id="sidebar" class="sidebar">
  <a href="javascript:void(0)" id="sidebar-header">&times; Settings</a>
</div>
<div id="leaderboardDropDown" class="leaderboardDropDown">
  <a href="javascript:void(0)" id="leaderboard-header">&times; Leaderboard</a>
</div>

<!-- Wrap both the controls and gameplay in a container div -->
<div id="canvasContainer">
  <div class="submenu">
    <div id="score">
        Timer: <span id="timeScore">0</span>
    </div>
    <div id="gameBegin" hidden>
        <button id="startGame">Start Game</button>
    </div>
    <div id="gameOver" hidden>
        <button id="restartGame">Restart</button>
    </div>
    <div id="settings"> <!-- Controls -->
        <!-- Background controls -->
        <button id="settings-button">Settings</button>
    </div>
    <div id="leaderboard"> <!-- Controls -->
        <button id="leaderboard-button">Leaderboard</button>
    </div>
  </div>
  <!-- JavaScript-generated canvas items are inserted here -->
</div>
```

## Getting two leaderboards

- Nora and Kaden then added the local storage to our leaderboard but we also needed a leaderboard that works for the whole server so you can see everyones scores. While Nora and Kaden worked with Tristen, Katie and I worked on having the leaderboard switch when multiplayer was set to true or false. We did this by first having both leaderboards on the drop down at the same time and then hiding one of them depending on if multiplayer was true or false. We also figued out how to create a title at the top of the leaderboard depending if it was the multiplayer or local leaderboard.

```
import GameEnv from "./GameEnv.js";
import Socket from "./Multiplayer.js";
export class Leaderboard{
    constructor(key){ //default keys for localStorage
        this.key = key;
    }

    get leaderboardTable(){
        // create table element
        var t = document.createElement("table");
        t.className = "table scores";
        // create table header
        var header = document.createElement("tr");
        var th1 = document.createElement("th");
        th1.innerText = "Name";
        header.append(th1);
        var th2 = document.createElement("th");
        th2.innerText = "Score";
        header.append(th2);
        t.append(header);

        this.table = t;

        return t;
    }

    updateLeaderboardTable() {
        // Fetch time scores from local storage
        const timeScores = JSON.parse(localStorage.getItem(this.key)) || [];
        console.log(timeScores,this.key)

        // Get the existing table element
        const table = this.table;

        // Clear the table content
        table.innerHTML = "";

        // Recreate the table header
        var header = document.createElement("tr");
        var th1 = document.createElement("th");
        th1.innerText = "Name";
        header.append(th1);
        var th2 = document.createElement("th");
        th2.innerText = "Score";
        header.append(th2);
        table.append(header);

        // Populate the table with time scores
        timeScores.forEach(score => {
            var row = document.createElement("tr");
            var td1 = document.createElement("td");
            td1.innerText = score.userID;
            row.append(td1);
            var td2 = document.createElement("td");
            td2.innerText = score.time;
            row.append(td2);
            table.append(row);
        });
    }

    get clearButton() {
        const div = document.createElement("div");
        div.innerHTML = "Clear Leaderboard: ";
        
        const button = document.createElement("button");
        button.innerText = "Clear!";
    
        button.addEventListener("click", () => {
            const confirmed = confirm("Are you sure you want to clear the leaderboard?");
            if (confirmed) {
                localStorage.clear();
                this.updateLeaderboardTable();
            }
        });
    
        div.append(button); // wrap button element in div
        return div;
    }

    static leaderboardDropDown() {
        // create title for leaderboard
        var localMultiplayer = document.createElement("div");
        localMultiplayer.id = "leaderboardTitle";
        document.getElementById("leaderboardDropDown").appendChild(localMultiplayer);

        var localLeaderboard = new Leaderboard("timeScores");
        var serverLeaderboard = new Leaderboard("GtimeScores")

        var t1 = localLeaderboard.leaderboardTable;
        var t2 = serverLeaderboard.leaderboardTable;
        document.getElementById("leaderboardDropDown").append(t1);
        document.getElementById("leaderboardDropDown").append(t2);

        var clearButton = localLeaderboard.clearButton;
        document.getElementById("leaderboardDropDown").append(clearButton);

        //var filterDropDown = newLeaderboard.filter;
        //document.getElementById("leaderboardDropDown").append(filterDropDown);

        var IsOpen = false; // default sidebar is closed
        var SubmenuHeight = 0; // calculated height of submenu
        function leaderboardPanel() {
            if (Socket.shouldBeSynced) {
                // turn off local
                t1.style.display = "none";
                t2.style.display = "table";

                localMultiplayer.innerHTML = "Multiplayer Leaderboard";
            } else if (!Socket.shouldBeSynced) {
                // turn off multiplayer
                t2.style.display = "none";
                t1.style.display = "table";

                localMultiplayer.innerHTML = "Local Leaderboard";
            }

            localLeaderboard.updateLeaderboardTable();
            serverLeaderboard.updateLeaderboardTable();
            // toggle isOpen
            IsOpen = !IsOpen;
            // open and close properties for sidebar based on isOpen
            var leaderboard = document.querySelector('.leaderboardDropDown');
            leaderboard.style.width = IsOpen?"80%":"0px";
            leaderboard.style.paddingLeft = IsOpen?"10px":"0px";
            leaderboard.style.paddingRight = IsOpen?"10px":"0px";
            leaderboard.style.top = `calc(${SubmenuHeight}px + ${GameEnv.top}px)`;
        }
        // settings-button and event listener opens sidebar
        document.getElementById("leaderboard-button").addEventListener("click",leaderboardPanel);
        // sidebar-header and event listener closes sidebar
        document.getElementById("leaderboard-header").addEventListener("click",leaderboardPanel);

        window.addEventListener('load', function() {
            var Submenu = document.querySelector('.submenu');
            SubmenuHeight = Submenu.offsetHeight;
        });
    }

}
    
export default Leaderboard;
```