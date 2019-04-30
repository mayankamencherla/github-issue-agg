function filter_issues(data) {
    return data.filter(function (row) {
        return !row.hasOwnProperty('pull_request')
    });
}

function aggregate(data) {
    var result = {
        opened_over_7_days_ago: 0,
        opened_over_1_day_ago: 0,
        opened_yesterday: 0
    }

    for (var num in data) {
        result.opened_yesterday++;
    }

    return result;
}

module.exports = {
    aggregate,
    filter_issues
}