angular.module('farmbuild.farmdata').
	constant('crsSupported', [
		{
			label: 'GDA 94 Geographics: EPSG:4283',
			name: 'EPSG:4283',
			projection: '+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs'
		},
		{label: 'WGS 84 Geographics: EPSG:4326', name: 'EPSG:4326', projection: '+proj=longlat +datum=WGS84 +no_defs'},
		{
			label: 'Web Mercator: EPSG:3857',
			name: 'EPSG:3857',
			projection: '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs'
		},
		{
			label: 'VicGrid 94: EPSG:3111',
			name: 'EPSG:3111',
			projection: "+proj=lcc +lat_1=-36 +lat_2=-38 +lat_0=-37 +lon_0=145 +x_0=2500000 +y_0=2500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
		},
		{
			label: 'NSW Lamberts: EPSG:3308',
			name: 'EPSG:3308',
			projection: '+proj=lcc +lat_1=-30.75 +lat_2=-35.75 +lat_0=-33.25 +lon_0=147 +x_0=9300000 +y_0=4500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
		},
		{
			label: 'SA Lamberts: EPSG:3107',
			name: 'EPSG:3107',
			projection: '+proj=lcc +lat_1=-28 +lat_2=-36 +lat_0=-32 +lon_0=135 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
		},
		{
			label: 'Australian Albers: EPSG:3577',
			name: 'EPSG:3577',
			projection: '+proj=aea +lat_1=-18 +lat_2=-36 +lat_0=0 +lon_0=132 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
		}
	]
);