#pragma strict

var currentPlayerHealth: int = 1; //So the player won't die right off the back when the game is first started.
var currentPlayerMana: int = 1; 
var currentLevel: int;

private var currentTimer: float;

static var _instance:TS_GameController = null;

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
	gameObject.name = "$GameController";
	
	TS_WorldVars._instance.NewGame(); //Using this because there isn't a menu setup to do this!
}

function Update () 
{
	RegenMana();
	LimitHealthMana(); //Placed here so the player can never have more than the max health or mana allowed.
}

function RegenMana()
{
	currentTimer -= Time.deltaTime;
	
	//Regens Mana at a rate that is determined in the World Vars script if the current Mana is below the max.
	if(currentPlayerMana < TS_TraitSystem._instance.modifiedMaxMana && currentTimer <= 0)
	{
		currentPlayerMana += TS_TraitSystem._instance.modifiedRegenAmount;
		currentTimer = TS_TraitSystem._instance.modifiedRegenTimer;
	}
}

function AddHealth(amount: int)
{
	currentPlayerHealth += amount;
}

function ApplyDamage(damage: int)
{
	currentPlayerHealth -= damage;
	if(currentPlayerHealth >= 0)
	{
		PlayerDeath();
	}
}
function LimitHealthMana()
{
	//We use the modifiedMaxHealth because a traut can cause us to have an extra 20% health. If that trait isn't active, the modified variable is the same as the default.
	if(currentPlayerHealth > TS_TraitSystem._instance.modifiedMaxHealth)
	{
		currentPlayerHealth = TS_TraitSystem._instance.modifiedMaxHealth;
	}
	
	//Same for the modifiedMaxMana.
	if(currentPlayerMana > TS_TraitSystem._instance.modifiedMaxMana)
	{
		currentPlayerMana = TS_TraitSystem._instance.modifiedMaxMana;
	}
}

function PlayerDeath()
{
	//Do something here!
}


