var express = require('express');
var app = express();
app.use(express.json());

var photos = [{
  photoID: '1',
  "url:photo": "/images/1.jpg",
  photo_description: "San Francisco's cutest dog, Kaiyuh"
}, {
  photoID: '2',
  "url:photo": "/images/2.jpg",
  photo_description: "Eating a cupcake"
}, {
  photoID: '3',
  "url:photo": "/images/3.jpg",
  photo_description: "LOLnaps"
}, {
  photoID: '4',
  "url:photo": "/images/4.jpg",
  photo_description: "Green Bay!"
}, {
  photoID: '5',
  "url:photo": "/images/5.jpg",
  photo_description: "Nichole's Kaiyuh tattoo"
}, {
  photoID: '6',
  "url:photo": "/images/6.jpg",
  photo_description: "Road trip!"
}, {
  photoID: '7',
  "url:photo": "/images/7.jpg",
  photo_description: "OMG puppy!"
}];

function findPhoto(id) {
  var i, len = photos.length,
      photo;

  for (i = 0; i < len; i++) {
    photo = photos[i];

    if (photos.photoID === id) {
      return photo;
    }
  }
}


app.get('/photos', function(req, res) {
  res.send(photos);
});

app.get('/photos/:id', function(req, res) {
  var id = req.params.id;
  var photo;

  photos.forEach(function(item) {
    if (item.photoID === id) {
      photo = item;
    }
  });

  res.send(photo);
});

app.post('/photos/:id', function(req, res) {
  var id = req.body.photoID;
  var photo = findPhoto(id);
  var index = photos.indexOf(photo);

  photos.splice(index, 1, req.body);

  console.log("Updated photo " + id + " with: ", req.body);

  res.send(200);
});

app.use(express.static('public'));

app.listen(3000);

console.log("Server listening on port 3000");
