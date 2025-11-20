"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
console.log("\nWelcome to the File Directory Application!");
class Scanner {
    constructor(directory) {
        this.fileResults = [];
        this.directoryResults = [];
        this.directory = directory;
    }
    async main() {
        const currentDir = this.directory;
        const items = await fs.readdir(currentDir);
        console.log(`\nYour current directory is: ${this.directory}\n`);
        console.log("--------------------");
        console.log("Your results are printed below!");
        console.log("--------------------");
        for (const item of items) {
            const itemPath = path.join(currentDir, item);
            const stats = await fs.stat(itemPath);
            if (stats.isDirectory()) {
                this.directoryResults.push(item);
            }
            else {
                this.fileResults.push(item);
            }
        }
    }
    async printDirectoryResults() {
        console.log("\nDirectories:");
        console.log("--------------------");
        for (const directory of this.directoryResults) {
            console.log(`[Directory] ${directory}`);
        }
    }
    async printFileResults() {
        console.log("\nFiles:");
        console.log("--------------------");
        for (const file of this.fileResults) {
            console.log(`[File] ${file}`);
        }
    }
    async printStats() {
        console.log("\nStatistics:");
        console.log("--------------------");
        console.log(`Number of Directories: ${this.directoryResults.length}`);
        console.log(`Number of Files: ${this.fileResults.length}`);
    }
}
async function runScanner() {
    const scanner = new Scanner(path.join(__dirname, ".."));
    await scanner.main();
    await scanner.printDirectoryResults();
    await scanner.printFileResults();
    await scanner.printStats();
}
runScanner();
//# sourceMappingURL=DirectoryScanner.js.map