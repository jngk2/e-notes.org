import path from "path";
import {readdirSync, readFileSync, writeFileSync} from "fs";
import {getFrontmatter, parseFrontmatter} from "./frontmatter/frontmatter";

const buildMetaFile = (mdDir: string, outDir: string) => {
    const fileNames = readdirSync(mdDir)

    const meta = [];

    for (const file of fileNames) {

        let contents = readFileSync().toString()

        const frontmatter = getFrontmatter(contents)
        console.log('here!!')
        if (frontmatter) {
            console.log('here!!!')
            meta.push(parseFrontmatter(frontmatter))
            console.log('oop')
        }
    }
    console.log('here!!!!')

    writeFileSync(path.join(outDir, 'meta.json'), JSON.stringify(meta))
}

export {buildMetaFile}
