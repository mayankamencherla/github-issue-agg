const axios = require('axios');
const {aggregate, filter_issues, generate_url, validate} = require('../../helpers');

module.exports.controller = (app) => {

    /**
     * Retrieves an entity based on input parameters
     */
    app.get('/query', async (req, res, next) => {
        if (!validate(req.query)) {
            res.json({
                "Success": false,
                "message": "repository needs to be sent in the url request"
            });

            return;
        }

        console.log(`Request to retrieve ${req.query.repository}`);

        var array = req.query.repository.split('/');
        const owner = array[3];
        const repo = array[4];

        const issues = [];
        var page = 1;

        while (true) {
            const url = generate_url(owner, repo, page);

            let result;
            try {
                result = await axios.get(url);
            } catch (e) {
                console.log(e);
                return res.json({"Success": false, "message": "Unable to retrieve data"});
            }

            console.log(`Pulled out ${result.data.length} on page ${page}`);

            if (result.data.length == 0) break;

            issues.push(...filter_issues(result.data));

            console.log(`Pulled out a total of ${issues.length} after page ${page}`);
            page++;
        }


        res.json({"Success": true, issues: aggregate(issues)});
    });
};