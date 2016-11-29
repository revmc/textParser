window.textParser = window.textParser || {};

(function() {

	function getTimeDuration(paragraphText) {

		var datePattern = /(0[1-9]|1[0-2])[\/](0[1-9]|[12]\d|3[01])[\/](19|20)\d{2}/g;

		var dateMatchArray = paragraphText.match(datePattern);

		var diffDays = 0;

		if (dateMatchArray) {

			// convert text dates to date objects
			var arrDates = dateMatchArray.map(function(value, index, arr) {
				return new Date(value);
			});

			// sort date array into ascending order
			arrDates.sort(function (date1, date2) {
				if (date1 > date2) return 1;
				if (date1 < date2) return -1;
				return 0;
			});

			var earliestDate = arrDates[0]; // first array element
			var latestDate = arrDates[(arrDates.length - 1)]; // last array element

			var timeDiff = Math.abs(latestDate.getTime() - earliestDate.getTime());

			diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // + 1 because this is inclusive of the given dates

		}

		return diffDays;

	}

	function getGender(paragraphText) {

		var gender = 'unknown';

		var genderPattern = /\bhe\b|\bshe\b/ig;

		var genderMatchArray = paragraphText.match(genderPattern);

		var numMales = 0,
			numFemales = 0;

		if (genderMatchArray) {

			var numPeople = genderMatchArray.length;

			for (var i = 0; i < numPeople; ++i) {
				
				if (genderMatchArray[i] === 'he') {
					numMales++;
				}

			}

			var numFemales = numPeople - numMales;

			if (numMales > numFemales) {
				gender = 'male';
			} else if (numFemales > numMales) {
				gender = 'female';
			}

		}

		return gender;

	}

	function getSentiment(paragraphText) {

		var sentiment = 'unknown';

		var positiveSentimentPattern = /happy|glad|jubilant|satisfied/gi; 
		var negativeSentimentPattern = /sad|disappointed|angry|frustrated/gi;

		// get arrays of matching sentiments, one array for each type of sentiment
		var positiveSentimentMatchArray = paragraphText.match(positiveSentimentPattern);
		var negativeSentimentMatchArray = paragraphText.match(negativeSentimentPattern);

		var numPositiveSentiments = positiveSentimentMatchArray ? positiveSentimentMatchArray.length : 0;
		var numNegativeSentiments = negativeSentimentMatchArray ? negativeSentimentMatchArray.length : 0;

		if (numPositiveSentiments > numNegativeSentiments) {
			sentiment = 'positive';
		} else if (numNegativeSentiments > numPositiveSentiments) {
			sentiment = 'negative';
		} else if (numPositiveSentiments === numNegativeSentiments) {
			sentiment = 'mixed';
		}

		return sentiment;

	}

	window.textParser.parseText = function(inputJSON) {

		// convert JSON input to an object
		var inputObject = JSON.parse(inputJSON);

		var paragraphText = inputObject.paragraph;

		var diffDays = getTimeDuration(paragraphText);

		var gender = getGender(paragraphText);

		var sentiment = getSentiment(paragraphText);
		
		// create an object to hold all the return values
		var returnObj = {
			timeDuration: diffDays,
			gender: gender,
			sentiment: sentiment
		};

		// convert the object with the return values to JSON
		var returnJSON = JSON.stringify(returnObj);

		return(returnJSON);

	};

})();