#pragma strict
var showTraitUI: boolean = true;
var showDebugButtons: boolean = true;

var buttonWidth: int = 100;
var buttonHeight: int = 50;
var boxWidth: int = 450;
var boxHeight: int = 25;
var boxAreaWidth: int = 25;
var boxAreaHeight: int;
var textOffset: int = 25;
var textWidth: int = 450;
var textHeight: int = 25;

function OnGUI()
{ 
	if(showTraitUI)
	{
		boxAreaHeight = Screen.height/2 - (boxHeight * TS_TraitSystem._instance.activeTraits.Count)/2;
		
		//Debug.Log("Trait UI is enabled!");
		
		//Shows what traits are active on the player. Resizes itself for the number of traits.
		if(TS_TraitSystem._instance.activeTraits.Count > 0)
		{
			GUI.Label(Rect(boxAreaWidth, boxAreaHeight - 25, textWidth, textHeight), "Active Traits");
			GUI.Box(Rect(boxAreaWidth, boxAreaHeight, boxWidth, boxHeight * TS_TraitSystem._instance.activeTraits.Count), "");
			
			for(var i = 0; i < TS_TraitSystem._instance.activeTraits.Count; i++)
			{
				var tempStorage: int = TS_TraitSystem._instance.activeTraits[i];
				GUI.Label(Rect(boxAreaWidth + textOffset, boxAreaHeight + (textOffset * i + 1), textWidth, textHeight), 
					TS_WorldVars._instance.traitNames[tempStorage] + ":  " + TS_WorldVars._instance.traitDescs[tempStorage]);
			}
			
		}
		
		//Displays Stats so you can easily see the changes from the traits.
		GUI.Box(Rect(25, Screen.height - 200, 300, 200), "Stats");
		GUI.Label(Rect(35, Screen.height - 200 + textOffset, 300, 50), "Forward Speed:" + TS_WorldVars._instance.forwardSpeed + " " +
			" Modified Forward Speed: " + TS_TraitSystem._instance.modifiedForwardSpeed);
		GUI.Label(Rect(35, Screen.height - 200 + textOffset * 2, 300, 50), "Side Speed:" + TS_WorldVars._instance.sideSpeed + " " +
			" Modified  Side Speed: " + TS_TraitSystem._instance.modifiedSideSpeed);
		GUI.Label(Rect(35, Screen.height - 200 + textOffset * 3, 300, 50), "Jump Height:" + TS_WorldVars._instance.jumpHeight + " " +
			" Modified Jump Height: " + TS_TraitSystem._instance.modifiedJumpHeight);
		GUI.Label(Rect(35, Screen.height - 200 + textOffset * 4, 300, 50), "Max Health:" + TS_WorldVars._instance.maxPlayerHealth + " " +
			" Modified Max Health: " + TS_TraitSystem._instance.modifiedMaxHealth);
		GUI.Label(Rect(35, Screen.height - 200 + textOffset * 5, 300, 50), "Max Mana:" + TS_WorldVars._instance.maxPlayerMana + " " +
			" Modified Max Mana: " + TS_TraitSystem._instance.modifiedMaxMana);
		GUI.Label(Rect(35, Screen.height - 200 + textOffset * 6, 300, 50), "Mana Regen:" + TS_WorldVars._instance.storedRegenAmount + " " +
			" Modified Mana Regen: " + TS_TraitSystem._instance.modifiedRegenAmount);
			
		GUI.Box(Rect(Screen.width/2 - 100, Screen.height - 90, 200, 25), "Press Tab to diasble movement!");
	}
	
	if(showDebugButtons) //Just allows quick debugging.
	{
		//Debug.Log("Debug Buttons are enabled!");
		if(GUI.Button(Rect(Screen.width /2 - buttonWidth/2, Screen.height - 60, 100, 50), "Level + 1"))
		{
			if(TS_TraitSystem._instance.activeTraits.Count < 20)
			{
				TS_GameController._instance.currentLevel ++;
			}
		}
		
		if(GUI.Button(Rect(Screen.width /2 + buttonWidth/2, Screen.height - 60, 100, 50), "Level + 5"))
		{
			if(TS_TraitSystem._instance.activeTraits.Count <= 15)
			{
				TS_GameController._instance.currentLevel += 5;
			}
			
		}
		
		if(GUI.Button(Rect(Screen.width /2 + (buttonWidth/2 + buttonWidth), Screen.height - 60, 100, 50), "Level - 1"))
		{
			if(TS_GameController._instance.currentLevel != 0)
			{
				TS_GameController._instance.currentLevel -= 1;
			}
		}
		
		if(GUI.Button(Rect(Screen.width /2 + (buttonWidth/2 + buttonWidth*2), Screen.height - 60, 100, 50), "Reset Levels"))
		{
			TS_GameController._instance.currentLevel = 0;
		}
		
		if(GUI.Button(Rect(Screen.width /2 - (buttonWidth/2 + buttonWidth), Screen.height- 60, 100, 50), "New Game"))
		{
			TS_WorldVars._instance.NewGame();
		}
		
		if(GUI.Button(Rect(Screen.width /2 - (buttonWidth/2 + buttonWidth*2), Screen.height - 60, 100, 50), "Save Game"))
		{
			TS_WorldVars._instance.SaveData();
		}
		
		if(GUI.Button(Rect(Screen.width /2 - (buttonWidth/2 + buttonWidth*3), Screen.height - 60, 100, 50), "Load Game"))
		{
			TS_WorldVars._instance.LoadData();
		}
	}
}