function haversine(lat1, lon1, lat2, lon2) {

    var R = 6371; // km
    var rlat1 = toRad(lat1);
    var rlat2 = toRad(lat2);
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
	var clat1 = Math.cos(rlat1);
    
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            clat1 * Math.cos(rlat2) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    var d = R * c;
    return d;

    // var R = 6371; // earth's mean radius in km
    // var dLat = toRad(lat2 - lat1); // difference in latitude
    // var dLon = toRad(lon2 - lon1); // difference in longitude
    // rlat1 = toRad(lat1); // to radians
    // rlat2 = toRad(lat2);
    // var sdlat_2 = Math.sin(dLat / 2);
    // var sdlon_2 = Math.sin(dLon / 2);
    // var clat1 = Math.cos(rlat1);
    // var a = sdlat_2 * sdlat_2 + clat1 * Math.cos(rlat2) * sdlon_2 * sdlon_2;
    // var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // var d = R * clat1 * c; // distance is earth's mean radius times c
    // return d;
}

function toRad(i) {
    return i * 3.141593 / 180;
}

function lambert(lat1, lon1, lat2, lon2) {
	var f = 1/298.257;
	la1uLambert = lat1*Math.PI/180;
	la2uLambert = lat2*Math.PI/180;
	if (Math.abs(lat1)<90){
		la1uLambert = Math.atan((1 - f)*Math.tan(la1uLambert));
	}
	if (Math.abs(lat2)<90){
		la2uLambert = Math.atan((1 - f)*Math.tan(la2uLambert));
	}
	la1u = lat1*Math.PI/180;
	lo1u = lon1*Math.PI/180;
	la2u = lat2*Math.PI/180;
	lo2u = lon2*Math.PI/180;

	// Lambert Method
	deltaLat = la2uLambert - la1uLambert;
	deltaLon = lo2u - lo1u;
	a = Math.sin(deltaLat/2)*Math.sin(deltaLat/2) + Math.cos(la1uLambert)*Math.cos(la2uLambert) * Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
	c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	P = (la1uLambert + la2uLambert)/2;
	Q = (la2uLambert - la1uLambert)/2;
	X = (c - Math.sin(c))*Math.sin(P)*Math.sin(P)*Math.cos(Q)*Math.cos(Q)/Math.cos(c/2)/Math.cos(c/2);
	Y = (c + Math.sin(c))*Math.sin(Q)*Math.sin(Q)*Math.cos(P)*Math.cos(P)/Math.sin(c/2)/Math.sin(c/2);
	resultkm = 6378.1*(c - f*(X + Y)/2);
	return resultkm;
}


function calcdist(lati1,lati2,long1,long2){
	/*
	var lati1 = document.getElementById("lat1").value;
	var lati2 = document.getElementById("lat2").value;
	var long1 = document.getElementById("lon1").value;
	var long2 = document.getElementById("lon2").value;
	*/
	if (lati1 < -90 || lati2 < -90 || lati1 > 90 || lati2 > 90)
		document.getElementById("distance").innerHTML = "Latitude is not in [-90, 90], please enter correctly!";
	else if (long1 < -180 || long2 < -180 || long1 > 180 || long2 > 180)
		document.getElementById("distance").innerHTML = "Longitude is not in [-180, 180], plesae enter correctly!";
	else {
		/* var dis = haversine(lati1, long1, lati2, long2); */
        var dis = lambert(lati1, long1, lati2, long2);
		return dis;
	}	
}