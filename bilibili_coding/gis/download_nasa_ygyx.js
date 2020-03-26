// curl -# -H "Authorization: Bearer 授权码" "https://ladsweb.modaps.eosdis.nasa.gov/链接" -o MOD09.A2019210.0200.006.2019212020245.hdf
const fs = require('fs')
const q = require('./query.json')

let getCmd = url => {
    let surl = url.split('/');
    return `curl -# -H "Authorization: Bearer 授权码" "https://ladsweb.modaps.eosdis.nasa.gov${url}" -o ${surl[surl.length - 1]}`
}
let out = [];
for (let i in q) {
    if (q[i].url) {
        out.push(getCmd(q[i].url))
    }
}

fs.writeFileSync('bat.bat', out.join('\r\n'), 'utf-8');