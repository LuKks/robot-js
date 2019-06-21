////////////////////////////////////////////////////////////////////////////////
// -------------------------------------------------------------------------- //
//                                                                            //
//                       (C) 2010-2018 Robot Developers                       //
//                       See LICENSE for licensing info                       //
//                                                                            //
// -------------------------------------------------------------------------- //
////////////////////////////////////////////////////////////////////////////////

"use strict";

//----------------------------------------------------------------------------//
// Requires                                                                   //
//----------------------------------------------------------------------------//

var mFS     = require ("fs"    );
var mHTTPS   = require ("https"  );
var mColors = require ("colors/safe");



//----------------------------------------------------------------------------//
// Constants                                                                  //
//----------------------------------------------------------------------------//

////////////////////////////////////////////////////////////////////////////////

var REMOTE = "https://github.com/LuKks/robot-js-binaries/raw/gh-pages/addon/";

////////////////////////////////////////////////////////////////////////////////

var BINARY =
	process.platform   + "-" +
	process.arch       + "-" +
	process.versions.modules +
	".node";

////////////////////////////////////////////////////////////////////////////////

var SOURCE = REMOTE + process.env.npm_package_version + "/" + BINARY;
var TARGET = "./lib/" + BINARY;

//----------------------------------------------------------------------------//
// Locals                                                                     //
//----------------------------------------------------------------------------//

////////////////////////////////////////////////////////////////////////////////
/// Create a writable stream to binary file

var target = mFS.createWriteStream (TARGET);

////////////////////////////////////////////////////////////////////////////////

var genericFailure = function (details)
{
	console.warn (mColors.yellow.bold (
		"WARNING: robot-js precompiled binaries could " +
		"not be downloaded, an attempt to compile them" +
		" manually will be made. For more information," +
		" please visit http://getrobot.net/docs/node.html." +
		" Details: " + details
	));

	try
	{
		// Delete target binary
		mFS.unlinkSync (TARGET);

	} catch (e) { }

	process.exitCode = 1;
};

////////////////////////////////////////////////////////////////////////////////

var request = function (url, success, failure)
{
	// Attempt to get the URL
	var req = mHTTPS.get (url);

	// Whenever a response is received
	req.on ("response", function (res)
	{
		// Check if response is OK
		if (res.statusCode < 400)
			success (res);

		// Some unexpected response
		else failure ("bad response" +
			" (" + res.statusCode +
			") " + res.statusMessage);
	});

	// Whenever an error is thrown
	req.on ("error", function (err)
	{
		failure (err.message);
	});
};



//----------------------------------------------------------------------------//
// Main                                                                       //
//----------------------------------------------------------------------------//

// Target file has gotten an error
target.on ("error", function (err)
{
	genericFailure (err.message);
});

// Attempt to download the binary
request (SOURCE, function (source)
{
	// Save the response
	source.pipe (target);
}, genericFailure);
