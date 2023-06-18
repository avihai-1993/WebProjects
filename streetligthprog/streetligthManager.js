/*
const plan = {
    states: [
        {ligthsConfig : [0, 2, 0, 2] , timebetween_RY_seconds : 13,timebetween_LC_Iseconds:15}
        ,{ligthsConfig : [2, 0, 2, 0] , timebetween_RY_seconds : 13,timebetween_LC_Iseconds:15}]
    
0 = go to red 
2 = go to green 

states need to be in senqunse and manager will cycel throut 

}*/ 

class StreetLightManager {
    constructor(streetlights = [] ,planConfig = {}) {
      this.streetlights = streetlights
      this.states = [...planConfig.states ]
      this.state = 0
      this.activate()
    }
  

    activate(){
        this.stateChanger()
        setInterval(() => {
            this.stateChanger()
        },this.states[this.state].timebetween_LC_Iseconds*1000)
    }

    stateChanger(){
        if (this.state >= this.states.length){
            this.state = 0
        }
        this.states[this.state].ligthsConfig.forEach((elm,i) => {
            if (elm == 0 ){
                setTimeout(()=> {
                    this.streetlights[i].activate(elm+1)
                },this.states[this.state].timebetween_RY_seconds*1000)
            }
            this.streetlights[i].activate(elm)
        })
        this.state++
    }

  }
  