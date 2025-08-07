/**
 * @TODO get a reference to the Firebase Database object
 */
const database = firebase.database().ref();

/**
 * @TODO get const references to the following elements:
 *      - div with id #all-messages
 *      - input with id #username
 *      - input with id #message
 *      - button with id #send-btn and the updateDB
 *        function as an onclick event handler
 */
const messageDiv = document.getElementById("all-messages");
const username = document.getElementById("username");
const email = document.getElementById("email");
const message = document.getElementById("message");
const submitButton = document.getElementById("send-btn");

submitButton.onclick = updateDB;
/**
 * @TODO create a function called updateDB which takes
 * one parameter, the event, that:
 *      - gets the values of the input elements and stores
 *        the data in a temporary object with the keys USERNAME
 *        and MESSAGE
 *      - console.logs the object above
 *      - writes this object to the database
 *      - resets the value of #message input element
 */

// Updates the data base
function updateDB(event) {
  event.preventDefault(); // may not be necessary in this case?

  let fullDate = new Date();

  let data = {
    username: username.value,
    email: email.value,
    message: message.value,
    date: fullDate.getMonth() + 1 + "/" + fullDate.getDate() + "/" + fullDate.getFullYear(),
    time: fullDate.getHours() + ":" + fullDate.getMinutes() + ":" + fullDate.getSeconds(),
  };

  // DEBUG
  console.log("Full Date : ", fullDate);
  console.log("Date : ", fullDate.getDate());
  console.log("MM/DD/YYYY : ", fullDate.getMonth() + 1 + "/" + fullDate.getDate() + "/" + fullDate.getFullYear())
  console.log("Data object : ", data);

  // pushes data object to firebase database
  database.push(data);

  // clears ueser message box for convienience
  message.value = "";

  // OBJECTIVES:
  // Prevent default refresh
  // Create data object
  // console.log the object
  // GET *PUSH* PUT DELETE
  // Write to our database
  // Reset message
}

/**
 * @TODO add the addMessageToBoard function as an event
 * handler for the "child_added" event on the database
 * object
 */

// Like onclick but if it was like on("click"), yknow?. It also passes a paramter into the addMessageToBoard function.
database.on("child_added", addMessageToBoard);

/**
 * @TODO create a function called addMessageToBoard that
 * takes one parameter rowData which:
 *      - console.logs the data within rowData
 *      - creates a new HTML element for a single message
 *        containing the appropriate data
 *      - appends this HTML to the div with id
 *        #all-messages (we should have a reference already!)
 *
 */

function addMessageToBoard(rowData) {
  console.log(rowData);
  let data = rowData.val();
  console.log(data);

  let singleMessage = makeSingleMessageHTML(
    data["username"],
    data["email"],
    data["message"],
    data["date"],
    data["time"],
  );

  messageDiv.append(singleMessage);

  // Store the value of rowData inside object named 'data'
  // console.log data
  // Create a variable named singleMessage
  // that stores function call for makeSingleMessageHTML()
  // Append the new message HTML element to allMessages
}

/**
 * @TODO create a function called makeSingleMessageHTML which takes
 * two parameters, usernameTxt and messageTxt, that:
 *      - creates a parent div with the class .single-message
 *
 *      - creates a p tag with the class .single-message-username
 *      - update the innerHTML of this p to be the username
 *        provided in the parameter object
 *      - appends this p tag to the parent div
 *
 *      - creates a p tag
 *      - updates the innerHTML of this p to be the message
 *        text provided in the parameter object
 *      - appends this p tag to the parent div
 *
 *      - returns the parent div
 */

function makeSingleMessageHTML(usernameTxt, emailTxt, messageTxt, dateTxt, timeTxt) {
  // Create Parent Div
  let parentDiv = document.createElement("div");

  // Add Class name .single-message
  parentDiv.className = "single-message";

  // Create Username P Tag
  let usernameP = document.createElement("p");
  usernameP.innerText = usernameTxt;
  usernameP.className = "single-message-username";
  parentDiv.append(usernameP); // ??? - Why not append Child???

  // Create email p Tag
  let emailP = document.createElement("p");
  emailP.innerText = emailTxt;
  emailP.className = "single-message-email";
  parentDiv.append(emailP);

  // Create message P Tag
  let messageP = document.createElement("p");
  messageP.innerText = messageTxt;
  parentDiv.append(messageP);

  // Create date P Tag (I should really make a function at this point :P )
  let dateP = document.createElement("p");
  dateP.innerText = dateTxt;
  dateP.className = "single-message-date"
  parentDiv.append(dateP);

  let timeP = document.createElement("p");
  timeP.innerText = timeTxt;
  timeP.className = "single-message-time";
  parentDiv.append(timeP);

  // Return Parent Div
  return parentDiv;
}

/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key
 *
 * @BONUS use an arrow function
 */
