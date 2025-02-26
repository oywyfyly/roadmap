
document.getElementById(`node`).focus()

document.addEventListener('keydown', (e)=> {

    let divsBeforeActive = [...document.getElementById('main').children].indexOf(document.activeElement.parentElement);
    let mLeft = window.getComputedStyle(document.activeElement.parentElement).marginLeft || 0

    if (e.key === 'Tab') {
        e.preventDefault()

        let activeMargin = parseFloat(mLeft);
        let prevMargin = parseFloat(window.getComputedStyle(document.activeElement.parentElement.previousElementSibling)?.marginLeft || "0px");

        if (activeMargin - prevMargin < 60 && !e.shiftKey) {
        document.activeElement.parentElement.style.marginLeft = `${activeMargin + 60}px`;
        }
        else if (activeMargin > 0 && e.shiftKey) {
        document.activeElement.parentElement.style.marginLeft = `${Math.max(activeMargin - 60, 0)}px`;
        }
    }

    if (e.key === 'Enter') {
        newDiv = document.createElement('div')
        newDiv.innerHTML = `<input id="node" placeholder="${divsBeforeActive}">`
        newDiv.style.marginLeft = mLeft
        newDiv.style.marginTop = `10px`
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
});

function updatePlaceholders() {
    [...main.children].forEach((div, index) => {
        const input = div.querySelector('input');
        input.placeholder = index + 1;
    });
}