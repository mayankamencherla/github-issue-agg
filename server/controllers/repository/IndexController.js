const axios = require('axios');
const Parallel = require("async-parallel");
const {aggregate, filter_issues, generate_url, validate} = require('../../helpers');

module.exports.controller = (app) => {

    /**
     * Retrieves an entity based on input parameters
     */
    app.post('/query', async (req, res, next) => {
        const v = validate(req.body);

        if (!v.result) {
            return res.json({
                "Success": false,
                "message": v.message
            });
        }

        const url = req.body.repository;

        console.log(`Request to retrieve ${url}`);

        var array = url.split('/');
        const owner = array[3];
        const repo = array[4];

        const issues = [];
        var page = 1;

        while (true) {
            const urls = [
                generate_url(owner, repo, page++),
                generate_url(owner, repo, page++),
                generate_url(owner, repo, page++),
                generate_url(owner, repo, page),
            ];

            console.log(urls);

            const subIssues = [];

            try {
                await Parallel.each(urls, function(url) {
                    return axios.get(url).then(function(result) {
                        subIssues.push(...filter_issues(result.data));
                    });
                });
            } catch (e) {
                console.log(e);
                return res.json({"Success": false, "message": "Unable to retrieve data"});
            }

            if (subIssues.length == 0) break;

            issues.push(...subIssues);

            console.log(`Pulled out a total of ${issues.length} after page ${page}`);
            page++;
        }


        res.json({"Success": true, issues: aggregate(issues)});
    });
};