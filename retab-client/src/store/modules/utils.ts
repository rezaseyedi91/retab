export function generateId(): string {

    const lettersCount = 6;
    const characters = [
        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
    ]
    let str = ''
    for (let i = 0; i < lettersCount; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        const randomNumber = String(Math.floor(Math.random()*10));
        str = str.concat(characters[randomIndex], randomNumber)
    }
    return str;
}

export function downloadJsonDataAsFile(json: any) {
    const str = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json))
    const anchorEl = document.createElement('a');
    document.body.appendChild(anchorEl);
    anchorEl.setAttribute('href', str);
    anchorEl.innerHTML = 'hey ther'
    anchorEl.setAttribute('download', 'temp.json');
    anchorEl.click();
    anchorEl.remove()
}