angular.module('udemy').controller('TutorialListCtrl', function($scope, $ionicSideMenuDelegate, $ionicModal) {

  $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };

  $scope.tutorials = [{
    title: 'Collect coins'
  }, {
    title: 'Eat mushrooms'
  }, {
    title: 'Get high enough to grab the flag'
  }, {
    title: 'Find the Princess'
  }];

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('/partials/new-tutorial.html', function(modal) {
    $scope.tutorialModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
  $scope.createTutorial = function(tutorial) {
    $scope.tutorials.push({
      title: tutorial.title
    });
    $scope.tutorialModal.hide();
    tutorial.title = "";
  };

  // Open our new tutorial modal
  $scope.newTutorial = function() {
    $scope.tutorialModal.show();
  };

  // Close the new tutorial modal
  $scope.closeNewTutorial = function() {
    $scope.tutorialModal.hide();
  };

});
