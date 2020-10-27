

export function aiChoice (){
    return Math.floor( Math.random() * ( 2 - 0 + 1 )+ 0 );
}

export function userMove (element){
    element.addEventListener("click", function() {
      this.getAttribute("data-choice")
})
}
