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


export  function includeMeiTagChildrenRecursively(n = 1): any {
    if (n >= 20) return {
        include: { children: { orderBy: { indexAmongSiblings: 'asc' } }, attributes: true }
    }
    else return {
        include: { children: { ...includeMeiTagChildrenRecursively(n + 1), orderBy: { indexAmongSiblings: 'asc' } }, attributes: true }
    }
}

