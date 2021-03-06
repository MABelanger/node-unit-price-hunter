'use strict';

import request from 'request';

import utils from './utils';
import htmlParser from './html-parser';

function requestData(itemId, cookie) {
  let optionsMainPage = utils.getOptionsMainPage(itemId, request, cookie);
  let optionsDetailsPage = utils.getOptionsDetailsPage(request, cookie);

  let primise = new Promise((resolve, reject) => {
    // First request to setup the next request. We don't care about the data.
    // The server setup the id for the next loading page.
    request(optionsMainPage, function(error, response, body) {
      if (!error) {
        // Second request to get the real data
        request(optionsDetailsPage, function(error, response, body) {
          if (!error) {
            resolve(htmlParser.getParsedData(body));
          } else {
            reject(error);
          }
        });
      } else {
        reject(error);
      }
    });
  });

  return primise;
}

module.exports = {
  requestData
};
