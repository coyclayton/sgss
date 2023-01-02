import fs from 'fs';
import crypto from 'crypto';

function makeSiteLine(workArray, orgCol, orgRow, idStart, zwidth, zheight, sCount) {
    for (var i = 0; i < sCount; i++) {
        var price = (500 * zwidth +  (zheight-1)* 1000);
        workArray.push({
            id: idStart + i,
            loc: [orgCol + (i * zwidth), orgRow],
            zwidth: zwidth,
            zheight: zheight,
            imgs: calculateImageList(orgRow, orgCol+(i*zwidth), zwidth, zheight),
            unlocked: (Math.random(12)*100 > 49),
            entity: false,
            label: false,
            unlock_at:"@somethingsomething",
            unlock_price: price.toString(),
            unlock_price_int: price
        });
    }
    return workArray;
}

function calculateImageList(srcRow, srcCol, zwidth, zheight) {
    var images = [];
    for (var y = srcRow; y < (srcRow+zheight); y++) {
        for (var x = srcCol; x < (srcCol+zwidth); x++) {
            images.push(((20*y)-20)+x);
        }
    }
    return images;
}

var sites = [];
sites = makeSiteLine(sites, 1, 1, 1, 1, 1, 20);
sites = makeSiteLine(sites, 1, 2, 21, 1, 1, 20);
sites = makeSiteLine(sites, 1, 3, 41, 1, 1, 20);

sites = makeSiteLine(sites, 1, 4, 61, 1, 1, 8);
sites = makeSiteLine(sites, 9, 4, 69, 2, 1, 2);
sites = makeSiteLine(sites, 13, 4, 71, 1, 1, 8);

sites = makeSiteLine(sites, 1, 5, 79, 1, 1, 8);
sites = makeSiteLine(sites, 9, 5, 87, 2, 1, 2);
sites = makeSiteLine(sites, 13, 5, 89, 1, 1, 8);

sites = makeSiteLine(sites, 1, 6, 97, 1, 1, 8);
sites = makeSiteLine(sites, 9, 6, 105, 2, 1, 2);
sites = makeSiteLine(sites, 13, 6, 107, 1, 1, 8);

sites = makeSiteLine(sites, 1, 7, 115, 1, 1, 8);
sites = makeSiteLine(sites, 9, 7, 123, 2, 1, 2);
sites = makeSiteLine(sites, 13, 7, 125, 1, 1, 8);

sites = makeSiteLine(sites, 1, 8, 133, 2, 1, 10);

sites = makeSiteLine(sites, 1, 9, 143, 2, 1, 4);
sites = makeSiteLine(sites, 9, 9, 147, 2, 2, 2);
sites = makeSiteLine(sites, 13, 9, 149, 2, 1, 4);

sites = makeSiteLine(sites, 1, 10, 153, 2, 1, 4);
// gap from previous 2x
sites = makeSiteLine(sites, 13, 10, 157, 2, 1, 4);

sites = makeSiteLine(sites, 1, 11, 161, 2, 1, 4);
sites = makeSiteLine(sites, 9, 11, 165, 2, 2, 2);
sites = makeSiteLine(sites, 13, 11, 167, 2, 1, 4);

sites = makeSiteLine(sites, 1, 12, 171, 2, 1, 4);
// gap from previous 2x
sites = makeSiteLine(sites, 13, 12, 175, 2, 1, 4);

sites = makeSiteLine(sites, 1, 13, 179, 1, 1, 8);
sites = makeSiteLine(sites, 9, 13, 187, 2, 1, 2);
sites = makeSiteLine(sites, 13, 13, 189, 1, 1, 8);

sites = makeSiteLine(sites, 1, 14, 197, 1, 1, 8);
sites = makeSiteLine(sites, 9, 14, 205, 2, 1, 2);
sites = makeSiteLine(sites, 13, 14, 207, 1, 1, 8);

sites = makeSiteLine(sites, 1, 15, 215, 1, 1, 8);
sites = makeSiteLine(sites, 9, 15, 223, 2, 1, 2);
sites = makeSiteLine(sites, 13, 15, 225, 1, 1, 8);

sites = makeSiteLine(sites, 1, 16, 233, 1, 1, 8);
sites = makeSiteLine(sites, 9, 16, 241, 2, 1, 2);
sites = makeSiteLine(sites, 13, 16, 243, 1, 1, 8);

sites = makeSiteLine(sites, 1, 17, 251, 1, 1, 8);
sites = makeSiteLine(sites, 9, 17, 259, 2, 1, 2);
sites = makeSiteLine(sites, 13, 17, 261, 1, 1, 8);

sites = makeSiteLine(sites, 1, 18, 269, 1, 1, 20);
sites = makeSiteLine(sites, 1, 19, 289, 1, 1, 20);
sites = makeSiteLine(sites, 1, 20, 309, 1, 1, 20);

var gridData = {}
gridData.grid = sites;
gridData.hash = crypto.createHash('md5').update(JSON.stringify(sites)).digest('hex');

fs.writeFileSync("./public/gridState.json", JSON.stringify(gridData, null, 4));