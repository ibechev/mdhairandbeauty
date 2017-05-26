
// Template form structure - contact form

var validate = {

	'passed'		: false,
	'errors'		: new Array,
	'form'			: null,
	'form_name'		: null,
	'checked_inputs': new Array,
	'submit_pressed': false,

	init: function(form_name, rules) {
		if (!form_name || !rules) {	
			console.log('Either "form_name" or "rules" are missing!');
			return false;
		} else {
			this.form = $('#' + form_name + '-form');
			this.form_name = form_name;
			this.listen(rules);
		}
	}, 

 	listen: function(rules) {
 		
		validate.check(rules);

		if (validate.passed === true) {
			validate.form.submit();
		}
	
		// Validate on focus out 
		this.form.find('input, textarea').focusout(function() {

				var input_id = $(this).attr('id');
				var rule = {};

				// Create an object of validation rules only for the focus out field
				rule[input_id] = rules[input_id];
				validate.check(rule);

		});
	},

	check: function(rules) {

		this.errors = [];
		this.checked_inputs = Object.keys(inputs);
		var input, value, rules, input_id;	

		for (field in inputs) {
			var input = inputs[field];				
			var input_id = input['input_id'];
			var value = this.form.find('#' + input_id).val().trim();
			var rules = Object.keys(input);

			for (i = 0; i < rules.length; i++) {

				if (rules[i] === 'required' && value == '') {
					this.addError(input_id, input['name'] + ' can not be empty!');

				} else if(value != '') {
					switch(rules[i]) {

						case 'min':
						if (value.length < input['min']) {
							this.addError(input_id, 'The ' + input['name'] + ' must be of mininun ' + input['min'] + ' characters!');
						}
						break;

						case 'letters&spaces':
						if (!value.match(/^[a-zA-Z ]+$/)) {
							this.addError(input_id, 'Your ' + input['name'] + ' must contain only spaces and letters!');
						}
						break;

						case 'email':
						var re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
						if (!re.test(value)) {
							this.addError(input_id, 'The email address you have entered in not valid!');
						}
					}
				}
			}	
		} 

		this.passed = this.errors.length == 0 ? true : false;

		this.display();

	},

	addError: function(input_id, error) {
		this.errors.push({'input_id' : input_id, 'error' : error});
	},

	display: function() {	
		validate.renderErrors(this.errors);
		validate.applyVisual(this.checked_inputs);

	},

	renderErrors: function(errors) {
		this.clearErrorFields(this.checked_inputs);
		for (i in errors) {
			var error = errors[i];
			var error_field = this.form.find('#' + this.form_name + '-' + error['input_id'] + '-errors');
			error_field.append('<li>' + error['error'] + '</li>');
		}
	},

	clearErrorFields: function(checked_inputs) {
		for (i in checked_inputs) {
			var input_to_empty = checked_inputs[i];
			if (this.inputHasError(input_to_empty, this.errors) === true) {
				this.form.find('#' + this.form_name + '-' + input_to_empty + '-errors').empty();
			}
		}
	},

	applyVisual: function(checked_inputs) {
		for (i in checked_inputs) {
			var input_name = checked_inputs[i];
			var input_element = this.form.find('#' + input_name);
			var pop_sign = input_element.siblings('i');

			if (this.inputHasError(input_name, this.errors) === true) {
				// Show error field and change classes for 'not valid'
				this.adaptClasses('flag-red', input_element);
				this.adaptClasses('fa fa-exclamation-circle not-valid', pop_sign);
				input_element.siblings('ul').slideDown(300, 'swing');

			} else {
				// Hide error field and change classes for 'valid'
				input_element.siblings('ul').slideUp(300, 'swing');
				this.adaptClasses('flag-green', input_element);
				this.adaptClasses('fa fa-check-square valid', pop_sign);
			}			
		}
	},

	adaptClasses: function(class_name, element) {
		element.removeClass().addClass(class_name);
	},

	inputHasError: function(input_name, errors) {
		for (i in errors) {
			var error = errors[i];

			if (error['input_id'] === input_name) {
				return true;
			} 
		}
	}

} // End of var validate
