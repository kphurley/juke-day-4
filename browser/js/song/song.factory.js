'use strict';

juke.factory('SongFactory', function ($http) {

  return {

    getAllSongs: function() {
      return $http.get('/api/songs')
      .then(function(songs){
        return songs.data;
      })
    },

    convert: function (song) {
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      return song;
    }
  };

});
