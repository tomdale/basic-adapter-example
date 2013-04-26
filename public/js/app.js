window.App = Ember.Application.create();

App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.BasicAdapter'
});

App.Router.map(function() {
  this.resource('photo', { path: 'photo/:photo_id' }, function() {
    this.route('edit');
  });
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return App.Photo.find();
  }
});

App.PhotoIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('photo');
  },

  events: {
    edit: function() {
      this.transitionTo('photo.edit');
    }
  }
});

App.PhotoEditRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('photo');
  },

  events: {
    save: function(photo) {
      photo.save();
      this.transitionTo('photo.index');
    }
  }
});

var attr = DS.attr;

App.Photo = DS.Model.extend({
  url: attr('string'),
  description: attr('string')
});

var normalizePhotoJSON = function(photo) {
  return {
    id: photo.photoID,
    url: photo["url:photo"],
    description: photo.photo_description
  };
};

App.Photo.sync = {
  findAll: function(load) {
    $.getJSON('/photos').then(function(json) {
      json = json.map(normalizePhotoJSON);

      load(json);
    });
  },

  find: function(id, load) {
    var url = '/photos/'+id;
    $.getJSON(url).then(function(json) {
      load(normalizePhotoJSON(json));
    });
  },

  updateRecord: function(record, didSave) {
    var url = '/photos/'+record.get('id');

    var json = {
      photoID: record.get('id'),
      "url:photo": record.get('url'),
      photo_description: record.get('description')
    };

    $.ajax({
      url: url,
      type: 'post',
      data: JSON.stringify(json),
      contentType: "application/json"
    }).then(function() {
      didSave();
    });
  }
};

