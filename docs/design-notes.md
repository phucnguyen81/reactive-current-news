# Insprirations

-   Flow-based programming
-   Statecharts (will use xState later)
-   The book 'Constructing UI with Statecharts'
-   Closed-loop process control
-   Industrial control system (reading)

# Design ideas (on-going)

There is a centralized control of the app called the Main Controller.
The Main Controller coordinates central logic control and the plant.
The central logic contains the system state from user's perspective.
The plant perform actions (effect).
The plant's outputs become feedback events for the central logic control.
The UI is just a special control.
