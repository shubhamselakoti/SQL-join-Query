const tableA = document.getElementById('table_a');
const tableB = document.getElementById('table_b');
const intersection = document.getElementById('intersection');
const leftCircle = document.getElementById('leftCircle');
const rightCircle = document.getElementById('rightCircle');
const intersectOfCircle = document.getElementById('intersectOfCircle');
const outputArea = document.querySelector('.outputArea');
const copyButton = document.getElementById('copy');

const checkboxes = document.querySelectorAll('input[type="checkbox"]');

const checkedColor = '#047857';
const uncheckedColor = '#3a3a3a';

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {        
        if(tableA.checked){
            leftCircle.style.fill = checkedColor;
        }
        if(!tableA.checked){
            leftCircle.style.fill = uncheckedColor;
        }

        if(tableB.checked){
            rightCircle.style.fill = checkedColor;
        }
        if(!tableB.checked){
            rightCircle.style.fill = uncheckedColor;
        }

        if(intersection.checked){
            intersectOfCircle.style.fill = checkedColor;
        }
        if(!intersection.checked){
            intersectOfCircle.style.fill = uncheckedColor;
        }

        updateOutput();

    });
});

leftCircle.onclick = () => {
    tableA.checked = !tableA.checked;
    tableA.dispatchEvent(new Event('change'));
}
rightCircle.onclick = () => {
    tableB.checked = !tableB.checked;
    tableB.dispatchEvent(new Event('change'));
} 
intersectOfCircle.onclick = () => {
    intersection.checked = !intersection.checked;
    intersection.dispatchEvent(new Event('change'));
}


copyButton.onclick = () => {
    navigator.clipboard.writeText(outputArea.textContent);
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
        copyButton.textContent = 'Copy';
    }, 1000);
}


function updateOutput() {
    if (tableA.checked && tableB.checked && intersection.checked) {
        outputArea.textContent = `SELECT * FROM TableA A
OUTER JOIN TableB B ON
A.key = B.key;`;
    } else if (tableA.checked && tableB.checked) {
        outputArea.textContent = `SELECT * FROM TableA A
FULL OUTER JOIN TableB B ON
A.key = B.key
WHERE A.key IS NULL OR B.key IS NULL;`;
    } else if (tableA.checked && intersection.checked) {
        outputArea.textContent = `SELECT * FROM TableA A
LEFT JOIN TableB B ON
A.key = B.key;`;
    } else if (tableB.checked && intersection.checked) {
        outputArea.textContent = `SELECT * FROM TableB B
RIGHT JOIN TableA A ON
A.key = B.key;`;
    } else if (tableA.checked) {
        outputArea.textContent = `SELECT * FROM TableA A
LEFT JOIN TableB B ON
A.key = B.key
WHERE B.key IS NULL;`;
    } else if (tableB.checked) {
        outputArea.textContent = `SELECT * FROM TableB B
RIGHT JOIN TableA A ON
A.key = B.key
WHERE A.key IS NULL;`;
    } else if (intersection.checked) {
        outputArea.textContent = `SELECT * FROM TableA A
INNER JOIN TableB B ON
A.key = B.key;`;
    } else {
        outputArea.textContent = `          zzz
|\\_._/|  zz
( -.- ) z
>  ^  <
`;
    }
}

updateOutput();