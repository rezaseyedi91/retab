import * as fs from 'fs';
import { getInstance as getVerovioToolkitInstance } from '../modules/mei-adapters/VerovioToolkitInstance'

export async function xmlToSvg(str: string) {

    const verovioToolkit = await getVerovioToolkitInstance();
    verovioToolkit.setOptions({
        adjustPageHeight: true,

    })
    if (!verovioToolkit) return 'no'
    verovioToolkit.loadData(str);
    const outputData = verovioToolkit.renderToSVG(1);
    return outputData
}


export function includeMeiTagChildrenRecursively(n = 1): any {
    if (n >= 20) return {
        include: { children: { orderBy: { indexAmongSiblings: 'asc' } }, attributes: true }
    }
    else return {
        include: { children: { ...includeMeiTagChildrenRecursively(n + 1), orderBy: { indexAmongSiblings: 'asc' } }, attributes: true }
    }
}


export const debug = {
    printStackTrace(full = false) {
        const obj = {} as any;
        Error.captureStackTrace(obj, this.printStackTrace)
        const s = obj.stack;
        let str: string | undefined;
        if (!full) {

            str = '==' + /at(.*)\n/.exec(s)?.[1]
        } else {
            str = '==' + s.replace('Error\n', '')
        }

        const relativePath = __dirname.replace('utils', '')
        const output = str?.replaceAll(relativePath, './').replaceAll('\\', '/').replace(/\:\d+$/, '')
            },
    timespanStarted: [false],
    initialTimestamp: [0],
    logFontColors: [
        // "\x1b[1m", //Bright
        // "\x1b[2m", //Dim
        // "\x1b[4m", //Underscore
        // "\x1b[5m", //Blink
        // "\x1b[7m", //Reverse
        // "\x1b[8m", //Hidden

        // "\x1b[30m", //FgBlack
        // "\x1b[31m", //FgRed
        "\x1b[32m", //FgGreen
        "\x1b[33m", //FgYellow
        "\x1b[34m", //FgBlue
        "\x1b[35m", //FgMagenta
        "\x1b[36m", //FgCyan
        // "\x1b[37m", //FgWhite
        // "\x1b[90m", //FgGray

        // "\x1b[40m", //BgBlack
        // "\x1b[41m", //BgRed
        // "\x1b[42m", //BgGreen
        // "\x1b[43m", //BgYellow
        // "\x1b[44m", //BgBlue
        // "\x1b[45m", //BgMagenta
        // "\x1b[46m", //BgCyan
        // "\x1b[47m", //BgWhite
        // "\x1b[100m", //BgGray
    ],
    getTimepan(serie = 0) {
        const colored = ( this.logFontColors[serie]  || this.logFontColors.at(-1)) + '%s\x1b[0m' 
        if (!this.timespanStarted[serie]) {
            this.initialTimestamp[serie] = Date.now();
            this.timespanStarted[serie] = true
                    } else {
                        this.timespanStarted[serie] = false
        }

    }
}



