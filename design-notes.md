# Insprirations 

-   Industrial control system
-   Closed-loop process control
-   PLC board (Programmable Logic Controller)
-   Flow-based programming
-   Statecharts (will use xState later)

TODO: sort out the influences of each method

# Design ideas (on-going)

There is a centralized control of the app called the HQ.

The HQ coordinates the following components:
-   The central logic control called control center
-   The connectors that connect the control center to other controls

The control center is the brain of the HQ.
The control center does not perform actions, its purpose is to maintain the
state of the HQ.

The UI is just a special control.
All UI components can send events to the HQ.
