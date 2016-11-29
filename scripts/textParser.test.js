describe('TextParser', function() {

	// Example 1 tests

	it('should return the correct data points for example 1', function() {

		var example1TextObject = { 
			paragraph: 'John downloaded the Pokemon Go app on 07/15/2016. By 07/22/2016, he was on level 24. Initially, he was very happy with the app. However, he soon became very disappointed with the app because it was crashing very often. As soon as he reached level 24, he uninstalled the app.'
		};

		var example1JSONObject = JSON.stringify(example1TextObject);

		var textParserReturn = textParser.parseText(example1JSONObject);

		expect(JSON.parse(textParserReturn).timeDuration).toBe(8);

		expect(JSON.parse(textParserReturn).gender).toBe('male');

		expect(JSON.parse(textParserReturn).sentiment).toBe('mixed');

	});

	// Example 2 tests
	
	// it('should return the correct data points for example 2', function() {

	// 	var example2TextObject = { 
	// 		paragraph: 'Hua Min liked playing tennis. She first started playing on her 8th birthday - 07/07/1996. Playing tennis always made her happy. She won her first tournament on 08/12/2010. However, on 04/15/2015 when she was playing at the Flushing Meadows, she had a serious injury and had to retire from her tennis career.'
	// 	};

	// 	var example2JSONObject = JSON.stringify(example2TextObject);

	// 	var textParserReturn = textParser.parseText(example2JSONObject);

	// 	expect(JSON.parse(textParserReturn).timeDuration).toBe(6857);

	// 	expect(JSON.parse(textParserReturn).gender).toBe('female');

	// 	expect(JSON.parse(textParserReturn).sentiment).toBe('positive');

	// });

});