# Workout Timer
---
Create a workout, then record your workout times! Signup or login. Login as username: "admin" password: "password" to see a dummy account.
---

## Setup:
> 1) Download the code, then open a command line.
> 2) navigate to the "workout_timer/backend" and run
>       ```$ npm install``` then ```$ npm start```
> 3) similarly, open a second terminal and navigate to the "workout_timer/frontend" and run the same two commands:
>       ```$ npm install``` then ```$ npm start```
> 4) the backend is set to localhost:1234, the frontend is localhost:3000
---

## Todo List:
### Immediate Stuff:
- JSON or JOI schema validation for backend data processing.
- clean up that JSX!: there are quite a few times where I handle quite a bit of logic in the return render potion of a react component. I want to clean that up right quick by moving some of that logic out of the return statement and by breaking down some of the larger chunks of JSX(i'm lookin' at you Timer.js) into child components.
- responsive and adaptive css: the groundwork is already done, it just a matter of writing a few more lines to adjust sizes and ratios. This process will also include figuring out a desktop layout, and making the css generaly cleaner and more readable.
- add a logout button: "You can login any time you want, but you may never leave." functionality already built.
- add exercises to the exercies library: it's kinda small at the moment.
- improve the search sorting for the exercise library: right now it's just a simple regEx matching function. It halfway-works (type in "a" and then "ab" into the search bar and you'll see what I mean)
- transform individual recorded time listings into a series of drop-down menus: I want the user to see a list of workout times, then click a little button to display further details about those times instead of being presented with thee total breakdown all at once.
- clean up some front-end error handling.
- clean up the API class on the front-end, kind of redundant right now.
- various "quality of life" fixes ...
### Eventual Stuff:
- settings: lightmode/darkmode
- edit user profile data: change password, username, etc.
- BIGBUG FIX: when deleting the last workout in the workout list when viewing the workout carousel, rotate the carousel back one spot instead of resetting the whole thing.
- Make a super cool graph for viewing user times: using recharts, I want to plot user's improvements in time/number of reps/rounds on a graph.