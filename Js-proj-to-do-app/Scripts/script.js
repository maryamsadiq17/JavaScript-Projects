// Step 1: Select the HTML elements we need to work with using their IDs
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Step 2: Listen for when the user clicks the "Add Task" button

addBtn.addEventListener('click', function(){

    // Get the current text typed inside the input, removing empty spaces from ends
    const tasktext = todoInput.value.trim();

    // Check if the user tried to submit an empty input

    if (tasktext === ''){
        alert ('Please type a task before adding!')
        return;
        //  Stop the function completely if empty
    }

    // Create a new <li> element inside JavaScript memory to represent the task row
    const listItem = document.createElement('li');

    // Create a <span> element to hold just the text of the task safely
    const textSpan = document.createElement('span');

    textSpan.classList.add('task-text');    // Give it a class for styling
    textSpan.innerText = tasktext;        // Put the user's text inside the span

    // Create a wrapper <div> to keep our action buttons grouped neatly together

    const actionsDiv = document.createElement ('div');
    actionsDiv.classList.add('actions')

    // Create the "Complete" button
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');
    completeBtn.innerText = '✓';

    // Create the "Delete" button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerText = 'X';

    // Add click event listener to the "Complete" button
    completeBtn.addEventListener('click', function(){
        // Toggle the 'completed' class on the whole <li> row when clicked
        listItem.classList.toggle('completed');
    });

    // Add click event listener to the "Delete" button
    deleteBtn.addEventListener('click', function(){
        // Completely remove this specific <li> row from the webpage
        listItem.remove;
    });

    // Assemble the elements: Put buttons inside the actions container
    actionsDiv.appendChild(completeBtn);
    actionsDiv.appendChild(deleteBtn);

    // Put the text span and the actions container inside the main <li> container
    listItem.appendChild(textSpan);
    listItem.appendChild(actionsDiv);

    // Finally, push our fully assembled <li> into the real HTML <ul> on the page
    todoList.appendChild(listItem);

    // Clear the input field so it's fresh and ready for the next entry
    todoInput.value = '';



});