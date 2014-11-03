Project Fiona – Random Trait System
Written by: Derrell Beasley

Hello, I going to walk you through the Random Trait System. The first thing to know is that there isn’t any setup required in the example scene. The example is under Trait System\_TSScenes. It is the only one there; it’s called TestScene.
If you open the TestScene, you will see a couple of things. On the bottom of the screen there will several buttons; a Load Game, Save Game, New Game, Level +1, Level + 5, Level – 1 and Restart Levels. On the left toward the bottom you will see a simple box labeled stats. Above this box is where the active Traits will appear once they are added to the player.
A quick overview--------------------------------------------------------------------------------
Load Game: Will load a saved game if there is one. This data is stored in the Player Prefs file.
Save Game: Will save the current game state. This includes the current stats and the player’s current Traits. You can load this save by pressing the load game button.
New Game: Will reset all variables to their default and save the game. This will erase a save if there is one.
Level + 1: Will add 1 to a variable in the GameController Script called level. For every level added a random trait will be added to the player. This of course can be changed! There is an built-in limit of 20 traits before this button is disabled.
Level + 5: Will add 5 levels instead of 1. Functions the same as the “Level + 1” button. 5 traits will be added to the player. There is a built-in limit of 15 traits before this button is disabled!
Level – 1: Will take away 1 level. This will cause the system to remove the last trait added. There is a built-in limit in this button, it will function if there are 0 levels!
Restart Levels: Will reset the level to 0 from any number. This will remove all the traits in the order they were added.
------------------------------------------------------------------------------------------------------------
If you open the TraitSystem folder and go into the  _TSScripts folder you will see the 5 Javascipt scripts. The GameController script, the ModifiedFPSController, and the TraitGUI script are there just be an example. All those script are simple to understand and are commented where they need to be.
The GameController Script---------------------------------------------------
This script is just a shell of a standard FPS or RPG game. There are some functions like AddHealth(), RegenMana(), ApplyDamage(), etc that are not used at all. They are their just to add to the FrameWork. But they are still commented if you would like to use them!
*Please note this is where the variable currentLevel is held, on Line 5.*

ModifiedFPSController---------------------------------------------------------------
This script is a standard FPS script with it speed and jump height modified to be influenced by the Trait System. It should be quite easy to understand. It serves no purpose other than to give you the ability to test out traits in realtime as they are added.
TraitGUI----------------------------------------------------------------------------------
This script is only meant for debugging. You can disable the Stats & Active Traits windows in the inspector by unchecking the “Show Trait UI” button. The same with the Debug buttons by unchecking the “Show Debug Buttons”.
There is good code that can be used from this script though. The code that grabs the names and descriptions of the active traits and displays them in a dynamic window could be useful for you.
Meat & Potatoes 
WorldVars-----------------------
This script stores all the important variables. This is important because i9t also hold all the default values for all the variable that are reset when it is a new game. Speaking of a new game; this is also where the NewGame() function is. Also the SaveData() and LoadData functions.
Also this is where the Trait name String array and the Trait Description String array is kept. This is also where the currentPlayerTraits array is held, saved and loaded. 
The data is saved using unity’s built-in save system, the file Player Prefs. All the work is already done for all the saving and loading, useless you want to add variables. Then it should be simple to follow what is already there.
Please note, this script’s purpose is to do nothing but to save, load, and store variables for all the other scripts to use. There isn’t any Update function in this script, nor does it use any variables itself.
Trait System-----------------------
There are a couple of important things with this script to be aware of. First off the script is heavily commented, so please read them if you are having trouble.  Another important note is if you cannot have more traits active than the total number of traits. The system is setup to prevent the same trait from being added twice. If you do that the system will crash trying to find a new trait that doesn’t exist.
I had to import System.Collections.Generic because I needed to use the Generic List for some of its feature like Count, Add and Remove. It is important to understand that the built-in array, meaning
var myArray: int[];
can not be added to or have things removed from it because it is of a fixed length. You will have to something else. Unity does have dynamic arrays that are type-less (meaning you don’t have to type cast it, so you can place different types into the array such as int & floats, etc) but they are slower. List are type casted but are also dynamic.
Anywho, the thresHoldStep variable can be changed to whatever you would like. For the following example we will pretend the thresHoldStep is 50; meaning every 50 points or levels or XP or whatever you would like to call it, a new trait will be added to the player.

Example: If john has 40 points, then he gets 10 more by doing some action, he reaches a point threshold because he now has 50. John will get a trait at random. If he spends any of his points and it puts him below the number of 50, which is the threshold that the code is checking for (or he dies), he would lose that trait that he got. John could spend his points to remove a Trait that he doesn't want or if he really likes the trait he can just wait until he gets enough points to spend without going below 50. John can do this for any point threshold, but the traits have to be removed in the order that they were received!   
I hope that example made sense. If you have any questions shoot me an email at Derrell.beasleyfo@hotmail.com
