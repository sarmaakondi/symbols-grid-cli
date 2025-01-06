#!/usr/bin/env node
"use strict";

const { Command } = require("commander");
const simpleGit = require("simple-git");
const fs = require("fs");
const path = require("path");

const program = new Command();
const git = simpleGit();

const TEMPLATE_REPO = "https://github.com/symbo-ls/starter-kit.git";

program
    .name("symbols-grid-cli")
    .description("CLI to manage Symbols starter kit")
    .version("1.0.0");

program
    .command("init [targetDir]")
    .description("Clone the Symbols starter kit repository")
    .action(async (targetDir = ".") => {
        const targetPath = path.resolve(process.cwd(), targetDir);

        try {
            if (
                fs.existsSync(targetPath) &&
                fs.readdirSync(targetPath).length > 0
            ) {
                console.error(
                    `Error: Target directory (${targetPath}) is not empty.`
                );
                return;
            }

            console.log(`Cloning repository into: ${targetPath}`);
            await git.clone(TEMPLATE_REPO, targetPath);
            console.log("Repository cloned successfully!");
        } catch (error) {
            console.error("Error cloning repository:", error.message);
        }
    });

program
    .command("create [targetDir]")
    .description("Create GridSelectionComponent")
    .action((targetDir = "./src") => {
        // Define source paths for components.js and pages.js within the CLI
        const componentsSource = path.resolve(
            __dirname,
            "cli-files",
            "components.js"
        );
        const pagesSource = path.resolve(__dirname, "cli-files", "pages.js");

        // Define target paths where the files should be replaced
        const componentsTarget = path.resolve(
            process.cwd(),
            targetDir,
            "components.js"
        );
        const pagesTarget = path.resolve(process.cwd(), targetDir, "pages.js");

        try {
            if (fs.existsSync(componentsTarget)) {
                console.log(`Updating components.js in ${targetDir}...`);
                fs.copyFileSync(componentsSource, componentsTarget);
                console.log("components.js updated successfully!");
            } else {
                console.error(`Error: components.js not found in ${targetDir}`);
            }

            if (fs.existsSync(pagesTarget)) {
                console.log(`Updating pages.js in ${targetDir}...`);
                fs.copyFileSync(pagesSource, pagesTarget);
                console.log("pages.js updated successfully!");
            } else {
                console.error(`Error: pages.js not found in ${targetDir}`);
            }
        } catch (error) {
            console.error("Error replacing files:", error.message);
        }
    });

program.parse(process.argv);
