const axios = require('axios');
const {aggregate, filter_issues} = require('../../helpers');

module.exports.controller = (app) => {

    /**
     * Retrieves an entity based on input parameters
     */
    app.get('/query', async (req, res, next) => {
        // if (!validateQueryInput(req.query)) {
        //     res.json({
        //         "Success": false,
        //         "message": "type, id and timestamp need to be passed in the query params"
        //     });

        //     return;
        // }

        console.log(`Request to retrieve ${req.query.repository}`);

        var array = req.query.repository.split('/');

        const issues = [];
        var index = 1;

        while (true) {
            const url = `https://api.github.com/repos/${array[3]}/${array[4]}/issues?per_page=100&page=${index}`;

            try {
                const result = await axios.get(url);
            } catch (e) {
                console.log(e);
                return res.json({"Success": false, "message": "Unable to retrieve data"});
            }

            console.log(`Pulled out ${result.data.length} on page ${index}`);

            if (result.data.length == 0) break;

            issues.push(...filter_issues(result.data));

            console.log(`Pulled out a total of ${issues.length} after page ${index}`);
            index++;
        }


        res.json({"Success": true, issues: aggregate(issues)});
    });
};