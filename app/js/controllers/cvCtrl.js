'use strict';

define([], function() {

    return function(contentService) {

        contentService.getProfile().then(function(data) {
            this.profile = data;
        }.bind(this));

        this.sectionCopy = null;

        this.editMode = false;
        this.changeMode = 'Edit';


        this.toggleEdit = function() {
            this.editMode = !this.editMode;
            this.changeMode = this.editMode ? 'Close': 'Edit';
        };

        this.selectSection = function(section, index) {
            this.selectedSection = section;
            this.selectedSectionIndex = index;
            this.sectionCopy = angular.copy(section);
        };

        this.createSection = function() {
            this.profile.sections.push(this.newSection);
            contentService.updateProfile(this.profile);
            this.newSection = null;
        };

        this.updateSection = function() {
            this.profile.sections[this.selectedSectionIndex] = this.sectionCopy;
            contentService.updateProfile(this.profile);
        };

        this.deleteSection = function() {
            this.profile.sections.splice(this.selectedSectionIndex, 1);
            contentService.updateProfile(this.profile);
            this.sectionCopy = null;
            this.selectedSectionIndex = -1;
        };
    };
});