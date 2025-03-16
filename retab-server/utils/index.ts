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


