const socket = io()
 
let name1;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')

do{
    name1 = prompt('please enter the name')
    // console.log(name1)
}while(!name1)

textarea.addEventListener('keyup', (e) =>{
   let a= e.code
    if( e.key === "Enter"){
        sendMessage(e.target.value)
    }
})

function sendMessage(msg1){
    let msg ={
        user : name1,
        message :msg1.trim()
    }
    appendMessage(msg, "outgoing")
    textarea.value = ""

    scroll1()
    socket.emit('message', msg)
} 

function appendMessage(msg,type){
    let minDiv = document.createElement('div')
    let className = type
    minDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    minDiv.innerHTML = markup

    messageArea.appendChild(minDiv)
}

socket.on('message', (msg) => {
    // console.log(msg)
    appendMessage(msg, "incoming")
    scroll1()
})

function scroll1(){
    messageArea.scrollTop = messageArea.scrollHeight
}