#!/usr/bin/env node
const program = require("commander");
const inquirer = require("inquirer");
const ora = require("ora");
const chalk = require("chalk");
const symbols = require("log-symbols");
const path = require("path");
// const download = require("download-git-repo");
// const handlebars = require("handlebars");
const fs = require("fs");
const templateTsx = require("./templateTsx.js");
const templateVueTs = require("./templateVueTs.js");
const templateVue = require("./templateVue.js");
const templateCss = require("./templateCss.js");
const templateModel = require("./templateModel.js");
const templateVueModel = require("./templateVueModel.js");
const templateService = require("./templateService.js");
const templateUrl = require("./templateUrl.js");
// 写入文件
function creatFile(name, arr, spinner) {
    fs.mkdir(name, { recursive: true }, (err) => {
        if (err) {
            throw err;
        } else {
            fs.readdir(name, () => {
                // 写入文件(文件不存在就创建,但不能创建目录)
                arr.map((item) => {
                    if (item.required) {
                        fs.writeFile(
                            `${name}/${item.fileName}`,
                            item.content,
                            "utf8",
                            function (error) {
                                if (error) {
                                    console.log(error, "模版解析出错");
                                    return false;
                                }
                                spinner.succeed();
                                console.log(
                                    symbols.success,
                                    chalk.green("文件创建成功")
                                );
                            }
                        );
                    }
                });
            });
        }
    });
}

function readFile(name, spinner, array) {
    let arr = array || path.resolve(process.cwd()).split("/");
    arr.pop();
    fs.readdir(path.resolve(arr.join("/")), function (err, files) {
        if (files.includes("tplconfig")) {
            console.log(arr.join("/"));
            writeFile(name, spinner, `${arr.join("/")}/tplconfig`);
        } else {
            readFile(name, spinner, arr);
        }
    });
}
function writeFile(name, spinner, src) {
    fs.readdir(path.resolve(src), function (err, files) {
        files.forEach((item) => {
            fs.readFile(`${src}/${item}`, "utf8", function (error, data) {
                fs.mkdir(name, { recursive: true }, (err) => {
                    fs.writeFile(
                        path.resolve(process.cwd(), `${name}/${item}`),
                        data,
                        "utf8",
                        function (error) {
                            if (error) {
                                console.log(error, "模版解析出错");
                                return false;
                            }
                            spinner.succeed();
                            console.log(
                                symbols.success,
                                chalk.green("文件创建成功")
                            );
                        }
                    );
                });
            });
        });
    });
}
// 读取本地模版文件
function readTpl(name, spinner) {
    readFile(name, spinner);
}
// 根据选择条件创建模版
function selectTpl(answers) {
    // if (answers.selectTpl === "default") {
    // } else {
    //   readTpl();
    // }
    let jsFileName = "tsx";
    let lessFileName = "less";
    let modelFileName = "ts";
    let servicesFileName = "ts";
    let urlFileName = "ts";
    let mainTpl = templateTsx;
    let mainModel = templateModel;

    if (answers.selectFrame === "vue") {
        jsFileName = "vue";
        modelFileName = "js";
        servicesFileName = "js";
        urlFileName = "js";
        mainTpl = templateVue;
        mainModel = templateVueModel;
    } else if (answers.selectFrame === "react") {
        jsFileName = "jsx";
        modelFileName = "js";
        servicesFileName = "js";
        urlFileName = "js";
    } else if (answers.selectFrame === "vue+ts") {
        jsFileName = "vue";
        modelFileName = "ts";
        servicesFileName = "ts";
        urlFileName = "ts";
        mainTpl = templateVueTs;
    }
    let arr = [
        {
            fileName: `${answers.jsFileName}.${jsFileName}`,
            content: mainTpl(),
            required: true,
        },
        {
            fileName: `${answers.lessFileName}.${lessFileName}`,
            content: templateCss(),
            required: true,
        },
        {
            fileName: `${answers.modelFileName}.${modelFileName}`,
            content: mainModel(),
            required: answers.hasModel,
        },
        {
            fileName: `${answers.servicesFileName}.${servicesFileName}`,
            content: templateService(),
            required: answers.hasServices,
        },
        {
            fileName: `${answers.urlFileName}.${urlFileName}`,
            content: templateUrl(),
            required: answers.hasUrl,
        },
    ];
    return arr;
}
program
    .version("1.0.0", "-v, --version")
    .command("creat <name>")
    .action((name) => {
        // 判断时候存在同名项目，以免产生覆盖
        if (!fs.existsSync(name)) {
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "selectTpl",
                        message: "选择使用框架",
                        choices: [
                            { name: "内部自带默认模版", value: "default" },
                            { name: "自己自定义模版", value: "custom" },
                        ],
                        default: "default",
                    },
                    {
                        type: "list",
                        name: "selectFrame",
                        message: "选择使用框架",
                        choices: [
                            { name: "vue", value: "vue" },
                            { name: "react", value: "jsx" },
                            { name: "react+ts", value: "tsx" },
                            // { name: "vue+ts", value: "tsvue" },
                        ],
                        default: "vue",
                        when: function (answers) {
                            return answers.selectTpl === "default";
                        },
                    },
                    {
                        type: "input",
                        name: "jsFileName",
                        message: "js文件名称",
                        default: "index",
                        when: function (answers) {
                            return answers.selectTpl === "default";
                        },
                    },
                    {
                        type: "input",
                        name: "lessFileName",
                        message: "less文件名称",
                        default: "index",
                        when: function (answers) {
                            return answers.selectTpl === "default";
                        },
                    },
                    {
                        type: "confirm", //在页面互动 输入
                        name: "hasModel",
                        message: "是否需要创建model",
                        default: "Yes",
                        when: function (answers) {
                            return answers.selectTpl === "default";
                        },
                    },
                    {
                        type: "input",
                        name: "modelFileName",
                        message: "model文件名称",
                        default: "model",
                        when: function (answers) {
                            return (
                                answers.hasModel &&
                                answers.selectTpl === "default"
                            );
                        },
                    },
                    {
                        type: "confirm", //在页面互动 输入
                        name: "hasServices",
                        message: "是否需要创建services",
                        default: "Yes",
                        when: function (answers) {
                            return answers.selectTpl === "default";
                        },
                    },
                    {
                        type: "input",
                        name: "servicesFileName",
                        message: "servicesl文件名称",
                        default: "services",
                        when: function (answers) {
                            return (
                                answers.hasServices &&
                                answers.selectTpl === "default"
                            );
                        },
                    },
                    {
                        type: "confirm", //在页面互动 输入
                        name: "hasUrl",
                        message: "是否需要创建url",
                        default: "Yes",
                        when: function (answers) {
                            return answers.selectTpl === "default";
                        },
                    },
                    {
                        type: "input",
                        name: "urlFileName",
                        message: "url文件名称",
                        default: "url",
                        when: function (answers) {
                            return (
                                answers.hasUrl &&
                                answers.selectTpl === "default"
                            );
                        },
                    },
                ])
                .then((answers) => {
                    // 开始下载
                    const spinner = ora("正在创建模板...");
                    spinner.start();
                    if (answers.selectTpl === "custom") {
                        readTpl(name, spinner);
                    } else {
                        const arr = selectTpl(answers);
                        creatFile(name, arr, spinner);
                    }
                });
        } else {
            console.log(symbols.error, chalk.red("项目已存在"));
        }
    });
program.parse(process.argv);
