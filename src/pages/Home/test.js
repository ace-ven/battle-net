const fs = require('browserify-fs');

const jsTXT = `class Character extends Obj {
    constructor() {
      super()
      this.dest = new PIXI.Point(0, 0)
    }
  
    onFrame(dt) {
      let distance = this.distance(this.dest).len
      if (distance < this.width / 1.5) {
        return
      }
      let vel = distance * dt / 15
      if (vel > this.velocity) {
        vel = this.velocity
      }
      this.rotate(dt)
      this.x += vel * Math.cos(this.rotation)
      this.y += vel * Math.sin(this.rotation)
    }
    rotate(dt) {

      }
    }
  
  }`

const write = async () => {
    return new Promise((resolve, reject) => {
        fs.mkdir(`${__dirname}/home`, function () {
            fs.writeFile(`${__dirname}/home/hello-world.txt`, `${jsTXT}`, function () {
                resolve('file was saved');
            });
        });
    })
}

const read = async () => {
    return new Promise((resolve, reject) => {
        fs.readFile(`${__dirname}/home/hello-world.txt`, "utf-8", function (
            err,
            data
        ) {
            if (err) {
                console.log(err);
            }
            console.log("----", data);
            resolve(data);
        });
    })
}



module.exports = { write, read };