#pragma strict
@script RequireComponent(CharacterController)

var mouseSensitivity: float = 5.0f;
var upDownRange: float = 60.0f;
var disableMovement: boolean = false;

private var verticalRotation: float = 0;
private var verticalVelocity: float = 0;

var characterController: CharacterController;

function Start () 
{
	//Screen.lockCursor = true; //This will turn off the mouse cursor in game.
	characterController = GetComponent(CharacterController);
}

function Update () 
{
	if(Input.GetButtonDown("Tab"))
	{
		disableMovement = !disableMovement;
	}
	
	if(!disableMovement)
	{
		// Rotation
		var rotLeftRight: float = Input.GetAxis("Mouse X") * mouseSensitivity;
		transform.Rotate(0, rotLeftRight, 0);
	
		
		verticalRotation -= Input.GetAxis("Mouse Y") * mouseSensitivity;
		verticalRotation = Mathf.Clamp(verticalRotation, -upDownRange, upDownRange);
		Camera.main.transform.localRotation = Quaternion.Euler(verticalRotation, 0, 0);
		
	
		// Movement
		var forwardSpeed: float = Input.GetAxis("Vertical") * TS_TraitSystem._instance.modifiedForwardSpeed;
		var sideSpeed: float = Input.GetAxis("Horizontal") * TS_TraitSystem._instance.modifiedSideSpeed;
		
		verticalVelocity += Physics.gravity.y * Time.deltaTime;
		
		if(characterController.isGrounded && Input.GetButton("Jump")) 
		{
			verticalVelocity = TS_TraitSystem._instance.modifiedJumpHeight;
		}
		
		var speed: Vector3 = new Vector3(sideSpeed, verticalVelocity, forwardSpeed);
		
		speed = transform.rotation * speed;
		
		characterController.Move( speed * Time.deltaTime );
	}
	
}

