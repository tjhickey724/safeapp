'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var crimeSchema = Schema( {
  date: String,
  crimeType: String,
  location: String
} );

module.exports = mongoose.model( 'Crime', crimeSchema );
