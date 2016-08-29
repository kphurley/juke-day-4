'use strict';

juke.config(function ($stateProvider) {

  $stateProvider
  .state('addPlaylist', {
    url: '/addPlaylist',
    templateUrl: '/js/playlist/templates/newPlaylist.html',
    controller: 'AddPlaylistCtrl',
    resolve: {

    }
  })
  .state('playlist', {
    url: '/playlist/:id',
    templateUrl: '/js/playlist/templates/playlist.html',
    controller: 'PlaylistCtrl',
    resolve: {
      songs: function(SongFactory) {
        return SongFactory.getAllSongs();
      },
      playlist: function(PlaylistFactory, $stateParams) {
        return PlaylistFactory.fetchById($stateParams.id);
      },
      playlistSongs: function(PlaylistFactory, SongFactory, $stateParams) {
        return PlaylistFactory.getSongsFromPlaylist($stateParams.id)
        .then(function(songs){
          return songs.map(SongFactory.convert);
        });
      }
    }
  });

});
