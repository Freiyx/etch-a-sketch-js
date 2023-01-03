const gridContainer = document.querySelector('#grid')
gridContainer.style.display = 'grid'

const selectedColor = document.querySelector('#set-color')

const toggleGridBtn = document.querySelector('#toggle-grid')

const eraserBtn = document.querySelector('#eraser-mode')
let eraserMode = false


window.addEventListener('load', function(){
    createGrid(16)
})

function setGrid(){

    while (true) {

        const getGridSize = prompt("Enter the number of boxes on each side (Max: 100)")
        
        if (getGridSize === null){
            return
        }
        else if ((typeof parseInt(getGridSize) == 'number' && getGridSize < 101) && getGridSize !== '') {
            while (gridContainer.firstChild){
                gridContainer.removeChild(gridContainer.firstChild)
            }
            createGrid(getGridSize)
            break;
        }else{
            alert('enter a number below 100')
        }
      
      }

}

let colorVal = '#000000';

selectedColor.addEventListener('input', function(){
        colorVal = selectedColor.value
    })

function createGrid(sideBoxes){
    let mousedown = false

    gridContainer.addEventListener('mousedown', function(){
        mousedown = !mousedown    
    })

    gridContainer.addEventListener('mouseup', function(){
        if (mousedown){
            mousedown = !mousedown
        }
    })
    
    gridContainer.addEventListener('mouseleave', function(){
        if (mousedown){
            mousedown = !mousedown
        }
    })

    for (i=0; i<Math.pow(sideBoxes,2); i++){
        const box = document.createElement('div')
        box.setAttribute('class', 'box')
        box.classList.add('box-border')

        gridContainer.appendChild(box)

        box.addEventListener('mouseover', function(){
            box.classList.add('hover')
        })
        box.addEventListener('mouseout', function(){
            box.classList.remove('hover')
        })

        box.addEventListener('mousemove', function(e){
            e.preventDefault();
            if (mousedown){
                    box.style.backgroundColor = colorVal
                }
        
        })

        box.addEventListener('click', function(){
            box.style.backgroundColor = colorVal
        })

    }
        gridContainer.style.setProperty('grid-template-columns', `repeat(${sideBoxes}, auto)`)
        eraserMode = false
        setEraserText(eraserMode)

}
 

function clearGrid(){
    const boxes = document.querySelectorAll('.box')
    boxes.forEach((box)=>{
        box.removeAttribute('style')
    })
}

toggleGridBtn.addEventListener('click', function(){
    const boxes = document.querySelectorAll('.box')
    boxes.forEach((box)=>{
        box.classList.toggle('box-border')
    })

})

eraserBtn.addEventListener('click', function(){
    eraserMode = !eraserMode
    const boxes = document.querySelectorAll('.box')
    
    let mousedown = false
    gridContainer.addEventListener('mousedown', function(){

        mousedown = !mousedown
        
    })

    gridContainer.addEventListener('mouseup', function(){
        if (mousedown){
            mousedown = !mousedown
        }
    })
    
    gridContainer.addEventListener('mouseleave', function(){
        if (mousedown){
            mousedown = !mousedown
        }
    })

    boxes.forEach((box)=>{
        if (eraserMode){
            box.addEventListener('mousemove', function(e){
                e.preventDefault();
                if (mousedown){
                    box.removeAttribute('style')
            
                    }
            
            })

            box.addEventListener('click', function(){
                box.removeAttribute('style')
            })

            eraserBtn.textContent = "Eraser Mode: On"

        }else{
            box.addEventListener('mousemove', function(e){
                e.preventDefault();
                if (mousedown){
                        box.style.backgroundColor = colorVal
                    }
            
            })
            
            box.addEventListener('click', function(){
                box.style.backgroundColor = colorVal
            })
            
            eraserBtn.textContent = "Eraser Mode: Off"
        }
    })
    
    setEraserText(eraserMode)
})

function fill(){
    const boxes = document.querySelectorAll('.box')
    boxes.forEach((box)=>{
        box.style.backgroundColor = colorVal
    })
}

function setEraserText(eraserMode){
    if (eraserMode){
        eraserBtn.textContent = "Eraser Mode: On"
    }else{
        eraserBtn.textContent = "Eraser Mode: Off"
    }
}