const home = document.querySelector('.home');
const scoreBoard = createElement(home,'div','scoreBoard')
const homeBoard = createElement(home,'div','homeBoard')
const message = createElement(home,'div','message')
const startBtn = createElement(home,'button','startBtn')
const items = ["&#10054;","&#10026;","&#8509;","&#8488;"]
const game = {score : 0,bubbles:[],ani:{},total:0,count:0,ready:0,bad:0};
let errorSound = new Audio('mixkit-wrong-electricity-buzz-955.wav')



function createElement(parent,eleType,eleClass){
    const ele = document.createElement(eleType);
    parent.append(ele);
    ele.classList.add(eleClass);
    return ele;
}

scoreBoard.innerHTML="score"
startBtn.innerHTML="START "

startBtn.addEventListener('click',startGame)

function badBubble(){
    // &#9760;
    const bubble = createElement(home,'div','bad')
    bubble.innerHTML="&#9760;"
    const cSize = homeBoard.getBoundingClientRect();
    homeBoard.append(bubble)
    bubble.speed = randomValue(1,8);
    bubble.style.backgroundColor = "red"
    bubble.style.transform = `scale(${randomValue(0.5,3)})`
    bubble.style.left = randomValue(5,(cSize.width-30)) + 'px'
    bubble.style.top = randomValue(0,500) + 500 + 'px'
    bubble.addEventListener('mouseover',(e)=>{
        game.score--
        homeBoard.style.backgroundColor = "red"
    })
    bubble.addEventListener('mouseout',(e)=>{
        game.score--;
        homeBoard.style.backgroundColor = ""
    })
}

function startGame(){
    startBtn.style.display = "none"
    game.score = 0
    game.total = 50
    game.count = 0
    game.ready = 0
    game.bad = 10
    message.innerHTML = "POP the bubble"
    message.style.marginTop = "10px"
    scoreUpdate()
    game.ani = requestAnimationFrame(mover)
}
function createBubble(){
    scoreUpdate()
        const bubble = createElement(home,'div','bubble');
        items.sort(()=>Math.random()-.5);
        const cSize = homeBoard.getBoundingClientRect();
        homeBoard.append(bubble)
        bubble.innerHTML = items[0]
        game.bubbles.push(bubble);
        bubble.speed = randomValue(1,8);
        bubble.dir = randomValue(0,10)-5;
        bubble.style.backgroundColor = `rgba(${randomValue(0,255)},${randomValue(0,255)},${randomValue(0,255)},0.5)`
        bubble.style.transform = `scale(${randomValue(0.5,3)})`
        bubble.style.left = randomValue(5,(cSize.width-30)) + 'px'
        bubble.style.top = randomValue(0,500) + 500 + 'px'
        bubble.addEventListener('mouseover',(e)=>{
            game.score+=10
            game.count++;
            scoreUpdate()
            bubble.remove()
            if((game.ready-game.count)==0){
                message.innerHTML = "Game Over"
                cancelAnimationFrame(game.ani)
                startBtn.style.display = "block"
                startBtn.innerHTML = "Play Again"
                startBtn.backgroundColor ="red"
                errorSound.play()
            }
        })
    }
    
function mover(){
    if(game.bad>0){
        badBubble()
        game.bad--
    }
    if(game.ready < game.total){
        console.log(game);
        game.ready++;
        createBubble()
    }
    const allBad = document.querySelectorAll('.bad');
    allBad.forEach((bubble)=>{
        const pos = [bubble.offsetLeft,bubble.offsetTop]
        const speed = bubble.speed;
        pos[1]-=speed;
        if(pos[1]<-100){
            bubble.remove()
            game.score--;
            createBubble()
            scoreUpdate()
    }
    bubble.style.top = pos[1]+'px'
    bubble.style.left = pos[0]+'px'
})
    const allBubble = document.querySelectorAll('.bubble');
    allBubble.forEach((bubble)=>{
        const pos = [bubble.offsetLeft,bubble.offsetTop]
        const speed = bubble.speed;
        pos[1]-=speed;
        if(pos[1]<-100){
            bubble.remove()
            badBubble()
        }
        bubble.style.top = pos[1] + 'px'
        bubble.style.left = pos[0] + 'px'
    })
    game.ani = requestAnimationFrame(mover)
}
function randomValue(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

function scoreUpdate(){
    scoreBoard.innerHTML = `Your Score : ${game.score}`
    message.innerHTML = `Bubble Left : ${game.ready-game.count}`;
}