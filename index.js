let request = require('request-promise-native');

/**
 * Shortens a long URL.
 *
 * @param {string} longLink The long link to shorten
 * @param {Object<string, *>} [options] Options to use advanced features
 *                                      for link shortening.
 * @param {boolean} [options.isWords] Whether or not to use words instead of
 *                                    alphanumeric characters in the short
 *                                    link. If unspecified, alphanumeric
 *                                    characters will be used. This argument is
 *                                    ignored if a `customShortLinkID` is
 *                                    provided.
 * @param {boolean} [options.hideStatistics] Whether or not to hide statistics
 *                                           for this link. If unspecified,
 *                                           statistics will not be hidden.
 * @param {Date} [options.expiryDate] When this link should expire. If
 *                                    unspecified, the link will never expire.
 * @param {string} [options.customShortLinkID] A custom shortlink ID to use
 *                                             instead of the randomly
 *                                             generated one. For example, if
 *                                             you wanted the link
 *                                             `qwa.la/example`, then `example`
 *                                             is your custom ID. Default is
 *                                             no custom short link.
 * @return {string} The shortened link ID. For example, if the new short link
 *                  is `qwa.la/example`, then `example` is the short link ID.
 */
module.exports.shorten = async function shortenLongLink(longLink, options) {
    if (!options) {
        options = {};
    }

    let response;

    try {
        response = await request({
            uri: 'http://qwa.li/api/shorten',
            json: true,
            body: {
                longLink,
                isWords: options.isWords,
                expiryDate: options.expiryDate ? Math.round(options.expiryDate.getTime() / 1000) : undefined,
                hideStatistics: options.hideStatistics,
                customShortLinkID: options.customShortLinkID,
            },
        });
    } catch (error) {
        console.log(error);
        throw error.error;
    }

    return response.shortLinkID;
}

/**
 * Lengthens a short URL.
 *
 * @param {string} shortLinkID The short link ID to lengthen. For example, if
 *                             you wanted to lengthen `qwa.la/example`, you
 *                             would use `example` as the `shortLinkID`.
 * @return {string} The original, long URL.
 */
module.exports.lengthen = async function lengthenShortLinkID(shortLinkID) {
    let response;

    try {
        response = await request({
            uri: 'http://qwa.li/api/lengthen',
            json: true,
            qs: {
                shortLinkID,
            },
        });
    } catch (error) {
        console.log(error);
        throw error.error;
    }

    return response.longLink;
}

/**
 * Returns a list of views for a short link.
 *
 * @param {string} shortLinkID The short link ID to get the views for. For
 *                             example, if you wanted to get statistics for
 *                             `qwa.la/example`, you would use `example` as the
 *                             `shortLinkID`.
 * @return {Array.<String, *>} The array of views. Each view includes an
 *                             `ipAddress` string property and a `viewed` Date
 *                             property
 */
module.exports.statistics = async function getStatisticsForShortLinkID(shortLinkID) {
    let response;

    try {
        response = await request({
            uri: 'http://qwa.li/api/statistics',
            json: true,
            qs: {
                shortLinkID,
            },
        });
    } catch (error) {
        console.log(error);
        throw error.error;
    }

    return response.views;
}
