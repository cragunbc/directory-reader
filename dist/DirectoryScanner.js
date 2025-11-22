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
const fs = __importStar(require("fs/promises")); // Imports everything from fs
const path = __importStar(require("path")); // Imports everything from path
console.log("\nWelcome to the File Directory Application!"); // Prints a welcome message in the terminal
class Scanner {
    // Class Constructor
    constructor(directory) {
        this.fileResults = []; // Defines the fileResults property as a list of strings
        this.directoryResults = []; // Defines the directoryResults property as a list of strings
        this.recursiveFiles = []; // Defines the recursiveFiles property as a list of strings
        this.recursiveDirectories = []; // Defines the recursiveDirectories property as a list of strings
        this.directory = directory; // Instantiates the directory for use in the project
    }
    async main() {
        try {
            const currentDir = this.directory; // Sets the currentDir equal to the directory that's passed in from the constructor
            const items = await fs.readdir(currentDir); // Stores the items from the current directory in the items variable
            console.log(`\nYour current directory is: ${this.directory}\n`); // Prints a message in the terminal telling the user their current directory
            console.log("--------------------"); // Prints a divider line
            console.log("Your results are printed below!"); // Prints a message saying the results are below
            console.log("--------------------"); // Prints another divider line
            for (const item of items) { // Defines a for loop to loop through each item in the items variable
                const itemPath = path.join(currentDir, item); // Joins together the current directory and the item it's looping over
                const stats = await fs.stat(itemPath); // Gets the stats of the itemPath and stores it in a stats variable
                if (stats.isDirectory()) { // Checks to see if the stats variable is equal to a directory
                    this.directoryResults.push(item); // If so the item is pushed into the directoryResults array
                }
                else { // Otherwise if the stats variable is equal to a file
                    this.fileResults.push(item); // It's pushed to the fileResults string array
                }
            }
        }
        catch (error) { // Defines a catch block that catches any error that comes from the try block
            console.error(`There was and error while reading the following directory: ${this.directory}`); // Prints a message with the error message
        }
    }
    async printDirectoryResults() {
        console.log("\nDirectories at root level:"); // Prints the word Directories to the terminal
        console.log("--------------------"); // Prints a divider line
        for (const directory of this.directoryResults) { // Loops through each item in the directoryResults array
            console.log(`[Directory] ${directory}`); // Prints out each item from the directoryResults array, and specifies that it's a directory
        }
    }
    async printFileResults() {
        console.log("\nFiles at root level:"); // Prints the word Files to the terminal
        console.log("--------------------"); // Prints a divider line
        for (const file of this.fileResults) { // Loops through each item in the fileResults array
            console.log(`[File] ${file}`); // Prints out each item from the fileResults array, and specifies that it's a file
        }
    }
    async printStats() {
        console.log("\nRoot Directory Statistics:"); // Prints the word Statistics to the terminal
        console.log("--------------------"); // Prints a divider line
        console.log(`Number of Directories at root level: ${this.directoryResults.length}`); // Prints to the terminal the number of directories that were found
        console.log(`Number of Files at root level: ${this.fileResults.length}`); // Prints to the terminal the number of files that were found
    }
    async printRecursiveInfo() {
        console.log("\nRecursive Results:"); // Prints the words "Recursive Results"
        console.log("--------------------"); // Prints a divider line
    }
    async printRecursiveStats() {
        console.log("\nRecursive Statistics:"); // Prints the words "Recursive Statistics"
        console.log("--------------------"); // Prints a divider line
        console.log(`Number of directories: ${this.recursiveDirectories.length}`); // Prints the number of directories that come from the recursive function
        console.log(`Number of files: ${this.recursiveFiles.length}`); // Prints the number of files that comes from the recursive function
    }
    async scanRecursively(currentDirectory, maxDepth, currentDepth) {
        try {
            if (currentDepth > maxDepth) { // Checks to see if the depth of how many files deep you want to go is greater then 2
                return; // If so then we return and don't continue execution
            }
            const items = await fs.readdir(currentDirectory); // Defines a variable to read the contents of the directory
            for (const item of items) { // Defines a for loop to go through each item
                const itemPath = path.join(currentDirectory, item); // Joins the current directory path with the current file
                const stat = await fs.stat(itemPath); // Defines a variable to say if the file is a file or a directory
                if (stat.isDirectory()) { // If stat is equal to a directory
                    console.log(`${"  ".repeat(currentDepth)}[Directory 📁] ${item}`); // We print on the screen empty spaces for however much the depth is and the directory
                    this.recursiveDirectories.push(item); // Pushes the name of the directory to the list
                    await this.scanRecursively(itemPath, maxDepth, currentDepth + 1); // Calls the function again to go through the contents of the directory
                }
                else { // Otherwise if the content is a file
                    console.log(`${"  ".repeat(currentDepth)}[File 📄] ${item} - ${stat.size} bytes`); // Spaces are printed to the terminal and the name of the file is also printed
                    this.recursiveFiles.push(item); // Pushes the name of the file to the list
                }
            }
        }
        catch (error) { // Defines a catch block that catches the error that comes from the try block
            console.error(`There was an error reading the following directory: ${currentDirectory}`); // Prints a message with the error
        }
    }
}
async function runScanner() {
    const scanner = new Scanner(path.join(__dirname, "..")); // Defines a new instance of the Scanner class and passes in the directory path
    await scanner.main(); // Awaits the main function from the scanner
    await scanner.printDirectoryResults(); // Awaits the printDirectoryResults from the scanner
    await scanner.printFileResults(); // Awaits the printFileResults from the scanner
    await scanner.printStats(); // Awaits the printStats from the scanner
    await scanner.printRecursiveInfo(); // Awaits the printRecursiveInfo from the scanner
    await scanner.scanRecursively(scanner.directory, 1, 0); // Awaits the scanRecursively from the scanner with the current directory
    await scanner.printRecursiveStats(); // Awaits the printRecursiveStats from the scanner
}
runScanner(); // Runs the runScanner function that was created so that results are printed to the terminal
//# sourceMappingURL=DirectoryScanner.js.map