'use strict';

juke.controller('AddPlaylistCtrl', function($scope, $state, PlaylistFactory) {
  $scope.log = console.log;

  $scope.createPlaylist = function(playlistObj) {
    PlaylistFactory.createPlaylist(playlistObj)
    .then(function(response){
      $state.go('playlist', {id: response.id});
    });
  }

});

juke.controller('PlaylistCtrl', function($scope, $stateParams, PlaylistFactory, PlayerFactory,songs, playlist, playlistSongs) {

  $scope.playlist = playlist;
  $scope.songs = songs;
  $scope.playlist.songs = playlistSongs;

  $scope.addSong = function(song){
    PlaylistFactory.addSong($scope.playlist.id, song.id)
    .then(function(response){
      $scope.playlist.songs.push(response);
    })
    .then(function(){
      //reset form
      $scope.selected = '';
    })
  }

  $scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.playlist.songs);
    } else if (PlayerFactory.isPlaying()) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

  $scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

});
