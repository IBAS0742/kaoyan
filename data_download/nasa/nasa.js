const fs = require('fs');
const path = require('path');
const {
    exec
} = require('child_process');

let defaultConfig = {
    "extName": ".HDF",
    "csvSplitChar": ",",
    "csvColunm": 0,
    "csvFileName": "",
    "outPath": "e:\\",
    "toAppend": false,
    "appkey": "A064EFD6-57A5-11EA-BEA6-FB455AF066A1",
    "num": 1
};
let config = defaultConfig;

const sloveArgs = () => {
    if (fs.existsSync('config.json')) {
        config = require('./config.json');
    }
    for (let i in defaultConfig) {
        if (i in config) {} else {
            config[i] = defaultConfig[i];
            console.log(`config[${i}] have not set use default value ${defaultConfig[i]}`);
        }
    }

};

const delLastFile = (p) => {
    var tmpFile = {
        path: "",
        time: ""
    };
    p = path.resolve(p);
    fs.readdirSync(p).filter(f => {
        if (f.split('').reverse().splice(0, config.extName.length).reverse().join('').toUpperCase() === config.extName) {
            const s = fs.statSync(path.join(p, f));
            if (tmpFile.path) {
                if (tmpFile.time < s.ctimeMs) {
                    tmpFile.path = f;
                    tmpFile.time = s.ctimeMs;
                }
            } else {
                tmpFile.path = f;
                tmpFile.time = s.ctimeMs;
            }
        }
    });
    if (tmpFile.path) {
        fs.unlinkSync(path.join(p, tmpFile.path));
    }
};

sloveArgs();
config.toAppend ? 0 : delLastFile(config.outPath);

//https://gpm1.gesdisc.eosdis.nasa.gov/data/GPM_L3/GPM_3IMERGDF.06/2019/10/3B-DAY.MS.MRG.3IMERG.20191031-S000000-E235959.V06.nc4
const cmd = (url) => {
    let filename = path.basename(url);
    let fileFullPath = path.join(config.outPath, filename);
    return [
        `if not exist "${fileFullPath}"`,
        `curl -# -H "Authorization: Bearer ${config.appkey}"`,
        `"${url}"`,
        `-o "${fileFullPath}"`
    ].join(' ');
};

const cmds = [];

console.log(config.csvFileName);
fs.readFileSync(config.csvFileName, 'utf-8').split('\n').map((_, ind) => {
    const file = _.split(config.csvSplitChar)[config.csvColunm];
    if ((config.csvFromFirstLine || ind) && file) {
        cmds.push(cmd(file));
    }
});

(() => {
    let partNumber = parseInt(cmds.length / config.num);
    if (partNumber < 1) {
        partNumber = 1;
    }
    const fileName = (new Date()).getTime();
    const cmdFileName = (ind) => `${path.basename(config.outPath)}_${fileName}_${ind}.bat`;
    const counter = 0;
    let i = 0;
    for (; i < config.num - 1; i++) {
        let cfn = cmdFileName(i);
        fs.writeFileSync(cfn, cmds.splice(0, partNumber).concat(['del ' + cfn]).join('\r\n'));
        //exec(`start "${config.csvFileName}" /D "${process.cwd()}" cmd /k ${cfn}`,true)
    } {
        let cfn = cmdFileName(i);
        fs.writeFileSync(cfn, cmds.splice(0).concat(['del ' + cfn]).join('\r\n'));
        //exec(`start "${config.csvFileName}" /D "${process.cwd()}" cmd /k ${cfn}`,true)
    }
})();

setTimeout(process.exit, 5000);