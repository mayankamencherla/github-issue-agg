const moment = require('moment');

function generate_url(owner, repo, page) {
    return `https://api.github.com/repos/${owner}/${repo}/issues?per_page=100&page=${page}`;
}

function validate(query) {
    if (!query.hasOwnProperty('repository')) return false;
    return true;
}

function filter_issues(data) {
    return data.filter(function (row) {
        return !row.hasOwnProperty('pull_request')
    });
}

function aggregate(data) {
    var result = {
        opened_total: 0,
        opened_over_7_days_ago: 0,
        opened_over_1_day_ago: 0,
        opened_yesterday: 0
    }

    var now = moment.now();
    var yesterday = moment(now).subtract(1, 'days').unix();
    var last_week = moment(now).subtract(7, 'days').unix();

    console.log(now, yesterday, last_week);

    for (var num in data) {
        var created = moment(data[num]['created_at']).unix();

        result.opened_total++;

        if (created >= yesterday) result.opened_yesterday++;

        else if (created >= last_week) result.opened_over_1_day_ago++;

        else result.opened_over_7_days_ago++;
    }

    return result;
}

module.exports = {
    aggregate,
    filter_issues,
    generate_url,
    validate
}