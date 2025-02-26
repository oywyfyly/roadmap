
document.getElementById(`node`).focus()

document.addEventListener('keydown', (e)=> {

    let divsBeforeActive = [...document.getElementById('main').children].indexOf(document.activeElement.parentElement);
    let mLeft = window.getComputedStyle(document.activeElement.parentElement).marginLeft || 0

    document.querySelectorAll('.expand').forEach(function(element) {
        element.addEventListener('input', function() {
            this.style.width = '6.05rem';  // Reset width to auto
            this.style.width = `${this.scrollWidth}px`;  // Set width to match content
        });
    });
    
    if (e.key === 'Tab') {
        e.preventDefault()

        let activeMargin = parseFloat(mLeft);
        let prevMargin = parseFloat(window.getComputedStyle(document.activeElement.parentElement.previousElementSibling)?.marginLeft || "0px");

        if (activeMargin - prevMargin < 100 && !e.shiftKey) {
            document.activeElement.parentElement.style.marginLeft = `${activeMargin + 100}px`;
        }
        else if (activeMargin > 0 && e.shiftKey) {
            document.activeElement.parentElement.style.marginLeft = `${Math.max(activeMargin - 100, 0)}px`;
        }
    }

    if (e.key === 'Enter') {
        newDiv = document.createElement('div')

        newDiv.classList.add('node-container');  // Add the class for styling

        newDiv.innerHTML = `
        
        <input id="node" placeholder="${divsBeforeActive}" class="expand">
        
        <svg width="200" height="45" xmlns="http://www.w3.org/2000/svg" id="svg1">
            <path
                d="M 30 -5 Q 35 45 110 40"
                stroke="#787878ff" stroke-width="5" fill="none" />
        </svg>`
        
        newDiv.style.marginLeft = mLeft
        newDiv.style.marginTop = `-18px`
        document.getElementById('main').insertBefore(newDiv, document.activeElement.parentElement.nextElementSibling);
        newDiv.querySelector('input').focus()

        updatePlaceholders();
    }

    if (e.key === 'Backspace' && e.shiftKey || e.key === 'Delete' && e.shiftKey) {
        document.activeElement.parentElement.previousElementSibling?.querySelector('input')?.focus()
        document.activeElement.parentElement.nextElementSibling?.remove()

        updatePlaceholders();
    }

    if (e.key === 'ArrowUp') {
        document.activeElement.parentElement.previousElementSibling?.querySelector('input')?.focus()
    }

    if (e.key === 'ArrowDown'){
        document.activeElement.parentElement.nextElementSibling?.querySelector('input')?.focus()
    }

    if (e.key === 'p' && e.ctrlKey){
        document.activeElement.style.backgroundColor = '#b41414ff';
        document.activeElement.parentElement.previousElementSibling?.querySelector('svg path')?.setAttribute('stroke', '#b41414ff');
    }

    if (e.key === 's' && e.ctrlKey){
        e.preventDefault()
        document.activeElement.style.backgroundColor = '#008c00ff';

        document.activeElement.parentElement.previousElementSibling?.querySelector('svg path')?.setAttribute('stroke', '#008c00');
    }

    if (e.key === 'n' && e.ctrlKey){
        e.preventDefault()
        document.activeElement.style.backgroundColor = '#787878ff';
        document.activeElement.parentElement.previousElementSibling?.querySelector('svg path')?.setAttribute('stroke', '#787878ff');
    }
});

function updatePlaceholders() {
    [...main.children].forEach((div, index) => {
        const input = div.querySelector('input');
        input.placeholder = index + 1;
    });
}