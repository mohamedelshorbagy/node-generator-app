const mongoose = require('mongoose');
<% if (hasModel == true) { %>const <%= modelNameCapitalized %> = require('../models/<%= modelName %>'); <% } %>
const services = {};

services.findAll = () => {
    /* insert your interaction & logic with db here */
    <% if (hasModel == true) { %> return <%= modelNameCapitalized %>.find({}); <% } %>
}


module.exports = services;