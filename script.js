//Creating Grid
let cntnr = document.querySelector('#sketch-cntnr');
let initialSize = 16;
let colorSelect = 1;
let store = [];
createGrid(initialSize);
let allGrid = document.querySelectorAll('[data-index]');

function createGrid(rawSize) {
    let size = rawSize ** 2;
    cntnr.innerHTML = '';
    store = [];
    for (let i = 0 ; i < size ; i++) {
        let child = document.createElement('div');
        child.setAttribute("data-index", i);
        store.push(100);
        
        cntnr.appendChild(child);
    }
    cntnr.style.gridTemplateColumns = `repeat(${rawSize}, 1fr)`;
}

//Changing Size of Grid
let changeSize = document.querySelector('#grid-slider');
let value = document.querySelector('#grid-size');

changeSize.addEventListener('input', () => {
    let newSize = changeSize.value;
    value.textContent = newSize;
    createGrid(newSize);
    
    allGrid = document.querySelectorAll('[data-index]');
    (toggleBorderCounter == 0) ? toggleBorderOff() : toggleBorderOn();
    toggleHoverListener(toggleHoverCounter);
});

//Toggling border
let toggleBorder = document.querySelector('#border-toggle');
let toggleBorderCounter = 0;

toggleBorder.addEventListener('click', toggleBorderCheck);
function toggleBorderCheck() {
    if(toggleBorderCounter == 0) {
        toggleBorder.classList.toggle('toggle-on');
        toggleBorderCounter++;
        toggleBorderOn();
    } else if(toggleBorderCounter == 1) {
        toggleBorder.classList.toggle('toggle-on');
        toggleBorderCounter--;
        toggleBorderOff();
    }
}

function toggleBorderOn() {
    allGrid.forEach((grid) => {
        grid.style.borderRight = '1px solid black';
        grid.style.borderBottom = '1px solid black';
    });
    cntnr.style.borderRight = '0';
    cntnr.style.borderBottom = '0';
}
function toggleBorderOff() {
    allGrid.forEach((grid) => {
        grid.style.borderRight = '0';
        grid.style.borderBottom = '0';
    });
    cntnr.style.border = '1px solid black';
}

//Reset Grid
let toggleReset = document.querySelector('#reset-toggle');

toggleReset.addEventListener('click', resetGrid);

function resetGrid() {
    allGrid.forEach((grid) => {
        grid.style.backgroundColor = 'white';
    });
}

//hover and click
let toggleHover = document.querySelector('#hover-toggle');
let toggleHoverCounter = 0;
toggleHoverListener(toggleHoverCounter);

toggleHover.addEventListener('click', () => {
    if (toggleHoverCounter == 0) {
        toggleHover.classList.toggle('toggle-on');
        toggleHoverCounter++;
        toggleHoverListener(toggleHoverCounter);
    } else if (toggleHoverCounter == 1) {
        toggleHover.classList.toggle('toggle-on');
        toggleHoverCounter--;
        toggleHoverListener(toggleHoverCounter);
    }
});
function toggleHoverListener(toggle) {
    allGrid = document.querySelectorAll('[data-index]');
    if (toggle == 0) {
        allGrid.forEach((grid) => {
            grid.removeEventListener('mousedown', downListener);
	        window.removeEventListener('mouseup', removeListener);
            grid.addEventListener('mouseover', hoverListener);
        });
    } else if (toggle == 1) {
        allGrid.forEach((grid) => {
            grid.removeEventListener('mouseover', hoverListener);
	        grid.addEventListener('mousedown', downListener);
    	    window.addEventListener('mouseup', removeListener);
        });
    }
}

function hoverListener() {
    if(colorSelect == 1) {
        this.style.backgroundColor = 'hsl(0, 0%, 0%)';
    } else if(colorSelect == 2) {
        let index = this.dataset.index;
        if(store[index] != 0) {
            store[index] -= 10;
        }
        this.style.backgroundColor = `hsl(0, 0%, ${store[index]}%)`;
    } else if(colorSelect == 3) {
        let hue = Math.floor(Math.random() * 360);
        let sat = Math.floor(Math.random() * 101);
        let light = Math.floor(Math.random() * 101);
        this.style.backgroundColor = `hsl(${hue}, ${sat}%, ${light}%)`;
    }
}
function downListener(e) {
    e.preventDefault();
    if(colorSelect == 1) {
        this.style.backgroundColor = 'hsl(0, 0%, 0%)';
    } else if(colorSelect == 2) {
        let index = this.dataset.index;
        if(store[index] != 0) {
            store[index] -= 10;
        }
        this.style.backgroundColor = `hsl(0, 0%, ${store[index]}%)`;
    } else if(colorSelect == 3) {
        let hue = Math.floor(Math.random() * 360);
        let sat = Math.floor(Math.random() * 101);
        let light = Math.floor(Math.random() * 101);
        this.style.backgroundColor = `hsl(${hue}, ${sat}%, ${light}%)`;
    }
    allGrid.forEach((grid) => {
        grid.addEventListener('mouseover', hoverListener);
    });
}
function removeListener() {
    allGrid.forEach((grid) => {
        grid.removeEventListener('mouseover', hoverListener);
    });
}


//changing color
let colorOption = document.querySelectorAll('#color-selection-cntnr button');
let colorSelectOption = 1;

colorOption.forEach((color) => {
    color.addEventListener('click', () => {
        if (color.dataset.option == "black" && colorSelectOption != 1) {
            color.classList.toggle('toggle-on');
            colorSelectOption = 1;
            colorOption[1].classList.remove('toggle-on');
            colorOption[2].classList.remove('toggle-on');
            resetGrid();
            colorSelect = 1;
        } else if (color.dataset.option == "gradual" && colorSelectOption != 2) {
            color.classList.toggle('toggle-on');
            colorSelectOption = 2;
            colorOption[0].classList.remove('toggle-on');
            colorOption[2].classList.remove('toggle-on');
            resetGrid();
            colorSelect = 2;
        } else if (color.dataset.option == "random" && colorSelectOption != 3) {
            color.classList.toggle('toggle-on');
            colorSelectOption = 3;
            colorOption[0].classList.remove('toggle-on');
            colorOption[1].classList.remove('toggle-on');
            resetGrid();
            colorSelect = 3;
        }
    });
});