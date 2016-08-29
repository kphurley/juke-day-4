'use strict';

juke.factory('PlaylistFactory', function ($http, SongFactory) {

  var cachedPlaylists = [];
  var PlaylistFactory = {};

  PlaylistFactory.createPlaylist = function (playlistObj) {
    return $http.post('/api/playlists', playlistObj)
    .then(function (response) {
      cachedPlaylists.push(response.data);
      return response.data;
    })
  };

  PlaylistFactory.fetchAll = function() {
    return $http.get('/api/playlists')
    .then(function (response) {
      angular.copy(response.data, cachedPlaylists);
      return cachedPlaylists;
    })
  }

  PlaylistFactory.fetchById = function(id) {

    let thePlaylist = getPlaylistFromCache(id);
    if(!thePlaylist){
      return $http.get('/api/playlists/' + id)
      .then(function(response){
        return response.data;
      })
    }
    return thePlaylist;
  }

  PlaylistFactory.addSong = function(playlistId, songId) {
    return $http.post('/api/playlists/' + playlistId + '/songs', {id: songId})
    .then(function(song) {
      return SongFactory.convert(song.data);
    })
  }

  PlaylistFactory.getSongsFromPlaylist = function(id) {
    return $http.get('/api/playlists/' + id + '/songs')
    .then(function(response) {
      return response.data;
    })
  }

  function getPlaylistFromCache(id){
    return cachedPlaylists.find(playlist => playlist.id == id);
  }

  return PlaylistFactory;

});
