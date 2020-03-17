var canvas;
var graphic;
var tree;
var draw_index;
var color_machine;
var rotate_angle;
var branches;
const PI = 3.14159;
const DEF_DIR = -90 - 45;
//works only for square grids currently
let canvas_width = 4800;
let canvas_height = 4800;
let canvas_radius = canvas_width / 2; 
let tree_origin = {
    x: -.5,
    y: .5,
};
let even_scale = 1.1
let odd_scale = 1
let branch_count = 100000;
let branch_step = 25;
let branch_rotation = 0.1;
let branch_width = 2;
let current_angle = DEF_DIR;
function setup() {
    draw_index = 1
    rotate_angle = 0
    tree = new CollatzTree()
    branches = tree.CalculateTree(branch_count)
    console.log('branches->',branches)
    canvas = createCanvas(canvas_width, canvas_height)
    canvas.parent('display')
    canvas.background('lightgrey')
    graphic = createGraphics(canvas_width, canvas_height)
    graphic.angleMode(DEGREES)
    graphic.translate(canvas_width / 2, canvas_height / 2)
    graphic.frameRate(32)
}
let index = 0;
function draw() {
    graphic.strokeWeight(branch_width)
    graphic.fill(branch_width);
    graphic.stroke('black')
    let x = canvas_radius * tree_origin.x
    let y = canvas_radius * tree_origin.y
    branches[index].forEach((b)=>{
        graphic.point(x,y)
        let x1 = x + branch_step * Math.cos(current_angle);
        let y1 = y + branch_step * Math.sin(current_angle);
        graphic.line(x,y,x1,y1)
        x = x1;
        y = y1;
        if(b % 2 == 0){
            current_angle += (branch_rotation * even_scale)
        }else{
            current_angle -= (branch_rotation * odd_scale)
        }
    })
    current_angle = DEF_DIR;
    index = (index + 1) % branch_count;
    image(graphic, 0, 0)
}

function mouseClicked(event) {

}

var saveImage = () => {
    console.log('saving image')
    let imageName = prompt("Please Enter an Image Name");
    console.log('image name', imageName)
    save(graphic, imageName, 'png')
}