function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
  xmlHttp.send( null );
  return JSON.parse(xmlHttp.responseText);
}

function getLatLngForSpaceStation() {
  var iss_position = httpGet("http://api.open-notify.org/iss-now.json").iss_position;
  return new google.maps.LatLng(Number(iss_position.latitude),
                                Number(iss_position.longitude));
}

function pushCoordToArray(latLng) {
  lineCoordinatesArray.push(latLng);
}

function initMap() {
  var position = getLatLngForSpaceStation()
  pushCoordToArray(position);

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: position,
    mapTypeId: 'satellite'
  });

  map_marker = new google.maps.Marker({
    position: position,
    map: map,
    title: 'International Space Station Position',
    icon: '/images/space_station.png',
  });

  map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
}

function pollCoordinates() {
  var currentPosition = getLatLngForSpaceStation()
  pushCoordToArray(currentPosition);

  var lineCoordinatesPath = new google.maps.Polyline({
    path: lineCoordinatesArray,
    geodesic: true,
    strokeColor: '#FFFFFF',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  lineCoordinatesPath.setMap(map);

  map.setCenter({lat: currentPosition.lat(),
                 lng : currentPosition.lng(),
                 alt: 0})
  map_marker.setPosition({lat: currentPosition.lat(),
                          lng : currentPosition.lng(),
                          alt: 0});

}

var map;
var map_marker;
var lineCoordinatesArray = [];

window.setInterval(function(){
  pollCoordinates();
}, 1000);

$('a[href^="#"]').on('click',function (e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
        'scrollTop': $target.offset().top - 80
    }, 500, 'swing', function () {
        window.location.hash = target;
    });
});

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 88,
      "density": {
        "enable": true,
        "value_area": 700
      }
    },
    "color": {
      "value": ["#aa73ff", "#f8c210", "#83d238", "#33b1f8"]
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 15
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1.5,
        "opacity_min": 0.15,
        "sync": false
      }
    },
    "size": {
      "value": 2.5,
      "random": false,
      "anim": {
        "enable": true,
        "speed": 2,
        "size_min": 0.15,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 110,
      "color": "#33b1f8",
      "opacity": 0.25,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1.6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "bounce",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});
var count_particles, stats, update;
stats = new Stats;
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);
count_particles = document.querySelector('.js-count-particles');
update = function() {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);;
