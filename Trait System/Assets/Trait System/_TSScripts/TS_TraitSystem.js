import System.Collections.Generic; //Need for lists

//var thresHold = new int [20]; 
//var thersHoldCounter: int; //Used to increment the thresHold array
var activeTraits = new List.<int>();; //Will store all traits that the player currently has. !Important; Lists are dynamic, meaning things can be be added and removed!
var desiredStep: int; //The number of Traits that we will like to be at
var currentStep: int; //Where we are right now with the Traits
var updateSteps: boolean; //Should we be update our desiredStep and our currentStep?
var updateTraits: boolean; //Should we be updating the traits? Did they change?
var thresHoldStep: int = 1 ; //Will be 1. this is the needed jump to reach the next threshold. This can be any number like getting a new random trait every 5 levels.

//Variables that will be changed by the Traits. These will be used in other scripts.
var modifiedMaxHealth: int;
var modifiedMaxMana: int;
var modifiedForwardSpeed: float; 
var modifiedSideSpeed: float;
var modifiedJumpHeight: float;
var modifiedRegenAmount: int;
var modifiedRegenTimer: float;

static var _instance: TS_TraitSystem = null; //Allows the entire Script to be static!

function Awake() //Use this to create an instance of this Component. It will destroy any copy that is already in the scene. !Important!
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
		gameObject.name = "$TraitSystem";
			
	
}

function Update()
{
	if(updateTraits) //if updateTraits = true
	{
		ApplyTraits();
	}

	if(updateSteps)
	{
		var thresHoldNumber: int = Mathf.RoundToInt(TS_GameController._instance.currentLevel / thresHoldStep); //Gives us how far off we are from our desired point. 
		//We round it to an Int to get rid of any decimal places in case it cannot not be cleanly divided by the thresHoldStep.
		
		if(thresHoldNumber != activeTraits.Count) //Checks to see if we need to Add or Remove traits. We will if the number we want isn't the number will have!
		{
			desiredStep = thresHoldNumber;
			currentStep = activeTraits.Count;
			updateSteps = false; //Stop checking until we apply all the new traits!
			updateTraits = false; //Don't update traits until we apply all the new traits!
		}
	}
	else //If we are not checking for new steps to update then we need to update the steps we have.
	{
		if(currentStep != desiredStep)
		{
			if(currentStep > desiredStep) //We need to take away traits.
			{
				RemoveTrait();
				currentStep --;
				updateTraits = true; //Remove the trait we took away from our stats
			}
			else
			{
				// It has to be less than because we know it's not equal or it won't be here.
				AddTrait();
				currentStep ++;
				updateTraits = true; //Add the new trait to the stats.
			}
		}
		else //Catch to step updateSteps and set updateTraits back to false. It will hit this when the currentStep and desiredStep are equal.
		{
			updateSteps = true;
			updateTraits = false;
		}
	}
	
	
}

function AddTrait() //Add trait at Random at the end of the activeTrait array.
{
	var stopLoop: boolean = false;
	var randomTrait: int;
	
	while(!stopLoop) //Creates a loop to stop having the same trait twice on the player.
	{
		stopLoop = true;
		randomTrait = Random.Range(1,30); //Gives us a random number from 1 to 40; which is the number of traits for this demo! This can be changed.
		
		for(var j in activeTraits) //Searchs our Traits to see if the randomTraits is already in our activeTraits array.
		{
			if(randomTrait == j)
			{
				stopLoop = false; //If it is, restart loop to find another trait. This will loop until it finds a new trait. !Important; You can't have more traits in your
				// cont. activeTraits array than you have different traits will this!. It will cause this to loop forever! Which is way the max trait count for this demo is 20
				// cont. in the activeTraits array, yet 40 traits to choose from.
			}
		}
	}
	//Once the loop stops, we add the random trait.
	activeTraits.Add(randomTrait); //Adds the random trait to the end of the array.
}

function RemoveTrait()
{
	activeTraits.RemoveAt(activeTraits.Count - 1); //Removes the last trait added to the array.
}

function ApplyTraits()
{
	//Reset stats to default values, so the calucation can be a fresh one. Meaning take into account if any of the base variables changed.
	modifiedMaxHealth = TS_WorldVars._instance.maxPlayerHealth;
	modifiedMaxMana = TS_WorldVars._instance.maxPlayerMana;
	modifiedForwardSpeed = TS_WorldVars._instance.forwardSpeed;
	modifiedBackwardSpeed = TS_WorldVars._instance.backwardSpeed;
	modifiedSideSpeed = TS_WorldVars._instance.sideSpeed;
	modifiedJumpHeight = TS_WorldVars._instance.jumpHeight;
	modifiedRegenAmount = TS_WorldVars._instance.storedRegenAmount;
	modifiedRegenTimer = TS_WorldVars._instance.storedRegenTimer;

	//Cycles threw all the traits and allpies their code one at a time. These are just examples of how this works. Place real code here.
	for(var t in activeTraits)
	{
		switch(t)
		{
			case 1:
				modifiedJumpHeight = TS_WorldVars._instance.jumpHeight * 2;
				break;
			case 2:
				modifiedForwardSpeed = TS_WorldVars._instance.forwardSpeed * 2; 
				break;
			case 3:
				Debug.Log("Heavenly abilities cost -20% mana");
				break;
			case 4:
				Debug.Log("Demonic abilities cost -20% mana");
				break;
			case 5:
				Debug.Log("Store items -15% cost");
				break;
			case 6:
				modifiedSideSpeed = TS_WorldVars._instance.sideSpeed * 2;
				break;
			case 7:
				modifiedRegenAmount = TS_WorldVars._instance.storedRegenAmount * 2;
				break;
			case 8:
				Debug.Log("-20% damage reduction!");
				break;
			case 9:
				modifiedJumpHeight = 0;
				break;
			case 10:
				Debug.Log("10% damage every jump!");
				break;
			case 11:
				Debug.Log("Store items +15% cost");
				break;
			//To 30;  or what ever your max trait is.
			case 30:
				break;
			default:
				Debug.Log(t + " is not yet coded!");
				break;
		}
	}
}

function ForceTraitUpdate() //Use this when you change a variable in World Vars like maxHealth, it will force the traits to recalucate to include the new number.
{
	ApplyTraits();
}

