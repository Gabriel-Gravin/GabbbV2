---
toc: true
comments: false
layout: post
title: Plans
description: Plans
type: plans
---

## Issues

Throughout the project I have created issues in order to keep track of progress.

<div>
    <a href='https://github.com/Gabriel-Gravin/Teamwork/issues/1'>Background Issue</a>
    <p>This issue explaines everything that I did with the background for my project.</p>
    <a href='https://github.com/Gabriel-Gravin/Teamwork/issues/5'>Migrating to OOP Issue</a>
    <p>This issue explaines the work I did while trying to migrate my code to OOP. Never got it to work and had to approch with a new strategy.</p>
    <a href='https://github.com/Gabriel-Gravin/Teamwork/issues/6'>Integrating with Mr. Mort's code</a>
    <p>This issue shows how I started integrating my code into Mr. Mort's code and the challenges that came with it.</p>
</div>

## Creating the background

Creating the background for our game was a pretty simple task but I still had some troubles with it. 

The first struggle I had was when I drew the background. I needed the top and the bottom of the background to match so there would be a smooth transition in the game. To do this I had to copy the top part of the background and paste it at the bottom so I could see where I needed to draw so it would line up.

For the code to create the background I first made a canvas that had the width and height the background was going to be. I also made sure to add the link.src so the file could be found in order to actually see the background.

Then I made variables for 3 different backgrounds. Each of which had the same dimensions, but were always in different places. I made one ubove the canvas that would move down into the canvas. One in the middle that would move off the canvas. And one below that canvas that would move back to the top. I used the logic to create a cycle that would keep these backgrounds always moving. I used if statements to detect when the bottom background needed to be moved back up to the top.

I then created an interval to move each background down 3 pixles every 50 milliseconds. That would update the postion of the backgrounds before drawing them back onto the canvas.

## Left, Right, and Idle

First I needed to add some variables I could set true or false in order to know when Link would be moving right, right, or Idle.

I then added a funtion to move the character left and a funtino to move it right. The funcitons sets the moving variable to true and the idle variable to false. Then it sets the max frame and the Y frame within the sprite so the animation will be correct. Same thing for the idle funtion except it only sets the idle variable to true and sets the max frame and the Y frames.

In order to call these funtions I added a key down window listener to see when the a key was pressed for left, d for right, and nothing for idle. Depeding on the key that was pressed it would call the specific function.

I then had to make sure Link would stop moving once no key was being pressed and would go to the idle animation. So I added a keyup window listener to see when each key was lifted. If the a key was lifted it would make the moving left variable false and the idle variable ture. Same for the right.

Finally I added an if statement in the game loop function that would add pixles when the moving right variable is true and subtract pixles when the moving left variable is true. This makes the character move left and right on the screen.

I had one bug where if you jumped and then moved and then let go of the jump key, you would be moving in the idle animation. I fixed this by simply getting rid of the part of the key up if statement that made it so if no keys were pressed it would be idle. This made it impossible for Link to idle unless the a or d keys were lifted.

## Migrating to OOP part 1

First thing I did was make a new js file to store a character class. In this class I put everything a basic character would need like the variables for the spritesheet, the dimestions, and everything for movement.

In my main file I created a variable to store all of link attributes which I used the character class to create. I had trouble understanding how the constructor worked but it's actually pretty simple. Each slot in the constructer corresponds to the variable you set it too.

I then had to change every variable in the file to the variables I used in the class by adding a Link. in front of it. After doing that my code didn't work. I reviewed everything and made sure all the variables were right and the constructor was right and I had all the same stuff the main file had execpt just integrated. After overlooking everything many times and asking chatGPT I still couldn't get it to work. I asked Mr. Mort and we decided to restart by using Mr. Morts Alien World code.

## Migrating to OOP part 2

I first downloaded all of Mr. Morts project into my repository.

I then changed the link to the background. I also added all the logic for the background into the background class.

## Reflection

This trimester has been super fun and I loved working on all the different things. I learned a lot about markdown, html, and javascript. Learned the syntax for markdown, learned lots of tags in html, and learned lots of different things in javascript like variables, classes, if statements, and overall just how to code different things. I learned how to use draw and update functions and call them within a loop in order to get animations and movement and different things working. I really like functions because I don't have to rewrite code and it makes the file a lot simpler and more organized. In trimester 2 I really look forward to diving deeper into collisions and hitboxes. I didn't really do much with collisions this trimester and want to understand how to make different components in a game work with each other. I want to learn how to build a hitbox around a character and use that in order to help with collisions. I also want to work on OOP a lot more. Maybe starting with it next trimester will make it easier to wrap my head around. Overall this trimester was a great learning experiance and I had lot of fun coding with my team. We made some great memories and I hope they're in my class next year!