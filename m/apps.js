// Define the main module and dependencies
var app = angular.module('studentApp', []);

// Custom Factory for reusable logic
app.factory('customFactory', function() {
    var message = "This is a message from the custom factory.";
    return {
        getMessage: function() {
            return message;
        }
    };
});

// Custom Filter to capitalize the first letter of a string
app.filter('capitalize', function() {
    return function(input) {
        if (!input) return input;
        return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    };
});

// Custom Directive to show a message
app.directive('customDirective', function() {
    return {
        restrict: 'E',
        scope: {
            message: '@'
        },
        template: '<div style="background-color: yellow; padding: 10px; border: 1px solid #ccc;">{{ message }}</div>'
    };
});

// Main Controller for the app
app.controller('MainController', function(customFactory) {
    var vm = this;

    // Initialize student object
    vm.student = {};
    vm.students = [];
    vm.errors = {};

    // Custom Factory message
    vm.factoryMessage = customFactory.getMessage();

    // Function to submit form data
    vm.submitForm = function() {
        vm.errors = {}; // Reset errors

        if (!vm.student.name) {
            vm.errors.name = "Name is required.";
        }
        if (!vm.student.std) {
            vm.errors.std = "Standard is required.";
        }
        if (!vm.student.sec) {
            vm.errors.sec = "Section is required.";
        }
        if (!vm.student.parent_name) {
            vm.errors.parent_name = "Parent's name is required.";
        }
        if (!vm.student.occupation) {
            vm.errors.occupation = "Occupation is required.";
        }
        if (!vm.student.salary || vm.student.salary <= 0) {
            vm.errors.salary = "Salary must be greater than 0.";
        }
        if (!vm.student.dob) {
            vm.errors.dob = "Date of birth is required.";
        }
        if (!vm.student.address) {
            vm.errors.address = "Address is required.";
        }
        if (!vm.student.phone || vm.student.phone.length != 10) {
            vm.errors.phone = "Phone number must be 10 digits.";
        }

        // If there are no errors, add student to the list
        if (Object.keys(vm.errors).length === 0) {
            vm.students.push(angular.copy(vm.student)); // Add student
            vm.student = {}; // Reset form
        }
    };
});
