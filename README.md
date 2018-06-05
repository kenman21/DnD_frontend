DnD Manager

Dungeons and Dragons Manager is a tool created for Dungeon Masters and players. Dungeon Masters can create maps to help visualize and enhance the experience they create for their travelers, while players can track their character stats and progress over multiple game sessions.

Installing

To start the DnD Manager application, first clone the bananagram-backend repository and follow the directions there. Link: https://github.com/kenman21/DnD_backend

After following the instructions in DnD_backend, execute the following commands inside of the DnD-frontend directory

npm install

To host a local server for the application run the following in terminal while in the project directory:

npm start

When prompted to start the server on a different port number, specify yes by entering "y".

Visit localhost:3001 in your browser to begin using the application.

User Experience

With the DnD Manager, a user can create their own campaigns and maps, or join the campaigns of other users. Once a user logs in or registers to the application, they have the option to create a brand new campaign, create a map using the custom map creator, or join one of the already available campaigns.

In the map creator, users are given the option to create a new map, or open a previously created one. After they have chosen, they can draw to any of the map tiles via the tilesets provided on the right hand side of the screen. To draw an image from the tileset onto the map, a user must first click on a square of the map and then a square of the tileset directly after. To draw a single image over a large portion of the map, a user can click on two different squares of the map to create a highlighted rectangle. Any square clicked on the tileset after this will be copied to each square of the highlighted rectangle on the map. Both of these drawing techniques also work to erase the content of a square on the map via the ERASE button on the right hand side of the screen. The last drawing feature is meant for larger sprites, and starts with the user clicking a beginning square on the map. After this, they can click and drag on any square of the tileset to copy that image to the map. Any square dragged over during this click will also be drawn to the map. A user can reset their clicks at any time by pressing the ESC key. Once a user is happy with the map changes they've made, they can save their progress by pressing the "Save Map State" button.

Users on the home screen may also create a new campaign via the area labeled "Create Your Own Campaign". Here, users can enter in the name of the campaign that will be shown on the home screen, as well as a campaign password. User's will need this password in order to join this player's campaign. After the user has created their campaign, they may find it in the section at the bottom labeled "Browse All Campaigns." Once they find the game they have created, a user can open up the campaign to immediately see any players that have joined. If there are players entered into the campaign, their character sheets will be shown to the campaign creator. A user joining this person's campaign can create a unique character and backstory with the provided character sheet. Entries will be persisted everytime they click out of one of the fields of the sheet.

Campaign creators may use their maps to interact with their players via the Live Session feature, found on their campaign page. To open a live session, the campaign manager must press the "Create Live Session" button. Once they've done so, they will be shown all of the maps they've created on the left hand side of the screen, as well as a live chat on the right. Using the live session feature, a manager can choose for their players to only see a specific portion of the map. To do this, they need to click to open a previously created map. Then, they must click twice on the map, to create the highlighted rectangle that they want the players to see. After the campaign owner is satisfied with the region they've selected, they may click on the "Highlight Map" button, to have this region shown to the players. The campaign owner can deselect the region they've chosen by pressing ESC, and highlight a new region at any time.

A demo of the application can be found here: 

https://www.youtube.com/watch?v=uXyRM54LVK8&feature=youtu.be

Authors

Kenneth Lehr - kenman21

Acknowledgements

This was the final project for the Flatiron School Web Development Course. Thanks to instructors Stephen, Tashawn, and Graham for their help along the way.
