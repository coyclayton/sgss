const express = require('express');
const router = express.Router();
const fs = require('fs');
const crypto = require('crypto');

var gridState = require('./jrftw/gridState.json');

router.get('/image_grid', function(req, res) {
    res.json(gridState.grid);
});

function sendFail(res, message) {
    res.json({
        success: 0,
        message: message
    });
}

router.get('/flip_square', function(req, res){
    var password="wshhhwshhhwshhhwshhhwshhh";
    //console.log(req.query);
    if (req.query.password === password) {
        var squareID = parseInt(req.query.square, 10);
        if (squareID == 0 || squareID > 328) {
            return sendFail("out of bounds");
        } else {
            var targetSquare = gridState.grid.findIndex((e)=>{
                if (e.id == squareID) {
                    return true;
                } else {
                    return false;
                }
            });
            if (targetSquare !== -1) {
                gridState.grid[targetSquare].unlocked = true;
                gridState.grid[targetSquare].unlock_at = req.query.at;
                gridState.hash = crypto.createHash('md5').update(JSON.stringify(gridState.grid)).digest('hex');
                fs.writeFileSync(__dirname+"/jrftw/gridState.json", JSON.stringify(gridState, null, 4));
                res.json({
                    success:1
                }); 
                return;
            } else {
                return sendFail(res, "target square out of bounds");
            }
        }
    } else {
        res.json({
            success: 0,
            message: "NOPE!"
        });
    }
});

router.get('/hash', function(req, res){
    res.json(gridState.hash);
});

router.get('/leaderboard', function(req, res){
    var board = {};
    gridState.grid.map((e)=>{
        if (board[e.unlock_at] == undefined) {
            board[e.unlock_at] = {
                squares:0
            }
        }
        if (e.unlocked == true) {
            board[e.unlock_at].squares += 1;
        }
    });
    var theList = [];
    Object.keys(board).forEach((idx)=>{
        if (board[idx].squares > 0) {
            theList.push({
                at: idx,
                squares: board[idx].squares
            });    
        }
    });
    res.json(theList);
});

module.exports = router;