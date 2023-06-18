
class Rectangle{
    constructor(x, y, width, height, color,id = 'n1') {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.id = id
    }
    
    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = 'black';
      ctx.font = '10px Arial';
      ctx.fillText(this.id ,this.x + this.width/2, this.y + this.height/2);
    }

    is_in_shape(x, y) {
        return ((x >= this.x) && (x < (this.x + this.width))) && ((y >= this.y) && (y < (this.y + this.height)));
    }
  }
  
  class Triangle {
    constructor(x1, y1, x2, y2, x3, y3, color,id ='n1') {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      this.x3 = x3;
      this.y3 = y3;
      this.color = color;
      this.x = (x1 + x2 + x3) / 3;
      this.y= (y1 + y2 + y3) / 3;
      this.distx_x1 = this.x - this.x1
      this.distx_x2 = this.x - this.x2
      this.distx_x3 = this.x - this.x3
      this.disty_y1 = this.y - this.y1
      this.disty_y2 = this.y - this.y2
      this.disty_y3 = this.y - this.y3
      this.id = id

    }
    
    draw(ctx) {
      ctx.fillStyle = this.color;
      this.x1 = this.x -this.distx_x1
      this.x2 = this.x -this.distx_x2
      this.x3 = this.x -this.distx_x3
      this.y1 = this.y - this.disty_y1
      this.y2 = this.y - this.disty_y2
      this.y3 = this.y - this.disty_y3
      ctx.beginPath();
      ctx.moveTo(this.x1, this.y1);
      ctx.lineTo(this.x2, this.y2);
      ctx.lineTo(this.x3, this.y3);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = 'black';
      ctx.font = '10px Arial';
      ctx.fillText(this.id , this.x, this.y);
    }

    is_in_shape(x, y) {
        // Compute the area of the triangle
        const area = Math.abs((this.x2 - this.x1) * (this.y3 - this.y1) - (this.x3 - this.x1) * (this.y2 - this.y1)) / 2;
        
        // Compute the areas of three sub-triangles
        const area1 = Math.abs((this.x1 - x) * (this.y2 - y) - (this.x2 - x) * (this.y1 - y)) / 2;
        const area2 = Math.abs((this.x2 - x) * (this.y3 - y) - (this.x3 - x) * (this.y2 - y)) / 2;
        const area3 = Math.abs((this.x3 - x) * (this.y1 - y) - (this.x1 - x) * (this.y3 - y)) / 2;
        
        // Check if the sum of the sub-triangle areas is equal to the triangle area
        return Math.abs(area1 + area2 + area3 - area) < 0.1;
      }
  }
  
  class Line {
    constructor(x1, y1, x2, y2, color, lineWidth,id) {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      this.color = color;
      this.lineWidth = lineWidth;
      this.x = (x1 + x2) / 2;
      this.y= (y1 + y2 ) / 2;
      this.distx_x1 = this.x - this.x1
      this.distx_x2 = this.x - this.x2
      this.disty_y1 = this.y - this.y1
      this.disty_y2 = this.y - this.y2
      this.id = id
    }
    
    draw(ctx) {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.lineWidth;
      this.x1 = this.x -this.distx_x1
      this.x2 = this.x -this.distx_x2
      this.y1 = this.y - this.disty_y1
      this.y2 = this.y - this.disty_y2
      ctx.beginPath();
      ctx.moveTo(this.x1, this.y1);
      ctx.lineTo(this.x2, this.y2);
      ctx.stroke();
    }
    is_in_shape(x, y) {

        return x >= this.x1 && x <= this.x2 && y >= this.y && y <= this.y + this.lineWidth;
    }

  }
  
  class Circle {
    constructor(x, y, radius, color,id='n1') {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.id = id
    }
    
    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = 'black';
      ctx.font = '10px Arial';
      ctx.fillText(this.id ,this.x, this.y);
    }
    is_in_shape(x, y) {
    const distance = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
    return distance <= this.radius;
    }
  }


  class Arrow {
    constructor(x1, y1, x2, y2, arrowWidth, arrowHeight, id='A1') {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      this.x = (x1 + x2) / 2;
      this.y= (y1 + y2 ) / 2;
      this.distx_x1 = this.x - this.x1
      this.distx_x2 = this.x - this.x2
      this.disty_y1 = this.y - this.y1
      this.disty_y2 = this.y - this.y2
      this.arrowWidth = arrowWidth;
      this.arrowHeight = arrowHeight;
      this.id = id;
    }
  
    is_in_shape(x, y) {

      return x >= this.x1 && x <= this.x2 && y >= this.y && y <= this.y + this.arrowWidth;
    }

    draw(ctx) {

      this.x1 = this.x -this.distx_x1
      this.x2 = this.x -this.distx_x2
      this.y1 = this.y - this.disty_y1
      this.y2 = this.y - this.disty_y2
      // Draw a line from the starting point to the ending point
      ctx.beginPath();
      ctx.moveTo(this.x1, this.y1);
      ctx.lineTo(this.x2, this.y2);
  
      // Calculate the angle of the line
      const angle = Math.atan2(this.y2 - this.y1, this.x2 - this.x1);
  
      // Draw the arrowhead
      ctx.moveTo(this.x2, this.y2);
      ctx.lineTo(this.x2 - this.arrowHeight * Math.cos(angle - Math.PI / 6), this.y2 - this.arrowHeight * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(this.x2 - this.arrowWidth * Math.cos(angle), this.y2 - this.arrowWidth * Math.sin(angle));
      ctx.lineTo(this.x2 - this.arrowHeight * Math.cos(angle + Math.PI / 6), this.y2 - this.arrowHeight * Math.sin(angle + Math.PI / 6));
      ctx.stroke();
    }
  }
  
  // Example usage
  //const canvas = document.getElementById("myCanvas");
  //const ctx = canvas.getContext("2d");
  //const arrow = new Arrow(50, 50, 150, 150, 10, 20, ctx);
  //arrow.draw();
  