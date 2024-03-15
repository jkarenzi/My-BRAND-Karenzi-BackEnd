"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Query = require("../models/QueryModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
class queryController {
    static async createQuery(req, res) {
        const formData = req.body;
        const userId = formData.userId;
        const query = formData.query;
        const newQuery = Query({
            userId,
            query
        });
        try {
            await newQuery.save();
            return res.json({ msg: "Query saved successfully" });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    static async getQueries(req, res) {
        try {
            const queries = await Query.find();
            return res.json({ queryList: queries });
        }
        catch (err) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    static async getQuery(req, res) {
        const id = new ObjectId(req.params.id);
        try {
            const query = await Query.findOne({ _id: id });
            if (query) {
                return res.json(query);
            }
            else {
                return res.status(404).json({ msg: 'Query not found' });
            }
        }
        catch (err) {
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    }
}
module.exports = {
    queryController
};
