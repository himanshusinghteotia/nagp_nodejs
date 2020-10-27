var mongoose = require("mongoose");
var Positions = require("../models/PositionModel");

var PositionController = {};

PositionController.list = (req, res) => {
    Positions.find({},{
        _id: 1,
        projectName: 1,
        technologies: 1,
        role: 1
    }).exec((err, positions) => {
        if (err) {
            console.log("Error: ", err);
        }
        else {
            res.render("../views/position/index", { Positions: positions,isUserLoggedIn:true });
        }
    });
};

PositionController.show = (req, res) => {
    Positions.findOne({ _id: req.params.id }).exec((err, positions) => {
        if (err) {
            console.log("Error: ", err);
        }
        else {
            res.render("../views/position/show", { Position: positions,isUserLoggedIn:true });
        }
    });
};

PositionController.create = (req, res) => {
    res.render("../views/position/create",{isUserLoggedIn:true });
};

PositionController.save = (req, res) => {
    var Position = new Positions(req.body);
    Position.status = true;
    Position.createdby = req.cookies["userid"]
    Position.save((err) => {
        if (err) {
            console.log(err);
            res.render("../views/position/create");
        }
        else {
            console.log("Successfully created an Position.");
            res.redirect("/positions/position/" + Position._id);
        }
    });
};

PositionController.edit = (req, res) => {
    Positions.findOne({ _id: req.params.id }).exec((err, position) => {
        if (err) {
            console.log("Error:", err);
        }
        else {
            console.log(position)
            res.render("../views/position/update", { Position: position,isUserLoggedIn:true  });
        }
    });
};

PositionController.update = (req, res) => {
    Positions.findByIdAndUpdate(req.params.id,
        {
            $set: {
                'projectName': req.body.projectName,
                'clientName': req.body.clientName,
                'technologies': req.body.technologies,
                'jobDescription': req.body.jobDescription,
                'role': req.body.role,
                'status': req.body.status,
            }
        }, { new: true }, (err, Position) => {
            if (err) {
                console.log(err);
                res.render("../views/position/update", { Position: req.body,isUserLoggedIn:true  });
            }
            res.redirect("/positions/position/" + Position._id);
        });
};

module.exports = PositionController;