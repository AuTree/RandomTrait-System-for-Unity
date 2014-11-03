#pragma strict

//Instance Var for this script
static var _instance: TS_WorldVars = null;

//Trait System variables*******************************************************************
var maxPlayerHealth: int;
var maxPlayerMana: int;
var forwardSpeed: float;
var sideSpeed: float;
var jumpHeight: float;

var currentPlayerTraits = new int[20]; //Store the player's traits and save/load them. The max is set to 20 but can be changed.
var traitNames = new String[31]; //Will Store all the trait names; will be used in the GUI.
var traitDescs = new String[31]; //Will Store all the trait descriptions. The text color will change depending on if the trait is negative or not.

//GameController Variables*****************************************************************
var storedPlayerHealth: int;
var storedPlayerLevel: int;
var storedRegenTimer: float; //Can be updated in the store
var storedRegenAmount: int; //Can be updated in the store
var storedPlayerMana: int; //Might just set to always equal 100 at the start of the level.

function Awake()
{
	if (_instance != null && _instance != this)
		{
			Destroy(gameObject);
			return;
		}
		else
		{
			_instance = this;
		}
		DontDestroyOnLoad(this.gameObject);
		gameObject.name = "$World Variables";
}

function Start()
{
	//traitNames[0] = ""; This is empty on purpose.
	//traitDescs[0] = ""; So is this one. It will be used when a trait is not yet assigned to a slot. Sort of a placeholder.
	
	traitNames = ["", "Light as a Feather", "Cross Species Breeding", "Blessed from Above", "Demonic pat on the back", "Smooth Talker", "Old School FPSer", "Gifted", 
		"Tough Skinned", "Heavy as the Weather", "Glass Bones", "Where are the TPS Reports?", 
		"Trait 12 Name", "Trait 13 Name", "Trait 14 Name", "Trait 15 Name", "Trait 16 Name", "Trait 17 Name", "Trait 18 Name", "Trait 19 Name", "Trait 20 Name", 
		"Trait 21 Name", "Trait 22 Name", "Trait 23 Name", "Trait 24 Name", "Trait 25 Name", "Trait 26 Name", "Trait 27 Name", "Trait 28 Name", "Trait 29 Name", 
		"Trait 30 Name"];
		
	traitDescs = ["", "You can jump twice as high", "Your forward speed is doubled", "Heavenly abilities cost -20% mana", "Demonic abilities cost -20% mana", "Store items -15% cost", 
		"Side strafe speed is doubled", "Mana Regen doubled", "-20 % damage", "Can't Jump!", "10% damage every jump", "Store items +15% cost", 
		"Trait 12 Desc", "Trait 13 Desc", "Trait 14 Desc", "Trait 15 Desc", "Trait 16 Desc", "Trait 17 Desc", "Trait 18 Desc", "Trait 19 Desc", "Trait 20 Desc", "Trait 21 Desc", 
		"Trait 22 Desc", "Trait 23 Desc", "Trait 24 Desc", "Trait 25 Desc", "Trait 26 Desc", "Trait 27 Desc", "Trait 28 Desc", "Trait 29 Desc", "Trait 30 Desc"];
}

function SaveData()
{
	//Gather the data here first
	GatherData();
	
	//Save Trait System Vars
	PlayerPrefs.SetInt("maxPlayerHealth", maxPlayerHealth);
	PlayerPrefs.SetInt("maxPlayerMana", maxPlayerMana);
	PlayerPrefs.SetFloat("forwardSpeed", forwardSpeed);
	PlayerPrefs.SetFloat("sideSpeed", sideSpeed);
	PlayerPrefs.SetFloat("jumpHeight", jumpHeight); 
	
	PlayerPrefs.SetInt("TraitSlot0", currentPlayerTraits[0]);
	PlayerPrefs.SetInt("TraitSlot1", currentPlayerTraits[1]);
	PlayerPrefs.SetInt("TraitSlot2", currentPlayerTraits[2]);
	PlayerPrefs.SetInt("TraitSlot3", currentPlayerTraits[3]);
	PlayerPrefs.SetInt("TraitSlot4", currentPlayerTraits[4]);
	PlayerPrefs.SetInt("TraitSlot5", currentPlayerTraits[5]);
	PlayerPrefs.SetInt("TraitSlot6", currentPlayerTraits[6]);
	PlayerPrefs.SetInt("TraitSlot7", currentPlayerTraits[7]);
	PlayerPrefs.SetInt("TraitSlot8", currentPlayerTraits[8]);
	PlayerPrefs.SetInt("TraitSlot9", currentPlayerTraits[9]);
	PlayerPrefs.SetInt("TraitSlot10", currentPlayerTraits[10]);
	PlayerPrefs.SetInt("TraitSlot11", currentPlayerTraits[11]);
	PlayerPrefs.SetInt("TraitSlot12", currentPlayerTraits[12]);
	PlayerPrefs.SetInt("TraitSlot13", currentPlayerTraits[13]);
	PlayerPrefs.SetInt("TraitSlot14", currentPlayerTraits[14]);
	PlayerPrefs.SetInt("TraitSlot15", currentPlayerTraits[15]);
	PlayerPrefs.SetInt("TraitSlot16", currentPlayerTraits[16]);
	PlayerPrefs.SetInt("TraitSlot17", currentPlayerTraits[17]);
	PlayerPrefs.SetInt("TraitSlot18", currentPlayerTraits[18]);
	PlayerPrefs.SetInt("TraitSlot19", currentPlayerTraits[19]);
	
	//Save Gathered Data
	PlayerPrefs.SetInt("storedPlayerHealth", storedPlayerHealth); 
	PlayerPrefs.SetInt("storedPlayerLevel", storedPlayerLevel);
	
	Debug.Log("Data was saved");

}

function LoadData()
{
	//Load all of the saved data to start the game back where it was!
	
	//Load Trait System Vars
	maxPlayerHealth = PlayerPrefs.GetInt("maxPlayerHealth"); 
	maxPlayerMana = PlayerPrefs.GetInt("maxPlayerMana"); 
	forwardSpeed = PlayerPrefs.GetFloat("forwardSpeed");
	sideSpeed = PlayerPrefs.GetFloat("sideSpeed");
	jumpHeight = PlayerPrefs.GetFloat("jumpHeight");  
	
	//Load data to be Pushed to other scripts
	storedPlayerLevel = PlayerPrefs.GetInt("storedPlayerLevel");
	storedPlayerHealth = PlayerPrefs.GetInt("storedPlayerHealth");
	
	currentPlayerTraits[0] = PlayerPrefs.GetInt("TraitSlot0");
	currentPlayerTraits[1] = PlayerPrefs.GetInt("TraitSlot1");
	currentPlayerTraits[2] = PlayerPrefs.GetInt("TraitSlot2");
	currentPlayerTraits[3] = PlayerPrefs.GetInt("TraitSlot3");
	currentPlayerTraits[4] = PlayerPrefs.GetInt("TraitSlot4");
	currentPlayerTraits[5] = PlayerPrefs.GetInt("TraitSlot5");
	currentPlayerTraits[6] = PlayerPrefs.GetInt("TraitSlot6");
	currentPlayerTraits[7] = PlayerPrefs.GetInt("TraitSlot7");
	currentPlayerTraits[8] = PlayerPrefs.GetInt("TraitSlot8");
	currentPlayerTraits[9] = PlayerPrefs.GetInt("TraitSlot9");
	currentPlayerTraits[10] = PlayerPrefs.GetInt("TraitSlot10");
	currentPlayerTraits[11] = PlayerPrefs.GetInt("TraitSlot11");
	currentPlayerTraits[12] = PlayerPrefs.GetInt("TraitSlot12");
	currentPlayerTraits[13] = PlayerPrefs.GetInt("TraitSlot13");
	currentPlayerTraits[14] = PlayerPrefs.GetInt("TraitSlot14");
	currentPlayerTraits[15] = PlayerPrefs.GetInt("TraitSlot15");
	currentPlayerTraits[16] = PlayerPrefs.GetInt("TraitSlot16");
	currentPlayerTraits[17] = PlayerPrefs.GetInt("TraitSlot17");
	currentPlayerTraits[18] = PlayerPrefs.GetInt("TraitSlot18");
	currentPlayerTraits[19] = PlayerPrefs.GetInt("TraitSlot19");
	
	Debug.Log("Data was loaded!");
	PushData(); //Push loaded data back out!
}

function GatherData()
{
	//Collect data from the different scripts, mainly the Gamecontroller!
	storedPlayerHealth = TS_GameController._instance.currentPlayerHealth;
	storedPlayerLevel = TS_GameController._instance.currentLevel;
	storedPlayerMana = TS_GameController._instance.currentPlayerMana;
	
	//Gather the Players traits
	var gatherTraitCounter : int = 0;
	for(var gtc in TS_TraitSystem._instance.activeTraits)
	{
		currentPlayerTraits[gatherTraitCounter] = TS_TraitSystem._instance.activeTraits[gatherTraitCounter];
		gatherTraitCounter++;
	}
	
	Debug.Log("Data was gathered!");
}

function PushData()
{
	//Push data back to the GameController and other scripts.
	TS_GameController._instance.currentPlayerHealth = storedPlayerHealth;
	TS_GameController._instance.currentPlayerMana = storedPlayerMana;
	TS_GameController._instance.currentLevel = storedPlayerLevel;
	
	TS_TraitSystem._instance.modifiedForwardSpeed = forwardSpeed;
	TS_TraitSystem._instance.modifiedSideSpeed = sideSpeed;
	TS_TraitSystem._instance.modifiedJumpHeight = jumpHeight;
	TS_TraitSystem._instance.modifiedMaxHealth = maxPlayerHealth;
	TS_TraitSystem._instance.modifiedMaxMana = maxPlayerMana;
	
	//Push data to the Trait system
	var pushTraitCounter : int = 0;
	for(var ptc in currentPlayerTraits)
	{
		if(ptc != 0)
		{
			TS_TraitSystem._instance.activeTraits.Add(currentPlayerTraits[pushTraitCounter]); 
			pushTraitCounter++;
		}
		
	}
	
		Debug.Log("Data was pushed!");

}

function ResetVars()
{
	//Set Player Health to max
	maxPlayerHealth = 100;
	storedPlayerHealth = maxPlayerHealth;
	
	//Set the Player Mana
	maxPlayerMana = 100;
	storedPlayerMana = maxPlayerMana;
	storedRegenTimer = 1.0;
	storedRegenAmount = 5;
	storedPlayerLevel = 0;
	
	//Reset Trait Vars
	forwardSpeed = 5;
	sideSpeed = 5;
	jumpHeight = 5;
	
	for(var i = 0; i < 20; i++)
	{
		currentPlayerTraits[i] = 0;
	}
	
	Debug.Log("Data was Wiped!");
}

function NewGame()
{
	ResetVars();//Does what it says, resets all the variables that can and will be saved.
	
	PushData(); //After vars are reset; push new data out.
	
	SaveData(); //Make new game permanent
}