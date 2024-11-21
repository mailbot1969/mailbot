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

// Service for student-related operations
app.service('studentService', function() {
    var students = [];

    this.addStudent = function(student) {
        students.push(student);
    };

    this.getStudents = function() {
        return students;
    };
});

// Another custom service (for example, validation service)
app.service('validationService', function() {
    this.validateStudent = function(student) {
        var errors = {};

        if (!student.name) {
            errors.name = "Name is required.";
        }
        if (!student.std) {
            errors.std = "Standard is required.";
        }
        if (!student.sec) {
            errors.sec = "Section is required.";
        }
        if (!student.parent_name) {
            errors.parent_name = "Parent's name is required.";
        }
        if (!student.occupation) {
            errors.occupation = "Occupation is required.";
        }
        if (!student.salary || student.salary <= 0) {
            errors.salary = "Salary must be greater than 0.";
        }
        if (!student.dob) {
            errors.dob = "Date of birth is required.";
        }
        if (!student.address) {
            errors.address = "Address is required.";
        }
        if (!student.phone || student.phone.length != 10) {
            errors.phone = "Phone number must be 10 digits.";
        }

        return errors;
    };
});

// Main Controller for the app
app.controller('MainController', function(customFactory, studentService, validationService) {
    var vm = this;

    // Initialize student object
    vm.student = {};
    vm.errors = {};
    vm.factoryMessage = customFactory.getMessage();
    vm.students = studentService.getStudents();

    // Function to submit form data
    vm.submitForm = function() {
        vm.errors = validationService.validateStudent(vm.student);

        // If there are no errors, add student using the studentService
        if (Object.keys(vm.errors).length === 0) {
            studentService.addStudent(angular.copy(vm.student)); // Add student
            vm.student = {}; // Reset form
        }
    };
});
