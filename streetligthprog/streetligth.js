class Streetlight {
    static idCounter = 0;
    static ligthcolors = ['red', 'yellow', 'green', 'white']
    constructor(container) {
        this.red = 0
        this.yellow = 3
        this.green = 3
        this.state = 0
        this.container = container
        this.id = `streetlight-${++Streetlight.idCounter}`
        this.show()
        //this.activate()
    }


    activate(s) {
        switch (s) {
            case 0:
                this.red = 0
                this.yellow = 3
                this.green = 3
                this.state = s
                break;
            case 1:
                this.red = 3
                this.yellow = 1
                this.green = 3
                this.state = s
                break;
            case 2:
                this.red = 3
                this.yellow = 3
                this.green = 2
                this.state = s
                break;
            default:
                this.state = -1
                this.red = 3
                this.yellow = 3
                this.green = 3
                break;
        }
        this.changecolors()
    }


    activateTest() {
        setInterval(() => {
            switch (this.state) {
                case 0:
                    this.red = 0
                    this.yellow = 3
                    this.green = 3
                    this.state++
                    break;
                case 1:
                    this.red = 3
                    this.yellow = 1
                    this.green = 3
                    this.state++
                    break;
                case 2:
                    this.red = 3
                    this.yellow = 3
                    this.green = 2
                    this.state++
                    break;
                default:
                    this.state = 0
                    break;
            }
            this.changecolors()
        }, 1000)
    }
    show() {

        const streetlightDiv = document.createElement("div");
        streetlightDiv.classList.add("streetlight");
        streetlightDiv.id = this.id 
        streetlightDiv.draggable = true
        streetlightDiv.addEventListener("dragstart", function(event) {
            event.dataTransfer.setData("text/plain", event.target.id);
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.dropEffect = "move";
            var initialX = event.clientX;
            var initialY = event.clientY;
            event.dataTransfer.setData("initialX", initialX);
            event.dataTransfer.setData("initialY", initialY);
          });
        

        const rectangleDiv = document.createElement("div");
        rectangleDiv.classList.add("rectangle");


        const circleDivRed = document.createElement("div");
        circleDivRed.id = this.id + '_red'
        circleDivRed.classList.add("circle");
        rectangleDiv.appendChild(circleDivRed);


        const circleDivYellow = document.createElement("div");
        circleDivYellow.id = this.id + '_yellow'
        circleDivYellow.classList.add("circle");
        rectangleDiv.appendChild(circleDivYellow);


        const circleDivGreen = document.createElement("div");
        circleDivGreen.id = this.id + '_green'
        circleDivGreen.classList.add("circle");
        rectangleDiv.appendChild(circleDivGreen);

        streetlightDiv.appendChild(rectangleDiv);
        this.container.appendChild(streetlightDiv);
    }
    changecolors() {
        document.getElementById(this.id + '_red').style.backgroundColor = Streetlight.ligthcolors[this.red]
        document.getElementById(this.id + '_yellow').style.backgroundColor = Streetlight.ligthcolors[this.yellow]
        document.getElementById(this.id + '_green').style.backgroundColor = Streetlight.ligthcolors[this.green]
    }
}


