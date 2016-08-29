'use strict';

juke.controller('SidebarCtrl', function ($scope, PlaylistFactory) {

  PlaylistFactory.fetchAll()
  .then(function(playlists){
    console.log(playlists);
    $scope.playlists = playlists;
  });

});
