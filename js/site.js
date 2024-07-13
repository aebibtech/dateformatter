const separators = ['/', '-', ' '];

function makeTextFile(text) {
    if (text !== null && text !== "") {
        const data = new Blob([text], { type: 'text/plain' });
        return window.URL.createObjectURL(data);
    }
    return "javascript:;";
}

function getDateStrings(element) {
    const dates = element.value.split('\n');
    const separator = Number(document.querySelector('#separator').value);
    const newDates = dates.map(x => x.replace(/\d{1,2}:\d{2}\s?(|A|P)M/i, "").replace(/\//g, separators[separator]).trim()).join('\n');
    return newDates;
}

document.addEventListener('DOMContentLoaded', () => {
    const separatorOptions = separators.map((sep, index) => {
        const element = document.createElement('option');
        element.value = index;
        element.innerText = sep == " " ? 'space' : sep;
        return element;
    });

    separatorOptions.forEach(sep => {
        document.querySelector('#separator').appendChild(sep);
    });
});

document.querySelector('#copy').addEventListener('click', async e => {
    const newDates  = getDateStrings(document.querySelector('#datelist'));
    document.querySelector('#datelistResult').value = newDates;
    await navigator.clipboard.writeText(newDates);
    document.querySelector('#message').innerText = 'Copied to clipboard!';
    setTimeout(() => {
        document.querySelector('#message').innerText = '';
    }, 3000);
});

document.querySelector('#download').addEventListener('click', () => {
    const text = document.querySelector('#datelistResult').value;
    
    const link = document.createElement('a');
    link.setAttribute('download', 'dates.txt');
    link.href = makeTextFile(text);
    document.body.appendChild(link);

    window.requestAnimationFrame(function () {
        const event = new MouseEvent('click');
        link.dispatchEvent(event);
        document.body.removeChild(link);
    });
});